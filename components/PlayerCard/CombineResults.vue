<template>
  <div class="player-card__headline-selling">
  </div>
</template>

<script>
export default {
  props: ['results']
}
</script>

<style lang="scss">
  .player-card{
    &__headline-selling{
      padding-right:40px;
      margin:30px 0 0;
    }
    &__headline{
      margin-bottom:-12px;
      p{
        margin-bottom:15px;
        @include player-headline;

      }
    }
    &__selling-point{
      @include meta-list-value;
      strong{
        @include meta-list-label;
      }
    }
  }
</style>