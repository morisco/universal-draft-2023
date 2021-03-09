<template>
  <article class="player-card team-card" ref="card">
    <TeamMetaBar :team="team" />
    <div class="player-card__image-info">
      
      <div class="player-card__image-column">
        <div class="player-card__image-column-inner">
          <div class="team-card__logo-wrapper">
            <img :src="team.image.medium" class="team-card__logo" />
          </div>
          <TeamPicks :team="team" />
        </div>
      </div>
      <div class="player-card__info-column">
        <div class="player-card__top-data">
          <TeamHeadline :headline="team.history" />
          <TeamPlayers :teamId="teamId" />
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
    allCardsSet () {
      return this.$store.getters['content/allCardsSet']
    },
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

<style lang="scss" scoped>
  @import '~/components/PlayerCard/NFL/nfl-card.scss';
  @import '~/components/PlayerCard/NFL/ImageColumn/style.scss';
  @import '~/components/PlayerCard/NFL/InfoColumn/style.scss';
  .team-card{
    flex-direction:column;
    margin: 0 0 30px;
    border-radius: .625rem;
    background:$lightgray;
    border:1px solid $mediumgray;
    max-height:100%;
    opacity:1;
    .player-card__top-data{
      padding-bottom:0;
    }
    &__image-column{
      padding-bottom:30px;
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
    @include single-column{
      padding:30px 25px;
    }
    @include mobile{
      padding:25px;
    }
    p{
      font-size:16px;
    }
  }
</style>