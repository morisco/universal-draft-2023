<template>
  <div
    class="player-podcast"
    @click="playClip"
  >
    <div class="player-podcast__inner">
      <button type="button">
        <img
          v-if="!playing"
          src="~/assets/img/icons/play.svg"
        >
        <img
          v-if="playing"
          src="~/assets/img/icons/pause.svg"
        >
      </button>
      <span class="player-podcast-time">
        {{ format(totalTime - currentTime) }}
      </span>
      <span class="player-podcast-label">
        {{ podcast.label }}
      </span>
    </div>
    <span
      class="player-podcast-progress"
      :style="{'max-width': progress + '%'}"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "NewCardPlayer",
  props: ['podcast', 'player'],
  data() {
    return{
      activePod: false,
      startTime: null,
      endTime: null,
      totalTime: 0,
      currentTime: 0,
      playing: false,
      progress: 0
    }
  },
  computed:{
    currentPod() {
      return this.$store.getters['page/currentPod']
    },
    podTime() {
      return this.$store.getters['page/podTime']
    },
    podPlaying() {
      return this.$store.getters['page/podPlaying']
    }
  },
  watch: {
    currentPod() {
      this.activePod = this.currentPod.id === this.podcast.podcast && this.currentPod.start === this.startTime
      if(this.podPlaying && this.podcast.podcast === this.currentPod.id && this.currentPod.start === this.startTime) {
        this.playing = true;
      } else {
        this.playing = false;
      }
    },
    podTime() {
      if(this.activePod) {
        if(this.podTime >= this.startTime && this.podTime <= this.endTime){
          this.currentTime = this.podTime - this.startTime;
        } else {
          this.currentTime = 0;
        }
      }
    },
    podPlaying() {
      if(this.podPlaying && this.podcast.podcast === this.currentPod.id && this.currentPod.start === this.startTime) {
        this.playing = true;
      } else {
        this.playing = false;
      }
    },
    currentTime() {
      this.progress = (this.currentTime/this.totalTime) * 100;
    },
    activePod() {
      if(!this.activePod) {
        this.currentTime = 0;
      }
    }
  },
  mounted() {
    this.startTime = this.parseTime(this.podcast.podcast_start);
    this.endTime = this.parseTime(this.podcast.podcast_end);
    this.totalTime = this.endTime - this.startTime;
  },
  methods: {
    ...mapActions({
      'setCurrentPod': 'page/setCurrentPod',
      'setPlaying': 'page/setPlaying',
      'setPodClicked': 'page/setPodClicked',
    }),
    playClip() {
      this.setPodClicked(true);

      if(this.currentPod.id == this.podcast.podcast && this.currentPod.start === this.startTime){
        this.setPlaying(!this.podPlaying);
      } else {
        this.setCurrentPod({
          id: this.podcast.podcast,
          start: this.startTime,
          end: this.endTime,
          image: this.player.image,
          show: this.player.title,
          title: this.podcast.label,
          type: "clip"
        });
      }
    },
    parseTime(time) {
      const tSplit = time.split(':');
      let seconds = 0;
      if(tSplit.length > 2) {
        seconds += parseInt(tSplit[0],10) * 3600;
        seconds += parseInt(tSplit[1],10) * 60;
        seconds += parseInt(tSplit[2],10);
      } else if(tSplit.length > 1) {
        seconds += parseInt(tSplit[0],10) * 60;
        seconds += parseInt(tSplit[1],10);
      } else {
        seconds += parseInt(tSplit[0],10);
      }
      return seconds;
    },
    format(time) {   
      var hrs = ~~(time / 3600);
      var mins = ~~((time % 3600) / 60);
      var secs = ~~time % 60;

      var ret = "";
      if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    },
  },
}
</script>

<style lang="scss" scoped>
  .player-podcast{
    position:relative;
    overflow:hidden;
    background:$mediumgray;
    border-radius:8px;
    padding:10px 5px 10px 12px;
    margin-top:20px;
    @include mobile{
      margin-bottom:10px;
    }
    &__inner{ 
      position:relative;
      z-index:1;
      display:flex;
    }
    img{
      opacity: 0.5;
    }
    button{
      display:flex;
      align-items:center;
      img{
        width:10px;
      }
    }
    &-time{
      position:relative;
      margin-left:5px;
      line-height:1;
      margin-right:-1px;
      @include player-card-body;
      font-size:13px;
      margin-bottom:0;
      width:35px;
      text-align: left;
      color:$darkmediumgray;
      z-index:1;
      flex: 0 0 auto;
      @include tablet-landscape-and-below{
        margin-left:5px;
      }
      @include mobile{
        margin-bottom:1px;
      }
    }
    &-label{
      flex:1;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      line-height: 1.5;
      font-size: 13px;
    }
    &-progress{
      display:block;
      position:absolute;
      top:0;
      left:0;
      bottom:0;
      width:100%;
      max-width:0;
      background:$highlight2;
      opacity: 0.1;
      transition:max-width 0.25s ease-in-out;
      z-index:0;
    }
  }
</style>