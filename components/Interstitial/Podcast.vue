<template>
  <div class="podcast-inter player-card">
    <mq-layout
      mq="tablet+"
      class="podcast-inter__inner"
    >
      <PodcastCard
        v-for="pod in podItems"
        :key="interstitial.id + '-' + pod.id"
        :pod="pod"
      />
    </mq-layout>
    <mq-layout
      mq="mobile"
      class="podcast-inter__inner"
    >
      <PodcastCard
        v-if="mobilePod"
        :pod="mobilePod"
      />
    </mq-layout>
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
    this.podIds = [
      this.interstitial.desktop_pod_1,
      this.interstitial.desktop_pod_2,
      this.interstitial.desktop_pod_3
    ]
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
    @include mobile{
      margin-bottom:45px;
      .app--nba & {
        max-width: calc(100% - 30px);
        margin-left: 15px;
        margin-top:40px;
      }
    }
    &.player-card{
      background:transparent;
      opacity:1;
    }
    &__inner{
      display:flex;
      justify-content:space-between;
    }
   
  }
</style>