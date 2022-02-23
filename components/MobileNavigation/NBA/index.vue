<template>
  <nav
    id="mobile-navigation" 
    ref="nav"
    class="mobile-navigation" 
    :class="{
      'mobile-navigation--sticky': fixed,
      'mobile-navigation--expanded': open
    }" 
  >
    <div class="mobile-navigation__sticky">
      <MobileNavToggleBar :toggle-navigation="toggleNavigation" />
      <div class="mobile-navigation__sticky-content">
        <MobileNavLists
          @toggle-navigation="toggleNavigation"
          @reset-list="$emit('reset-list')"
        />
        <Filters />
      </div>
    </div>
    <div class="mobile-navigation__ghost" />
  </nav>  
</template>

<script>
import { scrollIt } from '~/plugins/scroller'
import MobileNavToggleBar from './MobileNavToggleBar.vue'
import MobileNavLists from './MobileNavLists.vue'
import Filters from '~/components/Filters'

export default {
  name: 'MobileNavigationNBA',
  components: { MobileNavToggleBar, MobileNavLists, Filters },
  emits: ['reset-list', 'unlock-scroll', 'lock-scroll'],
  data () {
    return {
      fixed: false,
      open: false,
      openTimeout: null
    }
  },
  computed: {
    viewPosition() {
      return this.$store.getters['viewOptions/position'];
    },
    viewDepth() {
      return this.$store.getters['viewOptions/depth'];
    }
  },
  watch:{
    viewPosition() {
      this.toggleNavigation();
    },
    viewDepth() {
      this.toggleNavigation();
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, {passive: true});
    this.handleScroll();
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
    clearTimeout(this.openTimeout);
  },
  methods: {
    handleScroll () {
      if(window.scrollY > this.$refs.nav.offsetTop){
        this.fixed = true;
      } else {
        this.fixed = false;
      }
    },
    toggleNavigation () {
      if(!this.fixed){
        scrollIt(this.$refs.nav.offsetTop + 1, 500, 'easeOutQuad');
      }
      this.openTimeout = setTimeout(() => {
        if(this.open){
          this.$emit('unlock-scroll');
        } else {
          this.$emit('lock-scroll');
        }
        this.open = !this.open
      }, this.fixed ? 0 : 500);
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-navigation{
  position:relative;
  margin-bottom:30px;
  z-index:55555;
  max-width:100vw;
  max-height:100vh;
  overflow:hidden;
  *{
    -webkit-tap-highlight-color: transparent;
  }
  &__sticky{
    position:absolute;
    top:0;
    bottom: calc(100% -  45px);
    left:15px;
    right:15px;
    padding:0 15px;
    transition:all 0.125s linear, left 0.25s linear, right 0.25s linear, bottom 0.5s ease-in-out;
    border-radius:5px;
    background:$white;
    // border:1px solid $black;
    border-color: $black;
    overflow:hidden;
    z-index:2;
    .app--nba & {
      left:0;
      right:0;
      padding:0;
      border-radius:0;
    }
      border-top:1px solid;
      border-top-color: $white;
  }
  &__sticky-content{
    max-height:0;
    opacity:0;
    transition: max-height 0s linear 0.25s, opacity 0.25s linear 0s;
    .mobile-navigation--expanded & {
      opacity:1;
      max-height:100%;
      transition: max-height 0s linear 0s, opacity 0.25s linear 0.5s;
    }
  }
  &__ghost{
    position:relative;
    height:45px;
    width:100%;
    z-index:1;
  }
  &--sticky{
    .mobile-navigation__sticky{
      position:fixed;
      left:-1px;
      right:-1px;
      border-radius:0;
      border-top-color:transparent;
      transition:all 0.125s linear 0.125s, left 0.25s linear 0s, right 0.25s linear 0s, bottom 0.5s ease-in-out, border-radius 0.25s linear;
    }
  }
  &--expanded{
    .mobile-navigation{
      &__sticky{
        bottom:0;
        border-top-color: transparent;
        border-bottom-color:transparent;
        transition:all 0.125s linear 0s, left 0.25s linear, right 0.25s linear, bottom 0.5s ease-in-out;
      }
    }
  }
}
</style>