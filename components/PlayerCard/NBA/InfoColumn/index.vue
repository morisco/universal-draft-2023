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
      <MetaBar :player="player" :rankKey="rankKey" :collapsed="collapsed" ref="metaBar" v-if="$mq === 'mobile'" v-on:setHeight="setMetaHeight" />
      <template v-if="['mock-draft', 'mock_draft_player_share', 'draft-grades', 'draft_grades_player_share'].indexOf($route.name) >= 0">
        <DraftInfo :teamNameLogo="teamNameLogo" v-if="teamNameLogo" :infoText="['mock-draft', 'mock_draft_player_share'].indexOf($route.name) >= 0 ? player.mock_insight : player.results_insight" />
      </template>
      <template v-if="['mock-draft', 'mock_draft_player_share', 'draft-grades', 'draft_grades_player_share'].indexOf($route.name) === -1">
        <Headline :headline="player.player_description" :selling="player.player_meta.main_selling_point" v-if="$mq !== 'mobile'" />
        <Badges :player="player" v-if="player.badges && player.badges.length > 0" />
        <Headline :headline="player.player_description" :selling="player.player_meta.main_selling_point" v-if="$mq === 'mobile'" />
      </template>

    </div>
    <div class="player-card__bottom-data" ref="bottomData">
      <template v-if="['mock-draft', 'mock_draft_player_share', 'draft-grades', 'draft_grades_player_share'].indexOf($route.name) >= 0">
        <Headline :headline="player.player_description" :selling="player.player_meta.main_selling_point" v-if="$mq !== 'mobile'"  />
        <Badges :player="player" v-if="player.badges && player.badges.length > 0" />
        <Headline :headline="player.player_description" :selling="player.player_meta.main_selling_point" v-if="$mq === 'mobile'" />
      </template>
      <Stats :player="player" v-if="$mq === 'mobile'" />
      <!-- <Headline :headline="player.player_description" :selling="player.player_meta.main_selling_point" v-if="this.collapsed" /> -->
      <ExpandedMeta :player="player" v-if="player.deep_dives" />

      <div class="player-card__bottom-data-extended" v-if="$mq === 'mobile' && (playerVideo || player.player_podcast || player.player_articles)">
        <VideoThumb :playVideo="playVideo" :playerVideo="playerVideo" :expanded="expanded" :activeCard="activeCard" v-if="playerVideo" />
        <PodcastCardPlayer v-if="player.player_podcast" :playerId="player.id" :playerPodcast="player.player_podcast" :infoHeight="topHeight" />
        <RelatedArticles :articles="player.player_articles" v-if="player.player_articles" />
      </div>
    </div>
  </div>
</template>

<script>
import Stats from '../Stats';
import Badges from '../Badges';
import Headline from '../Headline';
import ExpandedMeta from '../ExpandedMeta';
import MetaBar from '../MetaBar';
import VideoThumb from '../VideoThumb'
import RelatedArticles from '../RelatedArticles'
import PodcastCardPlayer from '~/components/Podcast/CardPlayer'
import DraftInfo from '../DraftInfo';
export default {
  props: ['playerId', 'expanded', 'collapsed', 'setMaxHeight', 'setAnimateHeight', 'rankKey', 'playVideo', 'activeCard'],
  components: { Stats, Headline, ExpandedMeta, Badges, MetaBar, PodcastCardPlayer, VideoThumb, RelatedArticles, DraftInfo },
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
      return ['draft-grades', 'draft_grades_player_share'].indexOf(this.$route.name) >= 0 ? this.$store.getters['content/teamNameLogoResults'](this.player.drafted_team, this.player.results_via) : this.$store.getters['content/teamNameLogo'](this.player[this.rankKey]);
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth'];
    }
  },
  methods: {
    windowResized () {
      this.setHeights();
    },
    setMetaHeight(height) {
      this.$emit('setMetaHeight', height);
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
      let interiorHeight = this.$mq === 'mobile' ? 0 : 60;
      this.$refs.topData.children.forEach((child) => interiorHeight += child.offsetHeight);
      this.topHeight = Math.max(255, interiorHeight);
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
    },
    '$mq'() {
      const self = this;
      setTimeout(() => {
        self.topHeight = this.$refs.topData.offsetHeight
        self.setHeights();
      }, 500);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>