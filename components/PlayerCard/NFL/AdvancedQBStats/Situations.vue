<template>
  <div class="situational-accuracy">
    <h5>Situational Pinpoint %</h5>
    <!-- <Dropdown
      v-if="selectedOption.name"
      class="situational-accuracy__dropdown"
      :options="options" 
      :selected="selectedOption" 
      :close-on-outside-click="true"
      @updateOption="changeSituation"
    /> -->
    <div
      class="situational-accuracy__chart-wrapper"
    >
      <!-- <TransitionGroup
        :css="false"
        @before-enter="onBeforeEnter" 
        @enter="onEnter" 
        @leave="onLeave"
      > -->
      <template
        v-for="(situation) in situations"
      >
        <div
          :key="situation.label"
          class="situational-accuracy__situation"
        >
          <h6>{{ situation.label }}</h6>
          <div
            v-for="(chart) in situation.charts"
            :key="`${chart.label}-${chart.percentage}`"
            class="situational-accuracy__situation__chart"
          >
            <div class="situational-accuracy__situation__chart__percentage">
              <div
                class="situational-accuracy__situation__chart__percentage__bar"
                :style="{ maxWidth: `calc(${chart.percentage}% + 15px)` }"
              >
                {{ chart.label }}
              </div>
              <span class="percentage">{{ chart.percentage }}%</span>
            </div>
          </div>
        </div>
      </template>
      <!-- </TransitionGroup> -->
    </div>
  </div>
</template>

<script>
import Dropdown from '../../../Utility/Dropdown.vue';
import gsap from 'gsap';
export default {
  name: 'QBSituations',
  components: { Dropdown },
  props: {
    situations: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      options: [],
      selectedOption: {},
      selectedSituationIndex: 0,
      labelMap : [],
      timeout: null,
      animatedCharts: null,
    }
  },
  
  watch: {
    situations() {
      this.setSituations();
      this.animatedCharts = this.situations[this.selectedSituationIndex].charts;
    }
  },
  mounted() {
    this.setSituations();
  },
  methods: {
    onBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(10px)';
    },
    onEnter(el, done) {
      gsap.to(el, {
        opacity:1,
        transform:'translateY(0)',
        duration: 0.25,
        delay: 0.25,
        onComplete: done
      })
    },
    onLeave(el, done) {
      gsap.to(el, {
        opacity:0,
        duration: 0.25,
        transform:'translateY(10px)',
        onComplete: done
      })
    },
    changeSituation(payload, index) {
      clearTimeout(this.timeout);
      this.selectedSituationIndex = this.labelMap.indexOf(payload.name);
      this.animatedCharts = null;
      this.timeout = setTimeout(() => {
        this.animatedCharts = this.situations[this.selectedSituationIndex].charts;
      }, 375);
    },
    setSituations() {
      this.options = this.situations.map(situation => {
        return {
          name: situation.label
        }
      });
      this.labelMap = this.situations.map(situation => {
        return situation.label;
      })
      this.selectedOption = this.options[0];
    }
  },
}
</script>

<style lang="scss">
.situational-accuracy{
  &__dropdown{
    width:100%;
  }
}
</style>
<style lang="scss" scoped>
  .situational-accuracy{
    h5{
      @include advanced-section-label;
    }
    h6{
      @include advanced-situation-label;
    }
    &__chart-wrapper{
      position:relative;
      height:auto;
      width:100%;
      margin-top:-5px;
    }
    &__situation{
      display:flex;
      flex-direction:column;
      width:100%;
      margin-bottom:7px;

      &__chart{
        display:flex;
        width:100%;
        &:nth-of-type(even){
          .situational-accuracy__situation__chart__percentage__bar{
            background:$highlight1;
          }
        }
        &:nth-of-type(odd){
          .situational-accuracy__situation__chart__percentage__bar{
            background:$highlight2;
          }
        }
        &__label{
          // @include player-card-body;
          margin-bottom:0;
          width:auto;
          margin-left:15px;
        }
        &__percentage{
          width:100%;
          display:flex;
          justify-content:flex-start;
          align-items:center;
          flex:1;
          margin-bottom:2px;
          .percentage {
              @include advanced-bar-label;
              padding-bottom:1px;
            }
          &__bar{
            color:white;
            width:100%;
            height:17px;
            padding-left:5px;
            margin-right:5px;
            white-space:nowrap;
            font-size:14px;
            padding-top:2px;
            // min-width:110px;
            @include advanced-bar-label;
            
            &__fill{
              height:100%;
              width:100%;
              max-width:0;
              transition:max-width 0.75s ease-in-out;
              background-color:$highlight2;
            }
          }
        }
      }
    }
  }
</style>