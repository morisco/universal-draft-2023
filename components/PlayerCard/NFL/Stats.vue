<template>
<div class="player-card__stats">
  <div class="player-card__stats-detail" v-if="player.stat_details">
    <div class="player-card__stats-detail-year">{{player.stat_details.year}} STATS</div>
    <div class="player-card__stats-detail-games">Based on {{player.stat_details.games}} games played</div>
  </div>
  <ul class="player-card__stats-list" :class="{'player-card__stats-list--full' : statArray.length === 5}">
    <li v-for="stat in statArray" :key="stat.key">
      <div class="player-card__stat-tooltip">{{stat.tooltip}}</div>
      <div class="player-card__stat">
        <span class="player-card__stat-value"><span>{{stat.value}}</span></span>
        <span class="player-card__stat-title">{{stat.label}}</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import { parseStats } from '~/plugins/contentProcessor'
export default {
  props: ['player'],
  name: 'Stats',
  computed: {
    statArray() {
      const parsedStats = parseStats(this.player.player_position_stats);
      return parsedStats;
    }
  }  
}
</script>

<style lang="scss" scoped>
.player-card{
  &__stats{
    display:flex;
    flex-direction:column;
    @include mobile {
      padding:0 20px 20px;
      margin-top:-0.625rem;
      background:$lightgray;
    }

    &-detail{
      @include mobile{
        border-top:1px solid #bdbdbd;
        padding-top:25px;
        margin-top:0.625rem;
      }
      &-year{
        @include expanded-label;
      }
      &-games{
        @include player-card-body;
        color:$headlinegray;
        margin-bottom:10px;
      }
      .player-card__image-column &{
        padding-top:20px;
      }
    }
    &-list{
       display:flex;
      justify-content:flex-start;
      flex:1;
      // width:calc(100% + 10px);
      width:100%;
      list-style:none;
      transform:translateX(0);
      transition: transform 0s linear 0.125s, opacity 0.25s linear 0s;
      .player-card__image-column &{
        padding:0;
        flex-wrap:wrap;
        width:calc(100% + 40px);
        margin-bottom:15px;
      }
      @include medium-desktop {
        margin-left:-2px;
        margin-right:-2px;
      }
      @include tablet-portrait-only{
        width:calc(100% + 4px);
        margin-left:-2px;
        margin-right:-2px;
      }
      // @include non-mobile{
      //   .player-card--collapsed & {
      //     margin-right:50px;
      //     transform:translateX(-50px);
      //   }
      // }
      @include mobile {
        justify-content:flex-start;
        margin-right:0;
        margin-left:0;
        max-width:100%;
        width:100%;
        &--full {
        justify-content:space-between; 
        }
      }
    }
  
    li{
      position:relative;
      display: flex;
      margin: 0 5px 0;
      flex: 1;
      max-width: 60px;
      .player-card__image-column &{
        flex: 0 0 auto;
        margin:0 15px 0 0;
        width:calc(33.333% - 5px);
        @include tablet-portrait-only{
          margin-right:10px;
        }
      }
      &:first-of-type{
        margin-left:0;
      }
      @include medium-desktop {
        margin:0 2px 24px;
      }
      @include tablet-portrait-only{
        margin:0 2px 15px;
      }

      @include mobile {
        margin: 0 10px 0 0;
        transition:opacity 0.25s linear;
        max-width:55px;
        &:last-of-type{
          margin-right:0;
        }
        .player-card--collapsed & {
          margin:0 5px 20px;
          &:nth-child(n+5) {
            opacity:0;
            .player-card--expanded &{
              opacity:1;
            }
          }
        }
      }
      &:hover{
        .player-card__stat-tooltip{
          transform: scale(1);
          opacity:1;
        }
      }
    }
    
  }
  &__stat{
    // background:$white;
    border-radius: 10px;
    background-clip: padding-box;
    width:100%;
    margin-bottom:10px;
    .player-card__image-column &{
      background:transparent !important;
    }
  }
  &__stat-title{
    display:block;
    border-bottom: 2px solid $lightgray;
    text-align: left;
    box-sizing:content-box;
    line-height:1;
    color:$headlinegray;
    @include stat-title;
    margin-top:2px;
  }
  &__stat-value{
    position:relative;
    display:block;
    margin: 0;
    text-align: center;
    padding-top: 1px;
    text-align:center;
    @include stat-value;
    padding-top:100%;
    background:$mediumgray;
    border-radius:4px;
    span{
      position:absolute;
      padding-top:3px;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
    }
  }
  &__stat-tooltip{
    position:absolute;
    top:65px;
    left: 0;
    transform: scale(0);
    width: auto;
    color: #fff!important;
    white-space: nowrap;
    word-break: keep-all;
    padding: 4px 6px 5px;
    opacity: 0;
    transition: all 125ms linear;
    text-transform: none;
    border-radius: 2px;
    background-clip: padding-box;
    @include tooltip;
    background-color:$highlight2;
    z-index:3;
    // .player-card--offense & {
    //   background-color: $offense;
    // }
    // .player-card--defense & {
    //   background-color: $defense;
    // }
    &:after{
      content: '';
      display: block;
      position: absolute;
      left: 5px;
      transform: rotate(-45deg);
      top: -5px;
      height: 10px;
      width: 10px;
      z-index: -1;
      background-color:$highlight2;
      // .player-card--offense & {
      //   background-color: $offense;
      // }
      // .player-card--defense & {
      //   background-color: $defense;
      // }
    }
  }

}
</style>