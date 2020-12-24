<template>
  <section class="main-section mock-draft">
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
      showMain: false
    }
  },
  mounted() {
    this.initTimeout = setTimeout(() => this.showMain = true, 1000);
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
      if(this.showMain){
        return this.$store.getters['content/mockDraft'](this.viewPosition)
      } else {
        const itemCount = this.viewDepth === 'compact' ? 10 : 4;
        return this.$store.getters['content/mockDraft'](this.viewPosition).slice(0,itemCount)
      }
    }
  },
   methods: {
   ...mapActions({
      'setCardExpanded': 'page/setCardExpanded',
    }),
  },
  async asyncData({$axios, store, commit}) {
    let configuration = store.getters['page/configuration'];
    if(!configuration){
      configuration = await $axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/config.json.gz?ignoreCache=1",  {
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
      pageSettings = await $axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/page.json.gz?ignoreCache=1",  {
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
