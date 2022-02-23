<template>
  <NFLNavigation v-if="league === 'nfl'" />
  <NBANavigation v-else-if="league === 'nba'" />  
</template>

<script>
import NFLNavigation from './NFL';
import NBANavigation from './NBA';

export default {
  name: "PageNavigation",
  components: { NFLNavigation, NBANavigation },
  computed: {
    league(){
      return process.env.PROJECT_LEAGUE.toLowerCase()
    },
  }
}
</script>