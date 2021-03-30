<template>
  <div class="team-card__players">
    <div class="team-card__players-label">
      <span>Friendly Suggestions</span>
    </div>
    <div class="team-card__player-picks" :class="['team-card__player-picks--' + players.length]" v-if="players">
      <div v-for="player in players" :key="teamId + '-'  + player.title" class="team-card__player-pick">
        <div class="player-card__image-column-img-wrapper"> 
          <img :src="player.image.small" :alt="player.imageAlt" />
          <img src="@/assets/img/icons/offense-o-2021.svg" v-if="player.offenseDefense === 'offense'" class="player-x-o" data-not-lazy />
          <img src="@/assets/img/icons/defense-x-2021.svg" v-if="player.offenseDefense === 'defense'" class="player-x-o" data-not-lazy />
        </div>
        <div class="team-card__player-pick-content">
          <span class="team-card__player-name">
            <span>{{player.firstName}}</span>
            <span>{{player.lastName}}</span>
          </span>
          <span class="team-card__player-position-school">
            <span>{{player.position}},</span>
            <span>{{player.school}}</span>
          </span>
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
      if(this.$store.getters['content/team'](this.teamId).players[0].player){
        return this.$store.getters['content/team'](this.teamId).players.map((player) => {
          return this.$store.getters['content/teamPlayer'](player.player)
        });
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .team-card{
    &__player-picks{
      display:flex;
      min-width:100%;
      justify-content:space-between;
      margin-top:15px;
      border-bottom:1px solid $mediumgray;
      margin-left:-5px;
      width:calc(100% + 10px);
      overflow:hidden;
      @include mobile{
        flex-wrap:wrap;
      }
      &--3 {
        .team-card__player-pick{
          &:nth-of-type(3){
            margin-left:25%;
            margin-right:25%;
          }
        }
      }

      &--1 {
        .team-card__player-pick{
          &:nth-of-type(1){
            margin-left:25%;
            margin-right:25%;
          }
        }
      }
    }
    &__player-name{
      @include expanded-label;
      text-transform:uppercase;
      line-height:17px;
      span{
        display:block;
        @include mobile{
          display:inline;
        }
      }
    }
    &__player-position-school{
      font-size:14px;
      line-height:16px;
      span{
        display:block;
      }
    }
    &__player-pick{
      display:flex;
      align-items:center;
      flex: 0 0 auto;
      max-height:115px;
      width:100%;
      max-width:calc(33.3333% - 10px);
      overflow:visible;
      
      @include mobile{
        position:relative;
        max-width:calc(50% - 10px);
        overflow:hidden;
        flex-direction:column;
        max-height:100%;
        margin-bottom:15px;
      }
      .team-card__player-pick-content{
        width:100%;
        display:block;
        text-align:center;
      }
      .player-card__image-column-img-wrapper{
        width:80px;
        overflow:visible;
        flex: 0 0 auto;
        margin-right:15px;
        align-self:flex-start;
        
        img{
          z-index:1;
          width:140%;
          top:5px;
          left:50%;
          transform:translateX(-50%);
        }
        .player-x-o{
          width:80px;
          opacity:1;
          z-index:0;
          left:50%;
          transform:translateX(-50%);
          top:0;
        }

        @include mobile{
          position:relative;
          width:100%;
          overflow:hidden;
          height:100px;
          margin-bottom:10px;
          img{
            width:100%;
            position:absolute;
          }
        }
      }
    }
    &__players{
      display:flex;
      flex-direction:column;
      padding:30px 0 0;
      position:relative;
      &:before{
        content:'____';
        display:block;
        margin-bottom:5px;
        color:$headlinegray;
      }
      @include tablet{
        flex-wrap:wrap;
      }
      @include mobile{
        flex-direction:column;
      }
      &-label{
        @include mobile-nav-label;
        width:100%;
        flex: 0 1 auto;
        span{
          display:block;
          @include mobile{
            display:inline;
          }
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
        line-height:100%;
        margin-bottom:0;
        span{
          display:block;
          @include mobile{
            display:inline;
          }
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