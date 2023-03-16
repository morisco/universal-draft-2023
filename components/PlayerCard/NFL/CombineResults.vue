<template>
  <div 
    class="player-card__combine-results" 
    :class="{'player-card__combine-results--ready': topHeight, 'player-card__combine-results--qb': isQb}"
  >
    <div class="player-card__combine-results-title">
      Combine Results
    </div>
    <ul class="player-card__combine-results-list">
      <template v-for="field in fields">
        <li
          v-if="results[field]"
          :key="field"
        >
          <div class="result">
            <span class="player-card__combine__results-label">{{ labels[field] }}</span>
            <span class="player-card__combine__results-value">{{ getResult(field) }}</span>
          </div>
          <div
            v-if="!['arm_length', 'hand_size'].includes(field)"
            class="percentile"
          >
            <div class="percentile-slider">
              <div
                class="percentile-knob"
                :style="{left: getPercent(field)}"
              />
            </div>
            <div class="percentile-label">
              {{ getPercentile(field) }}
            </div>
          </div>
        </li>
      </template>
    </ul>
    <div
      v-if="notTracked.length > 0"
      class="not-tested"
    >
      Not tested: {{ notTracked.join(', ') }}
      <i>
        Percentiles are calculated based on how a player performed compared to his position group across the past 10 combines.
      </i>
    </div>
  </div>
</template>

<script>
export default {
  name: "NFLCombineResults",
  props: ['results', 'topHeight', 'isQb'],
  data: () => (
    {
      fields: ['40_yard', 'vertical', 'broad', 'bench', '3_cone', '20_yard_shuffle', 'arm_length', 'hand_size'],
      labels: {
        '40_yard': '40-yard dash',
        'vertical': 'Vertical jump',
        'bench': 'Bench press',
        'broad': 'Broad jump',
        '3_cone': '3-cone drill',
        '20_yard_shuffle': '20-yard shuttle',
        'arm_length': 'Arm length',
        'hand_size': 'Hand size',
      },
    }
  ),
  computed: {
    notTracked() {
      const self = this;
      const keys = Object.keys(this.labels).filter((key) => {
        if(!this.results[key]){
          return self.labels[key]
        }
      })
      return keys.map(key => this.labels[key]);
    }
  },
  methods: {
    getResult(field) {
      switch(field) {
        case '40_yard':
          return `${this.results[field]}s`;
        case 'vertical':
          return `${this.results[field]}"`;
        case 'bench':
          return `${this.results[field]} reps`;
        case 'broad':
          const feet = Math.floor(this.results[field]/12);
          const inches = Math.floor(this.results[field] - (feet * 12));
          return `${feet}'${inches}"`;
        case '3_cone': 
          return `${this.results[field]}s`;
        case '20_yard_shuffle':
          return `${this.results[field]}s`;
        case 'arm_length':
          return `${this.results[field]}`
        case 'hand_size':
          return `${this.results[field]}`
      }
    },
    getPercent(field) {
      return `${parseInt(this.results[`${field}_per`], 10)}%`;
    },
    ordinal_suffix_of(i) {
      var j = i % 10,
          k = i % 100;
      if (j == 1 && k != 11) {
          return i + "st";
      }
      if (j == 2 && k != 12) {
          return i + "nd";
      }
      if (j == 3 && k != 13) {
          return i + "rd";
      }
      return i + "th";
    },
    getPercentile(field) {
      const parsed = parseInt(this.results[`${field}_per`], 10);
      return `${this.ordinal_suffix_of(parsed)} Percentile`;
    }
  }
}
</script>

<style lang="scss">
  .player-card{
    &__combine-results{
      position:relative;
      left:0;
      right:0;
      bottom:0;
      opacity:1;
      transition:opacity 0.25s linear;
      margin-top:30px;
      
      .player-card__image-column &{
        margin-bottom:30px;
      }
      &--qb{
        @include mobile{
          margin-bottom: 0 !important;
          &:after{
            display:none !important;
          }

        }
      }
      &--ready{
        opacity:1;
      }
      &-title{
        @include expanded-label;
        text-transform:uppercase;
        color:$black;
      }
      &-list{
        list-style:none;
        color:$black;
        margin-top:10px;
        li{
          position:relative;
          .result{
            display:flex;
            justify-content:space-between;
            font-size: 14px;
          }
          .percentile{
            display:flex;
            flex-direction:column;
            align-items: flex-end;
            margin-top: 8px;
            .percentile-slider{
              position: relative;
              height:3px;
              width: 100%;
              background:$highlight2-lighter;
            }
            .percentile-knob{
              background:$highlight2;
              height: 7px;
              width: 7px;
              border-radius: 100%;
              position:absolute;
              top:50%;
              transform:translateY(-50%);
            }
            .percentile-label{
              font-size:11px;
              font-weight: 300;
              line-height: 22px; 
            }
          }
          margin: 8px 0;
          span{
            display:block;
            position:relative;
            z-index:2;
            // padding:2px 0;
                      background-color:$lightgray;

            &:first-of-type{
              padding-right:3px;
              @include player-card-body;
              font-size:14px;
              // color:$headlinegray;
              margin-bottom: 0 !important;
            }
            &:last-of-type{
              padding-left:4px;
              @include player-card-body;
              font-size:14px;
              // color:$headlinegray;
              margin-bottom: 0 !important;
            }
          }
        }
      }
      .player-card__info-column & {
        position:relative;
        top:auto !important;
        right:auto !important;
        left:auto !important;
        bottom:auto !important;
        background:transparent;
        margin:-45px 30px 0;
        padding:0 0 20px;
        opacity:0;
        transition:opacity 0.25s linear;
        @include mobile {
          margin:-30px 0 0;
          padding:15px 20px 0;
          // background:$lightgray;
          &:before{
            content:'';
            display:block;
            width:100%;
            height:1px;
            background:$mediumgray;
            margin-bottom:20px;
          }
          &:after{
            content:'';
            display:block;
            max-width:calc(100% -40px);
            margin:20px auto 15px;
            border-bottom:1px solid $mediumgray;
          }
        }
        .player-card--expanded & {
          opacity:1;
          transition:opacity 0.25s linear 0.5s;
        }
        &-title{
          color:$black;
          @include expanded-label;
          text-transform:uppercase;
        }
        &-list{
          max-width:calc(100% - 50px);
          margin-top:5px;
          @include mobile {
            max-width:100%;
          }

          li{
            background:transparent;
            span{
              background:$lightgray;
              color:$black;
            }
            &:before{
              color:$black;
            }
          }
        }
      }
    }
    .not-tested{
      border-top:1px solid $darkmediumgray;
      padding-top:11px;
      font-size:11px;
      line-height:1.3;
      font-weight: 300;
      i {
        display:block;
        margin-top:11px;
      }
    }
  }
</style>