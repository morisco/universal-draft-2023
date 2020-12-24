<template>
  <div class="player-card__headline-selling">
    <div class="player-card__headline" v-html="headline"></div>
    <div class="player-card__selling-point">
      <strong>MAIN SELLING POINT:</strong> {{selling}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['headline', 'selling']
}
</script>

<style lang="scss">
  .player-card{
    &__headline-selling{
      padding-right:40px;
      margin:30px 0 0;
      max-width:800px;
      @include mobile{
        margin:20px 0 30px;
        // padding-right:0;
        .player-card--collapsed & { 
          display:none;
          margin: 15px 15px 30px;
        }
        .player-card--open & {
          display:block;
        }
      }
    }
    &__headline{
      margin-bottom:-9px;
      p{
        margin-bottom:15px;
        @include player-headline;

      }
    }
    &__selling-point{
      @include meta-list-value;
      @include mobile {
        padding-right:10px;
      }
      strong{
        @include meta-list-label;
      }
    }
  }
</style>