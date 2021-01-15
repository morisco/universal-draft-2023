<template>
  <NFLPlayerCard v-if="league === 'NFL'" :playerId="playerId" :rankKey="rankKey" :cardExpanded="cardExpanded" v-on:card-expanded="$emit('card-expanded')" />
</template>

<script>
import NFLPlayerCard from './NFL';

export default {
  props: ['playerId', 'rankKey', 'cardExpanded', 'setCardExpanded'],
  components: { NFLPlayerCard },
  computed: {
    league() {
      return process.env.PROJECT_LEAGUE
    }
  }
}
</script>