<template>
  <div>
    <NFLTeamCard 
      v-if="league === 'nfl'"
      :key="teamId" 
      :team-id="teamId" 
    />
    <NBATeamCard 
      v-else-if="league === 'nba'"
      :key="teamId" 
      :team-id="teamId" 
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
import NFLTeamCard from './NFL';
import NBATeamCard from './NBA';
import Interstitial from '../Interstitial';

export default {
  name: "TeamCard",
  components: { NFLTeamCard, NBATeamCard, Interstitial },
  props: {
    teamId: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
  },
  computed: {
    interstitials() {
      return this.$store.getters['content/interstitials']("teamNeeds");
    },
    league() {
      return process.env.PROJECT_LEAGUE.toLowerCase();
    },
  }
}
</script>