<template>
  <section class="main-section mock-draft" ref="mockDraft">
    <MainSectionIntro type="mock_draft" />
    <transition-group name="player-card" class="mock-draft__inner" tag="div">
      <PlayerCard 
        v-for="playerId in mockDraftIds" 
        :playerId="playerId" 
        :key="playerId" 
        rankKey="mock_rank" 
        v-on:card-expanded="setCardExpanded" 
        :cardExpanded="cardExpanded" 
      />
    </transition-group>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import PlayerCard from '~/components/PlayerCard'
import MainSectionIntro from '~/components/MainSectionIntro'
export default {
  name: 'MockDraft',
  transition: {
    name:"main-section",
    mode:"out-in",
    duration: 750
  },
  scrollToTop: false,
  components: { MainSectionIntro, PlayerCard },
  data() {
    return {
      initTimeout: null,
      showAll: false
    }
  },
  created() {
    if(process.client){
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  destroyed() {
    if(process.client){
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  destroyed() {
    clearTimeout(this.initTimeout);
  },
  computed: {
    cardExpanded () {
      return this.$store.getters['page/cardExpanded']
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth']
    },
    viewPosition () {
      return this.$store.getters['viewOptions/position']
    },
    mockDraftIds () {
      const itemCount = this.viewDepth === 'compact' ? 10 : 4;
      return this.showAll ? this.$store.getters['content/mockDraft'](this.viewPosition) : this.$store.getters['content/mockDraft'](this.viewPosition).slice(0,itemCount)
    }
  },
   methods: {
   ...mapActions({
      'setCardExpanded': 'page/setCardExpanded',
    }),
    handleScroll() {
      if(window.scrollY > this.$refs.mockDraft.offsetParent.offsetTop + this.$refs.mockDraft.offsetTop - window.innerHeight) {
        this.showAll = true;
      }
    }
  },
  async asyncData({$axios, store, commit}) {
    let configuration = store.getters['page/configuration'];
    if(!configuration){
      configuration = await $axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/config.production.json.gz?ignoreCache=3",  {
        headers: {
          'Content-Encoding': 'gzip'
        }
      })
        .then(response => { 
          store.commit('page/setConfig', response.data[0]);
          return response.data[0];
        }).catch(err => console.log(err));
    }
    let pageSettings = store.getters['page/settings'];
    if(!pageSettings){
      pageSettings = await $axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/page.production.json.gz?ignoreCache=3",  {
        headers: {
          'Content-Encoding': 'gzip'
        }
      })
        .then(response => {
          store.commit('page/setPage', response.data[0].data);
          return response.data[0].data;
        })
        .catch(err => console.log(err));
    }
    return { configuration: configuration, settings: pageSettings }
  },
  head()  {
    return {
      meta: [{
        hid: 'og:title',
        name: 'og:title',
        content: this.configuration.facebook_page_share_title + 'Mock'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: this.configuration.facebook_page_share_description + 'Mock'
      }]
    }
  }
}
</script>

<style scoped lang="scss">
.mock-draft{
   min-height:calc(100vh + 4px);
}
</style>
