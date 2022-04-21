<template>
  <div class="heat-map">
    <h5>Accuracy Heat Map</h5>
    <div
      v-for="row in mapRows"
      :key="row.label"
      class="heat-map__row"
    >
      <div
        v-for="(cell, index) in row.cells"
        :key="`${row.label}-${index}`"
        class="heat-map__cell"
        :style="{ backgroundColor: cell.color }"
      >
        <div class="heat-map__cell-content">
          <div>
            <img src="@/assets/img/emoji/compact.png" alt="" />
            <span class="heat-map__cell-content__accuracy">{{ cell.accuracy }}%</span>
          </div>
        </div>
      </div>
      <div class="heat-map__label">
        <span>{{ row.label }}</span>
      </div>
    </div>
    <div class="heat-map__labels">
      <span>Left</span>
      <span>Center</span>
      <span>Right</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvancedHeatMap',
  props: {
    heatMapData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rows: [
        {
          label: '20+',
          cells: [
            ['20_left_attempts', '20_left_accuracy'],
            ['20_center_attempts', '20_center_accuracy'],
            ['20_right_attempts', '20_right_accuracy'],
          ]
        }, 
        {
          label: '10-19',
          cells: [
            ['teens_left_attempts', 'teens_left_accuracy'],
            ['teens_center_attempts', 'teens_center_accuracy'],
            ['teens_right_attempts', 'teens_right_accuracy'],
          ]
        },
        {
          label: '0-9',
          cells: [
            ['ones_left_attempts', 'ones_left_accuracy'],
            ['ones_center_attempts', 'ones_center_accuracy'],
            ['ones_right_attempts', 'ones_right_accuracy'],
          ]
        },
        {
          label: '<0',
          cells: [
            ['negative_left_attempts', 'negative_left_accuracy'],
            ['negative_center_attempts', 'negative_center_accuracy'],
            ['negative_right_attempts', 'negative_right_accuracy'],
          ]
        }
      ],
      mapRows: [],
    }
  },
  mounted() {
    this.setHeatMapData();
  },
  methods: {
    getColor(accuracy) {
      switch(true) {
        case (accuracy < 10):
          return 'rgba(255, 121, 31, 1)'
        case (accuracy < 20):
          return 'rgba(255, 121, 31, 0.8)'
        case (accuracy < 30):
          return 'rgba(255, 121, 31, 0.6)'
        case (accuracy < 40):
          return 'rgba(255, 121, 31, 0.4)'
        case (accuracy < 50):
          return 'rgba(255, 121, 31, 0.2)'
        case (accuracy < 60):
          return 'rgba(15, 76, 63, 0.2)'
        case (accuracy < 70):
          return 'rgba(15, 76, 63, 0.4)'
        case (accuracy < 80):
          return 'rgba(15, 76, 63, 0.6)'
        case (accuracy < 90):
          return 'rgba(15, 76, 63, 0.8)'
        default: 
          return 'rgba(15, 76, 63, 1)'
      }
    },
    setHeatMapData() {
      const self = this;
      if(!self.heatMapData) return;
      this.mapRows = this.rows.map(row => {
        return {
          label: row.label,
          cells: row.cells.map((cells, index) => {
            const attempts = self.heatMapData[cells[0]];
            const accuracy = self.heatMapData[cells[1]];
            const color = self.getColor(accuracy);
            return {
              attempts,
              accuracy,
              color
            }
          })
        }
      });
    }
  }
}
</script>
<style lang="scss">
.heat-map{
  display:flex;
  flex-direction:column;
  h5{
    @include advanced-section-label;
  }
  &__row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    position:relative;
    padding-right:0;
    &:nth-of-type(2){
      .heat-map__label{
        margin-left:-5px;
        span{}
      }
    }
  }
  &__cell{
    position:relative;
    width:calc(33.333%);
    background:$highlight2-light;
    &:after{

    }
    &-content{
      div{
        color:white;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        text-align:center;
        display:flex;
        flex-direction:column;
        align-items:center;
        img{
          width:20px;
          vertical-align:bottom;
        }
      }
      &__accuracy{
        opacity:1;
        transition:all 0.25s ease-in-out 0.25s;
      }
      &__attempts{
        top:calc(50% + 10px);
        opacity:0;
        transition:all 0.25s ease-in-out;
      }
    }
    &:after{
      content:'';
      display:block;
      width:100%;
      padding-top:75px;
    }
  }
  &__label{
    position:absolute;
    top:0;
    bottom:0;
    left:calc(100% + 10px);
    text-align:center;
    vertical-align:bottom;
    display:flex;
    align-items:center;
    justify-content:center;
    span{
      display:block;
      height:0px;
      white-space:nowrap;
      line-height:1;
      transform:rotate(90deg);
      @include advanced-heatmap-label;
    }
    
  }
  &__labels{
    display:flex;
    width:100%;
    margin-top:5px;
    span{
      display:block;
      flex:1;
      text-align:center;
      @include advanced-heatmap-label;
    }
  }
}
</style>