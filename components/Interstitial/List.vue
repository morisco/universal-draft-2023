<template>
  <div class="player-card list-inter">
    <div class="list-inter__image player-card__image-column" v-if="false">
      <img :src="interstitial.image.small" />
    </div>
    <div class="list-inter__info player-card__info-column">
      <div class="list-inter__title-presnted">
        <div class="list-inter__title" v-html="interstitial.title_html"></div>
        <div class="list-inter__presented-by" v-if="$mq !== 'mobile'">
          <span>Presented By</span>
        </div>
      </div>
      <div class="list-inter__byline">
        By {{interstitial.byline}}
      </div>
      <div class="list-inter__presented-by" v-if="$mq === 'mobile'">
        <span>Presented By</span>
        <img src="@/assets/img/state-farm-red.svg" alt="State Farm Logo" data-not-lazy />
      </div>
      <div class="list-inter__content" v-html="interstitial.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['interstitial']
}
</script>

<style lang="scss">
  .list-inter{
    overflow:hidden;
    // background:transparent;
    padding:30px 90px 0 60px;
    flex-direction:row;
    border-radius:0.625rem;
    opacity:1;
    @include mobile{
      padding:0 20px;
    }
    .app__content--collapsed & {
      margin-bottom:15px;
    }
    &__image{
      img{
        object-fit:contain;
        object-position: center top;
        width:100%;
        position:absolute;
      }
      @include mobile{
        display:none;
      }
    }
    &__info{
      color:$highlight2;
      padding:30px 0;
      background:transparent;
      @include mobile{
        width:100%;
        padding:25px 0 20px;
      }
    }
    &__title{
      @include inter-title;
    }
    &__title-presnted{
      // display:flex;
      // align-items:flex-start;
      // justify-content:space-between;

    }
    &__presented-by{
      display:flex;
      align-items:center;
      span{
        @include mobile-nav-label;
      }
      img{
        height:20px;
        margin-left:7px;
      }
      @include mobile{
        margin-bottom:15px;
      }
    }
    &__byline{
      @include mobile-nav-label;
      margin:10px 0 15px;
      @include mobile{
        margin: 10px 0 8px;
      }
    }
    &__content{
      p{
        a{
          text-decoration:underline;
          color:$highlight2;
        }
      }
    }
  }
</style>