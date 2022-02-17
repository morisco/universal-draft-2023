<template>
  <div
    class="sticky-podcast"
    :class="{
      'sticky-podcast--open': isOpen,
      'sticky-podcast--show-mobile': showMobile,
    }"
  >
    <div class="sticky-podcast__trigger" v-if="activePodcast">
      <a :href="activePodcast.spotify_episodeSpotify" target="_blank">
        <img src="~/assets/img/icons/spotify.svg" alt="Spotify" />
      </a>
    </div>
    <div class="sticky-podcast__player" v-if="activePodcast">
      <Topper :content="currentPod" :readyToPlay="readyToPlay" :activePodcast="activePodcast" :duration="duration" :podPlaying="podPlaying || shouldPlay" :playPause="togglePlay" />
      <div
        class="sticky-podcast__player-mini-controls" 
        :class="{
          'sticky-podcast__player-mini-controls--playing': podPlaying || shouldPlay,
          'sticky-podcast__player-mini-controls--mobile': $mq === 'mobile'
        }"
      >
        <div class="mini-controls-inner">
          <button class="mini-controls-back" type="button" v-on:click="skipBack">
            <img src="~/assets/img/icons/skip-back.svg" alt="Skip Back" />
          </button>
          <button class="mini-controls-forward" type="button" v-on:click="skipForward">
            <img src="~/assets/img/icons/skip-forward.svg" alt="Skip Forward" />
          </button>
          <div class="mini-controls-logo-meta">
            <a :href="activePodcast.spotify_episodeSpotify" target="_blank">
              <img src="~/assets/img/icons/spotify.svg" alt="Spotify" />
            </a>
            <div class="mini-controls-meta">
              <button type="button" v-on:click="togglePlay" class="sticky-play-pause">
                <img v-if="podPlaying || shouldPlay" src="~/assets/img/icons/pause.svg" />
                <img v-if="!podPlaying && !shouldPlay" src="~/assets/img/icons/play.svg" />
              </button>
              <div class="sticky-episode-title">{{ currentPod.title }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="sticky-podcast__player-controls">
        <button type="button" v-on:click="skipBack">
          <img src="~/assets/img/icons/skip-back.svg" alt="Skip Back" />
        </button>
        <div class="sticky-podcast__player-controls-progress" v-on:click="progressClick">
          <div class="sticky-podcast__player-controls-progress-inner">
            <div class="sticky-podcast__player-controls-progress-bar" :style="{ maxWidth: progress + '%' }"></div>
          </div>
        </div>
        <button type="button" v-on:click="skipForward">
          <img src="~/assets/img/icons/skip-forward.svg" alt="Skip Forward" />
        </button>
      </div>
              <div class="mini-controls-progress" :style="{'max-width': progress + '%'}" />

    </div>
    <audio preload="auto" ref="audioPlayer" v-on:canplay="audioCanPlay" v-on:timeupdate="watchTime" v-on:ended="podcastEnded"  data-not-lazy>
      <source :src="activePodcast && activePodcast.spotify_episodeMP3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'
import Topper from '~/components/Podcast/Topper.vue';

export default {
  components: { Topper },
  mounted() {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
    if(!this.activePodcast && this.pods && this.currentPod) {
      this.activePodcast = this.pods[this.currentPod.id];
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  data() {
    return {
      activePodcast: null,
      progress: 0,
      currentTime: 0,
      audioTime: 0,
      ended: false,
      isOpen: false,
      showMobile: false,
      currentPodId: null,
      readyToPlay: false,
      shouldPlay: false,
      duration: 0,
      podUpdate: false
    }
  },
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
    },
    pods() {
      return this.$store.getters['content/pods']
    },
    currentPod() {
      return this.$store.getters['page/currentPod']
    },
    podPlaying() {
      return this.$store.getters['page/podPlaying']
    },
    defaultPod() {
      return this.$store.getters['page/defaultPod']
    },
  },
  methods: {
    ...mapActions({
      'storePlayingState': 'podcast/setPlayingState',
      'resetPodcast': 'podcast/resetPodcast',
      'setCompletionPercentage' : 'podcast/setCompletionPercentage',
      'setRemainingTime': 'podcast/setRemaining',
      'setPlaying': 'page/setPlaying',
      'setCurrentPod': 'page/setCurrentPod',
      'setPodTime': 'page/setPodTime',
    }),
    audioCanPlay() {
      this.readyToPlay = true;

    },
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
    watchTime() {
      this.currentTime = this.$refs.audioPlayer ? this.$refs.audioPlayer.currentTime : 0;
    },
    podcastEnded() {
      this.setPlaying(false);
      this.ended = true;
    },
    skipForward() {
      const max = this.currentPod.end ? this.currentPod.end : this.duration;
      this.$refs.audioPlayer.currentTime = Math.min(max, this.currentTime + 15);
      this.setPlaying(true);
    },
    skipBack() {
      const min = this.currentPod.start ? this.currentPod.start : 0;
      this.$refs.audioPlayer.currentTime = Math.max(min, this.currentTime - 15);
      this.setPlaying(true);
    },
    stopAudio() {
      this.resetPodcast();
    },
    progressClick(e) {
      var rect = e.target.getBoundingClientRect();
      var x = e.clientX - rect.left; 
      const percentage = x / rect.width;
      this.$refs.audioPlayer.currentTime = this.currentPod.start ? this.currentPod.start + (this.duration * percentage) : (this.duration * percentage);
      this.setPlaying(true);
    },
    handleScroll() {
      if(!this.activePodcast) return;
      if(window.scrollY > document.querySelector('.main-section__inner').offsetParent.offsetTop) {
        this.showMobile = true
      } else {
        this.showMobile = false
      }
    },
    handlePlayPause() {
      if(this.podPlaying) {
        if(this.readyToPlay) {
          this.$ga.event({
            eventCategory: this.currentPod.type === "clip" ? 'poddcast-clip' : 'podcast-episode',
            eventAction: 'played',
            eventLabel: this.currentPod.show + ' - ' + this.currentPod.title,
          });
          this.$refs.audioPlayer.play();
          this.shouldPlay = false;
        } else {
          this.shouldPlay = true;
        }
        if(this.ended) {
          this.$refs.audioPlayer.currentTime = this.currentPod.start ? this.currentPod.start : 0;
          this.ended = false;
        }
      } else {
        if(this.readyToPlay && this.shouldPlay) {
          this.setPlaying(true);
        } else if(this.$refs.audioPlayer) {
          this.$refs.audioPlayer.pause();
        }
      }
    },
    togglePlay() {
      
      this.setPlaying(!this.podPlaying);
    },
  },
  watch : {
    currentTime() {
      this.setPodTime(this.currentTime);
      if(this.currentPod.start){
        this.progress = ((this.currentTime - this.currentPod.start)/(this.currentPod.end - this.currentPod.start)) * 100;
        if(this.currentTime >= this.currentPod.end) {
          this.setPlaying(false);
          this.ended = true;
        }
      } else {
        this.progress = (this.currentTime/this.duration) * 100;
      }

    },
    podPlaying() {
      this.handlePlayPause();
    },
    readyToPlay() {
      if(this.readyToPlay) {
        this.$refs.audioPlayer.currentTime = this.currentPod.start ? this.currentPod.start : 0;
      }
      this.handlePlayPause();
    },
    shouldPlay() {
      this.handlePlayPause();
    },
    currentPod(newVal, oldVal) {
      if(this.activePodcast) {
        this.shouldPlay = true
      }
      this.podUpdate = true
      if(this.currentPod && this.activePodcast && this.currentPod.id !== this.activePodcast.id) {
        this.readyToPlay = false
      }
      if(this.currentPod && this.pods) {
        this.activePodcast = this.pods[this.currentPod.id];
      }
      this.setPlaying(false);
      this.currentTime = 0;
      this.ended = false;
    },
    activePodcast() {
      this.podUpdate = true;
      // if(this.activePodcast && this.$refs.audioPlayer) {
      //   // this.$refs.audioPlayer.load();
      // }
    },
    pods() {
      if(this.pods && this.defaultPod) {
        this.setCurrentPod({
          id: this.defaultPod,
          start: 0,
          end:null,
          title: this.pods[this.defaultPod].title,
          image: this.pods[this.defaultPod].spotify_showImage,
          show: this.pods[this.defaultPod].spotify_showName,
          type: "full"
        })
      }
    },
    podUpdate() {
      if(!this.podUpdate) return;
      this.podUpdate = false;
      if(this.currentPod.start) {
        this.duration = this.currentPod.end - this.currentPod.start;
        this.$refs.audioPlayer.currentTime = this.currentPod.start;
      } else {
        this.duration = this.activePodcast.spotify_episodeDuration;
         if(this.$refs.audioPlayer) {
          this.$refs.audioPlayer.currentTime = 0;
         }
      }
    }
  },
}
</script>

<style lang="scss">
.sticky{
  &-podcast{
    position:absolute;
    bottom:30px;
    
    width:270px;
    margin-left:-90px;
    border-radius:8px;
    overflow:hidden;
    @media(min-width:1200px)  and (max-height:650px){
      bottom:15px;
    }

    @media(max-width:1400px){
      width:185px;
      margin-left:-15px;

      left:50%;
      transform:translateX(-50%);
    }

    @include single-column{
      width:100%;
      position:fixed;
      border-radius:0;
      bottom:0;
      left:0;
      z-index:5555;
      transform:translateX(0);
      margin-left:0;
      display:flex;
      justify-content:center;
      opacity:0;
      transform:translateY(100%);
      transition: opacity 0s linear 0.25s, transform 0.25s ease-in-out;
      &--show-mobile{
        transform:translateY(0);
        opacity:1;
        transition: opacity 0s linear 0s, transform 0.25s ease-in-out;
      }
      &__player{
        border-radius:0;
        overflow:hidden;
      }
    }
    @include mobile{
      width:100%;
      &__player{
        border-radius:0;
      }
    }

    // @media(max-height:650px){
    //   bottom:15px;
    // }

    // @media(min-width:1200px) and (max-height:650px) {
    //   bottom:auto;
    //   top:calc(100% - 30px);
    //   transition:transform 0.25s ease-in-out;
    //   &--open{
    //     transform:translateY(calc(-100% + 15px));
    //   }
    // }
    &__trigger{
      display:flex;
      @media(min-width:1200px)  and (max-height:650px){
        display:none;
      }
      @include single-column{
        display:none;
      }

      a{
        img{
          vertical-align:bottom;
        }
      }
      
      button{
        display:none;
        margin-left:5px;
        
        align-items:center;
        justify-content:center;
        img{
          width:8px;
          align-self:center;
          transform:rotate(180deg);
          .sticky-podcast--open & {
            transform:rotate(0deg);
          }
        }

        // @media(min-width:1200px) and (max-height:650px) {
        //   display:flex;
        // }
      }
      // @media(min-width:1200px) and (max-height:650px) {
      //   justify-content:center;
      //   a{
      //     pointer-events:none;
      //     .sticky-podcast--open & {
      //       pointer-events:auto;
      //     }
      //   }
      //   &__inner{
      //     margin-bottom:-10px;
      //     border-top-left-radius:8px;
      //     border-top-right-radius:8px;
      //     height:30px;
      //     background:$lightgray;
      //     display:flex;
      //     padding: 3px 10px;
          
      //   }
      // }
      display:flex;
      align-items:center;
    }
    
    //   position:fixed;
    //   left:0;
    //   bottom:0;   
    //   transform:translateX(-100%);
    // }
    &__player{
      margin-top:8px;
      background:$lightgray;
      width:100%;
      border-radius:8px;
      padding:15px 15px 10px;
      overflow:hidden;

      @media(min-width:1200px)  and (max-height:580px){
        padding:8px;
        margin-top:0px;
      }

      @include single-column{
        width:100%;
        padding:8px;
        margin-top:0;
        border-radius:0;
        border-top: 1px solid #d1d1d1;
        // border-top-right-radius:8px;
        // border-top:1px solid $highlight2;
        // border-right:1px solid $highlight2;
      } 
      @include mobile {
        border-radius:0;
        width:100%;
      }




      &-mini-controls{
        
        position:relative;
        z-index:1;
        display:none;
        .mini-controls-inner{
          padding: 0;
          transition:padding 0.25s ease-in-out 0s;
          position:relative;
          display:flex;
          width:100%;
          @media (min-width:1201px) {
            padding:0 0;
          }
          > button{
            position:absolute;
            top:50%;
            transform:translateY(-50%);
            pointer-events:none;
            opacity:0;
            transition:opacity 0.25s linear 0s;
            img{
              vertical-align:bottom;
              margin-bottom:-4px;
            }
            &.mini-controls-back{
              left:0;
            }
            &.mini-controls-forward{
              right:0;
            }
          }
        }
        @media (min-width:1201px)  {
          padding: 0 0;
        }
        @media(min-width:1200px)  and (max-height:650px){
          display:flex;
        }
        
        @include single-column{
          display:flex;
        }
        &--playing{
          .mini-controls-inner{
            padding: 0 30px;
            transition:padding 0.25s ease-in-out 0.25s;
          }
        }
        
       
       
        .mini-controls-logo-meta{
          display:flex;
          align-items:center;
          width:100%;
          justify-content:space-between;
          
          transition:padding-left 0.25s ease-in-out 0s;
          @media (min-width:1201px) and (max-width:1400px) {
            justify-content:flex-end;
          }
          @include single-column{
            justify-content:center;
          }
          @include mobile{
            justify-content:flex-start;
            height:20px;
            padding-left:70px;
          }
          a{
            @include mobile{
              position:absolute;
              left:5px;
              top:50%;
              transform:translateY(-50%);
              margin-right:0;
            }
            flex: 0 0 auto;
            margin-right:10px;
            display:flex;
            align-items:center;
            max-width:60px;
            transition:opacity 0.25s linear 0.25s, left 0.25s linear 0s;
            @media (min-width:1201px) {
              left: 0;
            }

          }
          .mini-controls-meta{
            display:flex;
            max-width:100%;
            max-width:calc(100% - 70px);
            flex:1;
            @media (min-width:1201px) and (max-width:1400px) {
              max-width:100%;
              flex:0 0 auto;
              justify-content:space-between;
            }
            @include single-column{
              flex: 0 0 auto;
              
            }
            @include mobile{
              position:absolute;
              right:16px;
              max-width:calc(100% - 90px);
              transition:all 0.25s ease-in-out;
            }

            button{
              flex: 0 0 auto;
              display:flex;
              align-items:center;
              margin-right:5px;
              @media (max-width:1400px){
                margin-right:0;
              }
              @include single-column{
                margin-right:5px;
              }
              img{
                vertical-align: bottom;
                height:12px;
              }
            }
            .sticky-episode-title{
              flex:1;
              white-space:nowrap;
              text-overflow:ellipsis;
              overflow:hidden;
              margin-top:-2px;
              @media (min-width:1201px) and (max-width:1400px) {
                display:none;
              }
              @include single-column{
                display:block;
                margin-top:0;
                flex: 0 0 auto;
              }
              @include mobile{
                flex:1;
              }

            }
            
          }
        }
         &--playing {
           .mini-controls-inner{
             > button{
               opacity:1;
               pointer-events:auto;
               transition:opacity 0.25s linear 0.25s;
             }
           }
          .mini-controls-logo-meta{
            padding-left:0;
            transition:padding-left 0.25s ease-in-out 0.25s;
            .mini-controls-meta{
              @include mobile{
                transition:all 0.25s ease-in-out;
                right: 50%;
                transform:translateX(50%);
                max-width:calc(100% - 70px);
              }
            }

            a{
              @include mobile{
                opacity:0;
                pointer-events:none;
                transition:opacity 0.25s linear 0s, left 0.25s linear 0.25s;
              }
              @media (min-width:1201px) and (max-width:1400px) {
                opacity:1;
                pointer-events:none;
                left: 30px;
              }

            }
          }

        }
      }
      
      &-top{
        display:flex;
        position:relative;
        width:100%;
        .sticky-podcast & {
          @media(min-width:1200px)  and (max-height:580px){
            display:none;
          }
          @include single-column{
            display:none;
          }
        }

        .album-art{
          position:relative;
          width:90px;
          align-self:flex-start;
          max-width:calc(37% - 10px);
          background:$gray;
          margin-right:10px;
          .card-item & {
            width:80px;
          }
          .sticky-podcast & {
            @media(min-width:1201px) and (max-width:1400px) {
              display:none;
            }
            @media(min-width:1200px)  and (max-height:650px){
              display:none;
            }
          }
          &:after{
            content:'';
            display:block;
            width:100%;
            padding-top:100%;
          }
          > img{
            position:absolute;
            left:0;
            top:0;
            height:100%;
            width:100%;
            object-fit:cover;
            object-position:center top;
            
          }
          &--player{
            > img{
              object-position: center 5px;
            }
          }
        }
        &-content{
          flex:1;
        .album-show-name{
          display:flex;
          align-items:center;
          img{
            display:none;
            @media(min-width:1201px) and (max-width:1400px) {
              display:block;
              width:25px;
              margin-right:5px;
              margin-top:-3px;
            }
          }
          .sticky-podcast & {
            @media(min-width:1200px)  and (max-height:650px){
              margin-bottom:8px;
            }
          }
        }
          .sticky-show-name{
            @include podcast-show-name;
            white-space:nowrap;
            text-overflow:ellipsis;
            .card-item & {
              margin-bottom:4px;
            }
            
          }
          .sticky-episode-title{
            @include podcast-episode-name;
             display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;  
              overflow: hidden;
            padding-bottom:3px;
            margin-bottom:4px;
            margin-top:-4px;
            .sticky-podcast & {
              @media(min-width:1200px)  and (max-height:650px){
                margin-bottom:5px;
              }
            }

          }
          .sticky-play-meta{
            display:flex;
            align-items:center;
            margin-top:2px;
            .sticky-podcast & {
              @media(min-width:1200px)  and (max-height:650px){
                display:none;
              }
            }

            .sticky-play-pause{
              width:9px;
              img{
                width:100%;
                max-width:100%;
              }
            }
            .sticky-meta-duration{
              @include podcast-duration;
              margin-top:-3px;
              margin-left:3px;
              margin-right:10px;
            }
            .sticky-meta-release {
              @include podcast-duration;
              margin-top:-3px;
              color:$headlinegray;
            }
          }
        }
      }
      &-controls{
        display:flex;
        align-items:center;
        margin-top:10px;  
        @media(min-width:1200px)  and (max-height:650px){
          display:none;
        }
        @include single-column{
          display:none;
        }
        @media(min-width:1201px) and (max-width:1400px) {
          margin-top:10px;
        }
        button{
          flex: 0 0 auto;
          img{
            vertical-align:bottom;
          }
        }
        &-progress{
          margin: 0 8px;
          height: 100%;
          display:flex;
          flex-direction:column;
          justify-content:center;
          cursor:pointer;
          flex:1;
          padding:5px 0;
          margin-top:-3px;
          &-inner{
            position:relative;

            border-radius:5px;
            height:3px;
            overflow:hidden;
            background:#d1d1d1;
          }
          &-bar{
            height:3px;
            position:absolute;
            left:0;
            top:0;
            background:$headlinegray;
            width:100%;
            max-width:0;
            transition:max-width 0.25s ease-in-out;
          }
        }
        
      }
    }
  .mini-controls-progress{
    display:none;
         position:absolute;
         top:0;
         left:0;
         width:100%;
         bottom:0;
         background:$highlight2;
         opacity: 0.1;
         max-width:0;
         z-index:0;
         transition:max-width 0.25s ease-in-out;

         @media(min-width:1200px)  and (max-height:650px){
          display:flex;
        }
        
        @include single-column{
          display:flex;
        }
       }
  }
}
</style>