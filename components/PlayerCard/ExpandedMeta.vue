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
      padding:30px   0 45px;
      border-top:1px solid $gray;
      opacity:0;
      transition:opacity 0.25s linear 0s;
      @include mobile {
        transition:opacity 1s linear 0s;
      }
      @include mobile {
        margin: 0 15px;
      }
      .player-card__info-column--expanded & {
        opacity:1;
        transition:opacity 0.25s linear 0.5s;
      }
      &:before{
        content:'';
        position:absolute;
        left:0;
        right:0;
        top: -7px;
        height:1px;
        background:$gray;
      }
      &:after{
        content:'';
        position:absolute;
        left:0;
        right:0;
        top: 4px;
        height:1px;
        background:$gray;
      }
    }
    &__expanded-label{
      @include expanded-label;
    }
    &__expanded-value{
      > p {
        @include expanded-value;
        a{
          text-decoration:underline;
        }
      }
    }
  }
</style>