<template>
  <div class="player-card__expanded-meta">
    <div class="player-card__expanded-meta-section">
      <div class="player-card__expanded-label">
        SCOUTING REPORT
      </div>
      <div
        class="player-card__expanded-value"
        v-html="player.deep_dives.scouting_report"
      />
    </div>
    <div class="player-card__expanded-meta-section">
      <div class="player-card__expanded-label">
        WHY HE COULD RISE
      </div>
      <div
        class="player-card__expanded-value"
        v-html="player.deep_dives.why_rise"
      />
    </div>
    <div class="player-card__expanded-meta-section">
      <div class="player-card__expanded-label">
        WHY HE COULD FALL
      </div>
      <div
        class="player-card__expanded-value player-card__expanded-value--last"
        v-html="player.deep_dives.why_fall"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "NFLExpandedMeta",
  props: ['player']
}
</script>

<style lang="scss">
  .player-card{
    .app--nfl & {
      &__expanded-meta{
        &-section{
          p{
          &:last-of-type{
            margin-bottom:30px;
          }
        }
        }
      }
      &__expanded-value{
        > p {
          @include player-card-body;
          a{
            text-decoration:underline;
          }
        }
        &--last{
          > p{
            &:last-of-type{
              margin-bottom:0;
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .player-card{
    &__expanded-meta{
      position:relative;
      display:flex;
      flex-direction:column;
      margin: 0;
      padding:3px 0 60px;
      .mock-draft & {
        padding-top:30px;
      }
      @include mobile {
        transition:opacity 1s linear 0s;
        margin:0 0 0;
        padding:0 20px;
        background:$lightgray;
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
        
        @include mobile{
          margin-bottom:20px;
          &:last-of-type{
            margin-bottom:0;
          }
        }
      }
    }
    &__expanded-label{
      @include expanded-label;
    }
    &__expanded-value{
      > p {
        @include player-card-body;
        a{
          text-decoration:underline;
        }
      }
      &--last{
        > p{
          &:last-of-type{
            margin-bottom:0;
          }
        }
      }
    }
  }
</style>