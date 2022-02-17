<template>
  <div class="player-card__expanded-meta">
    <div class="player-card__expanded-meta-section">
      <div class="player-card__expanded-label">PLUSES</div>
      <div class="player-card__expanded-value">
        <ul class="player-card__expanded-value-list">
          <li v-for="(plus, index) in player.pluses_minuses.pluses" :key="'Plus' + index" v-html="plus.text"></li>
        </ul>
      </div>
    </div>
    <div class="player-card__expanded-meta-section">
      <div class="player-card__expanded-label">MINUSES</div>
      <div class="player-card__expanded-value">
        <ul class="player-card__expanded-value-list">
          <li v-for="(minus, index) in player.pluses_minuses.minuses" :key="'Minus' + index" v-html="minus.text"></li>
        </ul>
      </div>
    </div>
    <div class="player-card__expanded-meta-section" v-if="player.staff_insight">
      <div class="player-card__expanded-label">STAFF OPINION</div>
      <div class="player-card__expanded-value player-card__expanded-value--last" v-html="player.staff_insight"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NBAExpandedMeta',
  props: ['player']
}
</script>

<style lang="scss" scoped>
  .player-card{
    &__expanded-meta{
      position:relative;
      display:flex;
      flex-direction:column;
      margin: 0;
      padding:3px 0 0;
      .mock-draft & {
        padding-top:30px;
      }
      @include mobile {
        transition:opacity 1s linear 0s;
        .app--nba & {
          margin:0 0 0;
          padding:0 0;
          background:transparent;
        }
        // &:before{
        //   content:'';
        //   display:block;
        //   width:100%;
        //   height:1px;
        //   background:$darkmediumgray;
        //   margin-bottom:20px;
        // }
      }
      &-section{
        p{
          margin-bottom:15px;
          &:last-of-type{
            margin-bottom:15px;
          }
        }
        ul{
          margin-bottom:30px;
          li{
            &:last-of-type{
              p{
                margin-bottom:0;
              }
            }
          }
        }
        &:last-of-type{
          ul{
            margin-bottom:0;
          }
        }
        @include mobile{
          margin-bottom:0;
          &:last-of-type{
            margin-bottom:0;
          }
        }
      }
    }
    &__expanded-label{
      @include meta-bar-detail;
    }
    &__expanded-value{
      > ul li p {
        @include player-card-body;
        margin-bottom:0;
        a{
          text-decoration:underline;
        }
      }
      &--last{
        ul li{

          &:last-of-type{
            p{
              margin-bottom:0;
            }
          }
        
        }
      }
    }
  }
</style>