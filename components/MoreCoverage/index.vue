<template>
  <div class="related-articles">
    <div
      class="related-articles__credits"
      v-html="measurementInfo"
    />
    <div class="related-articles__title">
      More from The Ringer
    </div>
    <div class="related-articles__articles">
      <Article
        v-for="article in articlesToShow"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>

<script>
import Article from './Article.vue';
export default {
  name: "MoreCoverage",
  components: { Article },
  props: ['articles'],
  computed: {
    measurementInfo() {
      return this.$store.getters['page/settings'].measurement_info;
    },
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
  margin:60px 0 15px;
  position:relative;
  @include tablet-portrait-only{
    margin-top:60px;
  }
  @include mobile{
    margin-top:100px;
    .app--nba & {
      padding: 0 50px 50px;
      margin-top:100px;
    }
  }
  &__credits{
    position: absolute;
    top:-20px;
    right:0;
    font-size:10px;
    
    @include mobile{
      right:auto;
      left:0;
      top:-50px;
      .app--nba & {
        left:50px;
        right:50px;
        text-align:right;
      }
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