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
      <NuxtLink
        v-for="player in players.slice(0,maxPlayers)"
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
        </div>
        <div class="team-card__player-pick-content">
          <span class="team-card__player-name">
            <span class="non-mobile">{{ player.firstName }}</span>
            <span class="mobile">{{ player.firstName.charAt(0) }}.</span>
            <span>{{ player.lastName }}</span>
          </span>
          <span class="team-card__player-position-school">
            <span>{{ player.school }}</span>
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'NBATeamPlayers',
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
        return this.$store.getters['content/team'](this.teamId).players.map((player) => {
          return this.$store.getters['content/teamPlayer'](player.player) || { image: {} }
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
      justify-content:flex-start;
      margin-top:0;
      border-bottom:1px solid $mediumgray;
      // margin-left:-5px;
      width:calc(100% - 10px);
      overflow:hidden;
      position:relative;
      color:$black !important;
      @include mobile{
        margin-bottom:30px;
      }
      &:before{
          content: "";
          display: block;
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          background:url('~assets/img/nba/squiggle-pattern-black.svg');
          background-position-x: 0%;
          background-position-y: 0%;
          background-size: auto;
          background-size: auto 29px;
          background-position: center top;
          bottom: 0;
          transition: bottom 0.25s linear 0s;
          z-index:0;
          @include mobile{
            display:none;
          }
        }
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
      padding-bottom:0;
      margin-bottom:0;
      .mobile{
        display:none;
      }
      @include mobile{
        .mobile{
          display:inline;
        }
        .non-mobile{
          display:none;
        }
      }

      span{
        display:inline;
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
      @include mobile{
        font-size:18px;
        margin-left:5px;
        line-height:18px;
      }
    }
    &__player-pick{
      position:relative;
      display:flex;
      align-items:center;
      flex-direction:column;
      flex: 0 0 auto;
      max-height:150px;
      width:100%;
      max-width:33.333%;
      overflow:visible;
      margin-right:0;
      z-index:1;
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
        height:43px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        padding-top:3px;
        background:white;
        text-align:center;
        border-top:3px solid black;
        @include mobile{
          padding-top:0;
          height:36px;
          flex-direction:row;
          align-items:center;
        }
      }
      .player-card__image-column-img-wrapper{
        width:100%;
        overflow:visible;
        flex: 0 0 auto;
        margin-right:5px;
        align-self:flex-start;
        overflow:hidden;
        max-height:95px;
        
        img{
          z-index:1;
          width:150%;
          top:0px;
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
          width:100%;
          margin-left:0;
          &:before{
          content: "";
          display: block;
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          background: url(/_nuxt/assets/img/nba/squiggle-pattern-black.svg);
          background-position-x: 0%;
          background-position-y: 0%;
          background-size: auto;
          background-size: auto 29px;
          background-position: center top;
          bottom: 0;
          transition: bottom 0.25s linear 0s;
          z-index:0;
        }
          // margin-bottom:10px;
          img{
            width:150%;
            max-width:150%;
            position:absolute;
          }
        }
      }
    }
    &__players{
      display:flex;
      flex-direction:column;
      padding:0 0 0;
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
        margin-left:0;
        margin-bottom:5px;
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
      flex-direction:column;
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