<template>
<div class="player-card__video-thumb" ref="videoThumb" :class="{'player-card__video-thumb--playing' : mobilePlay}">
  <div class="player-card__video-thumb-title">Video: {{playerVideo.title}}</div>
  <div class="player-card__video-thumb-player-wrapper">
    <button class="player-card__video-thumb-player-poster" v-on:click="triggerVideo">
      <img :src="playerVideo.poster.xsmall" :alt="playerVideo.title + ' Poster'" />
      <img src="@/assets/img/icons/Triangle-play.svg" class="player-card__video-thumb-play-button" />
    </button>
    <VideoPlayer v-if="($mq === 'mobile' && expanded && videoWidth && activeCard) || (activeCard && collapsedVideoSettings)" :playerVideo="videoConfig" :triggerPlay="mobilePlay" :videoWidth="videoWidth" :closeVideo="closeVideo" />
  </div>
</div>  
</template>

<script>
import VideoPlayer from '~/components/Video/Player'
export default {
  data() {
    return { 
      mobilePlay: false,
      videoWidth: false,
      collapsedVideoSettings: false
    }
  },
  props: ['playVideo', 'expanded', 'activeCard', 'playerVideo', 'videoSettings'],
  components: { VideoPlayer },
  computed: {
    videoConfig() {
      return {...this.playerVideo, ...this.videoSettings} 
    },
    viewCollapsed() {
      return this.$store.getters['viewOptions/viewCollapsed'];
    }
  },
  mounted() {
    this.videoWidth = this.$refs.videoThumb.offsetWidth
  },
  methods: {
    triggerVideo() {
      if(this.$mq === 'mobile'){
        this.mobilePlay = true;
      } else {
        if(this.viewCollapsed){
          this.mobilePlay = true;
          this.collapsedVideoSettings = this.playerVideo
        } else {
          this.playVideo();
        }
      }
    },
    closeVideo() {
      this.mobilePlay = false;
      this.$emit('resetVideoSettings');
    },
  },
  watch: {
    expanded() {
      this.mobilePlay = false;
    },
    activeCard() {
      if(!this.activeCard){
        this.mobilePlay = false;
        this.collapsedVideoSettings = false;
      }
    },
    videoSettings() {
      if(this.videoSettings){
        this.mobilePlay = true;
        this.collapsedVideoSettings = this.videoSettings
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.player-card{
  &__video-thumb{
    margin-bottom:20px;
    &-title{
      @include expanded-label;
      text-transform:uppercase;
      letter-spacing:-0.133px;
      margin-bottom:12px;
    }
    &-player-wrapper{
      position:relative;
      width:100%;
      padding-top:56.25%;
    }
    &-player-poster{
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      background:$mediumgray;
      width:100%;
      z-index:1;
      opacity:1;
      transition:opacity 0.25s linear, z-index 0s linear 0s;
      img:not(.player-card__video-thumb-play-button){
        width:100%;
        height:100%;
        object-fit:cover;
        opacity:0;
        transition:opacity 0.25s linear;
        &.isLoaded{
          opacity:1;
        }
      }
    }
    &-play-button{
      width:50px;
      position:absolute;
      top:50%;
      left:50%;
      z-index:2;
      transform:translate(-50%,-50%);
    }
    &--playing{
      .player-card__video-thumb-player-poster{
        transition:opacity 0.25s linear, z-index 0s linear 0.25s;
        opacity:0;
        z-index:-1;
      }
    }
  }
}
</style>