<template>
  <NFLMobileNavigation 
    v-if="league === 'nfl'"
    @lock-scroll="$emit('lock-scroll')"
    @unlock-scroll="$emit('unlock-scroll')"
    @reset-list="$emit('reset-list')"
  />
  <NBAMobileNavigation
    v-else-if="league === 'nba'"
    @lock-scroll="$emit('lock-scroll')"
    @unlock-scroll="$emit('unlock-scroll')"
    @reset-list="$emit('reset-list')"
  />
</template>

<script>
import NFLMobileNavigation from './NFL';
import NBAMobileNavigation from './NBA';
export default {
  name: "MobileNavigation",
  components: { NFLMobileNavigation, NBAMobileNavigation },
  emits: ['lock-scroll', 'unlock-scroll', 'reset-list'],
  computed: {
    league(){
      return process.env.PROJECT_LEAGUE.toLowerCase()
    }
  }
}
</script>