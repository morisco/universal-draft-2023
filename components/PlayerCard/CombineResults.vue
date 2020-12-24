<template>
  <div 
    class="player-card__combine-results" 
    :style="{top: topHeight + 'px'}"
    :class="{'player-card__combine-results--ready': topHeight}"
  >
    <div class="player-card__combine-results-title">
      Combine Results
    </div>
    <ul class="player-card__combine-results-list">
      <li v-for="result in results" :key="result.combine_label + result.combine_value">
        <span class="player-card__combine__results-label">{{result.combine_label}}</span>
        <span class="player-card__combine__results-value">{{result.combine_value}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['results', 'topHeight'],
  mounted() {
    console.log(this.results);
  }
}
</script>

<style lang="scss">
  .player-card{
    &__combine-results{
      position:absolute;
      background:$black;
      left:0;
      right:0;
      bottom:0;
      opacity:0;
      transition:opacity 0.25s linear;
      padding:15px;
      &--ready{
        opacity:1;
      }
      &-title{
        @include combine-title;
        color:$white;
      }
      &-list{
        list-style:none;
        color:$white;
        margin-top:20px;
        li{
          position:relative;
          display:flex;
          justify-content:space-between;
          background-color:$black;
          margin: 8px 0;
          span{
            display:block;
            position:relative;
            z-index:2;
            // padding:2px 0;
                      background-color:$black;

            &:first-of-type{
              padding-right:3px;
              @include mobile-nav-label;
            }
            &:last-of-type{
              padding-left:4px;
              @include combine-value;
            }
          }
          &:before{
            content:'..........................................................................................................................................................................................................................................................................................................................................';
            display:block;
            position:absolute;
            bottom:-2px;
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
          margin:-45px 15px 0;
          padding:0 0 15px;
        }
        .player-card--open & {
          opacity:1;
          transition:opacity 0.25s linear 0.5s;
        }
        &-title{
          color:$black;
          @include expanded-label;
          font-family: TTCommons;
          text-transform:uppercase;
        }
        &-list{
          max-width:calc(100% - 50px);
          margin-top:5px;
          @include mobile {
            max-width:calc(100% - 55px);
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