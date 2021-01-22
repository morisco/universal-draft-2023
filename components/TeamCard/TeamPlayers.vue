<template>
  <div class="team-card__players">
    <div class="team-card__players-label">
      <span>Fiendly</span> <span>Suggestions</span>
    </div>
    <div 
      class="team-card__player" 
      v-for="player in players" 
      :key="teamId + player.title"
      :class="{
        'team-card__player--offense': player.offenseDefense === 'offense',
        'team-card__player--defense': player.offenseDefense === 'defense',
      }"
    >
      <div class="team-card__player-image">
        <img :src="player.image.small" :alt="player.title + ' Image'" />
      </div>
      <div class="team-card__player-meta">
        <div class="team-card__player-title">{{player.title}}</div>
        <div class="team-card__player-school-position">
          <span>{{player.position}}</span> <span>{{player.school}}</span>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props: ['teamId'],
  computed: {
    players() {
      return this.$store.getters['content/team'](this.teamId).players;
    }
  }
}
</script>

<style lang="scss" scoped>
  .team-card{
    &__players{
      display:flex;
      border-top:1px solid $black;
      border-bottom:1px solid $black;
      padding:30px 0;
      position:relative;
      @include tablet{
        flex-wrap:wrap;
      }
      @include mobile{
        flex-direction:column;
      }
      &:before,
      &:after{
        content:'';
        position:absolute;
        left:0;
        right:0;
        height:0.6px;
        background-color:$black;
        top:4px;
      }
      &:after{
        top:auto;
        bottom:4px;
      }
      &-label{
        @include mobile-nav-label;
        width:110px;
        flex: 0 1 auto;
        span{
          display:block;
        }
        @include tablet{
          margin-bottom:10px;
        }
        @include tablet{
          width:100%;
          flex: 0 0 auto;
          span{
            display:inline;
          }
        }


      }
    }
    &__player{
      flex:1;
      display:flex;
      align-items:center;
      @include mobile{
        margin:20px 0 0;
      }

      &-meta{
        margin-left:10px;
      }
      &-title{
        @include updated-text;
        margin-bottom:2px;
        padding-right:10px;
        color:$black;
        transition:color 0.25s linear;
      }
      &-school-position{
        @include player-card-body;
        span{
          display:block;
        }
      }
      &-image{
        flex: 0 0 auto;
        background-color:$black;
        height:80px;
        width:80px;
        border-radius:100%;
        transition:background-color 0.25s linear;
        overflow:hidden;
        img{
          width:100%;
          margin-top:10px;
        }
        @include tablet-portrait-only{
          width:60px;
          height:60px;
        }

      }
      &--offense  {
        &:hover{
          .team-card__player{
            &-image{
              background-color:$offense;
            }
            &-title{
              color:$offense;
            }
          }
        }
      }
      &--defense  {
        &:hover{
          .team-card__player{
            &-image{
              background-color:$defense;
            }
            &-title{
              color:$defense;
            }
          }
        }
      }
    }
  }
</style>