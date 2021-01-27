<template>
  <div 
    class="player-card__combine-results" 
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
}
</script>

<style lang="scss">
  .player-card{
    &__combine-results{
      position:relative;
      left:0;
      right:0;
      bottom:0;
      opacity:0;
      transition:opacity 0.25s linear;
      
      .player-card__image-column &{
        margin-bottom:30px;
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
              @include mobile-nav-label;
            }
            &:last-of-type{
              padding-left:4px;
              @include stat-title;
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
          margin:-20px 0 0;
          padding:15px 20px;
          background:$lightgray;
          &:before{
            content:'';
            display:block;
            width:100%;
            height:1px;
            background:$darkmediumgray;
            margin-bottom:20px;
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