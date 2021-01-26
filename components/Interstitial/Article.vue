<template>
  <a :href="interstitial.link" target="_blank" class="article-inter player-card">
    <div class="article-inter__image" v-if="false">
      <img :src="interstitial.image.medium" :alt="interstitial.title" />
    </div>
    <div class="article-inter__content">
      <div class="article-inter__slug">{{interstitial.slug}}</div>
      <div class="article-inter__headline">{{interstitial.title}}</div>
      <div class="article-inter__link">READ IT NOW</div>
    </div>
  </a>
</template>

<script>
export default {
  props: ['interstitial']
}
</script>

<style lang="scss" scoped>
.article-inter{
  color:$highlight2;
  background:transparent;
  border:0;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:40px 0;
  overflow:hidden;
  border-radius:0.625rem;
  @include mobile {
    padding:20px 20px 25px;
  }
  &.player-card{
    opacity:1;
  }
  &__image{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:0;
    img{
      width:100%;
      height:100%;
      object-fit:cover;
    }
    &:after{
      content:'';
      display:block;
      position:absolute;
      left:0;
      right:0;
      bottom:0;
      top:0;
      z-index:1;
      background-color:rgba(255,255,255,0.75);
    }
  }
  &__content{
    position:relative;
    z-index:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    @include mobile {
      min-height:0;
    }
  }
  &__slug{
    @include slug;
    color:$highlight2;
  }
  &__headline{
    @include inter-title;
    text-align:center;
    padding:25px 0 40px;
    flex:1;
    @include mobile{
      font-size:20px;
      line-height:20px;
      padding:10px 0 20px;
    }
  }
  &__link{
    @include expanded-label;
    text-decoration:underline;
    @include mobile{
      font-size:15px;
    }
  }
}
</style>