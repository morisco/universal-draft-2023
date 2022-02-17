<template>
<div class="mobile-navigation__lists">
  <img src="@/assets/img/emoji/point-right.png" alt="Finger pointing right" class="mobile-navigation__lists-icon" :style="{top: iconTop + 'px'}" />
  <NuxtLink tag="button" exact to="/" class="mobile-navigation__lists-button" v-on:click.native="changeList" activeClass="mobile-navigation__lists-button--active">
    <span class="mobile-navigation__lists-title">Big Board by Danny Kelly</span>
    <span class="mobile-navigation__lists-updated">{{pageSettings.players_to_watch_updated}}</span>
  </NuxtLink>
  <NuxtLink tag="button" to="/mock-draft" class="mobile-navigation__lists-button" :disabled="!pageSettings.enable_mock" v-on:click.native="changeList" activeClass="mobile-navigation__lists-button--active">
    <span class="mobile-navigation__lists-title">Mock Draft by Danny Kelly</span>
    <span class="mobile-navigation__lists-updated">{{pageSettings.danny_updated}}</span>
  </NuxtLink>
  <NuxtLink tag="button" to="/team-needs" class="mobile-navigation__lists-button" v-on:click.native="changeList" :disabled="!pageSettings.breakdown_by_team" activeClass="mobile-navigation__lists-button--active">
    <span class="mobile-navigation__lists-title">Team Needs by Danny Heifetz</span>
    <span class="mobile-navigation__lists-updated">{{pageSettings.breakdown_updated}}</span>
  </NuxtLink>
  <NuxtLink tag="button" to="/draft-grades" class="mobile-navigation__lists-button" v-on:click.native="changeList" :disabled="!pageSettings.enable_results" activeClass="mobile-navigation__lists-button--active">
    <span class="mobile-navigation__lists-title">Draft Grades by Danny Kelly</span>
    <span class="mobile-navigation__lists-updated">{{pageSettings.draft_results_updated}}</span>
  </NuxtLink>
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
      const menuOrder = [['index', 'big_board_player_share'], ['mock-draft', 'mock_draft_player_share'], ['team-needs', 'team_needs_team_share'], ['draft-grades', 'draft_results_player_share']];
      const activeIndex = menuOrder.findIndex((item) => item.indexOf(this.$route.name) >= 0);
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
    button{ 
      display:flex;
      flex-direction:column;
      justify-content:center;
      padding:0 40px;
      height:55px;
      width:100%;
      border-bottom:1px solid $lightgray;
      &:disabled{
        opacity:0.5;
      }
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
      font-family: 'GT America';
      font-size:13px;
      font-weight:normal;
      color:$gray;
      transition:color 0.25s linear;
      margin-top:2px;
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