/* eslint-disable vue/no-deprecated-v-on-native-modifier */
<template>
  <div class="mobile-navigation__lists">
    <img
      src="@/assets/img/emoji/point-right.png"
      alt="Finger pointing right"
      class="mobile-navigation__lists-icon"
      :style="{top: iconTop + 'px'}"
    >
    <div @click="changeList"> 
      <NuxtLink
        tag="button"
        exact
        to="/"
        class="mobile-navigation__lists-button"
        active-class="mobile-navigation__lists-button--active"
      >
        <span class="mobile-navigation__lists-title">{{ listOptions.bigBoard.title }}</span>
        <span class="mobile-navigation__lists-updated">{{ listOptions.bigBoard.subtitle }}</span>
      </NuxtLink>
    </div>
    <div @click="changeList"> 
      <NuxtLink
        tag="button"
        to="/mock-draft"
        class="mobile-navigation__lists-button"
        :disabled="!pageSettings.enable_mock"
        active-class="mobile-navigation__lists-button--active"
      >
        <span class="mobile-navigation__lists-title">{{ listOptions.mockDraft.title }}</span>
        <span class="mobile-navigation__lists-updated">{{ listOptions.mockDraft.subtitle }}</span>
      </NuxtLink>
    </div>
    <div @click="changeList"> 
      <NuxtLink
        tag="button"
        to="/team-needs"
        class="mobile-navigation__lists-button"
        :disabled="!pageSettings.breakdown_by_team"
        active-class="mobile-navigation__lists-button--active"
      >
        <span class="mobile-navigation__lists-title">{{ listOptions.teamNeeds.title }}</span>
        <span class="mobile-navigation__lists-updated">{{ listOptions.teamNeeds.subtitle }}</span>
      </NuxtLink>
    </div>
    <div @click="changeList"> 
      <NuxtLink
        tag="button"
        to="/draft-grades"
        class="mobile-navigation__lists-button"
        :disabled="!pageSettings.enable_results"
        active-class="mobile-navigation__lists-button--active"
      >
        <span class="mobile-navigation__lists-title">{{ listOptions.draftGrades.title }}</span>
        <span class="mobile-navigation__lists-updated">{{ listOptions.draftGrades.subtitle }}</span>
      </NuxtLink>
    </div>
  </div>  
</template>
<script>
export default {
  name: "MobileNavListsNFL",
  emits: ['toggle-navigation', 'reset-list'],
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
    },
    listOptions() {
      if (process.env.PROJECT_LEAGUE === 'NFL') {
        return {
          bigBoard: {
            title: 'Big Board by Danny Kelly',
            subtitle: this.pageSettings.players_to_watch_updated
          },
          mockDraft: {
            title: 'Mock Draft by Danny Kelly',
            subtitle: this.pageSettings.danny_updated
          },
          teamNeeds: {
            title: 'Team Needs by Danny Heifetz',
            subtitle: this.pageSettings.breakdown_updated
          },
          draftGrades: {
            title: 'Draft Grades by Danny Kelly',
            subtitle: this.pageSettings.draft_results_updated
          }
        }
      } else {
        return {
          bigBoard: {
            title: "Big Board by Kevin O'Connor",
            subtitle: this.pageSettings.players_to_watch_updated
          },
          mockDraft: {
            title: "Mock Draft by Kevin O'Connor",
            subtitle: this.pageSettings.danny_updated
          },
          teamNeeds: {
            title: 'Team Needs by Matt Dollinger',
            subtitle: this.pageSettings.breakdown_updated
          },
          draftGrades: {
            title: "Draft Grades by Kevin O'Connor",
            subtitle: this.pageSettings.draft_results_updated
          }
        }
      }
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