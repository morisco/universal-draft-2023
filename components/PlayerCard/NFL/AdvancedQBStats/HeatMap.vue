<template>
  <div class="heat-map">
    <h5>Pinpoint % Heat Map</h5>
    <div class="heat-map__inner">
      <div
        v-for="row in mapRows"
        :key="row.label"
        class="heat-map__row"
      >
        <div
          v-for="(cell, index) in row.cells"
          :key="`${row.label}-${index}`"
          class="heat-map__cell"
          :style="{ backgroundColor: `rgba(15, 76, 63, ${cell.accuracy/100 + 0.2})` }"
        >
          <div class="heat-map__cell-content">
            <div>
              <img
                :src="getImgUrl(cell.emoji)"
                alt=""
              >
              <span class="heat-map__cell-content__accuracy">{{ cell.accuracy }}%</span>
            </div>
          </div>
        </div>
        <div class="heat-map__label">
          <span>{{ row.label }}</span>
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
          label: '20+',
          cells: [
            "20_left_accuracy",
            '20_center_accuracy',
            '20_right_accuracy',
          ]
        }, 
        {
          label: '10-19',
          cells: [
            'teens_left_accuracy',
            'teens_center_accuracy',
            'teens_right_accuracy',
          ]
        },
        {
          label: '0-9',
          cells: [
            'ones_left_accuracy',
            'ones_center_accuracy',
            'ones_right_accuracy',
          ]
        },
        {
          label: '<0',
          cells: [
            'negative_left_accuracy',
            'negative_center_accuracy',
            'negative_right_accuracy',
          ]
        }
      ],
      mapRows: [],
    }
  },
  watch: {
    heatMapData() {
      this.setHeatMapData();
    }
  },
  mounted() {
    this.setHeatMapData();
  },
  methods: {
    getImgUrl(emoji) {
      return require(`@/assets/img/emoji/${emoji ? emoji : 'bad'}.png`);
    },
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
          cells: row.cells.map((cell, index) => {
            const accuracy = self.heatMapData[cell];
            const color = self.heatMapData[cell + '_color'];
            const emoji = self.heatMapData[cell + '_emoji'];
            return {
              accuracy,
              color,
              emoji
            }
          })
        }
      });
    },
  }
}
</script>
<style lang="scss">
.heat-map{
  display:flex;
  flex-direction:column;
  align-items:flex-end;
  @include single-column{
    align-items:flex-start;
  }
  h5{
    @include advanced-section-label;
    width:240px;
    @include single-column {
      width:100%;
    }
  }
  &__inner{
    position:relative;
    width:240px;
    @include single-column {
      width:calc(100% - 20px);

    }
  }
  &__row{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    position:relative;
    padding-right:0;
  }
  &__cell{
    position:relative;
    width:80px;
    @include single-column {
      width:calc(33.333%);
    }
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
          width:14px;
          vertical-align:bottom;
          margin-bottom:5px;
        }
      }
      &__accuracy{
        opacity:1;
        transition:all 0.25s ease-in-out 0.25s;
        @include advanced-situation-chart-label;
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
      padding-top:60px;
    }
  }
  &__label{
    position:absolute;
    top:0;
    bottom:0;
    left:calc(100% + 10px);
    text-align:left;
    vertical-align:bottom;
    width:30px;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    @include advanced-bar-label;
    span{
      display:block;
      white-space:nowrap;
      line-height:1;
      // transform:rotate(90deg);
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