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
    <Transition
      @before-enter="onBeforeEnter" 
      @enter="onEnter" 
      @leave="onLeave" 
    >
      <Interstitial 
        v-if="interstitials[index+1] && viewPosition === 'all'" 
        :key="'interstitial-' + (index+1)" 
        :list="list" 
        :inter-key="index+1" 
      />
    </Transition>
  </div>
</template>

<script>
import NFLTeamCard from './NFL';
import NBATeamCard from './NBA';
import Interstitial from '../Interstitial';
import gsap from 'gsap/all';
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
  },
  methods: {
    onBeforeEnter(el) {
      el.style.maxHeight = '0px';
      el.style.opacity = '0';
    },
    onEnter(el, done) {
      gsap.to(el, {
        maxHeight: '100%',
        opacity: 1,
        onComplete: done,
      });
    },
    onLeave(el, done) {
      gsap.to(el, {
        maxHeight: '0px',
        opacity: 0,
        onComplete: done,
        delay: 0.5
      });
    },
  }
}
</script>