<template>
  <div class="player-card__advanced-qb">
    <h4>QB Charting by Ben SOlak</h4>
    <div
      v-if="advancedQbStats"
      class="player-card__advanced-qb__summary"
      v-html="advancedQbStats.summary"
    />
    <div class="player-card__advanced-qb__row">
      <AdvancedQBStatCards :stat-data="advancedQbStats.advanced_stats" />
      <Donut :donut-data="advancedQbStats.pressure_response" />
    </div>
    <div class="player-card__advanced-qb__row">
      <Situations :situations="advancedQbStats.situational_accuracy" />
      <HeatMap :heat-map-data="advancedQbStats.heat_map" />
    </div>
  </div>  
</template>

<script>
import Situations from './Situations.vue';
import HeatMap from './HeatMap.vue';
import Donut from './Donut.vue';
import AdvancedQBStatCards from './StatCards.vue';
export default {
  name: 'AdvancedQBStats',
  components: { Situations, HeatMap, Donut, AdvancedQBStatCards },
  props: {
    advancedQbStats: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedScenarioIndex: 0,
    }
  },
  watch: {
    advancedQbStats() {
    }
  }
}
</script>

<style lang="scss">
  .player-card{
    &__advanced-qb{
      p{
        @include player-card-body;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .player-card{
    h4{
      text-transform:uppercase;
      font-size:16px;
    }
    &__advanced-qb{
      @include mobile{
        padding:0 20px;
      }
      &__summary{
        margin-bottom:30px;
      }
      &__row{
        display:flex;
        justify-content: space-between;
        margin-bottom:30px;
        @include mobile{
          flex-direction:column;
          margin-bottom:15px;
        }
        > * {
          width:calc(50% - 15px);
          margin-bottom:15px;
          @include mobile{
            width:100%;
          }
        }
      }
    }
  }
</style>