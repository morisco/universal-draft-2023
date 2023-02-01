<template>
  <div class="podcast-inter__item card-item">
    <div class="podcast-inter__item-top">
      <span class="date">
        {{ $moment(pod.spotify_episodeReleaseDate).format('MMM. DD') }}        
      </span>
      <div
        class="title-player"
        @click="handlePlayClick"
      >
        <span class="title">
          {{ pod.title }}
        </span>
        <Chicklet :pod="pod" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Chicklet from './Chicklet'

export default {
  name: "PodcastCard",
  components: { Chicklet },
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
     &__item{
      width:100%;
      display:flex;
      flex-direction:column;
      margin-bottom:20px;
      .title-player{
        cursor:pointer;
      }
      &-top{
        .date{
          @include pod-date;
          color:$highlight1;
        }
        .title{
          @include pod-title;
        }
      }
      .sticky-podcast__player-top{
        display:flex;
      }
      @include single-column{
        // width:calc(33.33% - 10px);
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
      flex:1;
      p{
        display: -webkit-box;
        @include player-card-body;
        line-clamp:4;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        line-height:1.3;
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
          width:10px;
        }
      }
      &-duration{
        flex:1;
        margin-left:5px;
        @include podcast-duration;
        span{
          color:$gray;
          display:inline-block;
          margin-left:2px;
        }
      }
      &-link{
        width:22px;
        height:22px;
        img{
          width:100%;
          vertical-align:bottom;
        }

      }
    }
  }
</style>