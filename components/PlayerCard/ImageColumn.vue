<template>
  <div class="player-card__image-column">
    <div class="player-card__image-column-inner">  
      <img :src="player.image" :alt="player.imageAlt" />
      <CombineResults :results="player.combineResults" :topHeight="topHeight" v-if="['mock-draft', 'draft-results'].indexOf($route.name) < 0 && $mq !== 'mobile'" />
    </div>
    <div class="player-card__rank">
      <span>{{rank+1}}</span>
    </div>
    <DraftTeam :teamNameLogo="teamNameLogo" v-if="teamNameLogo && ['order_mockdraft', 'order_draftresults'].indexOf(rankKey) >= 0" :infoHeight="topHeight" />
    <DraftInfo :teamNameLogo="teamNameLogo" v-if="teamNameLogo && ['order_mockdraft', 'order_draftresults'].indexOf(rankKey) >= 0" :infoHeight="topHeight" />
    <PodcastCardPlayer v-if="player.player_podcast" :playerId="playerId" :playerPodcast="player.player_podcast" :infoHeight="topHeight" />
  </div>
</template>

<script>
import CombineResults from './CombineResults'
import DraftTeam from './DraftTeam'
import DraftInfo from './DraftInfo'
import PodcastCardPlayer from '~/components/Podcast/CardPlayer'
export default {
  props: ['playerId', 'collapsed', 'rank', 'infoHeight', 'rankKey', 'topHeight'],
  components: {CombineResults, DraftTeam, DraftInfo, PodcastCardPlayer},
  computed: {
    player () {
      const playerData = this.$store.getters['content/player'](this.playerId);
      return {
        image: playerData.image_data.image.small,
        imageAlt: playerData.title,
        combineResults: playerData.combine_results,
        player_podcast: playerData.player_podcast !== '' ? playerData.player_podcast : false
      }
    },
    teamNameLogo () {
      return this.$store.getters['content/teamNameLogo'](this.rank);
    }
  }
}
</script>

<style lang="scss">
  .player-card{
    &__image-column{
      display:flex;
      flex-direction:column;
      position:relative;
      max-width: calc(100% - 800px);
      width:250px;
      transition:max-width 0.625s ease-in-out 0s;
      z-index:2;
      @include tablet-portrait-only{
        max-width:17.5%;
      }
      @include mobile {
        width:100%;
        max-width:100%;
        min-height:220px;
      }
      .player-card--collapsed & {
        transition:max-width 0.25s ease-in-out 0s;
      }
      &-inner{
        position:relative;
        flex:1; 
        background:$black;  
        background-size: 20px;
        background-position: center top;
        border-radius: .625rem  0 0 .625rem;
        overflow:hidden;
        .player-card--offense &{
          background-image: url('~@/assets/img/icons/offense-o.svg');
        }
        .player-card--defense & {
          background-image: url('~@/assets/img/icons/defense-x.svg');
        }
      }
      @include non-mobile{
        .player-card--collapsed &{
          max-width: 15.5%;
        }
        .player-card--expanded & {
          max-width: calc(100% - 800px);
        }
      }
      @include tablet{
        .player-card--expanded & {
          max-width:17.5%;
        }
      }
      @include mobile {
        .player-card--expanded & {
          max-width:100%;
        }
      }
      img{
        position:absolute;
        top:0;
        width:100%;
        opacity:0;
        transition:opacity 0.25s linear 0.1s;
      }
      img.isLoaded {
        opacity:1;
      }
    }
    &__rank{
      @include rank;
      position:absolute;
      background:$lightgray;
      top: 23px;
      right: -25px;
      width: 50px;
      height: 50px;
      display:flex;
      justify-content:center;
      align-items:center;
      border-radius:100%;
      transition:top 0.5s linear 0.125s;
      @include non-mobile{
        .player-card--collapsed & {
          top:35px;
          transition:top 0.5s linear 0.125s;
        }
      }
      @include mobile{
        top:15px;
        left:15px;
        right:auto;
        line-height:18px;
        span{
          height:20px;
        }
      }
    }
  }
</style>