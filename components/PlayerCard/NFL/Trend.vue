<template>
  <div class="player-card__trend">
    <svg class="player-card__trend-down" v-if="trend === 'down'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	    viewBox="0 0 48 34" style="enable-background:new 0 0 48 34;" xml:space="preserve">
      <polygon class="player-card__trend-poly" points="28,28 37,25 24,12 16,20 0,4 4,0 16,12 24,4 41,21 44,12 48,34 "/>
    </svg>
    <svg class="player-card__trend-up" v-if="trend === 'up'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	    viewBox="0 0 48 34" style="enable-background:new 0 0 48 34;" xml:space="preserve">
      <polygon class="player-card__trend-poly" points="48,0 44,22 41,13 24,30 16,22 4,34 0,30 16,14 24,22 37,9 28,6 "/>
    </svg>
  </div>
</template>

<script>
export default {
  props: ['trend']
}
</script>

<style lang="scss" scoped>
.player-card{
  &__trend{
    position:absolute;
    top:17px;
    right:15px;
    width:30px;
    z-index:3;
    opacity:0.4;
    @include non-mobile{
      right:20px;
      top:22px;
      width:45px;
      .player-card--collapsed & {
        top:55%;
        right:30px;
        transform:translateY(50%);
        @include tablet-portrait-only{
          top:45px;
          transform:translateY(-50%);
        }
        .mock-draft &,
        .draft-results & {
          right:100px;
        }
      }
    }
    &-poly{
      fill:$darkmediumgray;
      @include mobile {
        .player-card--active &{
          fill:$white;
          transition:fill 0.25s linear
        }
      }
      @include non-mobile{
        transition:fill 0.25s linear 0.5s;
      }
      .player-card:hover &{
        .app--supports-hover & {
          fill:$white;
          transition:fill 0.25s linear 0.5s;
        }
      }
      .player-card--expanded & {
        fill:$white;
        transition:fill 0.25s linear 0.5s;
      }
    }
  }
}
</style>