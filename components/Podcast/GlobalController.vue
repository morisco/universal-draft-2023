<template>
  <div class="podcast-controller">
    <!-- <audio ref="audioPlayer"  data-not-lazy>
      <source :src="activeMP3" type="audio/mpeg">
    </audio> -->
    <transition name="podcast-controller__content">
      <div class="podcast-controller__content" v-if="player && playingState === 2" v-on:click="stopAudio">
        <div>
          <strong>{{player.title}}</strong>{{['tablet', 'mobile', 'small-desktop'].indexOf($mq) >= 0 ? ':&nbsp;' + player.player_podcast.label : ''}}
        </div>
        <a href="https://open.spotify.com/show/3sYLdv261f5jLvEgDLU9PD" target="_blank" class="podcast-controller__content-more" v-on:click="seeMore">
          <!-- <span v-if="$mq !== 'mobile'">More from the ringer</span> -->
          <img src="~/assets/img/spotify-logo.png" alt="Spotify logo" />
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'

export default {
  computed: {
    activeMP3() {
      return this.$store.getters['podcast/activeMP3']
    },
    startTime() {
      return this.$store.getters['podcast/startTime']
    },
    endTime() {
      return this.$store.getters['podcast/endTime']
    },
    playingState() {
      return this.$store.getters['podcast/playingState']
    },
    activePlayer() {
      return this.$store.getters['podcast/activePlayer']
    },
    player() {
      return this.activePlayer ? this.$store.getters['content/player'](this.activePlayer) : null
    }
  },
  methods: {
    ...mapActions({
      'storePlayingState': 'podcast/setPlayingState',
      'resetPodcast': 'podcast/resetPodcast',
      'setCompletionPercentage' : 'podcast/setCompletionPercentage',
      'setRemainingTime': 'podcast/setRemaining'
    }),
    stopAudio() {
      this.resetPodcast();
    },
    trackTime: _.throttle(function () {
      const current = this.$refs.audioPlayer.currentTime;
      const adjustedCurrent = current - this.startTime;
      const totalTime = this.endTime - this.startTime;
      const percentageComplete = ((adjustedCurrent/totalTime) * 100).toFixed(0);
      const remainingTime = (this.endTime - current).toFixed(0)
      if(this.endTime && current > 0 && current >= this.endTime){
        this.$refs.audioPlayer.pause();
        this.resetPodcast();
      } else if(current > this.startTime && current < this.endTime){
        this.setRemainingTime(remainingTime);
        this.setCompletionPercentage(percentageComplete);
      }
    }, 750),
    canPlayChange() {
      if(this.$refs.audioPlayer.paused){
        this.$refs.audioPlayer.currentTime = this.startTime
        this.storePlayingState(2)
      }
    },
    trackPlayingState() {
      if(this.$refs.audioPlayer.playing){
        this.storePlayingState(2)
      } else if(this.$refs.audioPlayer.paused) {
        this.storePlayingState(0);
      }
    },
    seeMore(e) {
      e.stopPropagation();
    }
  },
  watch : {
    activeMP3() {
      if(this.activeMP3 && this.startTime && this.endTime) {
        this.$refs.audioPlayer.oncanplay = this.canPlayChange;
        this.$refs.audioPlayer.load();
        this.$refs.audioPlayer.ontimeupdate = this.trackTime
        this.$refs.audioPlayer.onplaying = this.trackPlayingState
      } else {
        this.$refs.audioPlayer.oncanplay = null;
        this.$refs.audioPlayer.ontimeupdate = null
        this.$refs.audioPlayer.onplaying = null
        this.$refs.audioPlayer.pause();
      }
    },
    playingState() {
      if(this.playingState === 0 && !this.$refs.audioPlayer.paused){
        this.$refs.audioPlayer.pause();
      } else if(this.playingState === 2 && this.$refs.audioPlayer.paused) {
        this.$refs.audioPlayer.play();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .podcast-controller{
    position:absolute;
    bottom:30px;
    left:0;
    right:5px;
    overflow:hidden;
    @include mobile{
      position:fixed;
      bottom:0;
    }
    audio{
      // position:absolute;
      // left:-55555px;
      opacity:0;
    }
    &__content{
      display:flex;
      // align-items:center;
      background:$lightgray;
      padding:10px 15px;
      border-radius:0.625em;
      cursor:pointer;     
      @include single-column{
        align-items:center;
      }
      &-enter{
        opacity:0;
      }
      &-leave{
        opacity:1;
      }
      &-enter-to{
        opacity:1;
      }
      &-leave-to{
        opacity:0;
      }
      &-enter-active,
      &-leave-active{
        transition:opacity 0.5s linear;
      }
      &:before{
        content:'';
        display:block;
        height:15px;
        width:15px;
        border-radius:2px;
        background:$gray;
        margin-right:10px;
        margin-bottom:1px;
        flex: 0 0 auto;
        margin-top:0px;
        @include single-column{
          margin-top:0;
          margin-bottom:1px;
        }
      }
      span{
        display:block;
        @include mobile-nav-label;
        line-height:1;
        &:first-of-type{
          flex: 0 0 auto;
        }
        &:last-of-type{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          
        }
      }
      > div{
        max-width:calc(100% - 50px);
        font-weight:300;
        font-size:12px;
        flex:1;
        line-height:17px;
        @include single-column{
          display:flex;
          align-items:center;
        }
            white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        strong{
          display:inline;
          font-family: 'Decima';
          font-weight:normal;
          text-transform:uppercase;

            flex: 1;
            min-width:100%;
        
          @include single-column{
            min-width:0;
          }
        }
      }
      @include single-column{
        padding:20px 15px;
      }
    }
    &__content-more{
      flex: 0 0 auto;
      margin-top:5px;
      margin-right:-5px;
      @include mobile-nav-label;
      opacity:0.5;
      font-size:11px;
      text-align:left;
      padding-left:5px;
      justify-content:flex-end;
      flex:0 0 auto;
      margin-top:0;
      img{
        height:17px;
        justify-self:flex-end;
        vertical-align:bottom;
      }
      @include single-column{
        min-width:0;
        flex:0 0 auto;
        justify-self:flex-end;
        padding-left:0;
        img{
          margin-top:-4px;
          height:20px;
        }
      }

    }
    @include single-column{
      opacity:0;
      bottom:auto;
      top:100%;
      left:auto;
      width:auto;
      .filters--fixed & {
        opacity:1;
      }
      &__content{
        border-top-left-radius:0;
        border-top-right-radius:0;
        border-bottom-right-radius:0;
        border:2px solid $black;
        border-right:0;
        border-top:0;
      }
    }
    @include single-column{
      position:fixed;
      opacity:1;
      top:auto;
      bottom:-1px;
      z-index:5555555;
      left:0;
      &__content{
        border:0px;
        border-top:2px solid $gray;
        border-bottom-left-radius:0;
        left:0;
        > div{
          display:flex;
          flex-wrap:nowrap;
          flex:1;
          max-width:calc(100% - 50px);
          margin-right:5px;
          display:inline-block;
          strong{
            flex:0 0 auto;
            margin-bottom:-2px;
          }
          span:first-of-type{
            margin-right:5px;
          }
          span:last-of-type{
            padding-right:10px;
          }
        }
      }
    }
  }
</style>