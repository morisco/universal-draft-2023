<template>
  <div 
    class="player-card__info-column" 
    :class="{
      'player-card__info-column--expanded': expanded,
      'player-card__info-column--mounted':  mounted,
      'player-card__info-column--animate':  animateHeight
    }"
    v-bind:style="[maxHeight] ? {maxHeight: maxHeight + 'px'}: []"
  >
    <div class="player-card__top-data" ref="topData">
      <template v-if="$route.name === 'mock-draft'">
        <DraftInfo :teamNameLogo="teamNameLogo" v-if="teamNameLogo" />
      </template>
      <template v-if="$route.name !== 'mock-draft'">
        <MetaBar :player="player" :rankKey="null" ref="metaBar" v-if="$mq === 'mobile'" />
        <Headline :headline="player.player_description" :selling="player.player_meta.main_selling_point" v-if="$mq !== 'mobile' && !this.collapsed" />
        <Badges :player="player" v-if="player.badges.length > 0" />
        <Headline :headline="player.player_description" :selling="player.player_meta.main_selling_point" v-if="$mq === 'mobile' && !this.collapsed" />
      </template>

    </div>
    <div class="player-card__bottom-data" ref="bottomData">
      <Stats :player="player" v-if="$mq === 'mobile'" />
      <CombineResults :results="player.combine_results" :topHeight="topHeight" v-if="$mq === 'mobile'" />
      <MetaList :playerMeta="player.player_meta" v-if="$mq === 'mobile' && this.collapsed " />
      <Headline :headline="player.player_description" :selling="player.player_meta.main_selling_point" v-if="this.collapsed" />
      <ExpandedMeta :player="player" />

      <div class="player-card__bottom-data-extended" v-if="$mq === 'mobile'">
        <VideoThumb :playVideo="playVideo" :playerVideo="playerVideo" :expanded="expanded" :activeCard="activeCard" v-if="playerVideo" />
        <PodcastCardPlayer v-if="player.player_podcast" :playerId="player.id" :playerPodcast="player.player_podcast" :infoHeight="topHeight" />
        <RelatedArticles />
      </div>
    </div>
  </div>
</template>

<script>
import BasicMeta from './BasicMeta';
import Stats from './Stats';
import Badges from './Badges';
import MetaList from './MetaList';
import Headline from './Headline';
import ExpandedMeta from './ExpandedMeta';
import MetaBar from './MetaBar';
import DraftInfo from './DraftInfo';
import VideoThumb from './VideoThumb'
import RelatedArticles from './RelatedArticles'
import PodcastCardPlayer from '~/components/Podcast/CardPlayer'
export default {
  props: ['playerId', 'expanded', 'collapsed', 'setMaxHeight', 'setAnimateHeight', 'rank', 'playVideo', 'activeCard'],
  components: { BasicMeta, Stats, MetaList, Headline, ExpandedMeta, Badges, MetaBar, PodcastCardPlayer, VideoThumb, RelatedArticles },
  data () {
    return {
      mounted: false,
      windowSize: null,
      topHeight: null,
      maxHeight: null,
      animateHeight: false
    }
  },
  mounted() {
    const self = this;
    setTimeout(() => {
      self.mounted = true;
    }, 500);
    window.addEventListener('resize', this.windowResized);
  },
  destroyed(){
    window.removeEventListener('resize', this.windowResized);
  },
  computed: {
    player () {
      return this.$store.getters['content/player'](this.playerId);
    },
    playerVideo() {
      return this.player.player_video && this.player.player_video.video_id ? this.player.player_video : false
    },
    teamNameLogo () {
      return this.$store.getters['content/teamNameLogo'](this.rank);
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth'];
    }
  },
  methods: {
    windowResized () {
      this.setHeights();
    },
    setHeights() {
      const self = this;
      if(!this.mounted) return

      if(this.expanded || this.viewDepth === 'deep'){
        this.maxHeight = this.topHeight + this.$refs.bottomData.offsetHeight
      } else if(this.collapsed){
        this.maxHeight = this.$mq === 'mobile' ? this.topHeight : 125
      } else {
        this.maxHeight = this.topHeight
      }
      this.setMaxHeight(this.maxHeight);
      this.$emit('set-top-height', this.topHeight)
      this.$emit('set-info-height', this.maxHeight);
      setTimeout(() => {
        this.setAnimateHeight(true);
        self.animateHeight = true;
      }, 500);
    }
  },
  watch : {
    viewDepth(newDepth) {
      this.setHeights();
    },
    collapsed(newCollapsed) {
      this.topHeight = this.$refs.topData.offsetHeight
      this.setHeights();
    },
    expanded(newExpanded) {
      this.setHeights();
    },
    topHeight(newTopHeight, oldTopHeight) {
      if(newTopHeight !== this.maxHeight){
        this.setHeights();
      }
    },
    mounted(newMounted) {
      this.topHeight = this.$refs.topData.offsetHeight
      this.setHeights();
    }
  }
}
</script>

<style lang="scss">
  .player-card{
    // max-height:313px;
    &__info-column{
      position:relative;
      flex:1;
      opacity:1;
      overflow-x:visible;
      overflow-y:hidden;
      &--animate{
        transition:max-height 0.5s ease-out, max-width 0s linear 0.125s;
        @include mobile { 
          transition:max-height 0.5s linear, max-width 0s linear 0.125s;
          .player-card--expanded & {
            transition:max-height 0.5s ease-out, max-width 0s linear 0.125s;
          }
        }
      }
      // max-height:313px;
      @include tablet-portrait-only{
        // max-width:87.5%;
      }
      @include mobile {
        width:100%;
        max-width:100%;
        background:white;
        padding-bottom:30px;
        .player-card--collapsed &{
          padding-bottom:15px;
          .player-card--expanded & {
            padding-bottom:0;
          }
        }
      }
      @include non-mobile{
        .player-card--collapsed &{
          max-width:84.5%;
          transition:all 0.25s ease-in-out 0.125s, max-height 0.25s ease-in-out 0.125s;
        }
        .player-card--transitioning & {
          transition:all 0.5s ease-in-out 0.125s, max-height 0.2s ease-in-out 0s;
          .player-card__top-data,
          .player-card__bottom-data{
            -webkit-animation: infoColumn-collapse 0.75s 1 linear;
              animation: infoColumn-collapse 0.75s 1 linear;
          }
        }
      }
    }
    &__meta-column{
      display:flex;
      flex-direction:column;
      flex:1;
    }
    &__top-data{
      display:flex;
      flex-direction:column;
      padding:30px;
      min-height:255px;
      .player-card--collapsed & {
        min-height:0;
      }
      @include mobile {
        padding:0;
        flex-direction:column;
        border-radius: 0 0 0.625rem 0.625rem;
      }
    }
    &__meta-stats{
      display:flex;
      justify-content:space-between;
      width:100%;
      @include mobile {
        flex-direction:column;
      }
    }
    &__bottom-data{
      > *{
        opacity:0;
        transition:opacity 0.25s linear 0s;
      }
      @include mobile{
        background:$lightgray;
        padding-bottom:20px;
        border-radius:0 0 0.625rem 0.625rem;
        margin-top:0.75rem;
        &-extended{
          padding:0 20px;
          &:before{
            content:'';
            display:block;
            width:100%;
            height:1px;
            background:$darkmediumgray;
            margin-bottom:20px;
          }
        }
      }
      .player-card--expanded & {
        margin-top:0;
        > *{
          opacity:1;
          transition:opacity 0.25s linear 0.5s;
        }
      }
    }
  }
  
  @keyframes infoColumn-collapse {
    0% {
      opacity: 1; 
    } 20%, 80% {
      opacity: 0; 
    } 100% {
      opacity: 1; 
    }
  }
</style>