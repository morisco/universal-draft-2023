<template>
  <a
    :href="interstitial.link"
    target="_blank"
    class="tout-inter player-card"
    :style="{'background-color':interstitial.bg_color}"
    @click="trackArticleOpen" 
  >
    <div
      class="tout-inter__image"
    >
      <img
        :src="$mq === 'mobile' ? interstitial.image_mobile.small ? interstitial.image_mobile.small : interstitial.image.small : interstitial.image.medium"
        :alt="interstitial.title"
      >
    </div>
    <div class="tout-inter__content">
      <div
        class="tout-inter__headline"
        v-html="interstitial.text.replace('/n', '<br/>')"
      />
    </div>
  </a>
</template>

<script>
export default {
  name: "InterstitialTout",
  props: ['interstitial'],
  methods: {
    trackArticleOpen() {
      this.$ga.event({
        eventCategory: 'tout-interstitial',
        eventAction: 'opened',
        eventLabel: this.interstitial.title
      });
    }
  }
}
</script>

<style lang="scss">
.tout-inter{
  color:$highlight2;
  background:transparent;
  border:0;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:45px 90px 65px;
  overflow:hidden;
  border-radius:0.625rem;
  @include mobile {
    padding:60px 45px 65px;
    margin:60px auto 0;
    border-radius:0;
  }
  &.player-card{
    opacity:1;
  }
  &__image{
    width:100%;
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
    font-style:normal;
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
      p br{
        display:none;
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