/* eslint-disable vue/no-v-html */
<template>
  <article
    ref="card"
    class="player-card team-card NBA"
  >
    <TeamMetaBar
      :team="team"
      :team-id="teamId"
    />
    <div class="player-card__image-info team-card__image-info">      
      <div
        v-if="['mobile', 'tablet'].indexOf($mq) < 0"
        class="player-card__image-column team-card__image-column team-card__image-column"
      >
        <div class="player-card__image-column-inner team-card__image-column-inner">
          <TeamPicks :team="team" />
        </div>
      </div>
      <div class="player-card__info-column team-card__info-column">
        <div class="player-card__top-data team-card__top-data">
          <div
            class="team-card__headline"
            v-html="team.history"
          />
          <TeamPicks
            v-if="['mobile', 'tablet'].indexOf($mq) >= 0"
            :team="team"
          />
          <TeamPlayers
            v-if="['mobile', 'tablet'].indexOf($mq) >= 0"
            :team-id="teamId"
            :max-players="4"
          />
        </div>
      </div>
    </div>
  </article>
</template> 

<script>
import TeamMetaBar from './TeamMetaBar.vue'
import TeamPlayers from './TeamPlayers.vue'
import TeamPicks from './TeamPicks.vue'
export default {
  name:"NBATeamCard",
  components: { TeamMetaBar, TeamPlayers, TeamPicks },
  props: {
    teamId: {
      type: String,
      default: ''
    },
  },
  computed: {
    team() {
      return this.$store.getters['content/team'](this.teamId)
    },
    teamNeeds () {
      const tn = this.team.needs ? this.team.needs.map((need) => {
        return need.need
      }) : [];
      return tn.join(', ')
    },
    allCardsSet () {
      return this.$store.getters['content/allCardsSet']
    },
    hasPlayers() {
      return this.$store.getters['content/team'](this.teamId).players && this.$store.getters['content/team'](this.teamId).players.length
    }
  },
  watch:{
    allCardsSet() {
      if(this.allCardsSet){
      if(this.$route.params.team_id === this.team.id_string){
          let scrollDestination = this.$refs.card.offsetParent.offsetTop + this.$refs.card.offsetTop - (this.$mq === 'mobile' ? 60 : 85);
          window.scrollTo(0, scrollDestination);
        }    
      }
    }
  },
  mounted() {
    this.$store.commit('content/cardReady', this.$route);
  },
}
</script>

<style lang="scss">
.team-card{
  p{
    .app--nba & {
      font-size:16px;
      strong{
        text-transform: uppercase;
        font-family: "GT America Condensed";
        font-size: 18px;
        letter-spacing: .025em;
        font-weight: 400;
        line-height: 13px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>

<style lang="scss">
  .app--nba {
    .team-card{
      flex-direction:column;
      margin: 0 0 30px;
      border-radius: .625rem !important;
      background:#f0f0f0;
      border:1px solid $lightgray;
      max-height:100%;
      opacity:1 !important;
      overflow:hidden;
      &__info-column{
        padding-top:0 !important;
        background:#f0f0f0 !important;
      }
      &__meta-bar{
        background:#e0e0e0 !important;
        @include mobile {
          .app--nba & {
            margin-bottom:30px;
          }
        }
      }
      h5{
        @include expanded-label;
        line-height:15px;
        text-transform:uppercase;
        margin-bottom:5px;
      }
      @include tablet{
        padding:0 !important;
      }
      .player-card__image-info{
        position: relative;
        display: flex;
        overflow: hidden;
        @include mobile {
          padding-top:30px;
        }
        &:before{
          content:'';
          display:block;
          width:1px;
          position:absolute;
          top:30px;
          bottom:30px;
          left:315px;
          background:$darkmediumgray;
          z-index:5;
          @include tablet{
            display:none;
          }
        }
      }
      &__headline{
        // margin-top:30px;
        p{
          font-size:20px;
          &:last-of-type{
            margin-bottom:0;
          }
          &:empty{
            display:none;
          }
          strong{
            text-transform:uppercase;
            @include expanded-label;
            
          }
        }
      }
      &__image-column{
        padding-bottom:30px;
        @include tablet{
          min-height:0;
          min-width:100%;
          max-width:100%;
          background:transparent !important;
        }
      }
      &__logo-wrapper{
        width:100%;
        display:flex;
        justify-content:center;
      }
      &__logo{
        width:75%;
        margin: 30px 0;
        justify-self:center;
      }
      .player-card__headline-selling{
        @include tablet{
        padding:0;
        }
      }
      @include single-column{
        padding:30px 25px;
      }
      @include tablet{
        padding:25px;
      }
      p{
        font-size:16px;
      }
      .player-card__info-column{
        background:#f0f0f0 !important;
        padding: 0 20px 0;
        @include mobile{
          padding:30px 20px 0;
        }
      }
    }
    .team-card{
      &__image-column{
        display:flex;
        flex-direction:column;
        position:relative;
        padding:0 0 0;  
        // max-width: calc(100% - 800px);
        width:300px;
        min-width:300px;
        flex:0 0 auto;
        transition:opacity 0.25s linear 0.25s, max-width 0.625s ease-in-out 0s, max-height 0.25s ease-in-out 0.25s, min-height 0.5s linear 0s;
        z-index:2;
        opacity:1;
      
        // @include tablet-portrait-only{
        //   max-width:17.5%;
        // }
        
        @include mobile {
          padding-top:0;
          width:100%;
          max-width:100%;
          min-height:250px;
          background:white;
        }
  
        .player-card--transitioning &,
        .player-card--collapsed:not(.player-card--expanded) & {
          // transition:opacity 0.25s linear;
          @include mobile {
            min-height:0;
            overflow:hidden;
            transition:all 0s linear;
          }
        }
        // .player-card--collapsed & {
        //   transition:max-width 0.25s ease-in-out 0s;
        // }
        &-content{
          // display:none;
          // .player-card--expanded & {
          //   display:block;
          // }
          position:relative;
          
          @include mobile{
            position:absolute;
            width:100%;
            top: 0 !important;
            transform:translateY(-100%);
          }
        }
        &-inner{
          position:relative;
          flex:1;
          width:100%;
          // width:calc(100% - 40px); 
          // border-right:1px solid $darkmediumgray;
          padding:0 30px 0;
          // background:$black;  
          // background-size: 20px;
          // background-position: center top;
          border-radius: .625rem  0 0 .625rem;
          overflow:hidden;
          transition:padding-bottom 0.125s linear 0.25s;
          @include tablet-portrait-only{
            padding:0 20px 30px;
          }
          @include mobile{
            padding:0;
          }
          .player-card--expanded & {
            padding-bottom:30px;
            @include mobile{
              padding:0;
            }
          }
          .player-x-o{
            margin: 0 auto;
            z-index: -1;
            right: auto;
            width: auto;
            height: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            max-height:220px;
            opacity:1;
            @include mobile {
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              height: 100%;
              max-height: 100%;
            }
          }
        
          // .player-card--offense &{
          //   background-image: url('~@/assets/img/icons/offense-o.svg');
          // }
          // .player-card--defense & {
          //   background-image: url('~@/assets/img/icons/defense-x.svg');
          // }
        }
        @include non-mobile{
          // .player-card--collapsed &{
          //   max-width: 15.5%;
          // }
          .player-card--expanded & {
            max-width: calc(100% - 800px);
          }
        }
        @include tablet{
          .player-card--expanded & {
            max-width:17.5%;
          }
        }
        @include mobile {
          .player-card--expanded & {
            max-width:100%;
          }
        }
        &-img-wrapper{
          position:relative;
          height:500px;
          width:100%;
          overflow:hidden;
          box-sizing:content-box;
          border-bottom:1px solid $darkmediumgray;
          @include mobile {
            max-height:250px !important;
            border-bottom:0;
          }
        }
        &-img-wrapper img{
          position:absolute;
          top:0;
          width:100%;
          opacity:0;
          transition:opacity 0.25s linear 0.1s;
          // &:not(.player-x-o){
          //   top:20px;
          //   @include mobile{
          //     max-width:300px;
          //     top:0;
          //     left:50%;
          //     transform:translateX(-50%);
          //   }
          // }
        }
        &-img-wrapper img.isLoaded {
          opacity:1;
        }
      }
      &__rank{
        @include card-rank;
        position:absolute;
        background:$black;
        color:$white;
        top: 15px;
        right: -25px;
        width: 50px;
        height: 50px;
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius:100%;
        transition:top 0.5s linear 0.125s;
        span{
          display:block;
          margin-top:5px;
        }
        @include non-mobile{
          // .player-card--collapsed & {
          //   top:35px;
          //   transition:top 0.5s linear 0.125s;
          // }
        }
        @include mobile{
          top:15px;
          left:50%;
          margin-left:-135px;
          right:auto;
          .player-card--collapsed & {
            opacity:0;
          }
          .player-card--collapsed.player-card--expanded & {
            opacity:1;
            transition:opacity 0.25s linear 0.75s;
          }
          span{
            padding-top:1px;
          }
        }
      }
    }
    .team-card{
      // max-height:313px;
      &__info-column{
        position:relative;
        flex:1;
        opacity:1;
        overflow-x:visible;
        overflow-y:hidden;
        &--animate{
          transition:max-height 0.5s ease-out, max-width 0s linear 0.125s;
          @include mobile { 
            transition:max-height 0.5s linear, max-width 0s linear 0.125s;
            .player-card--expanded & {
              transition:max-height 0.5s ease-out, max-width 0s linear 0.125s;
            }
          }
        }
        // max-height:313px;
        @include tablet-portrait-only{
          // max-width:87.5%;
        }
        @include mobile {
          width:100%;
          max-width:100%;
          background:white;
          // padding-bottom:30px;
          .player-card--collapsed &{
            // padding-bottom:15px;
            border-radius:0.625rem;
            .player-card--expanded & {
              padding-bottom:0;
            }
          }
        }
        @include non-mobile{
          .player-card--collapsed &{
            max-width:84.5%;
            transition:all 0.25s ease-in-out 0.125s, max-height 0.25s ease-in-out 0.125s;
          }
          .player-card--transitioning & {
            transition:all 0.5s ease-in-out 0.125s, max-height 0.2s ease-in-out 0s;
            .team-card__top-data,
            .team-card__bottom-data{
              -webkit-animation: infoColumn-collapse 0.75s 1 linear;
                animation: infoColumn-collapse 0.75s 1 linear;
            }
          }
        }
      }
      &__meta-column{
        display:flex;
        flex-direction:column;
        flex:1;
      }
      &__top-data{
        position:relative;
        z-index:0;
        display:flex;
        flex-direction:column;
        justify-content:center;
        padding:30px 30px 30px;
        min-height:255px;
        // .player-card--collapsed & {
        //   min-height:0;
        // }
        @include tablet-portrait-only{
          padding: 30px 20px 30px;
        }
        @include mobile {
          padding:0;
          flex-direction:column;
          border-radius: 0 0 0.625rem 0.625rem;
          min-height:0;
          overflow:hidden;
        }
      }
      &__meta-stats{
        display:flex;
        justify-content:space-between;
        width:100%;
        @include mobile {
          flex-direction:column;
        }
      }
      &__bottom-data{
        position:relative;
        z-index:1;
        overflow-x:hidden;
        
        > *{
          opacity:0;
          transition:opacity 0.25s linear 0s;
        }
        .player-card--expanded & {
          margin-top:0;
          > *{
            opacity:1;
            transition:opacity 0.25s linear 0.5s;
          }
        }
        @include non-mobile{
          padding:0 30px;
        }
        @include tablet-portrait-only{
          padding:0 20px;
        }
  
        @include mobile{
          background:$lightgray;
          padding-top:0;
          padding-bottom:40px;
          border-radius:0 0 0.625rem 0.625rem;
          .player-card--expanded & {
            margin-top:-15px;
          }
          // padding-top:0.625rem;
          // .mock-draft & {
          //   padding-top:0;
          // }
          &-extended{
            padding:0 20px;
            margin-top:30px;
            &:before{
              content:'';
              display:block;
              width:100%;
              height:1px;
              background:#bdbdbd;
              margin-bottom:30px;
            }
          }
        }
      }
    }
  
    @keyframes infoColumn-collapse {
      0% {
        opacity: 1; 
      } 20%, 80% {
        opacity: 0; 
      } 100% {
        opacity: 1; 
      }
    }
  }
</style>