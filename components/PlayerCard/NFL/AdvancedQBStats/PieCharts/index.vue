<template>
  <div class="pie">
    <h5>Pressure Response</h5>
    <div class="chart">
      <Corral v-if="id === 'wSSW42lccAtnhFAzI5vn'" />
      <Howell v-if="id === 'HDAIckNJeVkRS8ZWMQDp'" />
      <Pickett v-if="id === 'qHI9DULJMn0Mf6nC44mj'" />
      <Ridder v-if="id === 'ejhLbbMT9hLm793sadby'" />
      <Willis v-if="id === 'CEYkkD3GiPUuumJB3T4S'" />
    </div>
  </div>
</template>

<script>
import Ridder from './svgs/Ridder.vue';
import Corral from './svgs/Corral.vue';
import Howell from './svgs/Howell.vue';
import Pickett from './svgs/Pickett.vue';
import Willis from './svgs/Willis.vue';
export default {
  name: "PieChart",
  components: {Ridder, Corral, Howell, Pickett, Willis},
  props: {
    id: {
      type: String,
      required: true
    },
  }
}
</script>

<style lang="scss" scoped>
  .pie{
    max-width:240px;
    @include single-column{
      max-width:100%;
    }
    .chart{
      width:calc(100% + 60px);
      @include single-column{
        width:100%;
      }
    }
    h5{
      @include advanced-section-label;
    }
  }
</style>