<template>
  <article class="player-card team-card" ref="card">
    <TeamMetaBar :team="team" :teamId="teamId" />
    <div class="player-card__image-info">      
      <div class="player-card__image-column team-card__image-column" v-if="['mobile', 'tablet'].indexOf($mq) < 0">
        <div class="player-card__image-column-inner">
          <TeamPicks :team="team" />
        </div>
      </div>
      <div class="player-card__info-column">
        <div class="player-card__top-data">
          <h5>Team Needs</h5>
          <div class="team-card__needs">
            {{teamNeeds}}
          </div>
          <div class="team-card__headline" v-html="team.history" />
          <TeamPicks :team="team" v-if="['mobile', 'tablet'].indexOf($mq) >= 0" />
          <TeamPlayers v-if="['mobile', 'tablet'].indexOf($mq) >= 0" :teamId="teamId" :maxPlayers="4" />
        </div>
      </div>
    </div>
  </article>
</template> 

<script>
import TeamMeta from './TeamMeta.vue'
import TeamMetaBar from './TeamMetaBar.vue'
import TeamPlayers from './TeamPlayers.vue'
import TeamConsiderations from './TeamConsiderations.vue'
import TeamPicks from './TeamPicks.vue'
import TeamHeadline from '~/components/PlayerCard/NFL/Headline';
export default {
  props: ['teamId'],
  components: { TeamMeta, TeamMetaBar, TeamPlayers, TeamConsiderations, TeamPicks, TeamHeadline },
  computed: {
    team() {
      return this.$store.getters['content/team'](this.teamId)
    },
    teamNeeds () {
      const tn = this.team.needs.map((need) => {
        return need.need
      })
      return tn.join(', ')
    },
    allCardsSet () {
      return this.$store.getters['content/allCardsSet']
    },
    hasPlayers() {
      return this.$store.getters['content/team'](this.teamId).players && this.$store.getters['content/team'](this.teamId).players.length
    }
  },
  mounted() {
    this.$store.commit('content/cardReady', this.$route);
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
  }
}
</script>

<style lang="scss">
  @import '~/components/PlayerCard/NFL/nfl-card.scss';
  @import '~/components/PlayerCard/NFL/ImageColumn/style.scss';
  @import '~/components/PlayerCard/NFL/InfoColumn/style.scss';
  .team-card{
    flex-direction:column;
    margin: 0 0 30px;
    border-radius: .625rem !important;
    background:$lightgray;
    border:1px solid $mediumgray;
    max-height:100%;
    opacity:1 !important;
    overflow:hidden;
    h5{
      @include expanded-label;
      line-height:15px;
      text-transform:uppercase;
      margin-bottom:5px;
    }
    @include tablet{
      padding:0 !important;
    }
    .player-card__top-data{
      // padding-bottom:0;
    }
    .player-card__image-info{
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
      margin-top:30px;
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
          font-family:'Decima';
          font-weight:500;
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
      background:$lightgray !important;
      padding: 0 20px 0;
      @include mobile{
        padding:30px 20px 0;
      }
    }
  }
</style>