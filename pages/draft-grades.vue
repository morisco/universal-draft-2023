<template>
  <section class="main-section draft-grades" ref="draftResults">
    <MainSectionIntro type="draft_grades" />
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
    <MoreCoverage :articles="relatedArticles" v-if="showAll" />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import PlayerCard from '~/components/PlayerCard'
import MainSectionIntro from '~/components/MainSectionIntro'
import Interstitial from '~/components/Interstitial';
import asyncDataProcessor from '~/plugins/asyncDataProcessor';
import headeBuilder from '~/plugins/headBuilder';
import MoreCoverage from '~/components/MoreCoverage'


export default {
  name: 'DraftResults',
  transition: {
    name:"main-section",
    mode:"out-in",
  },
  scrollToTop: false,
  components: { MainSectionIntro, PlayerCard, Interstitial, MoreCoverage },
  data() {
    return {
      initTimeout: null,
      showAll: this.$route.params.player_id ? true : false
    }
  },
  mounted() {
    if(!this.pageSettings.enable_results) {
      this.$router.push({
        path: '/'
      })
    }
  },
  created() {
    if(process.client){
      window.addEventListener('scroll', this.handleScroll, {passive: true});
    }
  },
  destroyed() {
    if(process.client){
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  computed: {
    pageSettings () {
      return this.$store.getters['page/settings'] || {}
    },
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
    relatedArticles () {
      return this.$store.getters['content/relatedArticles'];
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
  watch: {
    pageSettings() {
      if(!this.pageSettings.enable_results) {
        this.$router.push({
          path: '/'
        })
      }
    }
  },
  asyncData({$axios, store, route}) {
    return asyncDataProcessor({$axios, store, route});
  },
  head()  {
    return headeBuilder(this);
  }
}
</script>

<style scoped lang="scss">
.draft-grades{
   min-height:calc(100vh + 4px);
}
</style>
