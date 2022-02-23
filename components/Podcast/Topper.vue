<template>
  <div class="sticky-podcast__player-top">
    <a
      v-if="content.type === 'full' && activePodcast.spotify_showLink"
      :href="activePodcast.spotify_showLink"
      class="album-art"
      target="_blank"
      rel="noreferrer"
      :class="{'album-art--player': content.start}"
    >
      <img
        :src="content.image"
        :alt="content.show + ' Album Art'"
      >
    </a>
    <div
      v-if="content.type !== 'full' || !activePodcast.spotify_showLink"
      class="album-art"
    >
      <img
        :src="content.image"
        :alt="content.show + ' Album Art'"
      >
    </div>
    <div class="sticky-podcast__player-top-content">
      <!-- <div class="album-show-name">
        <div class="sticky-show-name">{{ content.show }}</div>
      </div> -->
      <div class="sticky-episode-title">
        {{ content.title }}
      </div>
      <div class="sticky-play-meta">
        <button
          v-if="playPause"
          type="button"
          class="sticky-play-pause"
          @click="playPause"
        >
          <img
            v-if="podPlaying"
            src="~/assets/img/icons/pause.svg"
          >
          <img
            v-if="!podPlaying"
            src="~/assets/img/icons/play.svg"
          >
        </button>
        <div
          v-if="playPause"
          class="sticky-meta-duration"
        >
          {{ readyToPlay || currentPod.type === "full" ? format(duration - currentTime) : '--:--' }}
        </div>
        <div class="sticky-meta-release">
          {{ $moment(activePodcast.spotify_episodeReleaseDate).format('MMM. DD') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PodcastTopper",
  props: ['activePodcast', 'podPlaying', 'playPause', 'duration', 'content', 'readyToPlay'],
  data() {
    return {
      interval: null,
      currentTime: 0,
    }
  },
  computed: {
    podTime() {
      return this.$store.getters['page/podTime']
    },
    currentPod() {
      return this.$store.getters['page/currentPod']
    },
  },
  watch: {
    podPlaying() {
      this.updatePod();
    },
    currentPod() {
      this.updatePod();
    },
    podTime() {
      this.updatePod();
    }
  },
  methods: {
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
    updatePod() {
      const self = this;
      if(this.podPlaying && this.activePodcast.id === this.currentPod.id) {
        this.interval = setInterval(() => {
          if(self.currentPod.start) {
            self.currentTime = self.podTime - self.currentPod.start
          } else {
            self.currentTime = self.podTime
          }
        }, 1000);
      } else if(!this.podPlaying && this.activePodcast.id === this.currentPod.id) {
        self.currentTime = self.podTime - self.currentPod.start
        clearInterval(this.interval);
      } else {
        clearInterval(this.interval);
        this.currentTime = 0;
      }
    }
  }
}
</script>