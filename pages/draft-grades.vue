<template>
  <section
    ref="draftResults"
    class="main-section draft-grades"
  >
    <MainSectionIntro type="draft_grades" />
    <transition-group
      class="draft-results__inner main-section__inner"
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <PlayerCard 
        v-for="(card, index) in idsToDisplay"
        :key="card.id + '-' + index" 
        :player-id="card.id" 
        rank-key="order_draftresults" 
        :card-expanded="cardExpanded" 
        :index="index" 
        list="draftResults"
        @card-expanded="setCardExpanded"
      />
    </transition-group>
    <MoreCoverage
      v-if="showAll"
      :articles="relatedArticles"
    />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import PlayerCard from '~/components/PlayerCard'
import MainSectionIntro from '~/components/MainSectionIntro'
import asyncDataProcessor from '~/plugins/asyncDataProcessor';
import headeBuilder from '~/plugins/headBuilder';
import MoreCoverage from '~/components/MoreCoverage'
import { scrollIt } from '~/plugins/scroller'
import gsap from 'gsap';

export default {
  name: 'DraftResults',
  components: { MainSectionIntro, PlayerCard, MoreCoverage },
  scrollToTop: false,
  transition: {
    name:"main-section",
    mode:"out-in",
  },
  asyncData({$axios, store, route}) {
    return asyncDataProcessor({$axios, store, route});
  },
  data() {
    return {
      initTimeout: null,
      showAll: this.$route.params.player_id ? true : false,
      idsToDisplay: [],
    }
  },
  head()  {
    return headeBuilder(this);
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
    viewStrength() {
      return this.$store.getters['viewOptions/strength']
    },
    viewPosition () {
      return this.$store.getters['viewOptions/position']
    },
    draftResultsIds () {
      const itemCount = this.viewDepth === 'compact' ? 10 : 4;
      return this.showAll ? this.$store.getters['content/draftResults'](this.viewPosition, this.viewStrength) : this.$store.getters['content/draftResults'](this.viewPosition, this.viewStrength).slice(0,itemCount)
    },
    relatedArticles () {
      return this.$store.getters['content/relatedArticles'];
    },
  },
  watch: {
    pageSettings() {
      if(!this.pageSettings.enable_results) {
        this.$router.push({
          path: '/'
        })
      }
    },
    viewStrength () {
      var offset = this.$mq === 'mobile' ? document.getElementById('mobile-navigation').offsetTop + 4 : this.$refs.draftResults.offsetParent.offsetTop + this.$refs.draftResults.offsetTop - 120
      scrollIt(offset, 500, 'easeOutQuad')
      if(this.interstitials && this.draftResultsIds){
        this.makeData();
      }
    },
    viewPosition () {
      // var offset = this.$mq === 'mobile' ? document.getElementById('mobile-navigation').offsetTop + 4 : document.getElementById('navigation').offsetTop + 4
      // scrollIt(offset, 500, 'easeOutQuad')
      if(this.interstitials && this.draftResultsIds){
        this.makeData();
      }
    },
    draftResultsIds() {
      if(this.interstitials){
        this.makeData();
      }
    },
    interstitials() {
      if(this.draftResultsIds){
        this.makeData();
      }
    }
  },
  mounted() {
    if(!this.pageSettings.enable_results) {
      this.$router.push({
        path: '/'
      })
    }
    if(this.draftResultsIds && this.interstitials){
      this.makeData();
    }
  },
  created() {
    if(process.client){
      window.addEventListener('scroll', this.handleScroll, {passive: true});
    }
  },
  unmounted() {
    if(process.client){
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  methods: {
   ...mapActions({
      'setCardExpanded': 'page/setCardExpanded',
    }),
    onBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    onEnter(el, done) {
      el.style.height = 'auto';
      gsap.to(el, {
        opacity: 1,
        delay: 0.5,
        onComplete: done
      })
    },
    onLeave(el, done) {
      gsap.to(el, {
        opacity: 0,
        onComplete: () => {
          done();
          el.style.height = 0;
        }
      })
    },
    handleScroll() {
      if(this.$refs.draftResults && this.$refs.draftResults.offsetParent && this.$refs.draftResults.offsetParent && window.scrollY > this.$refs.draftResults.offsetParent.offsetTop + this.$refs.draftResults.offsetTop - window.innerHeight) {
        this.showAll = true;
      }
    },
    makeData () {
      let dataObj = [];
      this.draftResultsIds.forEach((playerId, index) => {
        dataObj.push({type:'player', id: playerId});
      })
      this.idsToDisplay = [...dataObj];
    }
  },
}
</script>

<style scoped lang="scss">
.draft-grades{
   min-height:calc(100vh + 4px);
}
</style>
