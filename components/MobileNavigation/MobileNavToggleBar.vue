<template>
  <button
    class="mobile-navigation__toggle-bar"
    @click="toggleNavigation"
  >
    <a
      href="https://theringer.com"
      target="_blank"
      class="mobile-navigation__ringer-logo"
    >
      <img
        src="@/assets/img/logo-square.png"
        alt="The Ringer 'R' Logo"
        data-not-lazy
      >
    </a>
    <div
      class="mobile-navigation__toggle-label"
      :class="{'mobile-navigation__toggle-label--transition': transition}"
    >
      <span class="mobile-navigation__toggle-label-current">
        <span class="mobile-navigation__toggle-label-current-closed">{{ currentLabel }}</span>
        <span class="mobile-navigation__toggle-label-current-open">{{ league === 'nfl' ? "The Ringer's 2023 NFL Draft Guide" : "The Ringer's 2023 NBA Draft Guide" }}</span>
      </span>
      <span class="mobile-navigation__toggle-label-new">{{ newLabel }}</span>
    </div>
    <div class="mobile-navigation__toggle-caret" />
  </button>
</template>
<script>
export default {
  name: "MobileNavToggleBarNFL",
  props: ['toggleNavigation'],
  data() {
    return {
      currentLabel: null,
      newLabel: null,
      transition: false
    }
  },
  computed: {
    league() {
      return process.env.PROJECT_LEAGUE.toLowerCase()
    }
  },
  watch : {
    $route() {
      const newLabel = this.getCurrentLabel(this.$route.name);
      this.newLabel = newLabel;
      // this.transition = true;
      this.transitionTimeout = setTimeout(() => {
        this.currentLabel = this.newLabel;
        this.newLabel = '';
        this.transition = false;
        // this.toggleNavigation();
      }, 1000);
    }
  },
  created() {
    this.currentLabel = this.getCurrentLabel(this.$route.name)
  },
  methods: {
    getCurrentLabel(name) {
      switch(name){
        case 'index':
        case 'big_board_player_share':
          return process.env.PROJECT_LEAGUE === 'NFL' 
            ? 'Big Board by Danny Kelly'
            : "Big Board by Kevin O'Connor"
        case 'mock-draft':
        case 'mock_draft_player_share':
          return process.env.PROJECT_LEAGUE === 'NFL'
            ? 'Mock Draft by Danny Kelly'
            : "Mock Draft by Kevin O'Connor"
        case 'team-needs':
        case 'team_needs_team_share':          
          return process.env.PROJECT_LEAGUE === 'NFL' 
            ? 'Team Needs by Danny Heifetz'
            : 'Team Needs by Michael Pina'
        case 'draft-grades':
        case 'draft_grades_player_share':
          return process.env.PROJECT_LEAGUE === 'NFL' 
            ? 'Draft Grades by Danny Kelly'
            : "Draft Grades by Kevin O'Connor"
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.mobile-navigation {
  &__toggle-bar{
    display:flex;
    align-items:center;
    background:$highlight2;
    padding:0 15px;
    width:calc(100% + 30px);
    margin:0 -15px;
    height:45px;
    position:relative;
    color:$white;
    .app--nba & {
      background:black;
    }
  }
  &__toggle-icon{
    height:20px;
    width:20px;
    background-image:url('~@/assets/img/icons/toggle.svg');
    background-size:contain;
    background-repeat:no-repeat;
    background-position: center center;
    margin-right:15px;
  }
  &__toggle-label{
    @include mobile-nav-label;
    transform:translateY(0);
    opacity:1;
    width:100%;
    text-align:left;
    &-current{
      position:relative;
      transform:translateY(2px);
      opacity:1;
      display:block;
      flex:1;
      .app--nba & {
        transform:translateY(0);
      }
      &-closed{
        opacity:1;
        transition:opacity 0.25s linear 0.25s;  
      }
      &-open{
        position:absolute;
        left:0;
        top:0;
        right:0;
        opacity:0;
        transform:translateY(0);
        transition:opacity 0.25s linear;
        .app--nba & {
          left:20px;
        }
      }
      .mobile-navigation--expanded & {
        &-open{
          opacity:1;
          transform:translateY(0);
          transition:opacity 0.25s linear 0.25s;
        }
        &-closed{
          opacity:0;
          transition:opacity 0.25s linear;
        }
      }
    }
    &-new{
      position:absolute;
      left:0;
      top:0;
      transform:translateY(10px);
      opacity:0;
      right:0;
    }
    &--transition{
      .mobile-navigation__toggle-label{
        &-current{
          transform:translateY(-10px);
          opacity:0;
          transition:all 0.25s ease-in-out 0.5s;
        }
        &-new{
          transform:translateY(0);
          opacity:1;
          transition:all 0.25s ease-in-out 0.75s;
        }
      }
    }

  }
  &__toggle-caret{
    width:16px;
    height:16px;
    position:absolute;
    top:50%;
    margin-top:-8px;
    right:15px;
    background-image:url('~@/assets/img/icons/mobile-nav-arrow.svg');
    background-position: center center;
    background-size:contain;
    background-repeat:no-repeat;
    transform:rotate(0deg);
    transition: transform 0.25s ease-in-out;
    .mobile-navigation--expanded & {
      transform:rotate(-180deg);
    }
  }
  &__ringer-logo{
    display:block;
    width:33px;
    height:auto;
    margin-left:0;
    margin-right:10px;
    opacity:1;
    transition:all 0.25s ease-in-out 0.25s;
    img{
      width:100%;
      margin-top:2px;
    }
    .mobile-navigation--expanded & {
      margin-left:-40px;
      opacity:0;
      transition:margin-left 0.375s ease-in-out 0s, opacity 0.125s linear;
    }
  }
}
</style>