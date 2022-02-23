<template>
  <a
    :href="article.link"
    target="_blank"
    class="related-article"
  >
    <div class="related-article__image">
      <img
        :src="article.image.medium"
        :alt="article.title"
      >
    </div>
    <div class="related-article__title">
      {{ article.title }}
    </div>
  </a>
</template>

<script>
export default {
  name: "MoreCoverageArticle",
  props: ['article']
}
</script>

<style lang="scss" scoped>
.related-article {
  display:flex;
  flex-direction:column;
  flex:1;
  margin: 0 15px 30px;
  @include mobile{
    margin:0 15px 15px;
  }
  &__image{
    position:relative;
    padding-top:86.6667%;
    margin-bottom:15px;
    @include mobile{
      padding-top:50%;
      margin-bottom:5px;
    }
    img{
      position:absolute;
      top:0;
      width:100%;
      height:100%;
      object-fit:cover;
      object-position:center center;
      transition:filter 0.25s linear;
    
      filter:grayscale(100%);
    }
  }
  &__title{
    font-size:17px;
    line-height:1.2;
    @include mobile{
      line-height:1.1;
    }

  }
  &:hover{
    .related-article__image{
      img{
        filter:grayscale(0);
      }
    }     
  }
}
</style>