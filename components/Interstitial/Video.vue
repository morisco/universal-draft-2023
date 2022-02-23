<template>
  <div 
    ref="videoCard"
    class="player-card video-inter"
    :class="{
      'video-inter--open': open
    }"
    :style="{
      height: openHeight + 'px'
    }"
    @click="openVideo"
  >
    <div class="video-inter__content">
      <div class="video-inter__slug">
        Video
      </div>
      <div
        class="video-inter__title"
        v-html="interstitial.title"
      />
      <div class="video-inter__link">
        <img
          src="@/assets/img/icons/inter-play.svg"
          class="video-inter__play-button"
          alt="Play button"
          data-not-lazy
        >
        <span>Play the video</span>
      </div>
    </div>
    <div class="video-inter__video">
      <img
        :src="interstitial.image.medium"
        alt="Video thumbnail"
      > 
      <transition
        name="video-inter__iframe-wrapper"
        appear
      >
        <div
          v-if="true"
          class="video-inter__iframe-wrapper"
        >
          <VideoPlayer
            :player-video="videoConfig"
            :trigger-play="open"
            :video-width="videoWidth"
            :close-video="closeVideo"
            :video-type="'interstitial'"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import VideoPlayer from '~/components/Video/Player'
export default {
  name: "InterstitialVideo",
  components: { VideoPlayer },
  props: ['interstitial'],
  data() {
    return {
      open: false,
      openHeight: null,
      videoWidth: null
    }
  },
  computed: {
    videoConfig() {
      return {
        video_id: this.interstitial.video
      }
    }
  },
  mounted() {
    this.videoWidth = this.$refs.videoCard.offsetWidth;
  },
  methods: {
    closeVideo() {
      this.open = false;
    },
    openVideo() {
      this.open = true;
      this.$ga.event({
        eventCategory: 'video-interstitial',
        eventAction: 'play',
        eventLabel: this.interstitial.title
      });
    }
  }
}
</script>

<style lang="scss">
  .video-inter{
    position:relative;
    background-color:$black;
    display:flex;
    flex-direction:row;
    overflow:hidden;
    border-radius:0.625rem;
    padding-top:56.25%;
    cursor:pointer;
    @include mobile {
      .app--nba & {
        max-width: calc(100% - 30px);
        margin-left: 15px;
        padding-top: 51.75%;
      }
    }
    &.player-card{
      opacity:1;
      flex-direction:row;
      @include mobile {
        flex-direction:column-reverse;
      }
    }

    &__content{
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      z-index:2;
      padding:40px;
      width:100%;
      max-width:100%;
      flex: 0 0 auto;
      color:$white;
      text-align:center;
      display:flex;
      flex-direction:column;
      justify-content:center;
      background:rgba(0,0,0,0.25);
      align-items:center;
      transition:max-width 0.5s ease-in-out 0.375s;
      flex: 0 0 auto;
      transition:opacity 0.25s linear 0.25s;
      .video-inter--open & {
        opacity:0;
        transition:opacity 0.25s linear 0s;
      }
      @include mobile{
        padding:15px;
      }
    }
    &__slug{
      @include slug;
      text-transform:uppercase;
      @include mobile{
        display:none;
      }
    }
    &__title{
      @include inter-title;
      padding:25px 0 25px;
      transition:font-size 0s ease-in-out 0.5s;
      @include non-mobile {
        animation: titleTransition 1.25s 1 linear;
      }
      animation-play-state: paused;
      animation-fill-mode: forwards;
      @include mobile{
        padding:15px 0;
        .app--nba & {
          font-size: 29px;
          line-height: 1.2;
          max-width: 100%;
        }
      }
      // @include tablet {
      //   font-size:32px;
      // }
    }
    &__dek{
      p{
        line-height:1.1;
      }
      opacity:1;
      max-height:400px;
      transition:opacity 0.125s linear, max-height 0.125s linear 0.125s;
      @include non-mobile {
        .video-inter--open & {
          max-height:0;
          opacity:0;
        }
      }
    }
    &__presented-by{
      span{
        @include mobile-nav-label;
        text-transform:uppercase;
      }
    }
    &__video{
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      cursor:pointer;
      > img {
        position:relative;
        width:100%;
        height:100%;
        object-fit:cover;
        object-position:center center;
        opacity:0;
        vertical-align:bottom;
        transition:opacity 0.25s linear 0s;
        &.isLoaded{
          opacity:1;
        }
        .video-inter--open & {
          opacity:0;
          transition:opacity 0.25s linear 0s;
        }
      }
    }
    &__link{
      @include expanded-label;
      text-decoration:underline;
      display:flex;
      align-items:center;
      text-transform:uppercase;
      span{
        display:inline-block;
        padding-top:2px;
      }
      @include mobile{
        font-size:15px;
      }
    }
    &__play-button{
      position:relative;
      width:40px;
      height:40px;
      z-index:2;
      opacity:1;
      margin-right:7px;
      @include mobile{
        width:25px;
        height:25px;
      }
    }
    &__iframe-wrapper{
      position:absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      opacity:0;
      .video-inter--open & {
        opacity:1;
        transition:opacity 0.25s linear 1s;
      }  
    }
  }
    
  @keyframes titleTransition {
    0% {
      opacity: 1; 
    } 20%, 80% {
      opacity: 0; 
    } 100% {
      opacity: 1; 
    }
  }
</style>