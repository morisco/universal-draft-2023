<template>
  <div id="app" class="app" :class="{'app--supports-hover': !($device.isMobile || $device.isTablet)}">
    <Header />
     <main v-if="pageSettings" id="main">
      <Intro />
      <mq-layout mq="tablet+">
        <Navigation />
      </mq-layout>
      <mq-layout mq="mobile">
        <MobileNavigation v-on:lock-scroll="lockScroll" v-on:unlock-scroll="unlockScroll" v-on:reset-list="resetList" />
      </mq-layout>
      <div 
        class="app__content" 
        id="app__content"
        :class="{
          'app__content--collapsed': collapsed
        }"
      >
        <mq-layout mq="tablet+">
          <Filters />
        </mq-layout>
        <PodcastController v-if="['tablet', 'small_desktop'].indexOf($mq) >= 0" />
        <Nuxt />
      </div>
    </main>
    <div ref="sizer" class="app__sizer"></div> 
  </div>

</template>

<script>
import Header from '~/components/Header'
import Filters from '~/components/Filters'
import MobileNavigation from '~/components/MobileNavigation'
import PodcastController from '~/components/Podcast/GlobalController'
import Navigation from '~/components/Navigation'
export default {
  components: { Header, Filters, MobileNavigation, Navigation, PodcastController },
  computed: {
    pageSettings () {
      return this.$store.getters['page/settings']
    },
    collapsed() {
      return this.$store.getters['viewOptions/depth'] === 'compact';
    }
  },
  created () {
    // this.$store.dispatch('page/getPageSettings')
    this.$store.dispatch('content/getContents')
  },
  mounted() {
    if(this.$refs.sizer){
      let vh = this.$refs.sizer.offsetHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      window.addEventListener('resize', function() {
        let vh = this.$refs.sizer.offsetHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      })
    }
  },
  data () {
    return {
      preLockScrollPos: null
    }
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
    }
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
}
</style>
