<template>
  <section class="main-section mock-draft" ref="mockDraft">
    <MainSectionIntro type="mock_draft" />
    <transition-group name="player-card" class="mock-draft__inner" tag="div">
      <template v-for="(playerId, index) in mockDraftIds">
        <PlayerCard 
          :playerId="playerId" 
          :key="playerId" 
          rankKey="order_mockdraft" 
          v-on:card-expanded="setCardExpanded" 
          :cardExpanded="cardExpanded" 
        />
        <Interstitial 
          v-if="interstitials[index+1]" 
          :key="'interstitial-' + (index+1)" 
          :list="'mockDraft'" 
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
import asyncDataProcessor from '~/plugins/asyncDataProcessor';
import headeBuilder from '~/plugins/headBuilder';
export default {
  name: 'MockDraft',
  transition: {
    name:"main-section",
    mode:"out-in",
  },
  scrollToTop: false,
  components: { MainSectionIntro, PlayerCard, Interstitial },
  data() {
    return {
      initTimeout: null,
      showAll: this.$route.params.player_id ? true : false
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
    interstitials() {
      return this.$store.getters['content/interstitials']('mockDraft')
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
  asyncData({$axios, store, route}) {
    return asyncDataProcessor({$axios, store, route});
  },
  head()  {
    return headeBuilder(this);
  }
}
</script>

<style scoped lang="scss">
.mock-draft{
   min-height:calc(100vh + 4px);
}
</style>
