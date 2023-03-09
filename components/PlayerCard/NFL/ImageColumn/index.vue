<template>
  <div
    class="player-card__image-column"
    :style="{'maxHeight': collapsed && !expanded ? 0 : maxHeight + 'px', 'minHeight' : maxHeight || collapsed ? 0 : null}"
  >
    <div
      ref="imageColumn"
      class="player-card__image-column-inner"
    > 
      <div
        class="player-card__image-column-img-wrapper"
        :style="{'maxHeight': topHeight + 'px'}"
      > 
        <img
          :src="player.image"
          :alt="player.imageAlt"
        >
        <img
          v-if="player.offenseDefense === 'offense'"
          src="@/assets/img/icons/offense-o-2021.svg"
          class="player-x-o"
          data-not-lazy
        >
        <img
          v-if="player.offenseDefense === 'defense'"
          src="@/assets/img/icons/defense-x-2021.svg"
          class="player-x-o"
          data-not-lazy
        >
        <div
          v-if="$mq !== 'mobile'"
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
      </div>
      <div class="player-card__image-column-content">
        <DraftTeam
          v-if="teamNameLogo && ['order_mockdraft', 'order_draftresults'].indexOf(rankKey) >= 0 && $mq === 'mobile'"
          :team-name-logo="teamNameLogo"
          :info-height="infoHeight"
        />
        <div v-if="$mq !== 'mobile'">
          <Stats :player="fullPlayer" />
          <CombineResults
            v-if="player.combine"
            :results="player.combine"
          />
          <VideoThumb
            v-if="playerVideo"
            :play-video="playVideo"
            :video-settings="videoSettings"
            :player-video="playerVideo"
            :active-card="activeCard"
            @reset-video-settings="$emit('reset-video-settings')"
          />
          <PodcastCardPlayer
            v-if="player.player_podcast && $mq !== 'mobile'"
            :player-id="playerId"
            :player-podcast="player.player_podcast"
            :player="player"
            :info-height="topHeight"
            :podcast="player.player_podcast"
          />
          <RelatedArticles
            v-if="fullPlayer.player_articles"
            :articles="fullPlayer.player_articles"
          />
        </div>
      </div>
    </div>
    <div
      v-if="$mq === 'mobile'"
      class="player-card__rank"
    >
      <span>{{ rank }}</span>
    </div>
  </div>
</template>

<script>
import DraftTeam from '../DraftTeam'
import PodcastCardPlayer from '~/components/Podcast/NewCardPlayer'
import VideoThumb from '../VideoThumb'
import CombineResults from '../CombineResults.vue';
import RelatedArticles from '../RelatedArticles'
import Stats from '../Stats';
export default {
  name: "NFLImageColumn",
  components: {DraftTeam, PodcastCardPlayer, VideoThumb, RelatedArticles, Stats, CombineResults},
  props: ['playerId', 'collapsed', 'rank', 'infoHeight', 'rankKey', 'topHeight', 'playVideo', 'setImageColHeight', 'expanded', 'videoSettings', 'activeCard'],
  emits: ['reset-video-settings'],
  data() {
    return {
      maxHeight: false
    }
  },
  computed: {
    fullPlayer() {
      return  this.$store.getters['content/player'](this.playerId);
    },
    player () {
      const playerData = this.$store.getters['content/player'](this.playerId);
      return {
        order_mockdraft: playerData.order_mockdraft,
        drafted_team: playerData.drafted_team,
        offenseDefense: playerData.offenseDefense,
        image: playerData.image_data.image.small,
        imageAlt: playerData.title,
        results_via: playerData.results_via,
        title: playerData.title,
        player_meta: playerData.player_meta,
        player_podcast: playerData.player_podcast !== '' ? playerData.player_podcast : false,
        combine: playerData.combine
      }
    },
    teamNameLogo () {
      const map = {
        order: 'bigBoard',
        order_mockdraft: 'mockDraft',
        order_draftresults: 'draftResults'
      };
      const baseZero = this.$store.getters['content/baseZeroSettings'][map[this.rankKey]];
      return this.rankKey  === 'order_mockdraft' ?  this.$store.getters['content/teamNameLogo'](baseZero ? this.player[this.rankKey] : this.player[this.rankKey] - 1) : this.rankKey === 'order_draftresults' ? this.$store.getters['content/teamNameLogoResults'](this.player.drafted_team, this.player.results_via) : this.$store.getters['content/resultsTeamNameLogo'](this.rank);
    },
    playerVideo() {
      return this.fullPlayer.player_video && this.fullPlayer.player_video.video_id ? this.fullPlayer.player_video : false
    }
  },
  watch:{
    expanded() {
      if(!this.$refs.imageColumn) return;
      this.setHeights();
    },
    topHeight() {
      if(!this.$refs.imageColumn) return;
      if(!this.expanded) {
        this.maxHeight = this.$mq === 'mobile' ? 250 : this.topHeight;
      }
      this.setImageColHeight(this.$refs.imageColumn.offsetHeight);
    },
    '$mq'() {
      this.setHeights();
    }
  },
  methods: {
    setHeights() {
      if(this.expanded) {
        let interiorHeight = 30;
        this.$refs.imageColumn.children.forEach((child) => interiorHeight += child.offsetHeight);
        this.setImageColHeight(interiorHeight);
        this.maxHeight = this.$mq === 'mobile' ? 250 : interiorHeight;
      } else {
        this.maxHeight = this.$mq === 'mobile' ? 250 : this.topHeight;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>