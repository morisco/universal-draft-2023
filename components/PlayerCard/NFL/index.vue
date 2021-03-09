<template>
  <article class="player-card" :data-player="player.id_string" :class="{
    'player-card--offense': player.offenseDefense === 'offense', 
    'player-card--defense': player.offenseDefense === 'defense', 
    'player-card--expanded': expanded, 
    'player-card--expanding': expanding, 
    'player-card--collapsed': collapsed,
    'player-card--collapsing': collapsing,
    'player-card--animated': animateHeight,
    'player-card--loaded': maxHeight > 0,
    'player-card--active': activeCard,
    'player-card--all-cards-set': this.infoHeight
  }" 
  v-bind:style="
    [maxHeight] ? {
      maxHeight: maxHeight + 'px', 
      zIndex: zIndex
    } : { zIndex: zIndex }"
  v-on:click="openCard"
  ref="card">
    <MetaBar :player="player" :rankKey="rankKey" ref="metaBar" :collapsed="collapsed" v-if="$mq !== 'mobile'" />
    <div class="player-card__image-info">
      <ImageColumn 
        :playerId="playerId" 
        :expanded="expanded"
        :collapsed="collapsed" 
        :rank="rank"
        :infoHeight="infoHeight"
        :topHeight="topHeight"
        :rankKey="rankKey"
        :playVideo="playVideo"
        :setImageColHeight="setImageColHeight"
        :videoSettings="videoSettings"
        :activeCard="activeCard"
        v-on:resetVideoSettings="resetVideoSettings"
      />
      <InfoColumn 
        :playerId="playerId" 
        :expanded="expanded" 
        :collapsed="collapsed" 
        :rankKey="rankKey"
        :setMaxHeight="setMaxHeight"
        :setAnimateHeight="setAnimateHeight"
        :playVideo="playVideo"
        :activeCard="activeCard"
        v-on:set-info-height="setInfoHeight"
        v-on:set-top-height="setTopHeight"
        v-on:setMetaHeight="setMetaHeight"
      />
    </div>
      <ToggleCard 
        :offenseDefense="player.offenseDefense" 
        :expanded="expanded" 
        :cardExpanded="cardExpanded"
        v-on:toggle-card="toggleCard"
      />
    <VideoViewer :displayVideo="displayVideo" :closeVideo="closeVideo" :player="player" :playerVideo="playerVideo" :expanded="expanded" v-if="playerVideo" v-on:collapseVideo="collapseVideo" />
  </article>
</template>

<script>
import ImageColumn  from './ImageColumn'
import InfoColumn   from './InfoColumn/index.vue'
import MetaBar      from './MetaBar'
import VideoViewer  from './VideoViewer.vue'
import ToggleCard  from './ToggleCard.vue'
import { scrollIt } from '~/plugins/scroller'

export default {
  props: ['playerId', 'rankKey', 'cardExpanded', 'playerId'],
  components: { ImageColumn, InfoColumn, ToggleCard, MetaBar, VideoViewer },
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
      activeCard:           false,
      displayVideo:         false,
      imageHeight:          false,
      expanding:            false,
      collapsing:           false,
      heightCount:          0,
      videoSettings:        null,
      metaHeight:           null
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
    playerVideo() {
      return this.player.player_video && this.player.player_video.video_id ? this.player.player_video : false
    },
    viewPosition () {
      return this.$store.getters['viewOptions/position']
    },
    allCardsSet () {
      return this.$store.getters['content/allCardsSet']
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
    infoHeight() {
      this.heightCount++;
    }, 
    imageHeight() {
      this.heightCount++;
    },
    heightCount(){
      if(this.heightCount === 2){
        this.$store.commit('content/cardReady', this.$route);
      }
    },
    expanded() {
      const self = this;
      if(this.expanded){
        this.expanding = true;
        setTimeout(() => {
          self.expanding = false;
        }, 1000);
      } else {
        this.collapsing = true;
        setTimeout(() => {
          self.collapsing = false;
        }, 1000);
      }
    }, 
    allCardsSet() {
      const self = this;
      setTimeout(() => {

        if(self.allCardsSet){
          const featuredPlayer = self.$route.params.player_id === self.player.id_string;
          if(featuredPlayer){
            this.expanded = true;
            let scrollDestination = self.$refs.card.offsetParent.offsetTop + self.$refs.card.offsetTop - (self.$mq === 'mobile' ? 60 : self.collapsed ? 75 : 85);
            window.scrollTo(0, scrollDestination);
          }
        }
      }, 1000);
    },
    viewDepth (newDepth, oldDepth) {
      if(this.activeCard){
        const self = this;
        setTimeout(() => {
          let scrollDestination = self.$refs.card.offsetParent.offsetTop + self.$refs.card.offsetTop - (self.$mq === 'mobile' ? 60 : self.collapsed ? 75 : 85) - (this.$mq === 'mobile' ? 15 : 30);
          scrollIt(scrollDestination, 500, 'linear');
        }, this.$mq === 'mobile' ? 1250 : 750);
      }
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
    activeCard() {
      if(!this.activeCard){
        this.resetVideoSettings();
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.watchScroll, {passive: true});
    this.watchScroll();
  },
  methods: {
    setMetaHeight(height){
      this.metaHeight = height
    },
    playVideo() {
      this.displayVideo = true;
    },
    resetVideoSettings() {
      this.videoSettings = null;
    },
    closeVideo() {
      this.displayVideo = false;
    },
    collapseVideo(videoTime) {
      const starTime = videoTime ? videoTime : this.playerVideo.start;
      this.videoSettings = { start: videoTime }
    },
    setImageColHeight(height) {
      this.imageHeight = height;
    },
    watchScroll() {
      const cardOffset = this.$refs.card.offsetParent.offsetTop + this.$refs.card.offsetTop;
      const cardHeight = this.$refs.card.offsetHeight;
      const scrollTop = window.scrollY;
      const windowAdjustment = this.collapsed ? window.innerHeight/3 : window.innerHeight/4;
      const isActive = this.collapsed && !this.expanded ? 
        scrollTop >= cardOffset - ((window.innerHeight/3)) - ((cardHeight/2)) && scrollTop < cardOffset - (window.innerHeight/3) + ((cardHeight/2) * 1.25)
        : scrollTop > cardOffset - windowAdjustment && scrollTop < cardOffset + cardHeight + windowAdjustment 
      if(isActive){
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
          if(this.collapsed){
            scrollDestination = this.$refs.card.offsetParent.offsetTop + this.$refs.card.offsetTop + 185 - window.innerHeight - (this.$refs.card.offsetParent.offsetTop + this.$refs.card.offsetTop + this.$refs.card.offsetHeight - currentScroll - window.innerHeight);
          } else {
            scrollDestination = this.$refs.card.offsetParent.offsetTop + this.$refs.card.offsetTop + this.topHeight + 220 - window.innerHeight - (this.$refs.card.offsetParent.offsetTop + this.$refs.card.offsetTop + this.$refs.card.offsetHeight - currentScroll - window.innerHeight);
          }
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
      const heightToUse = this.expanded ? Math.max(this.imageHeight, maxHeight) : maxHeight;
      this.maxHeight = this.collapsed && !this.expanded ?
        this.$mq === 'mobile' ?
        this.metaHeight - 20
        :
        this.$refs.metaBar.$el.offsetHeight 
      : this.$mq === 'mobile' ? 
        maxHeight + 250 
      : heightToUse + this.$refs.metaBar.$el.offsetHeight;
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
  @import './nfl-card.scss'
</style>