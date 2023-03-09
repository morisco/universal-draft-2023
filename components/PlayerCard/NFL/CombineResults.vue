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
          <span class="player-card__combine__results-label">{{ labels[field] }}</span>
          <span class="player-card__combine__results-value">{{ getResult(field) }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NFLCombineResults",
  props: ['results', 'topHeight', 'isQb'],
  data: () => (
    {
      fields: ['40_yard', 'vertical', 'bench', 'broad', '3_cone', '20_yard_shuffle', 'arm_length', 'hand_size'],
      labels: {
        '40_yard': '40-Yard Dash',
        'vertical': 'Vertical',
        'bench': 'Bench Press',
        'broad': 'Broad Jump',
        '3_cone': '3-Cone',
        '20_yard_shuffle': '20-Yard Shuttle',
        'arm_length': 'Arm Length',
        'hand_size': 'Hand Size',
      },
    }
  ),
  methods: {
    getResult(field) {
      switch(field) {
        case '40_yard':
          return `${this.results[field]}s`;
        case 'vertical':
          return `${this.results[field]}"`;
        case 'bench':
          return `${this.results[field]} Reps`;
        case 'broad':
          const feet = Math.floor(this.results[field]/12);
          const inches = Math.floor(this.results[field] - (feet * 12));
          return `${feet}'${inches}"`;
        case '3_cone': 
          return `${this.results[field]}s`;
        case '20_yard_shuffle':
          return `${this.results[field]}s`;
        case 'arm_length':
          return `${this.results[field]}"`
        case 'hand_size':
          return `${this.results[field]}"`
      }
      console.log(field);
      console.log(this.results);
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
        margin-top:15px;
        li{
          position:relative;
          display:flex;
          justify-content:space-between;
          background-color:$lightgray;
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
              color:$headlinegray;
              margin-bottom: 0 !important;
            }
            &:last-of-type{
              padding-left:4px;
              @include player-card-body;
              color:$headlinegray;
              margin-bottom: 0 !important;
            }
          }
          &:before{
            content:'..........................................................................................................................................................................................................................................................................................................................................';
            font-family: 'Decima';
            display:block;
            position:absolute;
            bottom:-0.11em;
            color:$headlinegray;
            left:0;
            right:0;
            overflow:hidden;
            z-index:0;
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
          padding:15px 20px;
          background:$lightgray;
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
  }
</style>