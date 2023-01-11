<template>
  <a
    :href="interstitial.link"
    target="_blank"
    class="writeup-inter player-card"
    :style="{'background-color':interstitial.bg_color}"
    @click="trackArticleOpen" 
  >
    <div class="writeup-inter__header">
      <div>
        <div
          class="writeup-inter__title"
          v-html="interstitial.title.replace('/n', '<br/>')"
        />
        <div
          class="writeup-inter__byline"
          v-html="interstitial.byline"
        />
      </div>
      <div
        v-if="$mq !== 'mobile'"
        class="writeup-inter__image"
      >
        <img
          :src="interstitial.image.medium"
          :alt="interstitial.title"
        >
      </div>
    </div>
    <div class="writeup-inter__squiggle" />
    <div class="writeup-inter__content">
      <div
        class="writeup-inter__content-detail"
        v-html="interstitial.content.replace(/<p><br><\/p>/g, '')"
      />
    </div>
  </a>
</template>

<script>
export default {
  name: "InterstitialWriteup",
  props: ['interstitial'],
  methods: {
    trackArticleOpen() {
      this.$ga.event({
        eventCategory: 'writeup-interstitial',
        eventAction: 'opened',
        eventLabel: this.interstitial.title
      });
    }
  }
}
</script>

<style lang="scss">
.writeup-inter{
  background:$cardback;
  color:black;
  border-radius:10px;
  border:0;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  padding:65px 65px 65px;
  overflow:hidden;
  border-radius:0.625rem;
  @include mobile {
    padding:30px 30px 45px;
    max-width:calc(100% - 40px);
    margin:0 auto;
  }
  &__header{
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  &__title{
    @include writeup-title;
  }
  &__byline{
    @include writeup-byline;
    margin-top:20px;
  }
  &.player-card{
    opacity:1;
  }
  &__image{
    width:100%;
    max-width:162px;
    border-radius:100%;
    overflow:hidden;
    z-index:0;
    img{
      width:100%;
      height:100%;
      object-fit:cover;
    }
  }
  &__content{
    position:relative;
    z-index:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    @include mobile {
      min-height:0;
    }
  }
  &__headline{
    @include inter-title;
    text-align:center;
    padding:25px 0 0;
    flex:1;
    color:white;
    width:100%;
    p{
      line-height:1.1;
    }
    p:last-of-type{
      margin:0;
    }
    @include mobile{
      font-size:20px;
      line-height:20px;
      padding:10px 0 0;
      margin-bottom:0;
      
    }
  }
  &__squiggle{
    width:100px;
    height:4px;
    margin-top:30px;
    background-image:url('~@/assets/img/squiggle.svg');
    background-size:auto 100%;
    background-position:left center;

  }
  &__content{
    padding-top:60px;
    @include mobile{
      padding-top:30px;
    }
    p, ul, ol{
      font-family: 'GT America';
      @include player-card-body;
      strong{
        font-weight:700;
      }
      em{
        font-style:italic;
      }
      @include non-mobile{
        font-size:18px;
        line-height:1.5;
      }
      &:last-of-type{
        margin-bottom:0;
      }
      &:empty{
        display:none;
      }
    }
    ul, ol {
      list-style:none;
      padding-left:20px;
      margin:30px 0;
      &:last-of-type{
        margin:30px 0;
      }
      li{
        margin-bottom:30px;
        &:last-of-type{
          margin-bottom:0;
        }
      }
    
    }
      ol {
        list-style:decimal;
        list-style-position: outside;
        li{
          list-style:decimal;
          list-style-position: inside;
        }
      }
  }
  &__link{
    @include expanded-label;
    font-size:19px;
    text-decoration:underline;
    @include mobile{
      font-size:15px;
    }
  }
}
</style>