<template>
<transition name="player-card__video-viewer" v-on:enter="enter" appear :duration="1000" >
  <figure class="player-card__video-viewer" v-if="displayVideo" v-on:click="closeVideo">
    <div class="player-card__video-viewer-viewable" ref="viewable">
      <div class="player-card__video-viewer-actions">
        <button class="player-card__video-viewer-close" v-on:click="closeVideo"></button>
        <button class="player-card__video-viewer-close" v-on:click="collapseVideo"></button>
      </div>
      <VideoPlayer :videoWidth="videoWidth" :closeVideo="closeVideo" :playerVideo="playerVideo" :trackTime="trackTime" />
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
      videoWidth: null,
      currenTime: null
    }
  },
  methods: {
    enter() {
      this.videoWidth = this.$refs.viewable.offsetWidth;
      scrollIt(this.$refs.viewable.offsetParent.offsetParent.offsetParent.offsetTop + this.$refs.viewable.offsetParent.offsetParent.offsetTop + this.$refs.viewable.offsetParent.offsetTop+ this.$refs.viewable.offsetTop + (this.$refs.viewable.offsetHeight/2) - (window.innerHeight/2), 1000, 'easeInOutQuad');
    },
    collapseVideo(e) {
      e.stopPropagation();
      this.closeVideo();
      this.$store.commit('viewOptions/setViewCollapsed');
      setTimeout(() => this.$emit('collapseVideo', this.currentTime), 500);
    },
    trackTime(currentTime){
      this.currentTime = currentTime;
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

      &-close{
        position:relative;
        z-index:5;
        margin:0 0 10px 10px;
        width:20px;
        height:20px;
        background-image:url('~@/assets/img/icons/closeIcon.svg');
        background-size:contain;
        background-repeat:no-repeat ;

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
      &-actions{
        display:flex;
        justify-content:flex-end;
        opacity:1 ;
        width:100%;
        .player-card__video-viewer-enter &,
        .player-card__video-viewer-leave-to &{
          opacity:0;
        }
        .player-card__video-viewer-enter-to,
        .player-card__video-viewer-leave &{
          opacity:1;
        }
        .player-card__video-viewer-enter-active &{
          transition:opacity 0.25s linear 0.25s;
        }
        .player-card__video-viewer-elave-active &{
          transition:opacity 0.25s linear 0s;
        }
      }
    }
  }
</style>