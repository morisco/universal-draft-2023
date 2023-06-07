<template>
  <div 
    id="app" 
    class="app" 
    :class="['app--' + league, {
      'app--supports-hover': !($device.isMobile || $device.isTablet),
      'app--ready': siteReady
    }]"
  >
    <Header />
    <main
      v-if="pageSettings"
      id="main"
    >
      <Intro />
      <mq-layout mq="tablet+">
        <Navigation />
      </mq-layout>
      <mq-layout mq="mobile">
        <MobileNavigation
          @lock-scroll="lockScroll"
          @unlock-scroll="unlockScroll"
          @reset-list="resetList"
        />
      </mq-layout>
      <div 
        id="app__content" 
        ref="appContent"
        class="app__content"
        :class="{
          'app__content--collapsed': collapsed
        }"
      >
        <mq-layout mq="tablet+">
          <Filters />
        </mq-layout>
        <Nuxt />
        <StickyPodcast v-if="showSticky" />
      </div>
    </main>
    <Footer />
    <client-only>
      <Consent />
    </client-only>
    <div
      ref="sizer"
      class="app__sizer"
    /> 
  </div>
</template>

<script>
import Header from '~/components/Header'
import Filters from '~/components/Filters'
import Consent from '~/components/Consent'
import Intro from '~/components/Intro'
import MobileNavigation from '~/components/MobileNavigation'
import StickyPodcast from '~/components/StickyPodcast';
import Footer from '~/components/Footer';
import Navigation from '~/components/Navigation';

export default {
  name: "AppLayout",
  components: { Header, Intro, Filters, MobileNavigation, Navigation, StickyPodcast, Footer, Consent },
  data () {
    return {
      preLockScrollPos: null,
      siteReady: false,
    }
  },
  computed: {
    pageSettings () {
      return this.$store.getters['page/settings']
    },
    collapsed() {
      return this.$store.getters['viewOptions/depth'] === 'compact';
    },
    showSticky() {
      return ['mobile', 'tablet', 'small_desktop'].indexOf(this.$mq) >= 0;
    },
    league() {
      return process.env.PROJECT_LEAGUE.toLowerCase()
    }
  },
  watch: {
    '$mq'() {
      this.setCSSHeight();
    },
     async $route(to, from) {
       const self = this;
       setTimeout(() => {
         window.scrollTo({top: self.$refs.appContent.offsetTop - document.getElementById('navigation').offsetHeight - 40, left:0, behavior: 'smooth'});
       }, 500);
    },
  },
  created () {
    if(process.client){
      this.$ga.page(this.$route.path);
    }
    this.$store.dispatch('content/getContents', {
      teams: this.$store.getters['page/settings'].teams,
      draftRounds: this.$store.getters['page/draftRounds']
    })
  },
  mounted() {
    if(this.$refs.sizer){
      this.siteReady = true;
      this.setCSSHeight();
    } else {
      this.siteReady = true;
    }
    document.addEventListener('resize', this.setCSSHeight)
  },
  methods: {
    lockScroll() {
      this.preLockScrollPos = window.scrollY 
      document.body.classList.add('no-scroll');
    },
    unlockScroll() {
      window.scrollTo(0, this.preLockScrollPos)
      document.body.classList.remove('no-scroll');
    },
    resetList() {
      const topOfList = document.getElementById('app__content').offsetTop - 70;
      this.preLockScrollPos = topOfList
      window.scrollTo(0, topOfList);
    },
    setCSSHeight() {
      const self = this;
      setTimeout(() => {
        if(!self.$refs.sizer) return;
        let vh = self.$refs.sizer.offsetHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }, 250);
    },
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/base.scss";
@import "~/assets/scss/type.scss";
@import "~/assets/scss/main-section.scss";
#app{
  background:#FFF;
}
.app{
  opacity:0;
  &--ready{
    opacity:1;
  }
  &__sizer{
    position:fixed;
    top:0;
    bottom:0;
    right:0;
    left:0;
    z-index:-1;
  }
  &__content{
    position:relative;
    width: calc(100% - 210px);
    max-width: 1270px;
    margin:45px auto 0;
    display:flex;
    justify-content:flex-end;
    min-height:calc(100vh - 41px);
    z-index:0;
    .app--nfl & {
      max-width:1160px;
    }
    .app--nba & {
      margin:120px auto 0;
    }
    @include medium-desktop {
      width:calc(100% - 75px);
    }
    @include tablet-portrait-only{
      width:calc(100% - 45px);
    }
    @include single-column {
      flex-direction:column;
      justify-content:flex-start;
      margin:0 auto;
    }
    @include mobile{
      width:calc(100% - 30px);
    }
  }
  &--nba{
    .app__content{
      @include mobile{
        width:100%;
      }
    }
  }
}
</style>
