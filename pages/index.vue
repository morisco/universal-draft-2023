<template>
  <section class="main-section big-board" ref="bigBoard">
    <MainSectionIntro type="big_board" />
    <transition-group name="player-card" class="big-board__inner main-section__inner" tag="div">
      <template v-for="(playerId, index) in bigBoardIds">
        <PlayerCard 
          :playerId="playerId" 
          :key="playerId" 
          rankKey="order" 
          v-on:card-expanded="setCardExpanded" 
          :cardExpanded="cardExpanded" 
        />
        <Interstitial 
          v-if="interstitials[index+1] && viewPosition === 'all'" 
          :key="'interstitial-' + (index+1)" 
          :list="'bigBoard'" 
          :interKey="index+1" 
        />
      </template>
    </transition-group>
    <MoreCoverage :articles="relatedArticles" v-if="showAll" />
  </section>
</template>

<script>
import MoreCoverage from '~/components/MoreCoverage';
import PlayerCard from '~/components/PlayerCard';
import Interstitial from '~/components/Interstitial';
import MainSectionIntro from '~/components/MainSectionIntro';
import { mapActions } from 'vuex'
import asyncDataProcessor from '~/plugins/asyncDataProcessor';
import headeBuilder from '~/plugins/headBuilder';
export default {
  name: 'BigBoard',
  components: { MainSectionIntro, PlayerCard, MoreCoverage, Interstitial },
  transition: {
    name:"main-section",
    mode:"out-in",
  },
  scrollToTop: false,
  data() {
    return {
      initTimeout: null,
      scrollDelay: null,
      showAll: this.$route.params.player_id ? true : false
    }
  },
  created() {
    if(process.client){
      this.scrollDelay = setTimeout(() => {
        window.addEventListener('scroll', this.handleScroll, {passive: true});
      }, 1000);
    }
  },
  destroyed() {
    if(process.client){
      clearTimeout(this.scrollDelay);
      window.removeEventListener('scroll', this.handleScroll, {passive: true});
    }
  },
  computed: {
    interstitials() {
      return this.$store.getters['content/interstitials']('bigBoard')
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth']
    },
    viewPosition () {
      return this.$store.getters['viewOptions/position']
    },
    cardExpanded () {
      return this.$store.getters['page/cardExpanded']
    },
    relatedArticles () {
      return this.$store.getters['content/relatedArticles'];
    },
    bigBoardIds () {
      const itemCount = this.viewDepth === 'compact' ? 10 : 4;
      return this.showAll ? this.$store.getters['content/bigBoard'](this.viewPosition) : this.$store.getters['content/bigBoard'](this.viewPosition).slice(0,itemCount)
    }
  },
  methods: {
   ...mapActions({
      'setCardExpanded': 'page/setCardExpanded',
    }),
    handleScroll() {
      if(this.bigBoardIds && window.scrollY > this.$refs.bigBoard.offsetParent.offsetTop + this.$refs.bigBoard.offsetTop - window.innerHeight) {
        this.showAll = true;
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
.big-board{
  min-height:calc(100vh + 4px);
}
</style>
