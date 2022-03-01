<template>
  <div class="heat-map">
    <h5>Accuracy Heat Map</h5>
    <div class="heat-map__wrapper">
      <div class="heat-map__wrapper-inner">
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
              <span class="heat-map__cell-content__accuracy">{{ cell.accuracy }}%</span>
              <span class="heat-map__cell-content__attempts">{{ cell.attempts }}<br>Attempts</span>
            </div>
          </div>
          <div class="heat-map__label">
            {{ row.label }}
          </div>
        </div>
      </div>
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
          label: '20+ YDS',
          cells: [
            ['20_left_attempts', '20_left_accuracy'],
            ['20_center_attempts', '20_center_accuracy'],
            ['20_right_attempts', '20_right_accuracy'],
          ]
        }, 
        {
          label: '10-19 YDS',
          cells: [
            ['teens_left_attempts', 'teens_left_accuracy'],
            ['teens_center_attempts', 'teens_center_accuracy'],
            ['teens_right_attempts', 'teens_right_accuracy'],
          ]
        },
        {
          label: '0-9 YDS',
          cells: [
            ['ones_left_attempts', 'ones_left_accuracy'],
            ['ones_center_attempts', 'ones_center_accuracy'],
            ['ones_right_attempts', 'ones_right_accuracy'],
          ]
        },
        {
          label: '<0 YDS',
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
  margin-bottom:30px;
  &__wrapper{
    perspective:300px;
    &-inner{
      transform:rotateX(10deg);
      transform-origin:center bottom;
    }
  }
  &__row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    &:nth-of-type(1){
      font-size:21px;
      .heat-map__cell {
        &:first-of-type{
          border-top-left-radius:8px;
        }
        &:nth-of-type(3){
          border-top-right-radius:8px;
        }
      }
    }
    &:nth-of-type(2){
      font-size:20px;
    }
    &:nth-of-type(3){
      font-size:19px;
    }
    &:last-of-type{
      font-size:18px;
      .heat-map__cell {
        &:first-of-type{
          border-bottom-left-radius:8px;
        }
        &:nth-of-type(3){
          border-bottom-right-radius:8px;
        }
      }
    }
  }
  &__cell{
    position:relative;
    width:calc(28.333% - 10px);
    background:$highlight2-light;
    margin-bottom:10px;
    

    &:nth-of-type(10){
      border-bottom-left-radius:8px;
    }
    &:nth-of-type(12){
      border-bottom-right-radius:8px;
    }
    &-content{
      span{
        position:absolute;
        left:50%;
        transform:translate(-50%, -50%);
        text-align:center;
      }
      &__accuracy{
        top:50%;
        opacity:1;
        transition:all 0.25s ease-in-out 0.25s;
      }
      &__attempts{
        top:calc(50% + 10px);
        opacity:0;
        transition:all 0.25s ease-in-out;
      }
    }
    &:hover{
      .heat-map__cell-content{
        &__accuracy{
          opacity:0;
          top:calc(50% - 10px);
          transition: all 0.25s ease-in-out;
        }
        &__attempts{
          opacity:1;
          top:50%;
          transition: all 0.25s ease-in-out 0.25s;
        }
      }
    }
    &:after{
      content:'';
      display:block;
      width:100%;
      padding-top:50%;
    }
  }
  &__label{
    width:15%;
    text-align:center;
  }
}
</style>