<template>
  <div class="team-card__considerations">
    <div class="team-card__considerations-headline">
      Roster Considerations
    </div>
    <div
      class="team-card__considerations-content"
      v-html="history"
    />
  </div>
</template>
<script>
export default {
  name: "NFLTeamConsiderations",
  props: ['teamId'],
  computed: {
    history() {
      return this.$store.getters['content/team'](this.teamId).history
    }
  }
}
</script>
<style lang="scss">
  .team-card{
    &__considerations{
      margin-top:30px;
      &-headline{
        @include mobile-nav-label;
        margin-bottom:7.5px;
      }
      &-content{
        p{
          font-size:16px;
          line-height:1.4;
          margin-bottom:15px;
          font-weight:normal;
          &:last-of-type{
            margin-bottom:0;
          }
        }
      }
    }
  }
</style>