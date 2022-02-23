<template>
  <div>
    <NFLPlayerCard
      v-if="league === 'NFL'"
      :player-id="playerId"
      :rank-key="rankKey"
      :card-expanded="cardExpanded"
      @card-expanded="$emit('card-expanded')"
    />
    <NBAPlayerCard
      v-else-if="league === 'NBA'"
      :player-id="playerId"
      :rank-key="rankKey"
      :card-expanded="cardExpanded"
      @card-expanded="$emit('card-expanded')"
    />
    <Interstitial 
      v-if="interstitials[index+1] && viewPosition === 'all'" 
      :key="'interstitial-' + (index+1)" 
      :list="list" 
      :inter-key="index+1" 
    />
  </div>
</template>

<script>
import NFLPlayerCard from './NFL';
import NBAPlayerCard from './NBA';
import Interstitial from '../Interstitial';

export default {
  name: "PlayerCard",
  components: { NFLPlayerCard, NBAPlayerCard, Interstitial },
  props: ['playerId', 'rankKey', 'cardExpanded', 'setCardExpanded', 'index', 'list'],
  computed: {
    interstitials() {
      return this.$store.getters['content/interstitials'](this.list)
    },
    league() {
      return process.env.PROJECT_LEAGUE
    },
    viewPosition () {
      return this.$store.getters['viewOptions/position']
    },
  }
}
</script>