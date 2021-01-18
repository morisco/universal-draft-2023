<template>
  <div class="player-card list-inter">
    <div class="list-inter__image player-card__image-column">
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
    background:$black;
    overflow:hidden;
    flex-direction:row;
    border-radius:0.625rem;
    opacity:1;
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
      color:$white;
      padding:30px;
      background:transparent;
      @include mobile{
        width:100%;
        padding:25px 20px 20px;
      }
    }
    &__title{
      @include inter-title;
    }
    &__title-presnted{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;

    }
    &__presented-by{
      span{
        @include mobile-nav-label;
      }
      @include mobile{
        margin-bottom:15px;
      }
    }
    &__byline{
      @include mobile-nav-label;
      margin:10px 0 15px;
      @include mobile{
        margin: 10px 0;
      }
    }
    &__content{
      p{
        font-size:1em;
        line-height:1.4;
        margin-bottom:10px;
        &:last-of-type{
          margin-bottom:0;
        }
        a{
          text-decoration:underline;
          color:$white;
        }
      }
    }
  }
</style>