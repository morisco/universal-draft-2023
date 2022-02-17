<template>
  <article v-if="player" class="player-card" :data-player="player.id_string" :class="{
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
import ImageColumn  from './ImageColumn.vue'
import InfoColumn   from './InfoColumn.vue'
import MetaBar      from './MetaBar.vue'
import VideoViewer  from './VideoViewer.vue'
import ToggleCard  from './ToggleCard.vue'
import { scrollIt } from '~/plugins/scroller'

export default {
  name: 'NBAPlayerCard',
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
      if(this.$refs.card) {
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
      const heightToUse = this.expanded ? Math.max(this.topHeight, maxHeight) : maxHeight;
      if(this.collapsed && !this.expanded) {
        if(this.$mq === 'mobile'){
          this.maxHeight = this.metaHeight
        } else {
          this.maxHeight = this.$refs.metaBar.$el.offsetHeight
        }
      } else {
        if(this.$mq === 'mobile'){
          this.maxHeight = maxHeight + 265
        } else {
          this.maxHeight = heightToUse + this.$refs.metaBar.$el.offsetHeight;
        }
      }
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

<style lang="scss" scoped>
  .player-card{
    position:relative;
    display:flex;
    flex-direction:column;
    background-color:$cardback;
    border-radius: .625rem;
    margin-bottom:45px;
    overflow-x:visible;
    opacity:0;
    transition:all 0.25s linear, max-height 0.375s ease-in-out, margin-bottom 0.25s linear 0.125s, opacity 0.25s linear;
    &--all-cards-set{
      opacity:1;
    }
    
    // @include single-column{
    //   margin-bottom:15px;
    // }
    @include mobile{
      border:0px;
      margin-bottom:55px;
      border-radius: 0;
      background-color:transparent;
      margin: 0 auto 45px;    
      transition:all 0.25s linear, max-height 0.375s ease-in-out 0.25s, margin-bottom 0.25s linear 0.25s, opacity 0.25s linear, background-color 0.25s linear;
      &--collapsed:not(.player-card--expanded) {
        max-width:100%;
      }
      &--expanded{
        background-color:$cardback;
        
      }
    }
    &__image-info{
      position:relative;
      display:flex;
      overflow:hidden;
      padding-bottom:0;
      transition:padding-bottom 0s linear 0.25s;
      .player-card--expanded &{
        padding-bottom:40px;
      }
      @include mobile {
        padding: 15px 50px 0;
        flex-direction:column;
        .player-card--collapsed:not(.player-card--expanded) & {
          padding:0 30px;
        }
        .player-card--expanded & {
          transition:padding 0.5s ease-in-out 0s;
          padding: 15px 50px 0;
        }
      }
      &:after{
          content:'';
          display:block;
          position:absolute;
          left:300px;
          top:20px;
          bottom:20px;
          width:1px;
          background:$darkmediumgray;
          opacity:1;
          display:none;
          transition:opacity 0.25s linear 0.25s, bottom 0.25s linear 0.25s;
          .player-card--expanded & {
            opacity:1;
            bottom:20px;
          }
          @include mobile{
            display:none;
          }
        }
    }
    .app__content--collapsed & {
      margin-bottom:15px;
      &.player-card--expanded{
        margin-bottom:30px;
      }
      @include mobile {
        margin-bottom:20px;
      }
    }
    
    &--animated{
      transition:max-height 0.375s ease-in-out, margin-bottom 0.25s linear 0.125s, opacity 0.25s linear;
      @include mobile{
        transition:max-height 0.5s linear, margin-bottom 0.25s linear 0.125s, opacity 0.25s linear;
        &.player-card--expanded {
          transition:max-height 0.5s linear, margin-bottom 0.25s linear 0.125s, opacity 0.25s linear;
        }
      }
    }
    &--transitioning{
      transition:max-height 0.5s ease-in-out 0.25s, margin-bottom 0.25s linear 0.125s, opacity 0.25s linear;
    }
    &-enter{
      max-height:0 !important;
      opacity:0;
      margin-bottom:0;
    }
    &-enter-to{
      opacity:1;
      margin-bottom:45px;
      
      max-height:336px !important;
      &.player-card--expanded {
        max-height:1000px !important; 
      }
      &.player-card--collapsed{
        max-height:81px !important;
        margin-bottom:15px;
      }
      transition:opacity 0.25s linear 0.5s, max-height 0.35s linear 0s, margin-bottom 0.25s linear 0s;
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
      transition:opacity 0.25s linear, max-height 0.35s ease-in 0.125s, margin-bottom 0.35s ease-in 0s;
    }
  }
</style>