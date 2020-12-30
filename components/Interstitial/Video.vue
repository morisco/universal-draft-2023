<template>
  <div 
    class="player-card video-inter"
    ref="videoCard"
    :class="{
      'video-inter--open': open
    }"
    :style="{
      height: openHeight + 'px'
    }"
  >
    <div class="video-inter__content">
      <div class="video-inter__slug">Video</div>
      <div class="video-inter__title" v-html="interstitial.title"></div>
      <div class="video-inter__dek" v-html="interstitial.dek"></div>
      <div class="video-inter__presented-by">
        <span>Presented By</span>
      </div>
    </div>
    <div class="video-inter__video" v-on:click="openVideo">
      <img :src="interstitial.image.medium" alt="Video thumbnail" class="video-inter__thumbnail" /> 
      <img src="@/assets/img/icons/inter-play.svg" class="video-inter__play-button" alt="Play button" />
      <div class="video-inter__iframe-wrapper">
        <iframe v-if="open" :src="'https://www.youtube.com/embed/' + interstitial.video + '?autoplay=1&rel=0&playsinline=1'" data-not-lazy frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['interstitial'],
  data() {
    return {
      open: false,
      openHeight: null
    }
  },
  methods: {
    openVideo() {
      this.open = true;
      if(this.$mq !== 'mobile'){
        this.openHeight = this.$refs.videoCard.offsetHeight;
      }
    }
  }
  
}
</script>

<style lang="scss">
  .video-inter{
    background-color:$black;
    display:flex;
    overflow:hidden;
    @include mobile {
      flex-direction:column-reverse;
    }

    &__content{
      padding:40px;
      width:46.5%;
      max-width:46.5%;
      flex: 0 0 auto;
      color:$white;
      text-align:center;
      display:flex;
      flex-direction:column;
      min-height:300px;
      transition:max-width 0.5s ease-in-out 0.375s;
      flex: 0 0 auto;
      @include mobile {
        max-width:100%;
        width:100%;
      }
      .video-inter--open & {
        max-width:27%;
        @include mobile {
          max-width:100%;
        }
      }
    }
    &__slug{
      @include mobile-nav-label;
    }
    &__title{
      @include inter-title;
      padding:10px 0 20px;
      flex:1;
      transition:font-size 0s ease-in-out 0.5s;
      @include non-mobile {
        animation: titleTransition 1.25s 1 linear;
      }
      animation-play-state: paused;
      animation-fill-mode: forwards;
      @include mobile {
        font-size:32px;
      }
      .video-inter--open & {
        font-size:24px;
        animation-play-state: running;
        @include mobile {
          font-size:32px;
        }
      }

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
      position:relative;
      cursor:pointer;
      flex:1;
      @include non-mobile{
        border-left:2px solid $gray;
      }
      @include mobile{
        border-bottom:1px solid $gray;
      }
      iframe{
        position:absolute;
        width:100%;
        height:100%;
        object-fit:contain;
        left:50%;
        top:50%;
        transform:translate(-50%, -50%);
     
      }
    }
    &__thumbnail{
      position:relative;
      width:100%;
      height:100%;
      object-fit:cover;
      object-position:center center;
      opacity:1;
      .video-inter--open & {
        opacity:0;
        transition:opacity 0.25s linear 0s;
      }
    }
    &__play-button{
      position:absolute;
      top:50%;
      left:50%;
      width:90px;
      height:90px;
      margin:-45px 0 0 -45px;
      z-index:2;
      opacity:1;
      .video-inter--open & {
        opacity:0;
        transition:opacity 0.25s linear 0s;
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