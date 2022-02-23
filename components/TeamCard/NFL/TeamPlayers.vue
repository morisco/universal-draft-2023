<template>
  <div class="team-card__players">
    <div class="team-card__players-label">
      <span>{{ label }}</span>
    </div>
    <div
      v-if="players"
      class="team-card__player-picks"
      :class="['team-card__player-picks--' + players.length]"
    >
      <template v-for="player in players.slice(0,maxPlayers)">
        <NuxtLink
          v-if="player && player.title"
          :key="teamId + '-' + player.title"
          tag="a"
          target="_blank"
          :to="'/' + player.id_string"
          class="team-card__player-pick"
        >
          <div class="player-card__image-column-img-wrapper team-card__image-column-img-wrapper"> 
            <img
              :src="player.image.small"
              :alt="player.imageAlt"
            >
            <img
              v-if="player.offenseDefense === 'offense'"
              src="@/assets/img/icons/offense-o-2021.svg"
              class="player-x-o"
              data-not-lazy
            >
            <img
              v-if="player.offenseDefense === 'defense'"
              src="@/assets/img/icons/defense-x-2021.svg"
              class="player-x-o"
              data-not-lazy
            >
          </div>
          <div class="team-card__player-pick-content">
            <span class="team-card__player-name">
              <span>{{ player.firstName }}</span>
              <span>{{ player.lastName }}</span>
            </span>
            <span class="team-card__player-position-school">
              <span>{{ player.position }},</span>
              <span>{{ player.school }}</span>
            </span>
          </div>
        </NuxtLink>
      </template>
    </div>
  </div>  
</template>

<script>
export default {
  name: "NFLTeamPlayers",
  props: ['teamId', 'maxPlayers'],
  computed: {
    label() {
      return this.players ? 'Friendly Suggestions' : 'No picks in the first two rounds'
    },
    players() {
      if(!this.$store.getters['content/team'](this.teamId).players || this.$store.getters['content/team'](this.teamId).players.length === 0){
        return false;
      }
      if(this.$store.getters['content/team'](this.teamId).players[0].player){
        const tps = [...this.$store.getters['content/team'](this.teamId).players];
        tps.filter((p) => p.title);
        return tps.map((player) => {
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
      justify-content:flex-start;
      margin-top:15px;
      border-bottom:1px solid $mediumgray;
      // margin-left:-5px;
      width:calc(100% + 10px);
      overflow:hidden;
      color:$black !important;
      @include tablet{
        border-bottom:0;
      }
      @include mobile{
        flex-wrap:wrap;
        border-bottom:0;
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
      font-family: 'GT America';
      span{
        display:block;
      }
    }
    &__player-pick{
      display:flex;
      align-items:flex-start;
      flex: 0 0 auto;
      max-height:150px;
      width:100%;
      max-width:calc(33.3333% - 10px);
      overflow:visible;
      margin-right:15px;
      &:last-of-type{
        margin-right:15px;
      }
      @include mobile{
        margin-right:0;
        position:relative;
        max-width:100%;
        overflow:hidden;
        max-height:100%;
        margin-bottom:15px;
        border-bottom:1px solid $mediumgray;
        &:last-of-type{
          margin-bottom:0;
          border-bottom:0;
        }
      }
      .team-card__player-pick-content{
        width:100%;
        display:block;
        text-align:left;
        height:90px;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        padding-top:5px;
      }
      .player-card__image-column-img-wrapper{
        width:100px;
        overflow:visible;
        flex: 0 0 auto;
        margin-right:5px;
        align-self:flex-start;
        overflow:hidden;

        
        img{
          z-index:1;
          width:140%;
          top:5px;
          left:50%;
          transform:translateX(-50%);
        }
        .player-x-o{
          width:90px;
          opacity:1;
          z-index:0;
          left:50%;
          transform:translateX(-50%);
          top:0;
        }

        @include mobile{
          position:relative;
          overflow:hidden;
          height:145px;
          width:50%;
          margin-left:-15px;
          // margin-bottom:10px;
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
      width:100%;
      @include tablet{
        flex-wrap:wrap;
        padding-top:0;
      }
      @include mobile{
        margin-top:30px;
        flex-direction:column;
      }
      &-label{
        @include expanded-label;
        text-transform:uppercase;
        width:100%;
        flex: 0 1 auto;
        color:$black !important;
        margin-left:20px;
        span{
          display:block;
          @include mobile{
            display:inline;
          }
        }
        @include tablet{
          margin-left:0;
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