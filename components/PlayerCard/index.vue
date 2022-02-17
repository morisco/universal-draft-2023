<template>
  <NFLPlayerCard v-if="league === 'NFL'" :playerId="playerId" :rankKey="rankKey" :cardExpanded="cardExpanded" v-on:card-expanded="$emit('card-expanded')" />
  <NBAPlayerCard v-else-if="league === 'NBA'" :playerId="playerId" :rankKey="rankKey" :cardExpanded="cardExpanded" v-on:card-expanded="$emit('card-expanded')" />
</template>

<script>
import NFLPlayerCard from './NFL';
import NBAPlayerCard from './NBA';

export default {
  props: ['playerId', 'rankKey', 'cardExpanded', 'setCardExpanded'],
  components: { NFLPlayerCard, NBAPlayerCard },
  computed: {
    league() {
      return process.env.PROJECT_LEAGUE
    }
  }
}
</script>