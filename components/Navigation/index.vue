<template>
<div class="navigation" id="navigation" :class="[advanceClass, ...{'navigation--fixed': fixed}]" ref="navigation">
  <div class="navigation__sticky" v-bind:style="[fixed ? {width: width + 'px', maxWidth: maxWidth + 'px'} : {width: width, maxWidth: maxWidth}]">
    <a href="https://theringer.com" target="_blank" class="navigation__ringer-home">
      <img src="@/assets/img/logo-square.png" alt="The Ringer 'R' Logo" />
    </a>
    <div class="navigation__links">
      <div class="navigation__links-inner">
        <NuxtLink  v-for="option in sortedNavOptions" :to="option.to" :exact="option.to === '/'" v-on:click.native="changeActive" :disabled="!option.enabled" class="navigation__button" :key="option.to">
          <span class="navigation__button-title">{{option.title}}</span>
          <span class="navigation__button-updated">{{option.subtitle}}</span>
        </NuxtLink >
        <NuxtLink  v-for="option in sortedNavOptions" :to="option.to" :exact="option.to === '/'" v-on:click.native="changeActive" :disabled="!option.enabled" class="navigation__button navigation__button--duplicate" :key="'dupe' + option.to">
          <span class="navigation__button-title">{{option.title}}</span>
          <span class="navigation__button-updated">{{option.subtitle}}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
  <div class="navigation__ghost"></div>
</div>
</template>

<script>
import { scrollIt } from '~/plugins/scroller';
export default {
  data() {
    return {
      fixed: false,
      fixedTimeout: null,
      width: null,
      maxWidth: null,
      sortedNavOptions: null,
      advanceClass: null,
      resortTimeout:null
      // active: 'bigboard'
    }
  },
  computed: {
    pageSettings () {
      return this.$store.getters['page/settings'] || {}
    },
    navOptions() { 
      return this.pageSettings ? [
        {to: '/', title: 'Big Board by Danny Kelly', enabled: true, subtitle: this.pageSettings.players_to_watch_updated},
        {to: '/mock-draft', title: 'Mock Draft', enabled: this.pageSettings.enable_mock, subtitle: this.pageSettings.danny_updated},
        {to: '/team-needs', title: 'Team Needs', enabled: this.pageSettings.breakdown_by_team, subtitle: this.pageSettings.breakdown_updated},
        {to: '/draft-results', title: 'Draft Results', enabled: this.pageSettings.enable_results, subtitle: this.pageSettings.results_updated}
      ] : null;
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
    this.handleInitialNavOptions();
    // const currentRoute = this.$route;
  },
  mounted () {
    this.handleScroll();
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
    clearTimeout(this.resortTimeout);
  },
  methods: {
    handleScroll () {
      var distanceFromTopWhenSticky = -2;
      if(window.scrollY > this.$refs.navigation.offsetTop - distanceFromTopWhenSticky){
        this.fixed = true;
        this.width = window.innerWidth + 4;
        this.maxWidth = window.innerWidth + 4;
      } else {
        this.fixed = false;
        this.width = '100%';
        this.maxWidth = '1270px';
      }
    },
    changeActive(event) {
      event.preventDefault();
      if(window.scrollY < this.$refs.navigation.offsetTop){
        scrollIt(this.$refs.navigation.offsetTop + 4, 500);
      } else {
        setTimeout(() => {
          scrollIt(this.$refs.navigation.offsetTop + 4, 0);
        }, 375)
      }
      // this.active = newActive;
    },
    handleInitialNavOptions() {
      const existingSorted = this.sortedNavOptions;
      if(existingSorted || !this.navOptions) return;
      let reorderedOptions = [...this.navOptions];
      const currentRoute = this.$route;
      reorderedOptions.sort((x,y) => currentRoute.path === x.to ? -1 : currentRoute.path === y.to ? 1 : 0);
      this.sortedNavOptions = reorderedOptions;
    }
  },
  watch: {
    $route(to, from) {
      if(to.path !== from.path){
        const newActiveIndex = this.sortedNavOptions.findIndex((option) => option.to === to.path);
        this.advanceClass = 'navigation--advance-' + newActiveIndex;
        this.resortTimeout = setTimeout(() => {
          let existingSorted = [...this.sortedNavOptions];
          for(var i=0; i<newActiveIndex; i++){
            existingSorted.push(existingSorted.shift());
          }
          this.sortedNavOptions = existingSorted;
          this.advanceClass = null;
        },1250);
      }
    },
    navOptions() {
      this.handleInitialNavOptions()
    }
  }
}
</script>

<style scoped lang="scss">
.navigation{
  position:relative;
  width: calc(100% - 210px);
  max-width:1270px;
  margin:0 auto;
  z-index:555555;
  &__sticky{
    display:flex;
    position:absolute;
    top:0;
    left:50%;
    width: 100%;
    max-width:1270px;
    height:65px;
    transform:translateX(-50%);
    background:$white;
    border: 2px solid $black;
    border-radius: 9px;
    transition:all 0.125s linear;
  }
  &__links{
    display:flex;
    flex:1;
    overflow:hidden;
    height:61px;
    &-inner{
      display:flex;
      min-width:200%;
      height:65px;
      transform:translate3d(0,0,0);
      will-change:transform;
    }
  }
  &--advance{
    &-1{
      .navigation__links-inner{
        animation: advance-1 0.375s 1 ease-in-out;
        animation-fill-mode: forwards;
      }
      .navigation__button:nth-child(4){
        border-right:2px solid $black;
        transition:all 0s linear;
      }
    }
    &-2{
      .navigation__links-inner{
        animation: advance-2 0.5s 1 ease-in-out;
        animation-fill-mode: forwards;
      }
      .navigation__button:nth-child(4){
        border-right:2px solid $black;
        transition:all 0s linear;
      }
    }
    &-3{
      .navigation__links-inner{
        animation: advance-3 0.625s 1 ease-in-out;
        animation-fill-mode: forwards;
      }
      .navigation__button:nth-child(4){
        border-right:2px solid $black;
        transition:all 0s linear;
      }
    }
    &-4{
      .navigation__links-inner{
        animation: advance-4 1.25s 1 ease-in-out;
        animation-fill-mode: forwards;
      }
      .navigation__button:nth-child(4){
        border-right:2px solid $black;
        transition:all 0s linear;
      }
    }
  }

  &__button{
    flex:1;
    display:flex;
    flex-direction:column;
    padding:0 20px;
    justify-content:center;
    height:65px;
    border-right:2px solid $black;
    color:$black;
    transition:all 0.25s linear 0.5s;
    &:nth-child(4),
    &:last-of-type{
      border-right:0;
    }
    span{
      display:block;
    }
    &:not(.navigation__button--duplicate){
      &.nuxt-link-exact-active{
        background:$highlight2;
        color:$white;
        transition:all 0.25s linear 0.5s;
      }
    }
  }
  &__button-title{
    @include demibold-title;
  }
  &__button-updated{
    @include navigation-link-updated;
    min-height:17px;
  }
  &__ghost{
    height:65px;
    width: 100%;
  }

  &__ringer-home{
    display:flex;
    justify-content:center;
    align-items:center;
    width:4%;
    height:61px;
    background:$black;
    flex: 0 0 auto;
    img{
      width:70%;
    }
  }
  &--fixed{
    .navigation__sticky{
      position:fixed;
      top:-2px;
      left:50%;
      transform:translateX(-50%);
      width: calc(100% - 60px);
      max-width:100vw;
      border-radius:0;
      max-height:65px;
      transition:all 0.25s ease-in-out;
    }
  }
  @include single-column {
    width:calc(100% - 75px);
    &__sticky,
    &__links-inner,
    &__button,
    &__ghost{
      height:50px;
    }
    &__ringer-home,
    &__links{
      height:46px;
    }
    &--fixed{
      .navigation__sticky{
        max-height:50px;
      }
    }
  }
  @include medium-desktop {
    width: calc(100% - 75px);
  }
   @include tablet-portrait-only{
    width: calc(100% - 45px);
  }
}
@keyframes advance-1 {
  0% {
    transform:translate3d(0, 0, 0);
  } 100% {
    transform:translate3d(-12.5%, 0, 0);

  }
}

@keyframes advance-2 {
  0% {
    transform:translate3d(0, 0, 0);
  } 100% {
    transform:translate3d(-25%, 0, 0);

  }
}
@keyframes advance-3 {
  0% {
    transform:translate3d(0, 0, 0);
  } 100% {
    transform:translate3d(-37.5%, 0, 0);

  }
}
@keyframes advance-4 {
  0% {
    transform:translate3d(0, 0, 0);
  } 100% {
    transform:translate3d(-50%, 0, 0);

  }
}
</style>