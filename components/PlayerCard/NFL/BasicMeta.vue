<template>
  <div class="player-card__basic-meta">
    <h3 :class="{'badge-adjustment': this.player.badges.length > 0}">
      <span>{{playerMeta.firstName}}</span> <span>{{playerMeta.lastName}}</span>
    </h3>
    <div class="player-card__position-school">
      <div class="player-card__highlight-color player-card__position">
        {{playerMeta.position}}&nbsp;
      </div>
      <div class="player-card__school">
        {{playerMeta.school}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['player'],
  computed: {
    playerMeta() {
      let playerData = this.player
      return {
        firstName: playerData.first_name,
        lastName: playerData.last_name,
        school: playerData.player_meta.school,
        position: this.$store.getters['content/playerPosition'](playerData.position)
      };
    }
  }
}
</script>

<style lang="scss" scoped>
  .player-card{
    &__basic-meta{
      display:flex;
      flex-direction:column;
      justify-content: flex-start;
      flex:1;
      transition:all 0s linear 0.125s;
      max-height:300px;
      margin-top:0;
      height:auto;
      @include non-mobile{
        .player-card--collapsed & {
          margin-top: -30px;
          max-height: 123px;
          height:100%;
        }
      }
      h3{
        flex:1;
        margin-bottom:5px;
        transition:all 0s linear 0.125s;
        &.badge-adjustment{
          flex: 0 0 auto;
          min-height:102px;

        }
        span{
          display:inline-block;
          min-width:100%;
          transition:min-width 0s linear 0.125s;
          @include mobile{
            min-width:0;
          }
        }
        @include non-mobile{
          .player-card--collapsed & {
            flex: 0 0 auto;
            font-size: 42px;
            line-height:1;
  
            span{
              display:inline-block;
              min-width:0;
            }
          }
        }
      }
    }
    &__position-school{
      // display:flex;
      // flex-direction:column
      @include non-mobile{
        .player-card--collapsed &,
        .player-card--transitioning & {
          margin-top:5px;
          transition: all 0s linear 0.125s;
        }
      }
      @include mobile{
        margin:10px 0;
      }
    }
    &__position,
    &__school{
      display:inline-block;
      min-width:100%;
      transition:min-width 0s linear 0.125s;
      @include non-mobile{
        .player-card--collapsed & {
          min-width:0;
        }
      }
    }
    &__position{
      @include player-position;
      margin-right:5px;
      .player-card--defense & {
        color:$defense;
      }
      .player-card--offense & {
        color:$offense;
      }
    } 
    &__school{
      line-height:1;
    }
  }
</style>