<template>
  <div class="podcast-inter player-card">
    <div
      class="podcast-inter__image"
      :style="{backgroundColor: interstitial.bg_color}"
    >
      <img
        :src="interstitial.image.small"
        :alt="interstitial.title"
      >
    </div>
    <div class="podcast-inter__list">
      <PodcastCard
        v-for="pod in podItems"
        :key="interstitial.id + '-' + pod.id"
        :pod="pod"
      />
      <a
        :href="interstitial.spotify_link"
        target="_blank"
        class="podcast-inter__spotify"
      >
        Listen on
        <img
          src="~/assets/img/spotify-logo-black.svg"
          alt="Spotify Logo"
        >
      </a>
    </div>
  </div>
</template>

<script>
import PodcastCard from '~/components/Podcast/Card'
export default {
  name: "InterstitialPodcast",
  components: { PodcastCard },
  props: ['interstitial'],
  data() {
    return {
      podIds: null,
      podItems: null,
      mobilePod: null,
    }
  },
  computed: {
    pods() {
      return this.$store.getters['content/pods']
    },
  },
  watch: {
    pods() {
      if(this.pods && this.podIds) {
        this.setPods()
      }
    },
    podIds() {
      if(this.pods && this.podIds) {
        this.setPods()
      }
    },
  },
  mounted() {
    this.podIds = this.interstitial.podcasts.map((pod) => pod.pod_id);
    if(this.pods) {
      this.setPods();
    }
  }, 
  methods: {
    setPods() {
      const self = this;
      if(this.pods && Object.keys(this.pods).length > 0) {
        this.podItems = this.podIds.map(id => self.pods[id]);
        this.mobilePod = this.pods[this.interstitial.mobile_pod];
      }
    },
  },
}
</script>

<style lang="scss">
  .podcast-inter{
    display:flex;
    background:$cardback;
    border-radius:10px;
    overflow:hidden;
    @include mobile{
      flex-direction:column;
      border-radius:0;
    }
    &__image{
      flex-basis: 50%;
      display:flex;
      align-items:center;
      justify-content:center;
      @include mobile{
        flex-basis:unset;
      }
    }
    &__list{
      flex-basis:50%;
      padding:30px 30px 15px;
      @include mobile{
        flex-basis:unset;
        padding:30px;
      }
    }
    &__spotify{
      display:flex;
      align-items:center;
      @include pod-listen;
      img{
        margin-left:5px;
        height:18px;
      }
    }
    @include mobile{
      margin-bottom:45px;
      .app--nba & {
        // max-width: calc(100% - 30px);
        // margin-left: 15px;
        margin-top:60px;
      }
    }
    &.player-card{
      // background:transparent;
      opacity:1;
    }
    &__inner{
      display:flex;
      justify-content:space-between;
    }
   
  }
</style>