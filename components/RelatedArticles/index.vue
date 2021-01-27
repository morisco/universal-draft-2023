<template>
  <div class="related-articles">
    <div v-if="false" class="related-articles__credits">Measurement data and player statistics via <a href="http://cfbstats.com/" target="_blank">cfbstats.com</a>, school bios, and the NFL combine.</div>
    <div class="related-articles__title">
      More from The Ringer
    </div>
    <div class="related-articles__articles">
      <Article v-for="article in articles" :key="article.id" :article="article" />
    </div>
  </div>
</template>

<script>
import Article from './Article.vue';
export default {
  props: ['articles'],
  components: { Article }
}
</script>

<style lang="scss" scoped>
.related-articles{
  margin:45px 0 15px;
  position:relative;
  &__credits{
    position: absolute;
    top:-40px;
    right:0;
    font-size:10px;
  }
  &__title{
    border-bottom:1px solid $black;
    margin-bottom:15px;
    @include mobile-nav-label;
    text-transform:uppercase;
  }
  &__articles{
    display:flex;
    width:calc(100% + 30px);
    margin:0 -15px;
    @include mobile{
      flex-direction:column;
    }
  }
}
</style>