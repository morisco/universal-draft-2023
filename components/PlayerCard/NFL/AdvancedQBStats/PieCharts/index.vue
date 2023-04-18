<template>
  <div class="pie">
    <h5>Pressure Response</h5>
    <div class="chart">
      <Richardson v-if="id === 'Q4fv0QVejNfm7VJ7Rn6k'" />
      <Young v-if="id === 'p8bx2K6m4uTsMhYhLUKo'" />
      <Stroud v-if="id === 'JTZuNgBitbZI5cS2k2Bc'" />
      <Levis v-if="id === '7ltjLZZaa5MDclg5M4IB'" />
    </div>
  </div>
</template>

<script>
import Richardson from './svgs/Richardson.vue';
import Young from './svgs/Young.vue';
import Stroud from './svgs/Stroud.vue';
import Levis from './svgs/Levis.vue';
export default {
  name: "PieChart",
  components: { Richardson, Young, Stroud, Levis },
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