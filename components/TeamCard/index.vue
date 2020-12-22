<template>
  <article class="player-card team-card">
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
    @include mobile{
      padding:25px;
    }
    p{
      font-size:16px;
    }
  }
</style>