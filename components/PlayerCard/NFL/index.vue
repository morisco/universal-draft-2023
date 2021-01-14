<template>
  <article class="player-card" :class="{
    'player-card--offense': player.offenseDefense === 'offense', 
    'player-card--defense': player.offenseDefense === 'defense', 
    'player-card--expanded': expanded, 
    'player-card--collapsed': collapsed,
    'player-card--transitioning': transitioning,
    'player-card--animated': animateHeight,
    'player-card--loaded': maxHeight > 0,
    'player-card--active': activeCard
  }" 
  v-bind:style="
    [maxHeight] ? {
      maxHeight: maxHeight + 'px', 
      zIndex: zIndex
    } : { zIndex: zIndex }"
  v-on:click="openCard"
  ref="card">
    <MetaBar :player="player" :rankKey="rankKey" ref="metaBar" v-if="$mq !== 'mobile'" />
    <div class="player-card__image-info">
      <ImageColumn 
        :playerId="playerId" 
        :collapsed="collapsed" 
        :rank="rank"
        :infoHeight="infoHeight"
        :topHeight="topHeight"
        :rankKey="rankKey"
        ref="imageColumn"
      />
      <InfoColumn 
        :playerId="playerId" 
        :expanded="expanded" 
        :collapsed="collapsed" 
        :setMaxHeight="setMaxHeight"
        :setAnimateHeight="setAnimateHeight"
        v-on:set-info-height="setInfoHeight"
        v-on:set-top-height="setTopHeight"
      />
      <ToggleCard 
        :offenseDefense="player.offenseDefense" 
        :expanded="expanded" 
        :cardExpanded="cardExpanded"
        v-on:toggle-card="toggleCard"
      />
    </div>
  </article>
</template>

<script>
import ImageColumn  from './ImageColumn.vue'
import InfoColumn   from './InfoColumn.vue'
import MetaBar      from './MetaBar.vue'
import ToggleCard   from './ToggleCard.vue'
import { scrollIt } from '~/plugins/scroller'

export default {
  props: ['playerId', 'rankKey', 'cardExpanded', 'playerId'],
  components: { ImageColumn, InfoColumn, ToggleCard, MetaBar },
  data() {
    return {
      openTimeout:          null,
      expanded:             false,
      collapsed:            false,
      transitioning:        false,
      maxHeight:            null,
      topHeight:            null,
      infoHeight:           null,
      scrollTimeout:        null,
      transitioningTimeout: null,
      animateHeight:        false,
      activeCard:           false
    }
  },
  created () {
    this.expanded   = this.viewDepth === 'detailed'
    this.collapsed  = this.viewDepth === 'compact'
  },
  computed: {
    rank () {
      return this.player && this.player[this.rankKey]
    },
    player () {
      return this.$store.getters['content/player'](this.playerId)
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth']
    },
    viewPosition () {
      return this.$store.getters['viewOptions/position']
    },
    zIndex () {
      switch(this.$route.path){
        case '/':
          return 200 - this.rank;
        case '/mock-draft':
          return 200 - this.rank;
        default:
          return 200 - this.rank;
      }
    },
  },
  destroyed() {
    window.clearTimeout(this.transitioningTimeout);
    window.clearTimeout(this.openTimeout);
    window.clearTimeout(this.scrollTimeout);
    window.removeEventListener('scroll', this.watchScroll);
  },
  watch: {
    viewDepth (newDepth, oldDepth) {
      if(oldDepth === 'compact' || newDepth === 'compact'){
        const self = this;
        this.transitioning = true;
        this.transitioningTimeout = setTimeout(() => {
          self.transitioning = false;
        }, 1000);
      }
      if(newDepth === 'detailed'){
        this.expanded = true;
        this.collapsed = false;
      } else {
        if(newDepth === 'compact'){
          this.collapsed = true;
        } else {
          this.collapsed = false;
        }
        this.expanded = false;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.watchScroll);
    this.watchScroll();
  },
  methods: {
    watchScroll() {
      const cardOffset = this.$refs.card.offsetParent.offsetTop + this.$refs.card.offsetTop;
      const cardHeight = this.$refs.card.offsetHeight;
      const scrollTop = window.scrollY;
      const windowAdjustment = window.innerHeight/4;
      if(scrollTop > cardOffset - windowAdjustment && scrollTop < cardOffset + cardHeight + windowAdjustment ){
        this.activeCard = true;
      } else {
        this.activeCard = false;
      }
    },
    cardAction (cb) {
      this.$emit('card-expanded');
      var self = this;
      this.openTimeout = setTimeout(() => {
        let scrollDestination = this.$refs.card.offsetParent.offsetTop + this.$refs.card.offsetTop - (this.$mq === 'mobile' ? 60 : this.collapsed ? 75 : 85);
        
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const difference = Math.abs(scrollDestination - currentScroll);
        const maxTime = this.$mq === 'mobile' ? 375 : 875;
        let timing = Math.min(maxTime, Math.max(300, Math.round((difference/windowHeight) * maxTime)));
        let easing = this.expanded ? 'linear' : 'easeOutCubic';
        
        if(this.$mq === 'mobile' && this.expanded){
          scrollDestination = this.$refs.card.offsetParent.offsetTop + this.$refs.card.offsetTop + this.topHeight+ 220 - window.innerHeight - (this.$refs.card.offsetParent.offsetTop + this.$refs.card.offsetTop + this.$refs.card.offsetHeight - currentScroll - window.innerHeight);
          timing = 500;
          easing = 'linear';
          cb();
          // setTimeout(( )=> {
            scrollIt(scrollDestination, timing, easing);
          // }, 125);

        } else if(this.$mq !== 'mobile' || this.expanded || currentScroll < scrollDestination){
          scrollIt(scrollDestination, timing, easing, cb);
        } else {
          cb();
        }
      }, this.expanded ? 0 : 0);
      if(this.viewDepth === 'compact'){
        this.transitioning = true;
        setTimeout(() => {
          self.transitioning = false;
        }, 1000);
      }
    },
    setInfoHeight (height) {
      this.infoHeight = height;
    },
    setAnimateHeight() {
      this.animateHeight = true;
    },
    setTopHeight(topHeight) {
      this.topHeight = topHeight;
    },
    toggleCard (event) {
      event.stopPropagation();
      const self = this;
      this.cardAction(() => {
        self.expanded = !self.expanded
      });
    },
    setMaxHeight (maxHeight) {
      this.maxHeight = this.$mq === 'mobile' ? maxHeight + 250 : maxHeight + this.$refs.metaBar.offsetHeight;
    },
    openCard () {
      if(!this.expanded){
        const self = this
        this.cardAction(() => {
          self.expanded = true
        });
      }
    }
  }
}
</script>

<style lang="scss">
  .player-card{
    position:relative;
    display:flex;
    flex-direction:column;
    background:$lightgray;
    border-radius: .625rem;
    border: .00875rem solid $mediumgray;
    margin-bottom:30px;
    overflow-x:visible;
    
    
    @include single-column{
      margin-bottom:15px;
    }
    @include mobile{
      border:0px;
      margin-bottom:45px;
      border-radius: 0 0 .625rem .625rem;

    }
    &__image-info{
      position:relative;
      display:flex;
      @include mobile {
        flex-direction:column;
      }
    }
    .app__content--collapsed & {
      margin-bottom:15px;
    }
    &--animated{
      transition:max-height 0.375s ease-in-out, margin-bottom 0.25s linear 0.125s;
      @include mobile{
        transition:max-height 0.5s linear, margin-bottom 0.25s linear 0.125s;
      }
    }
    &--transitioning{
      transition:max-height 0.5s ease-in-out 0.125s, margin-bottom 0.25s linear 0.125s;
    }
    &-enter{
      max-height:0 !important;
      opacity:0;
      margin-bottom:0;
    }
    &-enter-to{
      opacity:1;
      margin-bottom:30px;
      &.player-card--collapsed{
        margin-bottom:15px;
      }
    }
    &-leave{
      opacity:1;
      margin-bottom:30px;
      &.player-card--collapsed{
        margin-bottom:15px;
      }
    }
    &-leave-to{
      max-height:0 !important;
      opacity:0;
      margin-bottom:0;
    }
    &-leave-active{
      transition:opacity 0.25s linear, max-height 0.35s ease-in 0.125s, margin-bottom 0.35s ease-in 0.125s;
    }
    &-enter-active{
      transition:opacity 0.25s linear 0.35s, max-height 0.35s linear, margin-bottom 0.35s ease-in-out;
    }
  }
</style>