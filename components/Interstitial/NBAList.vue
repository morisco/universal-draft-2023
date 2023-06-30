<template>
  <article
    ref="card"
    class="player-card list-inter"
    :class="{'player-card--expanded': expanded}"
  >
    <div class="list-inter__title-presented">
      <div class="title-byline">
        <div
          class="list-inter__title"
          v-html="interstitial.title_html"
        />
        <div class="list-inter__byline">
          By {{ interstitial.byline }}
        </div>
      </div>
      <div class="list-inter__presented-by">
        <span>Presented By</span>
        <img
          src="@/assets/img/state-farm-red.svg"
          alt="State Farm Logo"
          data-not-lazy
        >
      </div>
    </div>
    <div class="list-inter__image-info">
      <div class="list-inter__image player-card__image-column">
        <img :src="interstitial.image.small">
      </div>
      <div
        class="list-inter__info"
        :style="{'maxHeight': maxHeight + 'px'}"
      >
        <div
          ref="topData"
          class="list-inter__top-data"
        >
          <div
            class="list-inter__content"
            v-html="firstParagraph"
          />
        </div>
        <div
          ref="bottomData"
          class="list-inter__remaining-content"
          v-html="remainingContent"
        />
        <button
          class="list-inter__expand"
          @click="toggleCard"
        >
          {{ expanded ? 'Read Less' : 'Read More' }}
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import { scrollIt } from '~/plugins/scroller'
export default {
  name: "InterstitialNBAList",
  props: ['interstitial'],
  data() {
    return {
      firstParagraph: '',
      remainingContent: '',
      expanded: false,
      maxHeight: null
    }
  },
  watch:{
    expanded() {
      if(!this.$refs.topData) return
      if(this.expanded){
        this.maxHeight = this.$refs.topData.offsetHeight + this.$refs.bottomData.offsetHeight;
      } else {
        this.maxHeight = this.$refs.topData.offsetHeight;
      }
      if(this.$refs.card.offsetParent.offsetTop + this.$refs.card.offsetTop + this.$refs.topData.offsetHeight + this.$refs.bottomData.offsetHeight + 60 > window.scrollY + window.innerHeight){
        let scrollDestination = this.$refs.card.offsetParent.offsetTop + this.$refs.card.offsetTop - (this.$mq === 'mobile' ? 60 : self.collapsed ? 75 : 85);
        scrollIt(scrollDestination, 500, 'linear');
      }
    }
  },
  mounted() {
    const self = this;
    setTimeout(() => {
      if(!self.$refs.topData) return;
      self.maxHeight = self.$refs.topData.offsetHeight;
    }, 500)
  },
  created() {
    if(process.client){
      let el = document.createElement('html');
        el.innerHTML = "<html><head><title>titleTest</title></head><body>" + this.interstitial.content + "</body></html>";
      const paragraphs = el.getElementsByTagName('p')
      let rest = '';
      paragraphs.forEach((p, i) => {
        if(i === 0){
          this.firstParagraph = p.outerHTML;
        } else {
          rest += p.outerHTML;
        }
      });
      this.remainingContent = rest;
    }
  },
  methods: {
    toggleCard() {
      if(!this.expanded){
        this.$gtag && this.$gtag.event('list-interstitial', {
          event_category: 'list-interstitial',
          event_action: 'expanded',
          event_label: this.interstitial.title_html
        });
      }
      this.expanded = !this.expanded;
    },
    cardExpanded() {
      // this.expanded = !this.expanded;
    }
  }
}
</script>

<style lang="scss" scoped>
  .player-card.list-inter{
    // overflow:hidden;
    // background:transparent;
    padding:30px;
    flex-direction:row;
    border-radius:0.625rem;
    opacity:1;
    background:$black;
    color:$white;
    transition:all 0.5s linear 0.5s;
    margin-bottom:45px;
    .app__content--collapsed & {
      margin-bottom:15px;
      margin-top:30px;
    }
    @include mobile{
      max-width:calc(100% - 30px);
      margin-left:auto;
      margin-right:auto;
      flex-direction:column;
    }
    
  }
  .list-inter{
    &__image-info{
      display:flex;
    }
    &__expand{
      position:absolute;
      bottom:-20px;
      text-transform:none;
      @include player-card-body;
      margin-bottom:0;
      color:$white;
      text-decoration:underline;
      @include mobile{
        margin-bottom:0;
      }
    }
    // &:hover{
    //   .app--supports-hover &{
    //     background:$lightgray;
    //     color:$black;
    //     .list-inter__presented-by{
    //       span{
    //         color:$black;
    //       }
    //     }
    //   }
    // }
    // &.player-card--expanded {
    //   background:$lightgray;
    //   color:$black;
    //   .list-inter__presented-by{
    //     span{
    //       color:$black;
    //     }
    //   }
    // }
    .player-card__toggle{
      position:relative;
      left:60px;
      @include mobile{
        left:20px;

      }
    }
    @include mobile{
      padding:30px 20px 20px;
    }
    &__image{
      position:relative;
      flex: 0 0 auto;
      width:300px;
      padding-right:30px;
      margin-bottom:-30px;
      overflow:hidden;
      img{
        width:100%;
        position:absolute;
      }
      @include mobile{
        display:none !important;
      }
    }
    &__info{
      position:relative;
      padding:15px 0 0 30px;
      margin-bottom:30px;
      background:transparent;
      transition:max-height 0.5s ease-in-out 0s;
      @include mobile{
        width:100%;
        padding:0;
        transition:max-height 0.5s linear 0s;
      }
    }
    &__title{
      @include inter-title;
      @include non-mobile{
        max-width:95% !important;
      }
    }
    &__title-presented{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      .title-byline{
        flex: 1;
      }

    }
    &__remaining-content{
      opacity:0;
      padding-bottom:1px;
      transition:opacity 0.25s linear 0s;
      .player-card--expanded & {
        opacity:1;
        transition:opacity 0.25s linear 0.5s;
      }
    }
    &__presented-by{
      display:flex;
      align-items:flex-end;
      flex-direction:column;
        margin-bottom:30px;
        flex: 0 0 auto;
      span{
        font-size:14px;
        font-weight:300;
        margin-bottom:5px;
        text-transform:uppercase;
        transition:color 0.5s linear 0.5s;
      }
      img{
        height:13px;
        margin-right:-2px;
      }
      @include mobile{
      }
    }
    &__byline{
      @include mobile-nav-label;
      font-family:'GT America';

      text-transform:none;
      margin:5px 0 15px;
      @include single-column{
        margin:20px 0 15px;
      }
      @include mobile{
        margin: 8px 0 30px;
        font-size:16px;
      }
    }
    &__content{
      &:after{
        content:'';
        display:block;
        position:relative;
        width:100%;
        height:1px;
      }
      
    }
  }
</style>

<style lang="scss">
  .app--nba {
    .list-inter{
      &__content{
        p{
          @include player-card-body;
          a{
            text-decoration:underline;
          }
        }
      }
    }
  }
</style>