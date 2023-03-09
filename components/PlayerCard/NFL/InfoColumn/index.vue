<template>
  <div 
    class="player-card__info-column" 
    :class="{
      'player-card__info-column--expanded': expanded,
      'player-card__info-column--mounted': mounted,
      'player-card__info-column--animate': animateHeight
    }"
    :style="[maxHeight] ? {maxHeight: maxHeight + 'px', height: height ? height + 'px' : null}: []"
  >
    <div
      ref="topData"
      class="player-card__top-data"
    >
      <MetaBar
        v-if="$mq === 'mobile'"
        ref="metaBar"
        :player="player"
        :rank-key="rankKey"
        :collapsed="collapsed"
        @set-height="setMetaHeight"
      />
      <template v-if="['mock-draft', 'mock_draft_player_share', 'draft-grades', 'draft_results_player_share'].indexOf($route.name) === -1 && player.fan_letter && $mq !== 'mobile'">
        <FanLetter
          :fan-letter="player.fan_letter"
          :show-letter="showLetter"
          :expanded="expanded"
          :top-height="topHeight"
          @set-letter-height="setLetterHeight"
        />
      </template>
      <template v-if="['mock-draft', 'mock_draft_player_share', 'draft-grades', 'draft_grades_player_share'].indexOf($route.name) >= 0">
        <DraftInfo
          v-if="teamNameLogo"
          :team-name-logo="teamNameLogo"
          :info-text="['mock-draft', 'mock_draft_player_share'].indexOf($route.name) >= 0 ? player.mock_insight : player.results_insight"
          :grade="['draft-grades', 'draft_grades_player_share'].indexOf($route.name) >= 0 ? player.results_grade : null"
        />
      </template>
      <template
        v-if="
          ['mock-draft', 'mock_draft_player_share', 'draft-grades', 'draft_grades_player_share'].indexOf($route.name) === -1
            && ($mq === 'mobile' || !player.fan_letter || (player.fan_letter && !expanded) )
        "
      >
        <div
          v-if="$mq === 'mobile'"
          class="image-column-meta"
        >
          <div class="image-column-meta-column">
            <div>
              <strong>HEIGHT</strong>&nbsp;{{ player.player_meta.height }}
            </div>
            <div>
              <strong>WEIGHT</strong>&nbsp;{{ player.player_meta.weight }}
            </div>
          </div>
          <div class="separator" />
          <div class="image-column-meta-column">
            <div>
              <strong>YEAR</strong>&nbsp;{{ player.player_meta.year }}
            </div>
            <div>
              <strong>AGE</strong>&nbsp;{{ player.player_meta.age }}
            </div>
          </div>
        </div>
        <div class="shades-of">
          <div class="shades-of-icon-wrapper">
            <div class="shades-of-icon">
              <img
                src="@/assets/img/icons/shades-of-icon-black.svg"
                alt="Venn Diagaram Icon"
                data-not-lazy
                class="non-hover"
              >
            </div>
            <span class="label">Shades Of&nbsp;</span>
          </div>
          <div class="shades-of-value">
            {{ player.player_meta.shades_of }}
          </div>
        </div>
        <Badges
          v-if="player.badges && player.badges.length > 0 && $mq === 'mobile'"
          :player="player"
        />
        <Headline
          :headline="player.player_description"
          :selling="player.player_meta.main_selling_point"
        />
        <Badges
          v-if="player.badges && player.badges.length > 0 && $mq !== 'mobile'"
          :player="player"
        />
      </template>
    </div>
    <div
      ref="bottomData"
      class="player-card__bottom-data"
    >
      <template 
        v-if="
          [
            'mock-draft',
            'mock_draft_player_share',
            'draft-grades',
            'draft_grades_player_share'
          ].indexOf($route.name) >= 0
        "
      >
        <div class="shades-of">
          <div class="shades-of-icon-wrapper">
            <div class="shades-of-icon">
              <img
                src="@/assets/img/icons/shades-of-icon-black.svg"
                alt="Venn Diagaram Icon"
                data-not-lazy
                class="non-hover"
              >
            </div>
            <span class="label">Shades Of&nbsp;</span>
          </div>
          <div class="shades-of-value">
            {{ player.player_meta.shades_of }}
          </div>
        </div>
        <Headline
          v-if="$mq !== 'mobile'"
          :headline="player.player_description"
          :selling="player.player_meta.main_selling_point"
        />
        <Badges
          v-if="player.badges && player.badges.length > 0"
          :player="player"
        />
        <Headline
          v-if="$mq === 'mobile'"
          :headline="player.player_description"
          :selling="player.player_meta.main_selling_point"
        />
      </template>
      <template v-else-if="player.fan_letter && $mq !== 'mobile'">
        <div class="shades-of">
          <div class="shades-of-icon-wrapper">
            <div class="shades-of-icon">
              <img
                src="@/assets/img/icons/shades-of-icon-black.svg"
                alt="Venn Diagaram Icon"
                data-not-lazy
                class="non-hover"
              >
            </div>
            <span class="label">Shades Of&nbsp;</span>
          </div>
          <div class="shades-of-value">
            {{ player.player_meta.shades_of }}
          </div>
        </div>
        <Headline
          :headline="player.player_description"
          :selling="player.player_meta.main_selling_point"
          :player="player"
          :player-meta="player"
        />
        <Badges
          v-if="player.badges && player.badges.length > 0"
          :player="player"
        />
        <div class="letter-bottom-spacer" />
      </template>
      <template v-if="player.fan_letter && $mq === 'mobile' && ['mock-draft', 'mock_draft_player_share', 'draft-grades', 'draft_results_player_share'].indexOf($route.name) === -1">
        <LetterTrigger />
        <FanLetter
          :fan-letter="player.fan_letter"
          :show-letter="showLetter"
          :expanded="expanded"
          :top-height="topHeight"
          @set-letter-height="setLetterHeight"
        />
      </template>
      <Stats
        v-if="$mq === 'mobile'"
        :player="player"
      />
      <ExpandedMeta
        v-if="player.deep_dives && player.position === 'qb'"
        :player="player"
        :expanded="true"
      />
      <AdvancedQBStats
        v-if="player.qb_advanced_stats"
        :id="player.id"
        :advanced-qb-stats="player.qb_advanced_stats"
      />
        
      <CombineResults
        v-if="$mq === 'mobile' && player.combine"
        :results="player.combine"
        :is-qb="player.position === 'qb'"
      />
      <!-- <Headline :headline="player.player_description" :selling="player.player_meta.main_selling_point" v-if="this.collapsed" /> -->
      <ExpandedMeta
        v-if="player.deep_dives && player.position !== 'qb'"
        :player="player"
      />
      

      <div
        v-if="$mq === 'mobile' && (playerVideo || player.player_podcast || player.player_articles)"
        class="player-card__bottom-data-extended"
      >
        <VideoThumb
          v-if="playerVideo"
          :play-video="playVideo"
          :player-video="playerVideo"
          :expanded="expanded"
          :active-card="activeCard"
        />
        <PodcastCardPlayer
          v-if="player.player_podcast"
          :player-id="playerId"
          :player-podcast="player.player_podcast"
          :player="player"
          :info-height="topHeight"
          :podcast="player.player_podcast"
        />
        <RelatedArticles
          v-if="player.player_articles"
          :articles="player.player_articles"
        />
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
import PodcastCardPlayer from '~/components/Podcast/NewCardPlayer'
import DraftInfo from '../DraftInfo';
import CombineResults from '../CombineResults.vue'
import AdvancedQBStats from '../AdvancedQBStats/index.vue';
import FanLetter from '../FanLetter.vue';
import LetterTrigger from '../LetterTrigger.vue';
export default {
  name: "NFLInfoColumn",
  components: { Stats, Headline, ExpandedMeta, Badges, MetaBar, PodcastCardPlayer, VideoThumb, RelatedArticles, DraftInfo, CombineResults, AdvancedQBStats, FanLetter, LetterTrigger },
  props: ['playerId', 'expanded', 'collapsed', 'setMaxHeight', 'setAnimateHeight', 'rankKey', 'playVideo', 'activeCard', 'showLetter'],
  emits: ['set-meta-height', 'set-top-height', 'set-info-height', 'show-letter'],
  data () {
    return {
      mounted: false,
      windowSize: null,
      topHeight: null,
      maxHeight: null,
      animateHeight: false,
      letterHeight: null,
      height: null
    }
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
  watch : {
    showLetter() {
      if(this.showLetter && this.letterHeight && !this.expanded) {
        const htu = Math.max(this.letterHeight, this.topHeight);
        this.setMaxHeight(htu);
        this.maxHeight = htu;
        if(!this.expanded) {
          this.height = htu;
        } else {
          this.height = null
        }
      } else {
        this.height = null;
        this.setHeights();
      }
    },
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
      if(this.expanded) {
        this.height = null;
        this.$emit('show-letter', true);
      } else {
      }
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
  },
  mounted() {
    const self = this;
    setTimeout(() => {
      self.mounted = true;
    }, 500);
    window.addEventListener('resize', this.windowResized);
  },
  unmounted(){
    window.removeEventListener('resize', this.windowResized);
  },
  methods: {
    setLetterHeight(letterHeight) {
      this.letterHeight = letterHeight + 110;
    },
    windowResized () {
      this.setHeights();
    },
    setMetaHeight(height) {
      this.$emit('set-meta-height', height);
    },
    setHeights() {
      const self = this;
      if(!this.mounted) return

      if(this.expanded || this.viewDepth === 'deep'){
        const htu = this.player.fan_letter ? this.letterHeight : this.topHeight;
        this.maxHeight = htu + this.$refs.bottomData.offsetHeight
      } else if(this.collapsed){
        this.maxHeight = this.$mq === 'mobile' ? this.topHeight : 125
      } else {
        this.maxHeight = this.topHeight
      }
      this.setMaxHeight(this.maxHeight);
      this.$emit('set-top-height', this.topHeight)
      this.$emit('set-info-height', this.maxHeight);
      setTimeout(() => {
        if(!self.expanded) {
          self.height = self.maxHeight
        } else {
          self.height = null
        }
      }, this.showLetter ? 0 : 500)
      setTimeout(() => {
        this.setAnimateHeight(true);
        self.animateHeight = true;
      }, 500);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>