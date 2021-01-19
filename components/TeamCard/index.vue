<template>
  <article class="player-card team-card" ref="card">
    <TeamMeta :team="team" />
    <TeamPlayers :teamId="teamId" />
    <TeamConsiderations :teamId="teamId" />

  </article>
</template>

<script>
import TeamMeta from './TeamMeta.vue'
import TeamPlayers from './TeamPlayers.vue'
import TeamConsiderations from './TeamConsiderations.vue'
export default {
  props: ['teamId'],
  components: { TeamMeta, TeamPlayers, TeamConsiderations },
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
  .team-card{
    flex-direction:column;
    padding: 30px 40px;
    margin: 0 0 30px;
    border-radius: .625rem;
    background:$lightgray;
    border:1px solid $mediumgray;
    max-height:100%;
    opacity:1;
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