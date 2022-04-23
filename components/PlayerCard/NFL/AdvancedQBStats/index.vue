<template>
  <div class="player-card__advanced-qb">
    <div class="player-card__advanced-qb__heading">
      <h4>QB Charting by Ben SOlak</h4>
      <button class="info" :class="{'info--show': showNote}" @click="toggleNote">
        <span class="label">Our method</span>
        <span class="circle">?</span>
        <div class="message" v-html="cardQbNote" />
      </button>
    </div>
    
    <div class="player-card__advanced-qb__row">
      <AdvancedQBStatCards :stat-data="advancedQbStats.advanced_stats" />
      <PieCharts :id="id" />
      <!-- <Donut :donut  -data="advancedQbStats.pressure_response" /> -->
    </div>
    <div class="player-card__advanced-qb__row">
      <Situations :situations="advancedQbStats.situational_accuracy" />
      <HeatMap :heat-map-data="advancedQbStats.heat_map" />
    </div>
    <div
      v-if="advancedQbStats"
      class="player-card__advanced-qb__summary"
      v-html="advancedQbStats.summary || '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mattis felis ac posuere tristique. Sed semper mi sit amet mattis viverra. Mauris efficitur dolor quam, a rutrum purus dapibus eget. Cras sapien sapien, maximus eu purus quis, porttitor cursus arcu. Sed at felis ornare, venenatis neque sed, faucibus nibh. In id dui eu nunc viverra ullamcorper. Phasellus scelerisque scelerisque nibh, vel cursus nulla euismod in. Nullam pulvinar nulla sit amet mauris vestibulum hendrerit.</p>'"
    />
  </div>  
</template>

<script>
import Situations from './Situations.vue';
import HeatMap from './HeatMap.vue';
import Donut from './Donut.vue';
import PieCharts from './PieCharts/index.vue';
import AdvancedQBStatCards from './StatCards.vue';
export default {
  name: 'AdvancedQBStats',
  components: { Situations, HeatMap, Donut, AdvancedQBStatCards, PieCharts },
  props: {
    advancedQbStats: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedScenarioIndex: 0,
      showNote: false
    }
  },
  watch: {
    advancedQbStats() {
    }
  },
  computed: {
    cardQbNote() {
      return this.$store.getters['page/settings'].card_qb_note.trim()
    }
  },
  methods: {
    toggleNote () {
      this.showNote = !this.showNote;
    }
  },
  watch: {
    showNote() {
      const hideNote = () => {
        console.log('here');
        this.showNote = false;
        window.removeEventListener('click', hideNote);
      }
      window.removeEventListener('click', hideNote);

      if(this.showNote) {
        setTimeout(() => {
          window.addEventListener('click', hideNote);
        }, 500);
      }
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
      .message p {
        @include player-card-body;
        margin-bottom:0;
            font-size:12px;
      }
      &__summary{
        p {
          margin-bottom:15px;
        }
        
      }
      margin-bottom:30px;
    }
  }
</style>

<style lang="scss" scoped>
  .player-card{
    h4{
      @include expanded-label;
      text-transform:uppercase;
    }
    &__advanced-qb{
      padding-right:20px;
      margin-bottom:30px;
      @include single-column{
        margin-top:30px;
      }
      @include mobile {
        padding:0 20px;
      }
      &__heading{
        position:relative;
        display:flex;
        justify-content:space-between;
        align-items:center;
        overflow:visible;
        padding-top:10px;
        margin-bottom:15px;
        z-index:20;
        .info{
          position:relative;
          display:flex;
          justify-content:flex-end;
          align-items:center;
          width:300px;
          max-width:100px;
          margin-top:-2px;
          display:flex;
          justify-content:space-between;
          transition:max-width 0.25s ease-in-out 0.25s;
          position:absolute;
          right:0;
          top:8px;
          
          @include single-column{
            justify-content:space-between;
                        max-width:200px;

          }
          .label{
            z-index:1;
            position:relative;
            display:block;
            @include advanced-note;
            @include single-column{
              opacity:0;
            }
            &:after{
              content:"";
              display:block;
              position:absolute;
              bottom:-1px;
              left:0;
              right:0;
              background:$highlight2;
              height:1px;
            }
          }
          .circle{
            position:relative;
            z-index:1;
            width:20px;
            height:20px;
            background-color:$highlight2;
            border-radius:100%;
            display:flex;
            justify-content:center;
            align-items:center;
            color:white;
            margin-left:5px;
            font-weight:bold;
          }
          .message{
            display:block;
            opacity:0;
            position:absolute;
            top:-8px;
            left:-15px;
            right:-15px;
            padding:15px;
            padding-top:35px;
            text-align:left;
            border-radius:10px;
            z-index:0;
            background:$mediumgray;
            pointer-events:none;
            transition:opacity 0.25s linear 0s;
            
            * {
              margin-bottom:0;
            }

          }
          &--show{
            max-width:200px;
            transition:max-width 0.25s ease-in-out 0s;
            .label{
              opacity: 1;
              transition:opacity 0.25s linear 0s;
            }
            .message{
              opacity:1;
              pointer-events:auto;
              transition:opacity 0.25s linear ;
            }
          }
          @media (hover: hover) {
            &:hover{
              max-width:200px;
              transition:max-width 0.25s ease-in-out 0s;
              .message{
                opacity:1;
                pointer-events:auto;
                transition:opacity 0.25s linear 0.375s;
              }
            }
          }
        }
      }
      &__summary{
        margin-bottom:30px;
      }
      &__row{
        position:relative;
        z-index:0;
        display:flex;
        justify-content: space-between;
        margin-bottom:30px;
        &:nth-of-type(3){
          margin-bottom:15px;
        }
        @include single-column{
          flex-direction:column;
          margin-bottom:15px;
        }
        @include single-column{
          flex-direction:column;
          margin-bottom:15px;
        }
        > * {
          width:calc(50% - 15px);
          margin-bottom:15px;
          @include single-column{
            width:100%;
          }
        }
      }
    }
  }
</style>