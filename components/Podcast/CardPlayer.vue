<template>
  <div 
    class="podcast-player" 
    :style="{top: infoHeight + 'px'}"
    :class="{
      'podcast-player--playing': playing,
      'podcast-player--loaded': infoHeight
    }"
    v-on:click="togglePodcast($event)"
  >
    <div class="podcast-player__play-pause">
      <svg width="10px" height="12px" viewBox="0 0 10 12">
        <path d="M5.5 0L11 9L0 9L5.5 0Z" transform="matrix(0.01745238 0.9998477 -0.9998477 0.01745238 8.998657 0)" fill="#166856" stroke="none" />
      </svg>
    </div>
    <span class="podcast-player__time">{{mentionTime}}</span>
    <div class="podcast-player__progress" v-if="percentComplete > 0" :style="{animationDuration: duration + 's', animationPlayState: playing ? 'running' : 'paused'}"></div>
  </div>
</template>

<script>

function getSeconds(time){
  const timeSplit = time.split(':')
  let secondCount;
  if(timeSplit.length === 3){
    var hours = parseInt(timeSplit[0],10);
    var minutes = parseInt(timeSplit[1],10);
    var seconds = parseInt(timeSplit[2],10);
    secondCount = (hours * 360) + (minutes * 60) + seconds;
  } else {
    var minutes = parseInt(timeSplit[0],10);
    var seconds = parseInt(timeSplit[1],10);
    secondCount = (minutes * 60) + seconds;
  }
  return secondCount;
}

function getFormattedTime(startSeconds, endSeconds, remaining) {
  const difference = remaining ? remaining : endSeconds - startSeconds;
  const minutes = Math.floor(difference/60);
  const seconds = difference - (minutes * 60);
  return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

import { mapActions } from 'vuex'
export default {
  props: ['playerId', 'playerPodcast', 'infoHeight'],
  data() {
    return {
      playing: 0,
      startSeconds: null,
      endSeconds: null,
      percentComplete: 0,
      duration: null
    }
  },
  computed: {
    mentionTime() {
      this.startSeconds = getSeconds(this.playerPodcast.podcast_start)
      this.endSeconds = getSeconds(this.playerPodcast.podcast_end)
      return this.activePodcast && this.remainingTime ? getFormattedTime(null, null, this.remainingTime) : getFormattedTime(this.startSeconds, this.endSeconds);
    },
    activePodcast(){
      const activePlayer = this.$store.getters['podcast/activePlayer'];
      return activePlayer === this.playerId
    },
    currentCompletionPercentage() {
      return this.$store.getters['podcast/currentCompletionPercentage']
    },
    playingState() {
      if(this.activePodcast){
        return this.$store.getters['podcast/activePlayingState']
      } else {
        return false
      }
    },
    remainingTime() {
      return this.$store.getters['podcast/remainingTime']
    }
  },
  mounted() {
    this.playing = this.playingState === 2 && this.activePodcast;
    this.duration = this.remainingTime ? this.remainingTime : this.endSeconds - this.startSeconds
  },
  methods: {
    ...mapActions({
      'storeActivePodcast': 'podcast/setActive',
      'storePlayingState': 'podcast/setPlayingState'
    }),
    togglePodcast(e) {
      e.stopPropagation();
      if(this.activePodcast && this.playingState === 2){
        this.storePlayingState(0);
      } else if(this.activePodcast && this.playingState === 0) {
        this.storePlayingState(2);
      } else if(!this.activePodcast) {
        const { podcast_mp3 } = this.playerPodcast;
        const { startSeconds, endSeconds, playerId } = this;
        this.storeActivePodcast({playerId, mp3: podcast_mp3, startSeconds, endSeconds});
        this.storePlayingState(1);
      }
    }
  },
  watch: {
    playingState() {
      this.playing = this.activePodcast && this.playingState === 2;
    },
    currentCompletionPercentage() {
      this.percentComplete = this.activePodcast ? this.currentCompletionPercentage : 0;
    }
  }
}
</script>

<style lang="scss" scoped>
  .podcast-player{
    display:flex;
    position:absolute;
    transform:translateY(calc(-100% - 50px));
    z-index:5;
    align-items:center;
    background:$lightgray;
    right:15px;
    border:2px solid $black;
    border-radius:0.625em;
    padding:5px 10px;
    cursor:pointer;
    opacity:0;
    transition:opacity 0.125s linear;
    @include mobile {
      top:auto !important;
      bottom:15px;
      left:15px;
      right:auto;
      transform:none !important;
    }
    .big-board & {
      transform:translateY(calc(-100% - 20px));
      left:15px;
      right:auto;
    }
    
    &__play-pause{
      display:flex;
      position:relative;
      justify-content:space-between;
      align-items:center;
    }
    &--loaded{
      opacity:1;
    }
    &--playing{
      .podcast-player__play-pause{
        height:12px;
        width:10px;
        svg{
          display:none;
        }
        &:before,
        &:after{
          content: '';
          height:10px;
          width:4px;
          border-radius:2px;
          background:$gray;
          
        }
      }
    }
    &__time{
      margin-left:10px;
      line-height:1;
      margin-right:-1px;
      @include mobile-nav-label;
      width:32px;
    }
    &__progress{
      position:absolute;
      left:0;
      width:100%;
      max-width:0;
      top:0;
      bottom:0;
      opacity:0.25;
      background:$gray;
      animation: progress 1.25s 1 ease-in-out;
      animation-fill-mode: forwards;
    }

  }
  @keyframes progress {
  0% {
    max-width:0;
  } 100% {
    max-width:100%;

  }
}
</style>