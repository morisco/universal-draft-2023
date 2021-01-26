<template>
  <div 
    class="podcast-player" 
    :class="{
      'podcast-player--playing': playing,
      'podcast-player--loading': loading,
      'podcast-player--loaded': infoHeight
    }"
    v-on:click="togglePodcast($event)"
  >
    <div class="podcast-player__play-pause">
      <div class="podcast-player__loader"></div>
      <svg viewBox="0 0 10 12">
        <path d="M5.5 0L11 9L0 9L5.5 0Z" class="play-button-path" transform="matrix(0.01745238 0.9998477 -0.9998477 0.01745238 8.998657 0)" stroke="none" />
      </svg>
    </div>
    <span class="podcast-player__time">{{mentionTime}}</span>
    <span class="podcast-player__label">{{playerPodcast.label}}</span>
    <div class="podcast-player__progress" v-if="percentComplete > 0" :style="{'maxWidth': percentComplete + '%'}"></div>
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
      duration: null,
      loading: false,
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
    this.loading = this.playingState === 1 && this.activePodcast;
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
      this.loading = this.activePodcast && this.playingState === 1;

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
    position:relative;
    // transform:translateY(calc(-100% - 50px));
    z-index:5;
    align-items:center;
    background:$mediumgray;
    // right:15px;
    height:40px;
    border-radius:4px;
    padding:5px 0 5px 10px;
    cursor:pointer;
    opacity:0;
    transition:opacity 0.125s linear;
    margin-top:15px;
    margin-bottom:15px;
    overflow:hidden;
    @include tablet-portrait-only{
      .mock-draft &,
      .draft-results & {
        padding: 5px 2px 5px 8px;
      }
      right:5px;
    }
    @include mobile {
      top:auto !important;
      bottom:auto;
      left:auto;
      right:auto;
      margin:20px auto;
      transform:none !important;
    }
    .big-board & {
      // transform:translateY(calc(-100% - 20px));
      // left:15px;
      // right:auto;
      margin-top:0;
    }
    
    &__play-pause{
      display:flex;
      position:relative;
      justify-content:space-between;
      align-items:center;
      width:14px;
      z-index:2;
      svg{
        opacity:1;
        transition:opacity 0.125s linear;
        width:100%;
        height:auto;
        .play-button-path{
          fill:$darkmediumgray;
        }
        .podcast-player--loading & {
          opacity:0;
        }
      }
    }
    &--loaded{
      opacity:1;
    }
    &--playing{
      .podcast-player__play-pause{
        height:14px;
        width:14px;
        svg{
          display:none;
        }
        &:before,
        &:after{
          content: '';
          height:14px;
          width:5px;
          // border-radius:2px;
          background:$gray;
        }
      }
    }

    &__time{
      position:relative;
      margin-left:5px;
      line-height:1;
      margin-right:-1px;
      @include player-card-body;
      margin-bottom:2px;
      width:35px;
      text-align: left;
      color:$darkmediumgray;
      z-index:1;
      @include tablet-landscape-and-below{
        margin-left:5px;
      }
    }
    &__label{
      @include player-card-body;
      font-size:14px;
      margin-bottom:3px;
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
      transition:max-width 0.25s linear 0s;
      z-index:0;
      // animation: progress 1.25s 1 ease-in-out;
      // animation-fill-mode: forwards;
      .player-card--defense & {
        background:$defense;
      }
      .player-card--offense & {
        background:$defense;
      }
    }

    
    &__loader {
      border: 2px solid $mediumgray; /* Light grey */
      border-top: 2px solid $gray; /* Blue */
      border-radius: 50%;
      width: 10px;
      height: 10px;
      animation: spin 2s linear infinite;
      position:absolute;
      opacity:0;
      transition:opacity 0.125s linear;
      .podcast-player--loading & {
        opacity:1;
      }
      .player-card--offense & {
        border-top-color: $offense; /* Blue */
      }
      .player-card--defense & {
        border-top-color: $defense; /* Blue */
      }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
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