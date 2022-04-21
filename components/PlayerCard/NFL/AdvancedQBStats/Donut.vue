<template>
  <div class="donut">
    <h5>Pressure Response</h5>
    <div class="donut__chart">
      <vc-donut
        v-if="sections"
        background="#e5e5e5"
        foreground="grey"
        :size="80"
        unit="%"
        :thickness="40"
        :sections="sections"
        :total="100"
        @section-mouseenter="handleMousEnter"
        @section-mouseleave="handleMousLeave"
      />
      <TransitionGroup
        @before-enter="onBeforeEnter" 
        @enter="onEnter" 
        @leave="onLeave"
      >
        <template
          v-for="section in sections"
        >
          <div
            v-if="selected.label === section.label"
            :key="section.label"  
            class="donut__selected"
          >
            <div class="donut__selected__percentage">
              {{ section.value }}%
            </div>
            <div class="donut__selected__label">
              {{ section.label }}
            </div>
          </div>
        </template>
      </TransitionGroup>
      <div
        key="default"
        :class="['donut__selected', 'donut__tooltip', {'donut__tooltip--visible': showToolTip}]"
      >
        <span v-if="$mq !== 'mobile'">Hover</span><span v-if="$mq === 'mobile'">Tap</span> to <br>
        see details
      </div>
    </div>
  </div>
</template>

<script>
  import gsap from 'gsap';
  export default {
    name: "AdvancedDonut",
    props: {
      donutData: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        sectionTimeout: null,
        toolTipTimeout: null,
        showToolTip: true,
        sections: null,
        selected: {},
        labels: {
          take_a_sack: 'Take a Sack',
          unchartable: 'Unchartable',
          stand_and_deliver: "Stand and Deliver",
          escape_pressure: "Escape Pressure",
          scramble: "Scramble",
        }
      };
    },
    watch: {
      donutData() {
        this.setSections();
      }
    },
    mounted() {
      this.setSections();
    },
    methods: {
      onBeforeEnter(el){
        el.style.opacity = 0;
        el.style.top = 'calc(50% + 10px)';
      },
      onEnter(el, done){
        gsap.to(el, {
          opacity: 1,
          top: '50%',
          onComplete: done
        })
      },
      onLeave(el, done) {
        gsap.to(el, {
          opacity: 0,
          top: 'calc(50% - 10px)',
          onComplete: done
        })
      },
      handleMousEnter(section) {
        clearTimeout(this.toolTipTimeout);
        this.showToolTip = false;
        this.sectionTimeout = setTimeout(() => {
          this.selected = section;
        }, 375);
      },
      handleMousLeave() {
        clearTimeout(this.sectionTimeout);
        this.selected = {};
        this.toolTipTimeout = setTimeout(() => {
          this.showToolTip = true;
        }, 500);
      },
      setSections() {
        const sects = ["escape_pressure", "scramble", "stand_and_deliver", "take_a_sack", "unchartable"].map(key => {
          return {
            label: this.labels[key],
            value: parseInt(this.donutData[key], 10),
            color: this.donutData[`${key}_color`],
          };
        });
        this.sections = sects;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .donut{
    h5{
        @include advanced-section-label;
      }
    &__chart{
      position:relative;
    }
    &__selected{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%, -50%);
      z-index:5;
      text-align:center;
    }
    &__tooltip{
      opacity:0;
      top:calc(50% + 10px);
      transition:all 0.25s ease-in-out;
      &--visible{
        opacity:1;
        top:50%;
      }
    }
  }
</style>