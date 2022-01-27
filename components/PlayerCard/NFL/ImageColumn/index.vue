<template>
  <div class="player-card__image-column"  :style="{'maxHeight': collapsed && !expanded ? 0 : maxHeight + 'px', 'minHeight' : maxHeight || collapsed ? 0 : null}">
    <div class="player-card__image-column-inner" ref="imageColumn"> 
      <div class="player-card__image-column-img-wrapper" :style="{'maxHeight': topHeight + 'px'}"> 
        <img :src="player.image" :alt="player.imageAlt" />
        <img src="@/assets/img/icons/offense-o-2021.svg" v-if="player.offenseDefense === 'offense'" class="player-x-o" data-not-lazy />
        <img src="@/assets/img/icons/defense-x-2021.svg" v-if="player.offenseDefense === 'defense'" class="player-x-o" data-not-lazy />
      </div>
      <div class="player-card__image-column-content">
        <DraftTeam :teamNameLogo="teamNameLogo" v-if="teamNameLogo && ['order_mockdraft', 'order_draftresults'].indexOf(rankKey) >= 0" :infoHeight="infoHeight" />
        <div v-if="$mq !== 'mobile'">
          <Stats :player="fullPlayer" />
          <VideoThumb :playVideo="playVideo" :videoSettings="videoSettings" :playerVideo="playerVideo" :activeCard="activeCard" v-if="playerVideo" v-on:resetVideoSettings="$emit('resetVideoSettings')" />
          <PodcastCardPlayer v-if="player.player_podcast && $mq !== 'mobile'" :playerId="playerId" :playerPodcast="player.player_podcast" :player="player" :infoHeight="topHeight" :podcast="player.player_podcast" />
          <RelatedArticles :articles="fullPlayer.player_articles" v-if="fullPlayer.player_articles" />
        </div>
      </div>
    </div>
    <div class="player-card__rank" v-if="$mq === 'mobile'">
      <span>{{rank+1}}</span>
    </div>
  </div>
</template>

<script>
import DraftTeam from '../DraftTeam'
import PodcastCardPlayer from '~/components/Podcast/NewCardPlayer'
import VideoThumb from '../VideoThumb'
import RelatedArticles from '../RelatedArticles'
import Stats from '../Stats';
export default {
  props: ['playerId', 'collapsed', 'rank', 'infoHeight', 'rankKey', 'topHeight', 'playVideo', 'setImageColHeight', 'expanded', 'videoSettings', 'activeCard'],
  components: {DraftTeam, PodcastCardPlayer, VideoThumb, RelatedArticles, Stats},
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
        drafted_team: playerData.drafted_team,
        offenseDefense: playerData.offenseDefense,
        image: playerData.image_data.image.small,
        imageAlt: playerData.title,
        results_via: playerData.results_via,
        title: playerData.title,
        player_podcast: playerData.player_podcast !== '' ? playerData.player_podcast : false
      }
    },
    teamNameLogo () {
      return this.rankKey  === 'order_mockdraft' ?  this.$store.getters['content/teamNameLogo'](this.rank) : this.rankKey === 'order_draftresults' ? this.$store.getters['content/teamNameLogoResults'](this.player.drafted_team, this.player.results_via) : this.$store.getters['content/resultsTeamNameLogo'](this.rank);
    },
    playerVideo() {
      return this.fullPlayer.player_video && this.fullPlayer.player_video.video_id ? this.fullPlayer.player_video : false
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
  }
}
</script>

<style lang="scss">
  @import './style.scss'
</style>