<template>
  <div class="related-articles">
    <div class="related-articles__credits">Measurement data and player statistics via <a href="http://cfbstats.com/" target="_blank">cfbstats.com</a> and school bios. Icon illustrations by Mikey Burton.</div>
    <div class="related-articles__title">
      More from The Ringer
    </div>
    <div class="related-articles__articles">
      <Article v-for="article in articlesToShow" :key="article.id" :article="article" />
    </div>
  </div>
</template>

<script>
import Article from './Article.vue';
export default {
  props: ['articles'],
  components: { Article },
  computed: {
    articlesToShow () {
      let ats = [];
      this.articles.forEach((article) => {
        if(!article.deleted){
          ats.push(article);
        }
      });
      return ats;
    }
  }
}
</script>

<style lang="scss" scoped>
.related-articles{
  margin:45px 0 15px;
  position:relative;
  @include tablet-portrait-only{
    margin-top:60px;
  }
  @include mobile{
    margin-top:70px;
  }
  &__credits{
    position: absolute;
    top:-40px;
    right:0;
    font-size:10px;
    @include mobile{
      right:auto;
      left:0;
    }
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