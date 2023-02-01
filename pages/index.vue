<template>
  <section
    ref="bigBoard"
    class="main-section big-board"
  >
    <MainSectionIntro type="big_board" />
    <TransitionGroup
      class="big-board__inner main-section__inner"
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <PlayerCard 
        v-for="(card, index) in idsToDisplay"
        :key="card.id + '-' + index" 
        :player-id="card.id" 
        rank-key="order" 
        :card-expanded="cardExpanded" 
        :index="index" 
        list="bigBoard"
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
import MoreCoverage from '~/components/MoreCoverage';
import PlayerCard from '~/components/PlayerCard';
import MainSectionIntro from '~/components/MainSectionIntro';
import { mapActions } from 'vuex'
import asyncDataProcessor from '~/plugins/asyncDataProcessor';
import headeBuilder from '~/plugins/headBuilder';
import { scrollIt } from '~/plugins/scroller'
import gsap from 'gsap';
import PositionMap from '~/plugins/positionMap';

export default {
  name: 'BigBoard',
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
    console.log(this.$route.params);
    return {
      initTimeout: null,
      scrollDelay: null,
      showAll: this.$route.params.player_id ? true : false,
      idsToDisplay: []
    }
  },
  head()  {
    return headeBuilder(this);
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
    viewStrength() {
      return this.$store.getters['viewOptions/strength']
    },
    cardExpanded () {
      return this.$store.getters['page/cardExpanded']
    },
    relatedArticles () {
      return this.$store.getters['content/relatedArticles'];
    },
    bigBoardIds () {
      const itemCount = this.viewDepth === 'compact' ? 10 : 4;
      return this.showAll ? this.$store.getters['content/bigBoard'](this.viewPosition, this.viewStrength) : this.$store.getters['content/bigBoard'](this.viewPosition, this.viewStrength).slice(0,itemCount)
    },
  },
  watch: {
    viewStrength () {
      var offset = this.$mq === 'mobile' ? document.getElementById('mobile-navigation').offsetTop + 4 : this.$refs.bigBoard.offsetParent.offsetTop + this.$refs.bigBoard.offsetTop - 120
      scrollIt(offset, 500, 'easeOutQuad')
      if(this.interstitials && this.bigBoardIds){
        this.makeData();
      }
    },
    viewPosition () {
      // var offset = this.$mq === 'mobile' ? document.getElementById('mobile-navigation').offsetTop + 4 : document.getElementById('navigation').offsetTop + 4
      // scrollIt(offset, 500, 'easeOutQuad')
      if(this.interstitials && this.bigBoardIds){
        this.makeData();
      }
    },
    bigBoardIds() {
      if(this.interstitials){
        this.makeData();
      }
    },
    interstitials() {
      if(this.bigBoardIds){
        this.makeData();
      }
    }
  },
  created() {
    if(process.client){
      this.scrollDelay = setTimeout(() => {
        window.addEventListener('scroll', this.handleScroll, {passive: true});
      }, 1000);
    }
  },
  unmounted() {
    if(process.client){
      clearTimeout(this.scrollDelay);
      window.removeEventListener('scroll', this.handleScroll, {passive: true});
    }
  },
  mounted() {
    this.makeData();
    if(PositionMap.map(pm => pm.positionKey).includes(this.$route.query.position)){
      this.setViewPosition(this.$route.query.position);
    }
  },
  methods: {
   ...mapActions({
      'setCardExpanded': 'page/setCardExpanded',
      'setViewPosition': 'viewOptions/setViewPosition',
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
      if(this.$refs.bigBoard && this.$refs.bigBoard.offsetParent) {
        if(this.bigBoardIds && window.scrollY > this.$refs.bigBoard.offsetParent.offsetTop + this.$refs.bigBoard.offsetTop - window.innerHeight) {
          this.showAll = true;
        }
      }
    },
     makeData () {
      let dataObj = [];
      this.bigBoardIds.forEach((playerId, index) => {
        dataObj.push({type:'player', id: playerId});
      })
      this.idsToDisplay = [...dataObj];
    }
  },
}
</script>

<style scoped lang="scss">
.big-board{
  min-height:calc(100vh + 4px);
}
</style>
