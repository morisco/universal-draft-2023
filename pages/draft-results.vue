<template>
  <section class="main-section draft-results" ref="draftResults">
    <!-- <MainSectionIntro type="mock_draft" /> -->
    <transition-group name="player-card" class="draft-results__inner" tag="div">
      <template v-for="(playerId, index) in draftResultsIds">
        <PlayerCard 
          :playerId="playerId" 
          :key="playerId" 
          rankKey="order_draftresults" 
          v-on:card-expanded="setCardExpanded" 
          :cardExpanded="cardExpanded" 
        />
        <Interstitial 
          v-if="interstitials[index+1]" 
          :key="'interstitial-' + (index+1)" 
          :list="'draftResults'" 
          :interKey="index+1" 
        />
      </template>
    </transition-group>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import PlayerCard from '~/components/PlayerCard'
import MainSectionIntro from '~/components/MainSectionIntro'
import Interstitial from '~/components/Interstitial';
export default {
  name: 'DraftResults',
  transition: {
    name:"main-section",
    mode:"out-in",
  },
  scrollToTop: false,
  components: { MainSectionIntro, PlayerCard, Interstitial },
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
  computed: {
    interstitials() {
      return this.$store.getters['content/interstitials']('draftResults')
    },
    cardExpanded () {
      return this.$store.getters['page/cardExpanded']
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth']
    },
    viewPosition () {
      return this.$store.getters['viewOptions/position']
    },
    draftResultsIds () {
      const itemCount = this.viewDepth === 'compact' ? 10 : 4;
      return this.showAll ? this.$store.getters['content/draftResults'](this.viewPosition) : this.$store.getters['content/draftResults'](this.viewPosition).slice(0,itemCount)
    },
  },
   methods: {
   ...mapActions({
      'setCardExpanded': 'page/setCardExpanded',
    }),
    handleScroll() {
      if(this.$refs.draftResults && window.scrollY > this.$refs.draftResults.offsetParent.offsetTop + this.$refs.draftResults.offsetTop - window.innerHeight) {
        this.showAll = true;
      }
    }
  },
  async asyncData({$axios, store, commit}) {
    let configuration = store.getters['page/configuration'];
    if(!configuration){
      configuration = await $axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/" + process.env.HEDDEK_PROJECT_ID + "/config." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=4",  {
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
      pageSettings = await $axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/" + process.env.HEDDEK_PROJECT_ID + "/page." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=4",  {
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
        content: this.configuration.facebook_page_share_title + 'Draft Results'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: this.configuration.facebook_page_share_description + 'Draft Results'
      }]
    }
  }
}
</script>

<style scoped lang="scss">
.draft-results{
   min-height:calc(100vh + 4px);
}
</style>
