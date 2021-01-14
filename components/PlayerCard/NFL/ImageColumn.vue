<template>
  <div class="player-card__image-column">
    <div class="player-card__image-column-inner"> 
      <div class="player-card__image-column-img-wrapper"> 
        <img :src="player.image" :alt="player.imageAlt" />
        <img src="@/assets/img/icons/offense-o-2021.svg" v-if="player.offenseDefense === 'offense'" class="player-x-o" />
        <img src="@/assets/img/icons/defense-x-2021.svg" v-if="player.offenseDefense === 'defense'" class="player-x-o" />
      </div>
      <div class="player-card__image-column-content" :style="{top: topHeight + 'px'}">
        <DraftTeam :teamNameLogo="teamNameLogo" v-if="teamNameLogo && ['order_mockdraft', 'order_draftresults'].indexOf(rankKey) >= 0" :infoHeight="infoHeight" />
        <DraftInfo :teamNameLogo="teamNameLogo" v-if="teamNameLogo && ['order_mockdraft', 'order_draftresults'].indexOf(rankKey) >= 0" />
        <PodcastCardPlayer v-if="player.player_podcast && $mq !== 'mobile'" :playerId="playerId" :playerPodcast="player.player_podcast" :infoHeight="topHeight" />
        <CombineResults :results="player.combineResults" :topHeight="topHeight" v-if="['mock-draft', 'draft-results'].indexOf($route.name) < 0 && $mq !== 'mobile'" />
      </div>
    </div>
    <div class="player-card__rank" v-if="$mq === 'mobile'">
      <span>{{rank+1}}</span>
    </div>
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
        offenseDefense: playerData.offenseDefense,
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
      padding:0 0 0;  
      // max-width: calc(100% - 800px);
      width:300px;
      min-width:300px;
      flex:0 0 auto;
      transition:max-width 0.625s ease-in-out 0s;
      z-index:2;
     
      // @include tablet-portrait-only{
      //   max-width:17.5%;
      // }
      @include mobile {
        padding-top:0;
        width:100%;
        max-width:100%;
        min-height:250px;
        background:white;
      }
      .player-card--collapsed & {
        transition:max-width 0.25s ease-in-out 0s;
      }
      &-content{
        position:absolute;
        left:30px;
        right:30px;
        @include mobile{
          top: 150px !important;
          transform:translateY(-100%);
        }
      }
      &-inner{
        position:relative;
        flex:1;
        width:100%;
        // width:calc(100% - 40px); 
        // border-right:1px solid $darkmediumgray;
        padding:30px 30px 0;
        // background:$black;  
        // background-size: 20px;
        // background-position: center top;
        border-radius: .625rem  0 0 .625rem;
        overflow:hidden;
        .player-x-o{
          margin: 0 auto;
          z-index: -1;
          right: auto;
          width: auto;
          height: 100%;
          top: 15px;
          left: 50%;
          transform: translate(-50%,0);
          max-height:220px;
          @include mobile {
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            height: 100%;
            max-height: 100%;
          }
        }
        img:not(.player-x-o){
          top:20px;
          @include mobile{
            max-width:300px;
            top:0;
            left:50%;
            transform:translateX(-50%);
          }
        }
         &:after{
          content:'';
          display:block;
          position:absolute;
          right:0;
          top:0;
          bottom:30px;
          width:1px;
          background:$darkmediumgray;
          opacity:0;
          transition:opacity 0.25s linear 0.25s;
          .player-card--expanded & {
            opacity:1;
          }
          @include mobile{
            display:none;
          }
        }
        // .player-card--offense &{
        //   background-image: url('~@/assets/img/icons/offense-o.svg');
        // }
        // .player-card--defense & {
        //   background-image: url('~@/assets/img/icons/defense-x.svg');
        // }
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
      &-img-wrapper img{
        position:absolute;
        top:0;
        width:100%;
        left:20px;
        right:20px;
        width:calc(100% - 40px);
        opacity:0;
        transition:opacity 0.25s linear 0.1s;
      }
      &-img-wrapper img.isLoaded {
        opacity:1;
      }
    }
    &__rank{
      @include rank;
      position:absolute;
      background:$black;
      color:$white;
      top: 15px;
      right: -25px;
      width: 50px;
      height: 50px;
      display:flex;
      justify-content:center;
      align-items:center;
      border-radius:100%;
      transition:top 0.5s linear 0.125s;
      span{
        display:block;
        margin-top:5px;
      }
      @include non-mobile{
        .player-card--collapsed & {
          top:35px;
          transition:top 0.5s linear 0.125s;
        }
      }
      @include mobile{
        top:5px;
        left:50%;
        margin-left:-120px;
        right:auto;
        span{
          margin-top:3px;
        }
      }
    }
  }
</style>