<template>
<div class="mobile-navigation__lists">
  <img src="@/assets/img/emoji/point-right.png" alt="Finger pointing right" class="mobile-navigation__lists-icon" :style="{top: iconTop + 'px'}" />
  <router-link exact to="/" class="mobile-navigation__lists-button" v-on:click.native="changeList" activeClass="mobile-navigation__lists-button--active">
    <span class="mobile-navigation__lists-title">Big Board by Danny Kelly</span>
    <span class="mobile-navigation__lists-updated">{{pageSettings.players_to_watch_updated}}</span>
  </router-link>
  <router-link to="/mock-draft" class="mobile-navigation__lists-button" v-on:click.native="changeList" activeClass="mobile-navigation__lists-button--active">
    <span class="mobile-navigation__lists-title">Mock Draft</span>
    <span class="mobile-navigation__lists-updated">{{pageSettings.danny_updated}}</span>
  </router-link>
  <router-link to="/team-needs" class="mobile-navigation__lists-button" v-on:click.native="changeList" activeClass="mobile-navigation__lists-button--active">
    <span class="mobile-navigation__lists-title">Team Needs</span>
    <span class="mobile-navigation__lists-updated">{{pageSettings.breakdown_updated}}</span>
  </router-link>
  <router-link to="/draft-results" class="mobile-navigation__lists-button" v-on:click.native="changeList" activeClass="mobile-navigation__lists-button--active">
    <span class="mobile-navigation__lists-title">Draft Results</span>
    <span class="mobile-navigation__lists-updated">{{pageSettings.results_updated}}</span>
  </router-link>
</div>  
</template>
<script>
export default {
  data() {
    return {
      toggleNavTimeout: null
    }
  },
  computed: {
    pageSettings() {
      return this.$store.getters['page/settings']
    },
    iconTop() {
      const menuOrder = ['/', '/mock-draft', '/team-needs', '/draft-results'];
      const activeIndex = menuOrder.indexOf(this.$route.path);
      return 55 * activeIndex;
    }
  },
  methods: {
    changeList(event) {
      event.stopPropagation();
      const self = this;
      self.$emit('reset-list');
      this.toggleNavTimeout = setTimeout(() => {
        self.$emit('toggle-navigation');
      }, 750);
    }
  }
}
</script>
<style lang="scss" scoped>
.mobile-navigation{
  
  &__lists{
    position:relative;
    border-top:1px solid $lightgray;
    margin-left:-15px;
    margin-right:-15px;
    a{ 
      display:flex;
      flex-direction:column;
      justify-content:center;
      padding:0 40px;
      height:55px;
      border-bottom:1px solid $lightgray;
      span{
        display:block;
      }
    }
    
    &-title{
      @include mobile-nav-label;
      color:$black;
      transition:color 0.25s linear;
    }
    &-updated{
      @include tooltip;
      color:$gray;
      transition:color 0.25s linear;
    }
    &-button{
      &--active{
        .mobile-navigation__lists-title,
        .mobile-navigation__lists-updated{
          color:$highlight2;
        }
      }
    }
    &-icon{
      position:absolute;
      margin-top:15px;
      width: 20px;
      left:10px;
      transition:top 0.5s ease-in-out;
    }
  }
}
</style>