<template>
  <div class="player-card__stats">
    <div
      v-if="player.stat_details"
      class="player-card__stats-detail"
    >
      *Statistics are from {{ player.stat_details.year }} season
    </div>
    <ul
      class="player-card__stats-list"
      :class="{'player-card__stats-list--full' : statArray.length === 5}"
    >
      <li
        v-for="stat in player.player_position_stats.stats"
        :key="stat.key"
      >
        <div class="player-card__stat-tooltip">
          {{ stat.tooltip }}
        </div>
        <div class="player-card__stat">
          <span class="player-card__stat-title">{{ stat.label }}</span>
          <span class="player-card__stat-value">
            <span>
              <span>{{ stat.value }}</span>
              <span class="player-card__stat-detail">{{ stat.detail }}</span>
            </span>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'NBAStats',
  props: ['player'],
  computed: {
    statArray() {
      return [];
    }
  }  
}
</script>

<style lang="scss" scoped>
.player-card{
  &__stats{
    position:relative;
    display:flex;
    flex-direction:column;
    border-bottom:3px solid transparent;
    padding-top:15px;
    background:$white;
    transition:border-color 0.125s linear 0s;
    .player-card--expanded & {
      transition:border-color 0.125s linear 0.25s;
      border-bottom-color:$black;
    }
    @include mobile {
      padding:15px 0 15px;
      margin-top:0;
      background:transparent;
    }

    &-detail{
      position:absolute;
      bottom:0;
      right:0;
      text-align:right;
      transform: translateY(100%);
      font-weight:300;
      font-size:11px;
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
        padding-top:5px;
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
        width:100%;
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
      margin: 0 0 0;
      flex: 1;
      max-width:25%;
      width:25%;
      // max-width: 60px;
      border-right:1px solid $darkmediumgray;
      &:last-of-type{
        border-right:0;
      }
      .player-card__image-column &{
        flex: 0 0 auto;
        margin:0 0 0 0;
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
        margin: 0 0 0 0;
        transition:opacity 0.25s linear;
        // max-width:55px;
        &:last-of-type{
          margin-right:0;
        }
        .player-card--collapsed & {
          margin:0 0 0;
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
          transform: translateX(-50%) scale(1);
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
    // margin-bottom:10px;
    .player-card__image-column &{
      background:transparent !important;
    }
  }
  &__stat-title{
    display:block;
    text-align: center;
    box-sizing:content-box;
    line-height:1;
    color:$black;
    @include stat-title;
    margin-top:-1px;
    margin-bottom:-2px;
  }
  &__stat-value{
    position:relative;
    display:block;
    margin: 0;
    text-align: center;
    padding-top: 1px;
    text-align:center;
    @include stat-value;
    background:transparent;
    border-radius:4px;
    > span{
      position:relative;
      padding-top:3px;
      display:flex;
      flex-direction:column;
      justify-content:center;
    }
  }
  &__stat-detail{
    display:block;
    margin-top:8px;
    font-size:11px;
    text-transform:uppercase;
    font-size:300;
  }
  &__stat-tooltip{
    position:absolute;
    top:-25px;
    left: 50%;
    transform:translateX(-50%) scale(0);
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
    background-color:$nbaorange;
    z-index:3;
  }
}
</style>