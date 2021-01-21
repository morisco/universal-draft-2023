<template>
  <div class="video-player" :class="{'video-player--ready': ready}" >
    <youtube :video-id="videoId" :width="videoWidth" :height="videoHeight" :player-vars="playerVars"  ref="youtube" @playing="playing" @ready="videoReady" @ended="videoEnded" v-if="playerVars"></youtube>
    <LoadingSpinner :loaded="loaded" />    
  </div>
</template>

<script>
import LoadingSpinner from '~/components/LoadingSpinner'
export default {
  components: {LoadingSpinner},
  props: ['videoWidth', 'closeVideo', 'triggerPlay', 'playerVideo', 'trackTime'],
  data() {
    return {
      videoHeight: false,
      ready: false,
      loaded: false,
      timeUpdateInterval: false,
      isPlaying: false
    }
  },
  mounted() {
    console.log('mounted video', this.playerVideo);
  },
  methods: {
    playVideo() {
      this.player.playVideo()
    },
    playing() {
      this.isPlaying = true;
      this.timeUpdateInterval = setInterval(this.timeUpdate, 750);
    },
    timeUpdate(){
      var self = this;
      this.player.getCurrentTime().then((currentTime) => {
        if(self.trackTime){
          self.trackTime(currentTime);
        }
        if(self.end && currentTime >= self.end){
          console.log('hoooooo');
          self.player.mute();
          if(self.trackTime){
            self.trackTime(null);
          }
          if(this.$mq !== 'mobile'){
            self.ready = false;
          }
          self.closeVideo();
          self.isPlaying = false;
          clearInterval(self.timeUpdateInterval);
        }
      });
    },
    videoReady() {
      this.ready = true;
      this.loaded = true;
    },
    videoEnded() {
      if(this.$mq !== 'mobile'){
        this.ready = false;
      }
      this.closeVideo();
      this.isPlaying = false;
      clearInterval(this.timeUpdateInterval);
    }
  },
  destroyed() {
    clearInterval(this.timeUpdateInterval);
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    },
    end() {
      return this.playerVideo.end ? parseInt(this.playerVideo.end,10) : false
    },
    videoId() {
      return this.playerVideo.video_id
    },
    playerVars() {
      if(!this.videoWidth) return false
      this.videoHeight = this.videoWidth * 0.5625;
      let pv = {
        width: this.videoWidth,
        autoplay: 1,
        start: parseInt(this.playerVideo.start,10) || 0,
        rel: 0,
        controls:1,
        modestbranding:1
      }
      if(this.playerVideo.end){
        pv.end = this.playerVideo.end + 2
      }
      return pv
    }
  },
  watch: {
    triggerPlay() {
      if(this.triggerPlay && !this.isPlaying){
        this.player.unMute();
        this.player.seekTo(300);
        this.player.playVideo();
      }
    }
  }
}
</script>

<style lang="scss">
  .video-player{
    position:relative;
    border-radius:0.625rem;
    overflow:hidden;
    background:$darkmediumgray;
    width:100%;
    padding-top:56.25%;
    z-index:2;
    .player-card__image-column &,
    .player-card__info-column & {
      position:absolute;
      top:0;
      border-radius:0;
      z-index:0;
    }
    .sk-folding-cube{
        position: absolute;
        width: 30px;
        height: 30px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    iframe{
      opacity:0;
      transition:opacity 0.75s linear;
    }
    &--ready{
      iframe{
        opacity:1;
        transition:opacity 0.25s linear;
      }
    }
    .player-card__video-viewer-enter &,
    .video-inter__iframe-wrapper-enter &{
      opacity:0;
    }
    .player-card__video-viewer-enter-to &,
    .video-inter__iframe-wrapper-enter-to &{
      opacity:1;
    }
    .player-card__video-viewer-leave &,
    .video-inter__iframe-wrapper-leave &{
      opacity:1;
    }
    .player-card__video-viewer-leave-to &,
    .video-inter__iframe-wrapper-leave-to &{
      opacity:0;
    }
    .player-card__video-viewer-leave-active &,
    .player-card__video-viewer-enter-active &,
    .video-inter__iframe-wrapper-leave-active &,
    .video-inter__iframe-wrapper-enter-active &{
      transition:opacity 0.5s ease-in-out;
    }
    iframe{
      position:absolute !important;
      top:0;
      left:0;
    }
  }
</style>