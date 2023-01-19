<template>
  <div
    id="navigation"
    ref="navigation"
    class="navigation"
    :class="[advanceClass, {'navigation--fixed': fixed}]"
  >
    <div
      class="navigation__sticky"
      :style="[fixed ? {width: width + 'px', maxWidth: maxWidth + 'px'} : {width: width, maxWidth: maxWidth}]"
    >
      <a
        href="https://theringer.com"
        target="_blank"
        class="navigation__ringer-home"
      >
        <img
          v-if="league === 'nba'"
          src="@/assets/img/ringer-circle-orange.svg"
          alt="The Ringer 'R' Logo"
        >
        <img
          v-if="league === 'nfl'"
          src="@/assets/img/ringer-circle-white.svg"
          alt="The Ringer 'R' Logo"
        >
      </a>
      <div class="navigation__links">
        <div class="navigation__links-inner">
          <NuxtLink
            v-for="option in sortedNavOptions"
            :key="option.to"
            tag="button"
            :to="option.to"
            :exact="option.to === '/'"
            :disabled="!option.enabled"
            class="navigation__button"
            :class="{'navigation__button--active': active === option.to}"
            @click="changeActive"
          >
            <span class="navigation__button-title">{{ option.title }} <span
              v-if="['tablet'].indexOf($mq) === -1"
              class="navigation__button-subtitle"
            >{{ option.subtitle }}</span></span>
            <span class="navigation__button-updated">{{ option.updated }}</span>
          </NuxtLink>
          <NuxtLink
            v-for="option in sortedNavOptions"
            :key="'dupe' + option.to"
            tag="button"
            :to="option.to"
            :exact="option.to === '/'"
            :disabled="!option.enabled"
            class="navigation__button navigation__button--duplicate"
            @click="changeActive"
          >
            <span class="navigation__button-title">{{ option.title }} <span
              v-if="['tablet', 'small_desktop'].indexOf($mq) === -1"
              class="navigation__button-subtitle"
            >{{ option.subtitle }}</span></span>
            <span class="navigation__button-updated">{{ option.updated }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="navigation__ghost" />
  </div>
</template>

<script>
import { scrollIt } from '~/plugins/scroller';
export default {
  name: "NavigationNBA",
  data() {
    return {
      fixed: false,
      fixedTimeout: null,
      width: null,
      maxWidth: null,
      sortedNavOptions: null,
      advanceClass: null,
      resortTimeout:null,
      active: this.getActive()
    }
  },
  computed: {
    pageSettings () {
      return this.$store.getters['page/settings'] || {}
    },
    league () {
      return process.env.PROJECT_LEAGUE.toLowerCase()
    }, 
    navOptions() {
      return this.pageSettings ? [
        {to: '/', title: 'Big Board', subtitle:'by Kevin O\'Connor', enabled: true, updated: this.pageSettings.players_to_watch_updated, routeNames: ['index', 'big_board_player_share']},
        {to: '/mock-draft', title: 'Mock Draft', subtitle:'by Kevin O\'Connor', enabled: this.pageSettings.enable_mock, updated: this.pageSettings.danny_updated, routeNames: ['mock-draft', 'mock_draft_player_share']},
        {to: '/team-needs', title: 'Team Needs', subtitle:'By Michael Pina', enabled: this.pageSettings.breakdown_by_team, updated: this.pageSettings.breakdown_updated, routeNames: ['team-needs', 'team_needs_team_share']},
        {to: '/draft-grades', title: 'Draft Grades', subtitle:'by Kevin O\'Connor', enabled: this.pageSettings.enable_results, updated: this.pageSettings.draft_results_updated, routeNames: ['draft-grades', 'draft_results_player_share']}
      ] : null;
    }
  },
  watch: {
    $route(to, from) {
      this.$store.commit('content/resetReady');
      if(to.path !== from.path){
        this.$ga.page(to.path);
        const newActiveIndex = this.sortedNavOptions.findIndex((option) => option.to === to.path);
        this.advanceClass = 'navigation--advance-' + newActiveIndex;
        this.active = this.getActive();
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
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
    clearTimeout(this.resortTimeout);
  },
  methods: {
    getActive() {
      if(['index', 'big_board_player_share'].indexOf(this.$route.name) >= 0){
        return '/';
      } else if(['mock-draft', 'mock_draft_player_share'].indexOf(this.$route.name) >= 0){
        return '/mock-draft';
      } else if(['team-needs', 'team_needs_team_share'].indexOf(this.$route.name) >= 0){
        return '/team-needs';
      } else if(['draft-grades', 'draft_results_player_share'].indexOf(this.$route.name) >= 0){
        return '/draft-grades';
      }
    },
    handleScroll () {
      var distanceFromTopWhenSticky = -2;
      if(this.$refs.navigation && window.scrollY > this.$refs.navigation.offsetTop - distanceFromTopWhenSticky){
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
      reorderedOptions.sort((x,y) => currentRoute.path.indexOf(x.to) >= 0  ? -1 : currentRoute.path.indexOf(y.to) >= 0 ? 1 : 0);
      this.sortedNavOptions = reorderedOptions;
    }
  }
}
</script>

<style scoped lang="scss">
$navHeight: 70px;
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
    height:$navHeight;
    transform:translateX(-50%);
    background:$white;
    // border: 2px solid $black;
    border-radius: 9px;
    overflow:hidden;
    transition:all 0.125s linear;
    background:$highlight2-light;
  }
  &__links{
    display:flex;
    flex:1;
    overflow:hidden;
    height:$navHeight;
    &-inner{
      display:flex;
      min-width:200%;
      height:$navHeight;
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
        border-right:1px solid $white;
        transition:all 0s linear;
      }
    }
    &-2{
      .navigation__links-inner{
        animation: advance-2 0.5s 1 ease-in-out;
        animation-fill-mode: forwards;
      }
      .navigation__button:nth-child(4){
        border-right:1px solid $white;
        transition:all 0s linear;
      }
    }
    &-3{
      .navigation__links-inner{
        animation: advance-3 0.625s 1 ease-in-out;
        animation-fill-mode: forwards;
      }
      .navigation__button:nth-child(4){
        border-right:1px solid $white;
        transition:all 0s linear;
      }
    }
    &-4{
      .navigation__links-inner{
        animation: advance-4 1.25s 1 ease-in-out;
        animation-fill-mode: forwards;
      }
      .navigation__button:nth-child(4){
        border-right:1px solid $white;
        transition:all 0s linear;
      }
    }
  }

  &__button{
    flex:1;
    display:flex;
    flex-direction:column;
    padding:0 20px 0;
    justify-content:center;
    height:$navHeight;
    border-right:1px solid $white;
    color:$white;
    transition:all 0.25s linear 0.5s, border-right 0.25s linear 0s;
    background:$highlight2;
    @include single-column{
      padding:0 10px 0;
    }
    &:disabled{
      // opacity:0.5;
      cursor:default;
      span{
        opacity:0.5;
      }
    }
    
    &:nth-child(4),
    &:last-of-type{
      border-right:0;
    }
    span{
      display:block;
      text-transform:uppercase;
      white-space:nowrap;
    }
    &--active{
      background:$highlight2-light;
      color:$white;
      transition:all 0.25s linear 0s;
      .navigation__button-updated{
        // color:$highlight1;
      }
    }
  }
  &__button-title{
    @include demibold-title;
    margin-bottom:2px;
  }
  &__button-subtitle{
    display:inline-block !important;
    @include demibold-title;
    font-weight:300;
    color:$white;
  }
  &__button-updated{
    @include player-card-body;
    font-size:13px;
    line-height:1;
    color:$mediumgray;
    min-height:13px;
    margin:0;
    text-transform:none !important;
    text-align:center;
    @include single-column{
      font-size:12px;
    }
  }
  &__ghost{
    height:$navHeight;
    width: 100%;
  }

  &__ringer-home{
    position:relative;
    display:flex;
    justify-content:flex-end;
    align-items:center;
    width:4%;
    height:$navHeight;
    max-width:55px;
    background:$highlight2-light;
    flex: 0 0 auto;
    z-index:2;
    img{
      position:relative;
      z-index:1;
    }
    &:after{
      content:'';
      display:block;
      position:absolute;
      right:-5px;
      width:10px;
      top:0;
      bottom:0;
      background:$highlight2-light;
      z-index:0;

    }
    img{
      width:calc(100% - 16px);
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
      max-height:$navHeight;
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
      height:50px;
    }
    &__ringer-home{
      width:100%;
      max-width:40px;
      img{
        width:calc(100% - 10px);
        vertical-align:bottom;
        margin-top:3px;
      }
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

  .app--nba & {
    width:100%;
    max-width:100%;
    border-top:1px solid #FFF;
    &__sticky{
      max-width:100% !important;
      border-radius:0;
      background:black;
    }
    &__ringer-home,
    &__button--active,
    &__button{
      background:black;
      &:after{
        background:black;
      }
    }
    &__button--active{
      .navigation__button-title,
      .navigation__button-subtitle{
        color:$nbaorange;
      }
      .navigation__button-updated{
        display:flex;
        align-items:center;
        font-weight:500;
        justify-content:center;
        &:before{
          content:'';
          display:inline-block;
          width:7px;
          height:7px;
          background-color:$nbaorange;
          border-radius:100%;
          margin-right:4px;
        }
      }
    }
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