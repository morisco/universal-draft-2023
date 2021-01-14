<template>
  <div class="player-card__expanded-meta">
    <div class="player-card__expanded-meta-section">
      <div class="player-card__expanded-label">SCOUTING REPORT</div>
      <div class="player-card__expanded-value" v-html="player.deep_dives.scouting_report"></div>
    </div>
    <div class="player-card__expanded-meta-section">
      <div class="player-card__expanded-label">WHY HE COULD RISE</div>
      <div class="player-card__expanded-value" v-html="player.deep_dives.why_rise"></div>
    </div>
    <div class="player-card__expanded-meta-section">
      <div class="player-card__expanded-label">WHY HE COULD FALL</div>
      <div class="player-card__expanded-value" v-html="player.deep_dives.why_fall"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['player']
}
</script>

<style lang="scss">
  .player-card{
    &__expanded-meta{
      position:relative;
      display:flex;
      flex-direction:column;
      margin: 0 30px;
      padding:30px 0 45px;
      @include mobile {
        transition:opacity 1s linear 0s;
        margin:0;
        padding:0 20px;
        background:$lightgray;
        &:before{
          content:'';
          display:block;
          width:100%;
          height:1px;
          background:$darkmediumgray;
          margin-bottom:20px;
        }
      }
      &-section{
        @include mobile{
          margin-bottom:20px;
        }
      }
    }
    &__expanded-label{
      @include expanded-label;
      margin-bottom:12px;
      @include mobile{
        margin-bottom:5px;
      }
    }
    &__expanded-value{
      > p {
        @include player-card-body;
        a{
          text-decoration:underline;
        }
      }
    }
  }
</style>