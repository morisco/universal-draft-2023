<template>
  <div class="player-card__headline-selling">
    <div
      class="player-card__headline"
      v-html="headline"
    />
  </div>
</template>

<script>
export default {
  name: "NFLHeadline",
  props: ['headline', 'selling']
}
</script>

<style lang="scss">
  .app--nfl{
    .player-card{
      &__headline{
        p{
          margin-bottom:10px;
          @include player-headline;
          color:$headlinegray;
          letter-spacing: -0.025em; 
          font-size: 25px; 
          line-height:1.2;
          // line-height:22px;
          &:last-of-type{
            margin-bottom:5px;
          }
          strong{
            display:inline;
            text-transform:uppercase;
            font-weight:normal;
            font-family: 'Decima';
            color:$black;
            font-size:25px;
            line-height:0.935;
            letter-spacing:0;
          }
          @include mobile{
            font-size:19px;
            strong{
              font-size:19px;
            }
          }
        }
      }
    }    
  }
</style>

<style lang="scss" scoped>
  .player-card{
    &__headline-selling{
      // padding-right:40px;
      margin:0  0;
      max-width:800px;
      @include mobile{
        margin:0;
        padding: 0 20px 15px;
        background:$lightgray;
        border-radius: 0 0 0.625rem 0.625rem;
        // padding-right:0;
        // .player-card--collapsed & { 
        //   display:none;
        //   // margin: 15px 15px 30px;
        // }
        // .player-card--expanded & {
        //   display:block;
        // }
      }
    }
    &__headline{
      margin-bottom:-9px;
      font-weight:300;
      .mock-draft & {
        margin-bottom:0;
      }
      @include non-mobile{
        max-width:90%;
      }
      @include tablet-portrait-only{
        max-width:100%;
      }
      
    }
    &__selling-point{
      @include selling-point;
      @include mobile {
        padding-right:10px;
      }
      strong{
        @include selling-point-strong;
      }
    }
  }
</style>