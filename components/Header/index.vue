<template>
  <NBAHeader v-if="league === 'nba'" />
  <NFLHeader v-else-if="league === 'nfl'" />
</template>

<script>
import NBAHeader from './NBA';
import NFLHeader from './NFL';
export default {
  name: "PageHeader",
  components: { NBAHeader, NFLHeader },
  computed: {
    league() {
      return process.env.PROJECT_LEAGUE.toLowerCase()
    },
  }
}
</script>