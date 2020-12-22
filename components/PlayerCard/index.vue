<template>
  <article class="player-card" :class="{
    'player-card--offense': player.offenseDefense === 'offense', 
    'player-card--defense': player.offenseDefense === 'defense', 
    'player-card--open': expanded, 
    'player-card--collapsed': collapsed && !expanded,
    'player-card--transitioning': transitioning
  }" 
  v-bind:style="
    [maxHeight] ? {
      maxHeight: maxHeight + 'px', zIndex: zIndex
    } : { zIndex: zIndex }"
  v-on:click="openCard"
  ref="card">
    <ImageColumn 
      :playerId="playerId" 
      :collapsed="collapsed" 
      :rank="rank"
      :infoHeight="infoHeight"
      :rankKey="rankKey"
      ref="imageColumn"
    />
    <InfoColumn 
      :playerId="playerId" 
      :expanded="expanded" 
      :collapsed="collapsed" 
      :setMaxHeight="setMaxHeight" 
      v-on:set-info-height="setInfoHeight"
    />
    <ToggleCard 
      :offenseDefense="player.offenseDefense" 
      :expanded="expanded" 
      :cardExpanded="cardExpanded"
      v-on:toggle-card="toggleCard"
    />
  </article>
</template>

<script>
import ImageColumn from './ImageColumn.vue'
import InfoColumn from './InfoColumn.vue'
import ToggleCard from './ToggleCard.vue'
import { scrollIt } from '~/plugins/scroller'

export default {
  props: ['playerId', 'rankKey', 'cardExpanded'],
  components: { ImageColumn, InfoColumn, ToggleCard },
  data() {
    return {
      openTimeout:    null,
      expanded:       false,
      collapsed:      false,
      transitioning:  false,
      maxHeight:      null,
      scrollTimeout:        null,
      transitioningTimeout: null,
      infoHeight: null
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
  methods: {
    cardAction (cb) {
      this.$emit('card-expanded');
      var self = this;
      this.openTimeout = setTimeout(() => {
        const scrollDestination = this.$refs.card.offsetParent.offsetTop + this.$refs.card.offsetTop - (this.collapsed ? 75 : 85);
        const currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const difference = Math.abs(scrollDestination - currentScroll);
        const maxTime = this.$mq === 'mobile' ? 375 : 875;
        const timing = Math.min(maxTime, Math.max(300, Math.round((difference/windowHeight) * maxTime)));
        const easing = this.expanded ? 'linear' : 'easeOutCubic';
        console.log('right here');
        console.log(this.$mq);
        if(this.$mq !== 'mobile' || this.expanded){
          console.log('here');
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
    toggleCard (event) {
      event.stopPropagation();
      const self = this;
      this.cardAction(() => {
        self.expanded = !self.expanded
      });
    },
    setMaxHeight (maxHeight) {
      this.maxHeight = this.$mq === 'mobile' ? maxHeight + 220 : maxHeight;
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
    background:$lightgray;
    border-radius: .625rem;
    border: .00875rem solid $mediumgray;
    margin-bottom:30px;
    overflow-x:visible;
    transition:max-height 0.5s ease-in-out, margin-bottom 0.25s linear 0.125s;
    @include single-column{
      margin-bottom:15px;
    }
    @include mobile {
      flex-direction:column;
    }
    &.player-card--collapsed{
        margin-bottom:15px;
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