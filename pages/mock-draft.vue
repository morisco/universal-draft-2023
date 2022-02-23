<template>
  <section
    ref="mockDraft"
    class="main-section mock-draft"
  >
    <MainSectionIntro type="mock_draft" />
    <TransitionGroup
      class="mock-draft__inner main-section__inner"
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <PlayerCard 
        v-for="(card, index) in idsToDisplay"
        :key="card.id + '-' + index" 
        :player-id="card.id" 
        rank-key="order_mockdraft" 
        :card-expanded="cardExpanded" 
        :index="index" 
        list="mockDraft"
        @card-expanded="setCardExpanded"
      />
    </TransitionGroup>
    <MoreCoverage
      v-if="showAll"
      :articles="relatedArticles"
    />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import MoreCoverage from '~/components/MoreCoverage'
import PlayerCard from '~/components/PlayerCard'
import MainSectionIntro from '~/components/MainSectionIntro'
import asyncDataProcessor from '~/plugins/asyncDataProcessor';
import headeBuilder from '~/plugins/headBuilder';
import { scrollIt } from '~/plugins/scroller'
import gsap from 'gsap/all';
export default {
  name: 'MockDraft',
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
    relatedArticles () {
      return this.$store.getters['content/relatedArticles'];
    },
    mockDraftIds () {
      const itemCount = this.viewDepth === 'compact' ? 10 : 4;
      return this.showAll ? this.$store.getters['content/mockDraft'](this.viewPosition, this.viewStrength) : this.$store.getters['content/mockDraft'](this.viewPosition, this.viewStrength).slice(0,itemCount)
    },
    viewStrength() {
      return this.$store.getters['viewOptions/strength']
    },
  },
  watch: {
    pageSettings() {
      if(!this.pageSettings.enable_mock) {
        this.$router.push({
          path: '/'
        })
      }
    },
    viewStrength () {
      var offset = this.$mq === 'mobile' ? document.getElementById('mobile-navigation').offsetTop + 4 : this.$refs.mockDraft.offsetParent.offsetTop + this.$refs.mockDraft.offsetTop - 120
      scrollIt(offset, 500, 'easeOutQuad')
      if(this.interstitials && this.mockDraftIds){
        this.makeData();
      }
    },
    viewPosition () {
      // var offset = this.$mq === 'mobile' ? document.getElementById('mobile-navigation').offsetTop + 4 : document.getElementById('navigation').offsetTop + 4
      // scrollIt(offset, 500, 'easeOutQuad')
      if(this.interstitials && this.mockDraftIds){
        this.makeData();
      }
    },
    mockDraftIds() {
      if(this.interstitials){
        this.makeData();
      }
    },
    interstitials() {
      if(this.mockDraftIds){
        this.makeData();
      }
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
  mounted() {
    if(!this.pageSettings.enable_mock) {
      this.$router.push({
        path: '/'
      })
    }
    if(this.mockDraftIds && this.interstitials){
      this.makeData();
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
      if(this.$refs.mockDraft) {
        if(window.scrollY > this.$refs.mockDraft.offsetParent.offsetTop + this.$refs.mockDraft.offsetTop - window.innerHeight) {
          this.showAll = true;
        }
      }
    },
    makeData () {
      let dataObj = [];
      this.mockDraftIds.forEach((playerId, index) => {
        dataObj.push({type:'player', id: playerId});
      })
      this.idsToDisplay = [...dataObj];
    }
  },
}
</script>

<style scoped lang="scss">
.mock-draft{
   min-height:calc(100vh + 4px);
}
</style>
