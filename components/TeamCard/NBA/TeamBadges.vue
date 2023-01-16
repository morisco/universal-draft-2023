<template>
  <div class="team-badges">
    <h5>Team Needs</h5>
    <Badges
      :title="team.title"
      :badges="team.badges"
      :sponsored_badge="false"
    />
  </div>
</template>
<script>
import Badges from '../../PlayerCard/NBA/Badges.vue';
export default {
  name: "NBATeamBadges",
  components: {Badges},
  props: ['team']
}
</script>
<style lang="scss">
  .team-badges{
    padding:30px 0;
  }
</style>
