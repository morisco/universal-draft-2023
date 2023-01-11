<template>
  <div class="podcast-inter__chicklet">
    <button
      type="button"
      class="sticky-play-pause"
      @click="handlePlayClick"
    >
      <img
        v-if=" (currentPod && (currentPod.id === pod.id && currentPod.type === 'full' && podPlaying) || shouldPlay)"
        src="~/assets/img/icons/pause-white.svg"
      >
      <img
        v-if="!currentPod || (currentPod.id !== pod.id || currentPod.type !== 'full' || !podPlaying) && !shouldPlay"
        src="~/assets/img/icons/play-white.svg"
      >
    </button>
    <span>
      {{ format(pod.spotify_episodeDuration - currentTime) }}
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "PodcastCard",
  props: ['pod'],
  data() {
    return {
      shouldPlay: false,
      interval: null,
      currentTime: 0,
      topperContent: {}
    }
  },
  mounted() {
    this.topperContent = {
      image: this.pod.spotify_showImage,
      show: this.pod.spotify_showName,
      title: this.pod.spotify_episodeName,
    }
  },
  methods: {
    ...mapActions({
      'setCurrentPod': 'page/setCurrentPod',
      'setPlaying': 'page/setPlaying',
      'setPodClicked': 'page/setPodClicked',
    }),
    handlePlayClick() {
      this.setPodClicked(true);
      if(this.currentPod && this.currentPod.id === this.pod.id && this.currentPod.type === 'full') {
        if(!this.podPlaying) {
          this.shouldPlay = true;
          this.setPlaying(true);
        } else {
          this.setPlaying(false);
        }
      } else {
        this.shouldPlay = true;
        this.setCurrentPod({
          id: this.pod.id,
          start: null,
          end: null,
          title: this.pod.spotify_episodeName,
          image: this.pod.spotify_showImage,
          show: this.pod.spotify_showName,
          type: "full"
        });
      }
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
  computed: {
    currentPod() {
      return this.$store.getters['page/currentPod']
    },
    podPlaying() {
      return this.$store.getters['page/podPlaying']
    },
    podTime() {
      return this.$store.getters['page/podTime']
    },
  },
  watch: {
    podPlaying() {
      if(this.podPlaying){
        this.shouldPlay = false;
      }
      const self = this;
      if(this.podPlaying && this.currentPod && this.pod.id === this.currentPod.id && !this.currentPod.start) {
        this.interval = setInterval(() => {
          self.currentTime = self.podTime
        }, 750);
      } else if(this.currentPod && !this.podPlaying && this.pod.id === this.currentPod.id) {
        clearInterval(this.interval);
      } else {
        clearInterval(this.interval);
        this.currentTime = 0;
      }
    }
  }
}
</script>

<style lang="scss">
  .podcast-inter{
     &__chicklet{
      vertical-align:text-bottom;
      height:21px;
      display:inline-flex;
      align-items:center;
      padding:0 5px;
      @include pod-duration;
      background:$highlight1;

  
      color:white;
      .sticky-play-pause{
        margin-right:5px;
      }
    }
  }
</style>