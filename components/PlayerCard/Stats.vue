<template>
  <ul class="player-card__stats">
    <li v-for="stat in statArray" :key="stat.key">
      <div class="player-card__stat-tooltip">{{stat.tooltip}}</div>
      <div class="player-card__stat">
        <span class="player-card__stat-title">{{stat.label}}</span>
        <span class="player-card__stat-value">{{stat.value}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
import { parseStats } from '~/plugins/contentProcessor'
export default {
  props: ['player'],
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
    justify-content:flex-end;
    flex:1;
    width:calc(100% + 10px);
    margin-right:-5px;
    margin-left:-5px;
    list-style:none;
    transform:translateX(0);
    transition: transform 0s linear 0.125s;
    @include mobile {
      justify-content:flex-start;

    }
    @include non-mobile{
      .player-card--collapsed & {
        margin-right:50px;
        transform:translateX(-50px);
      }
    }
    li{
      position:relative;
      display: flex;
      margin: 0 5px 24px;
      flex: 1;
      max-width: 70px;
      @include medium-desktop {
        margin:0 2px 24px;
      }
      @include tablet-portrait-only{
        margin:0 5px 15px;
      }

      @include mobile {
        margin: 0 5px 15px;
        transition:opacity 0.25s linear;
        .player-card--collapsed & {
          margin:0 5px 20px;
          &:nth-child(n+5) {
            opacity:0;
            .player-card--open &{
              opacity:1;
            }
          }
        }
        
      }
      &:hover{
        .player-card__stat-tooltip{
          transform: translateX(-50%) scale(1);
          opacity:1;
        }
      }
    }
    @include medium-desktop {
      margin-left:-2px;
      margin-right:-2px;
    }
    @include mobile {
      margin-left:-5px;
      margin-right:-5px;
    }
  }
  &__stat{
    background:$white;
    border-radius: 10px;
    background-clip: padding-box;
    width:100%;
  }
  &__stat-title{
    display:block;
    border-bottom: 2px solid $lightgray;
    text-align: center;
    padding: 8px 0 4px;
    box-sizing:content-box;
    line-height:1;
    @include stat-title;
  }
  &__stat-value{
    display:block;
    margin: 10px 0;
    text-align: center;
    padding-top: 1px;
    text-align:center;
    @include stat-value;
    
  }
  &__stat-tooltip{
    position:absolute;
    bottom: calc(100% + 2.5px);
    left: 50%;
    transform: translateX(-50%) scale(0);
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
    .player-card--offense & {
      background-color: $offense;
    }
    .player-card--defense & {
      background-color: $defense;
    }
    &:after{
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      bottom: -5px;
      height: 10px;
      width: 10px;
      z-index: -1;
      .player-card--offense & {
        background-color: $offense;
      }
      .player-card--defense & {
        background-color: $defense;
      }
    }
  }

}
</style>