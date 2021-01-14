<template>
  <NFLPlayerCard v-if="league === 'NFL'" :playerId="playerId" :rankKey="rankKey" :cardExpanded="cardExpanded" />
</template>

<script>
import NFLPlayerCard from './NFL';

export default {
  props: ['playerId', 'rankKey', 'cardExpanded'],
  components: { NFLPlayerCard },
  computed: {
    league() {
      return process.env.PROJECT_LEAGUE
    }
  }
}
</script>