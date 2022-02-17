<template>
  <header class="header">
    <Nav />
    <NFLHeader v-if="league === 'NFL'" :pageSettings="pageSettings" />
    <NBAHeader v-if="league === 'NBA'" :pageSettings="pageSettings" />
  </header>
</template>

<script>
import Nav from './Nav.vue';
import NFLHeader from './NFL.vue';
import NBAHeader from './NBA.vue';
import LoadingSpinner from '~/components/LoadingSpinner';
export default {
  components: { Nav, NFLHeader, NBAHeader, LoadingSpinner },
  computed: {
    pageSettings () {
      return this.$store.getters['page/settings']
    },
    league() {
      return process.env.PROJECT_LEAGUE;
    }
  }
}
</script>