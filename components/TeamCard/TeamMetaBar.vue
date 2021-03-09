<template>
<div class="player-card__meta-bar team-card__meta-bar" ref="metaBar">
  <div class="player-card__meta-bar-name-school player-card__image-column">
    <h3>
      <span>{{team.title}}</span>
    </h3>
  </div>
  <div class="player-card__meta-bar-details">
    <div class="player-card__meta-bar-details-column" v-if="$mq !== 'tablet'">
      <div class="player-card__meta-bar-details-row">
        <span class="label">Team Needs</span><br/>
        <span class="value">{{teamNeeds}}</span> 
      </div>
    </div>
  </div>
</div>  
</template>

<script>

export default {
  name: 'TeamMetaBar',
  props: ['team'],
  computed: {
    rank() {
      return this.rankKey ? this.player[this.rankKey] + 1 : null;
    },
    teamNameLogo () {
      return this.$store.getters['content/teamNameLogo'](this.player[this.rankKey]);
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth']
    },
    teamNeeds () {
      const tn = this.team.needs.map((need) => {
        return need.need
      })
      return tn.join(', ')
    }
  },
  watch: {
    viewDepth() {
      this.$emit('setHeight',this.$refs.metaBar.offsetHeight);
    }
  }
}
</script>

<style lang="scss">
  @import '~/components/PlayerCard/NFL/MetaBar/style.scss';
  .team-card{
    &__meta-bar{
      h3{
        margin-top:3px;
      }
      .player-card__meta-bar-details{
        &-column{
          padding-left:30px;
          &:after{
            left:0;
            right:auto;
          }
        }
      }
    }

  }
</style>