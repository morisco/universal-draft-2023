<template>
<div class="main-section__intro">
  <div class="main-section__intro-content" v-html="introData.content"></div>
  <p class="main-section__intro-link" v-on:click="scrollToTop">
    <NuxtLink :to="introData.link">{{introData.linkText}}</NuxtLink>
  </p>
</div>
</template>

<script>
import { scrollIt } from '~/plugins/scroller';
export default {
  props: ['type'],
  computed: {
    introData() {
      switch(this.type){
        case 'big_board':
          return {
            content: this.$store.getters['page/settings'].big_board_intro,
            link: '/mock-draft',
            linkText: 'See the Mock Draft instead'
          }
        case 'mock_draft':
          return {
            content: this.$store.getters['page/settings'].big_board_intro,
            link: '/',
            linkText: 'See the Big Board by Danny Kelly instead'
          }
        case 'draft_results':
          return {
            content: this.$store.getters['page/settings'].big_board_intro,
            link: '/',
            linkText: 'See the Mock Draft instead'
          }
        default:
          return {
            content: '',
            link: '',
            linkText: ''
          }
      }
    }
  },
  methods: {
    scrollToTop() {
      scrollIt(document.getElementById('navigation').offsetTop + 4, 500);
    }
  }
}
</script>

<style lang="scss" scoped>
.main-section__intro{
  &-link{
    margin:20px 0 40px;
    a{
      color:$highlight2;
      text-decoration:underline;
    }
  }
}
</style>