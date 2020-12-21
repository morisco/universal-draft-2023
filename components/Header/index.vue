<template>
  <header class="header">
    <Nav />
    <div class="header__inner">
      <h1 class="headline">
        <span class="headline--small">The Ringer's</span>
        <span class="headline--big"><em>2021 NFL</em> Draft Guide</span>
      </h1>
      <h2 class="subheadline">With scouting reports by Danny Kelly</h2>
      <transition name="updated" appear :duration="50000">
        <span v-if="pageSettings" class="updated">{{pageSettings.intro_updated}}</span>
      </transition>
      <div class="header__loader">
        <LoadingSpinner :loaded="pageSettings" />
      </div>
    </div>
  </header>
</template>

<script>
import Nav from './Nav.vue';
import LoadingSpinner from '~/components/LoadingSpinner';
export default {
  components: { Nav, LoadingSpinner },
  computed: {
    pageSettings () {
      return this.$store.getters['page/settings']
    }
  }
}
</script>

<style scoped lang="scss">
.header{
  position:relative;
  background:$black;
  display:flex;
  flex-direction:column;
  align-items:center;
  height:100vh;
  justify-content:center;
  @include non-mobile{
    min-height:800px;
  }
  &__inner{
    display:flex;
    flex-direction:column;
    width: 100vw;
    padding: 0 4.5vw;
    justify-content:center;
    flex:1;
    @include non-mobile{
      width:71.375vw;
    }
  }
  &__loader{
    position:absolute;
    bottom:15px;
    right:15px;
    height:15px;
    width:15px;
  }
  .headline{
    display:flex;
    flex-direction:column; 
    max-width:60vh;
    @include non-mobile{
      max-width:100%;
    }
  }
  .subheadline{
    margin:30px 0 5px;
  }
  .updated{
    color:$white;
    opacity:0;
    &-enter-to{
      opacity:1;
    }
    &-enter-active{
      transition:opacity 1s linear;
    }
  }
}
</style>
