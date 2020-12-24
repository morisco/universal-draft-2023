<template>
<button class="mobile-navigation__toggle-bar">
  <a href="https://theringer.com" target="_blank" class="mobile-navigation__ringer-logo">
    <img src="@/assets/img/logo-square.png" alt="The Ringer 'R' Logo" />
  </a>
  <div class="mobile-navigation__toggle-icon">
  </div>
  <div class="mobile-navigation__toggle-label" :class="{'mobile-navigation__toggle-label--transition': transition}">
    <span class="mobile-navigation__toggle-label-current">{{currentLabel}}</span>
    <span class="mobile-navigation__toggle-label-new">{{newLabel}}</span>
  </div>
  <div class="mobile-navigation__toggle-caret">
  </div>
</button>
</template>
<script>
export default {
  data() {
    return {
      currentLabel: null,
      newLabel: null,
      transition: false
    }
  },
  created() {
    this.currentLabel = this.getCurrentLabel(this.$route.path)
  },
  methods: {
    getCurrentLabel(path) {
      switch(path){
        case '/':
          return 'Big Board by Danny Kelly'
        case '/mock-draft':
          return 'Mock Draft'
        case '/team-needs':
          return 'Team Needs by Rober Mays'
        case '/draft-results':
          return 'Draft Results'
      }
    }
  },
  watch : {
    $route() {
      const newLabel = this.getCurrentLabel(this.$route.path);
      this.newLabel = newLabel;
      this.transition = true;
      this.transitionTimeout = setTimeout(() => {
        this.currentLabel = this.newLabel;
        this.newLabel = '';
        this.transition = false;
      }, 1000);
    }
  }
}
</script>
<style lang="scss" scoped>
.mobile-navigation {
  &__toggle-bar{
    display:flex;
    align-items:center;
    
    height:45px;
    position:relative;
    width:100%;
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
      transform:translateY(0);
      opacity:1;
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
    right:0;
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
    width:30px;
    height:30px;
    margin-left:0;
    margin-right:10px;
    opacity:1;
    transition:all 0.25s ease-in-out 0.5s;
    img{
      width:100%;
    }
    .mobile-navigation--expanded & {
      margin-left:-40px;
      opacity:0;
      transition:margin-left 0.375s ease-in-out 0s, opacity 0.125s linear;
    }
  }
}
</style>