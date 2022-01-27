<template>
  <div class="podcast-inter__item card-item">
    <Topper :activePodcast="pod" :podPlaying="podPlaying || shouldPlay" :content="topperContent" />
    <div class="card-item__description" v-html="pod.spotify_episodeDescription" />
    <div class="card-item__controls">
      <button type="button" v-on:click="handlePlayClick" class="sticky-play-pause">
        <img v-if=" ((currentPod.id === pod.id && currentPod.type === 'full' && podPlaying) || shouldPlay)" src="~/assets/img/icons/pause.svg" />
        <img v-if="(currentPod.id !== pod.id || currentPod.type !== 'full' || !podPlaying) && !shouldPlay" src="~/assets/img/icons/play.svg" />
      </button>
      <span class="card-item__controls-duration">
          {{format(pod.spotify_episodeDuration - currentTime)}}
          <span>Play In-Page</span>
      </span>
      <a :href="pod.spotify_episodeSpotify" target="_blank" class="card-item__controls-link">
        <img src="~/assets/img/spotify-logo.png" alt="Spotify Logo" />
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Topper from '~/components/Podcast/Topper'

export default {
  props: ['pod'],
  components: { Topper },
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
    }),
    handlePlayClick() {
      if(this.currentPod.id === this.pod.id && this.currentPod.type === 'full') {
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
      if(this.podPlaying && this.pod.id === this.currentPod.id && !this.currentPod.start) {
        this.interval = setInterval(() => {
          self.currentTime = self.podTime
        }, 750);
      } else if(!this.podPlaying && this.pod.id === this.currentPod.id) {
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
     &__item{
      width:calc(33.33% - 20px);
      padding:30px 30px 15px;
      background:$lightgray;
      border-radius:8px;
      .sticky-podcast__player-top{
        display:flex;
      }
      @include single-column{
        width:calc(33.33% - 10px);
        padding:20px 20px 10px;
        .sticky-podcast__player-top{
          // flex-direction:column;
        }

        .album-art{
          // display:none;
          // margin-bottom:20px;
        }
      }
      @include tablet-only {
        .album-art{
          display:none;
        }
      }
      @include mobile{
        width:100%;
        
      }
    }
  }
  .card-item{
    &__description{
      line-clamp:4;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      margin:10px 0 10px;
      p{
        display: -webkit-box;
        @include player-card-body;
        line-clamp:4;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        margin-bottom:10px;
        &:last-of-type{
          margin-bottom:0;
        }
      } 
    }
    &__controls{
      display:flex;
      align-items:center;
      button{
        display:flex;
        align-items:center;
        img{
          width:14px;
        }
      }
      &-duration{
        flex:1;
        margin-left:5px;
        @include podcast-duration;
        margin-top:-2px;
        span{
          color:$gray;
        }
      }
      &-link{
        width:25px;
        height:25px;
        margin-right:-15px;
        @include single-column{
          margin-right:-5px;
        }
        img{
          width:100%;
          vertical-align:bottom;
        }

      }
    }
  }
</style>