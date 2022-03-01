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
import NFLPlayerCard from './NFL';
import NBAPlayerCard from './NBA';
import Interstitial from '../Interstitial';
import gsap from 'gsap';
export default {
  name: "PlayerCard",
  components: { NFLPlayerCard, NBAPlayerCard, Interstitial },
  props: ['playerId', 'rankKey', 'cardExpanded', 'setCardExpanded', 'index', 'list'],
  emits: ['card-expanded'],
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