<template>
  <div class="player-card__related-articles">
    <a v-for="article in articles" :key="article.title" :href="article.link">{{article.title}}</a>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      articles: [{title: 'Some Related Article Link Can Go In This Spot Here Or Not', link: 'https://theringer.com'}]
    }
  }
}
</script>

<style lang="scss" scoped>
.player-card{
  &__related-articles{
    margin-top:20px;
    a{
      @include player-card-body;
      color:$highlight2;
      text-decoration:underline;
      line-height:17px;
    }
  }
}
</style>