<template>
  <div class="player-card__related-articles">
    <a v-for="article in articles" target="_blank" :key="article.title" :href="article.article_link">{{article.article_title}}</a>
  </div>  
</template>

<script>
export default {
  props: ['articles']
}
</script>

<style lang="scss" scoped>
.player-card{
  &__related-articles{
    margin-top:20px;
    a{
      display:block;
      @include player-card-body;
      margin-bottom:10px;
      &:last-of-type{
        margin-bottom:5px;
      }
      color:$highlight2;
      text-decoration:underline;
      line-height:17px;
    }
  }
}
</style>