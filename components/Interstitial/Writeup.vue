<template>
  <a
    ref="writeupRef"
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
        v-if="interstitial.image.small"
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
  mounted() {
    const self = this;
    if(this.$route.params.player_id === this.interstitial.slug){
      setTimeout(() => {
        window.scrollTo({
          top: self.$refs.writeupRef.offsetTop + self.$refs.writeupRef.offsetParent.offsetTop - (self.$mq === 'mobile' ? 55 : 90),
          behavior: 'smooth'
        });
      }, 500);
    }
  },
  methods: {
    trackArticleOpen() {
      this.$gtag && this.$gtag.event('writeup-interstitial',{
        event_category: 'writeup-interstitial',
        event_action: 'opened',
        event_label: this.interstitial.title
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
    padding:45px 30px 45px;
    margin:60px auto 0;
  }
  &__header{
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    @include mobile{
      flex-direction:column-reverse;
    }
  }
  &__title{
    @include writeup-title;
    max-width:calc(100% - 162px);
    @include mobile{
      max-width:100%;
    }
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
    background:#CCCACA;
    @include mobile {
      background:#CCCACA;
      margin-bottom:20px;
    }
    img{
      width:100%;
      height:100%;
      object-fit:cover;
      vertical-align:bottom;
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
    width:283px;
    height:4px;
    margin-top:20px;
    border-bottom:1px solid black;
    
    @include mobile{
      margin:30px auto 0;
      width:90%;
      height:6px;
    }

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