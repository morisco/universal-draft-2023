<template>
  <div class="player-card__headline-selling">
    <div class="player-card__headline" v-html="headline"></div>
    <div class="player-card__headline-shades" v-if="$mq === 'mobile'">
      <div class="shades-lockup">
        <div class="shades-of-icon">
          <img src="@/assets/img/icons/shades-of-icon-black.svg" alt="Venn Diagaram Icon" data-not-lazy class="non-hover" />
        </div>
        <span class="label">Shades Of</span>
      </div>
      <div class="player-card__meta-bar-details-row player-card__meta-bar-details-row--shade-value">
        {{playerMeta.shadesOf}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['headline', 'selling', 'player', 'playerMeta'],
}
</script>

<style lang="scss" scoped>
  .player-card{
    &__headline-selling{
      // padding-right:40px;
      margin:0  0;
      max-width:800px;
      .player-card__headline-shades{
        margin-top:30px;
        .player-card__meta-bar-details-row {
          @include player-card-body;
          font-family: 'GT America';
          color:$headlinegray;
          font-size:22px;
          line-height:1.2;
          margin-bottom:0 !important;
        }
      }
      .shades-lockup{
        display:flex;
        align-items:center;
        @include expanded-label;
        text-transform:uppercase;
        
        img{
          margin-right:5px;
          margin-left:1px;
        }
      }
      @include mobile{
        margin:0;
        padding: 10px 20px 40px;
        background:$lightgray;
        border-radius: 0 0 0.625rem 0.625rem;
        border-bottom:1px solid $darkmediumgray;
          border-radius:0;
          padding:20px 0 15px;
          background:transparent;
          .player-card--expanded & {
            border-bottom:0;
            padding:25px 0 0;
            transition:padding 0.25s linear;
          }
          &:after{
            content:'';
            display:none;
            height:1px;
            background:$black;
            position:absolute;
            bottom:0px;
            left:0;
            right:0;
            .player-card--expanded & {
              left:0;
              right:0;
              transition:all 0.25s linear;
            }
          }
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
      @include mobile {
        .app--nba & {
          margin-bottom:0;
          &-shades-of-icon{
            display:flex;
            width:100%;
            margin-top:20px;
            text-transform:uppercase;
            img{
              flex: 0 0 auto;
              align-self:center;
              width:30px;
              margin-right:5px;
            }
            &-value{
              margin-top:5px;
              @include player-headline;
              font-size:18px;
              color:$headlinegray;
            }
          }
        }
      }
      @include non-mobile{
        max-width:85%;
      }
      @include tablet-portrait-only{
        max-width:100%;
      }
      p{
        margin-bottom:15px;
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
          font-family: 'GT America';
          display:inline;
          text-transform:none;
          font-weight:400;
          color:$black;
          font-size:25px;
          letter-spacing:0;
        }
        @include mobile{
          font-size:22px;
          line-height:1.2;
          strong{
            font-size:22px;
          }
        }
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