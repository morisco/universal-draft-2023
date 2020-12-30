<template>
  <div class="podcast-controller">
    <audio ref="audioPlayer"  data-not-lazy>
      <source :src="activeMP3" type="audio/mpeg">
    </audio>
    <transition name="podcast-controller__content">
      <div class="podcast-controller__content" v-if="player && playingState === 2" v-on:click="stopAudio">
        <div>
          <span v-if="['mobile', 'tablet', 'small_desktop'].indexOf($mq) < 0">Player:</span>
          <span>{{player.title}}</span>
        </div>
        <a href="https://open.spotify.com/show/3sYLdv261f5jLvEgDLU9PD" v-if="['mobile', 'tablet', 'small_desktop'].indexOf($mq) < 0" target="_blank" class="podcast-controller__content-more" v-on:click="seeMore">
          More from the ringer
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
    right:0;
    overflow:hidden;
    audio{
      // position:absolute;
      // left:-55555px;
      opacity:0;
    }
    &__content{
      display:flex;
      align-items:center;
      background:$lightgray;
      padding:10px 15px;
      border-radius:0.625em;
      cursor:pointer;
      flex-wrap:wrap;
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
      }
      span{
        display:block;
        @include mobile-nav-label;
        line-height:1;
      }
    }
    &__content-more{
      flex: 0 0 auto;
      min-width:100%;
      margin-top:5px;
      @include mobile-nav-label;
      opacity:0.5;
      font-size:11px;
      text-align:center;

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
  }
</style>