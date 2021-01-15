<template>
<transition name="player-card__video-viewer" v-on:enter="enter" appear :duration="1000">
  <figure class="player-card__video-viewer" v-if="displayVideo">
    <div class="player-card__video-viewer-viewable" ref="viewable">
      <VideoPlayer :videoWidth="videoWidth" :closeVideo="closeVideo" :playerVideo="playerVideo" />
      <button class="player-card__video-viewer-close" v-on:click="closeVideo">Close Video</button>
    </div>
  </figure>
</transition>
</template>

<script>
import VideoPlayer from '~/components/Video/Player'
import { scrollIt } from '~/plugins/scroller'
export default {
  props: ['videoParams', 'displayVideo', 'closeVideo', 'playerVideo', 'expanded'],
  components: { VideoPlayer },
  data() {
    return {
      isMounted: false,
      videoWidth: null
    }
  },
  methods: {
    enter() {
      this.videoWidth = this.$refs.viewable.offsetWidth;
      scrollIt(this.$refs.viewable.offsetParent.offsetParent.offsetParent.offsetTop + this.$refs.viewable.offsetParent.offsetParent.offsetTop + this.$refs.viewable.offsetParent.offsetTop+ this.$refs.viewable.offsetTop + (this.$refs.viewable.offsetHeight/2) - (window.innerHeight/2), 1000, 'easeInOutQuad');
    }
  },
  watch: {
    expanded(){
      if(!this.expanded){
        this.closeVideo();
      }
    }
  }
}
</script>

<style lang="scss">
  .player-card{
    &__video-viewer{
      position:absolute;
      top:80px;
      bottom:0;
      left:0;
      right:0;
      z-index:5;
      
      border-radius:0 0 0.625rem 0.625rem;
      overflow:hidden;
      iframe{
        position:relative;
        z-index:1;
        // opacity:0;
      }
      &:after{
        content:'';
        display:block;
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:$lightgray;
        z-index:0;
        opacity:0.9;
      }
      &-enter{
        &:after{
          opacity:0;
        }
      }
      &-enter-to{
        &:after{
          opacity:0.9;
        }
      }
      &-enter-active{
        &:after{
          transition:opacity 0.5s ease-out;
        }
      }
      &-leave{
        &:after{
          opacity:0.9;
        }
      }
      &-leave-to{
        &:after{
          opacity:0;
        }
      }
      &-leave-active{
        &:after{
          transition:opacity 0.5s ease-out 0.5s;
        }
      }
      &-viewable{
        position:absolute;
        top:30px;
        left:30px;
        right:30px;
        bottom:30px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
      }
    }
  }
</style>