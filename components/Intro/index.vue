<template>
  <NBAIntro v-if="league === 'nba'" />
  <NFLIntro v-else-if="league === 'nfl'" />
</template>

<script>
import NBAIntro from './NBA';
import NFLIntro from './NFL';
export default {
  name: "PageIntro",
  components: { NBAIntro, NFLIntro },
  computed: {
    league(){
      return process.env.PROJECT_LEAGUE.toLowerCase()
    },
  }
}
</script>