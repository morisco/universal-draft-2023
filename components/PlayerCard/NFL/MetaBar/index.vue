<template>
<div class="player-card__meta-bar" ref="metaBar">
  <div class="player-card__meta-bar-rank" v-if="rank">
    <span>{{rank}}</span>
  </div>
  <DraftTeam v-if="['mock-draft', 'draft-results'].indexOf($route.name) >= 0 && teamNameLogo && collapsed" :teamNameLogo="teamNameLogo" />
  <Trend v-if="player.player_updates" :trend="player.player_updates.rank_movement" />
  <div class="player-card__meta-bar-name-school player-card__image-column">
    <h3>
      <span>{{playerMeta.firstName}}</span>
      <span>{{playerMeta.lastName}}</span>
    </h3>
    <div class="player-card__meta-bar-position-school">
      <span class="position">{{playerMeta.position}}</span>
      <span class="school">{{playerMeta.school}}</span>
    </div>
  </div>
  <div class="player-card__meta-bar-details">
    <div class="player-card__meta-bar-details-column" v-if="$mq !== 'tablet'">
      <div class="player-card__meta-bar-details-row">
        <span class="label">Year</span> {{playerMeta.year}}
      </div>
      <div class="player-card__meta-bar-details-row">
        <span class="label">Age</span> {{playerMeta.age}}
      </div>
    </div>
    <div class="player-card__meta-bar-details-column" v-if="$mq !== 'tablet'">
      <div class="player-card__meta-bar-details-row">
        <span class="label">Height</span> {{playerMeta.height}}
      </div>
      <div class="player-card__meta-bar-details-row">
        <span class="label">Weight</span> {{playerMeta.weight}}
      </div>
    </div>
     <div class="player-card__meta-bar-details-column player-card__meta-bar-details-column--shades">
      <div class="shades-of-icon">
        <img src="@/assets/img/icons/shades-of.svg" alt="Venn Diagaram Icon" data-not-lazy class="hover" />
        <img src="@/assets/img/icons/shades-of-icon-black.svg" alt="Venn Diagaram Icon" data-not-lazy class="non-hover" />
      </div>
      <div class="player-card__meta-bar-details-row">
        <span class="label">Shades Of:</span>
      </div>
      <div class="player-card__meta-bar-details-row player-card__meta-bar-details-row--shade-value">
        {{playerMeta.shadesOf}}
      </div>
    </div>
  </div>
  <div class="player-card__meta-bar-tablet" v-if="$mq === 'tablet'">
    <div class="player-card__meta-bar-details-column">
      <div class="player-card__meta-bar-details-row">
        <span class="label">Year</span> {{playerMeta.year}}
      </div>
      <div class="player-card__meta-bar-details-row">
        <span class="label">Age</span> {{playerMeta.age}}
      </div>
    </div>
    <div class="player-card__meta-bar-details-column">
      <div class="player-card__meta-bar-details-row">
        <span class="label">Height</span> {{playerMeta.height}}
      </div>
      <div class="player-card__meta-bar-details-row">
        <span class="label">Weight</span> {{playerMeta.weight}}
      </div>
    </div>
  </div>
</div>  
</template>

<script>
import DraftTeam from '~/components/PlayerCard/NFL/DraftTeam'
import Trend from '~/components/PlayerCard/NFL/Trend'

export default {
  name: 'MetaBar',
  components: {DraftTeam, Trend},
  props: ['player', 'rankKey', 'collapsed'],
  mounted() {
    this.$emit('setHeight',this.$refs.metaBar.offsetHeight);
  },
  computed: {
    rank() {
      return this.rankKey ? this.player[this.rankKey] + 1 : null;
    },
    teamNameLogo () {
      return this.$store.getters['content/teamNameLogo'](this.player[this.rankKey]);
    },
    playerMeta() {
      let playerData = this.player
      return {
        firstName: playerData.first_name,
        lastName: playerData.last_name,
        school: playerData.player_meta.school,
        position: this.$store.getters['content/playerPosition'](playerData.position),
        year: playerData.player_meta.year,
        age: playerData.player_meta.age,
        height: playerData.player_meta.height,
        weight: playerData.player_meta.weight,
        shadesOf: playerData.player_meta.shades_of
      };
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth']
    },
  },
  watch: {
    viewDepth() {
      this.$emit('setHeight',this.$refs.metaBar.offsetHeight);
    }
  }
}
</script>

<style lang="scss">
  @import './style.scss'
</style>