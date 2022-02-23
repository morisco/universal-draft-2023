<template>
  <NFLMobileNavigation 
    v-if="league === 'nfl'"
    @lock-scroll="lockScroll"
    @unlock-scroll="unlockScroll"
    @reset-list="resetlist"
  />
  <NBAMobileNavigation
    v-else-if="league === 'nba'"
    @lock-scroll="lockScroll"
    @unlock-scroll="unlockScroll"
    @reset-list="resetlist"
  />
</template>

<script>
import NFLMobileNavigation from './NFL';
import NBAMobileNavigation from './NBA';
export default {
  name: "MobileNavigation",
  components: { NFLMobileNavigation, NBAMobileNavigation },
  props: ['lockScroll', 'unlockScroll', 'resetList'],
  computed: {
    league(){
      return process.env.PROJECT_LEAGUE.toLowerCase()
    }
  }
}
</script>