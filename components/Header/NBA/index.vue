<template>
  <header class="header">
    <div
      ref="headerWrapper"
      class="header__wrapper"
    >
      <div class="header__inner">
        <div class="header__inner-content">
          <div class="header__inner-text">
            <h1 class="headline">
              The Ringer's
              <strong>2022 NBA Draft Guide</strong>
            </h1>
          </div>
          <div class="header__graphic">
            <img
              :src="pageSettings.opener_image ? pageSettings.opener_image : 'https://storage.googleapis.com/nfldraft-theringer-com-cms/public/media/ringernfl2022/players/ChetHolmgren-full.png'"
              alt="Image of player"
            >
          </div>
          <div class="header__sponsor-byline">
            <div class="header__footer-sponsor">
              <span>Presented By</span>
              <img
                src="@/assets/img/nba-statefarm.svg"
                alt="State Farm Logo"
                data-not-lazy
              >
            </div>
            <h2 class="subheadline">
              BY KEVIN O'CONNOR
            </h2>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderNBA",
  computed: {
     pageSettings () {
      return this.$store.getters['page/settings']
    },
  }
}
</script>

<style lang="scss">
.header{
  height:auto;
  width:100vw;
  background:#000;
  height: calc(var(--vh, 1vh) * 150);
  max-height:1400px;
  // opacity:0;
  overflow:hidden;
  width:100vw;
  @include tablet {
    height: calc(var(--vh, 1vh) * 100);
    min-height: calc(var(--vh, 1vh) * 100);
  }
  
  &__wrapper{
    height: calc(var(--vh, 1vh) * 150);
    max-height:1400px;
    opacity:0;
    .app--ready &{
      transition:opacity 1s linear;
      opacity:1;
    }
    @include tablet {
      height: calc(var(--vh, 1vh) * 100);
      max-height: calc(var(--vh, 1vh) * 100);
    }
  }
  .subheadline{
    font-size:42px;
    line-height:1;
    letter-spacing:0;
    margin-top:-4px;
    @include tablet {
      font-size:8vw;
    }
  }
  
  &__graphic{
    width:100%;
    background-image:url(~assets/img/nba/squiggle-pattern.svg);
    background-size:auto 27px;
    background-position:center top;
    min-height:300px;
    flex:1;
    position:relative;
    
    @include tablet{
      height:65vh;
      height: calc(var(--vh, 1vh) * 60);
      flex: 0 0 auto;
      margin-bottom:8vw;
      background-size:auto 20px;
    }
    img{
      height:calc(100% + 85px);
      position:absolute;
      right:-30px;
      top:-71px;
      @include tablet{
        top:-14.2vw;
        height:calc(100% + 16vw);
        right:-3%;
      }
    }
  }
  &__sponsor-byline{
    display:flex;
    width:100%;
    justify-content:space-between;
    align-items:center;
    margin-top:15px;
    .header__footer-sponsor{
        display:flex;
        align-items:center;
        flex:1;
        justify-content:flex-start;
        color:white;
        img{
          width:200px;
          margin-left:15px;
          @include mobile{
            width:125px;
          }
        }
      }
    @include tablet{
      flex-direction:column-reverse;
      position:absolute;
      height: calc(calc(var(--vh, 1vh) * 20) - 20px);
      top:calc(100% + calc(8vw + 15px));
      margin-top:0;
      h2{
        font-size:8vw;
        width:100%;
        max-width:100%;
        text-align:right;
      }
      
    }
  }
  &__wrapper,
  &__inner{
    width:100%;
    background:#000;
    display:flex;
    align-items:center;
    flex-direction:column;
    flex:1;
  }
  &__inner{
    padding:90px 0 60px;
    &:before{
      display:none;
    }
    @include tablet{
      padding: calc(var(--vh, 1vh) * 15) 0 0;
      justify-content:flex-start;
      &-text{
        position:absolute;
        top:0;
        bottom:0;
        width:100%;
      }
    }
  }
  &__inner-content{
    position:relative;
    width:calc(100% - 45px);
    max-width:740px;
    display:flex;
    flex-direction:column;
    flex:1;
    @include tablet{
      height:65vh;
      height: calc(var(--vh, 1vh) * 60);
      flex: 0 0 auto;
    }
  }
  h1{
    &.headline{
      text-transform:uppercase;
      // display:block;
      font-size:42px;
      line-height:1;
      font-weight:100;
      text-align:left;
      margin-bottom:15px;
      width:100%;
      @include tablet{
        position:absolute;
        top:calc(-8vw - 10px);
        bottom:calc(-8vw - 10px);
        margin-bottom:0;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        width:100%;
        font-size:8vw;
        strong{
          text-align:right;
          width:100%;
          align-self:flex-end;
        }
      }
      strong{
        display:block;
        font-weight:500;
      }
    }
  }
}
</style>