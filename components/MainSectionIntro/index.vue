<template>
<div class="main-section__intro">
  <h2 v-html="introData.headline"></h2>
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
            headline: '<strong>Big Board</strong> By Danny Kelly',
            content: this.$store.getters['page/settings'].big_board_intro,
            link: '/mock-draft',
            linkText: 'See the Mock Draft instead'
          }
        case 'mock_draft':
          return {
            headline: '<strong>Mock Draft</strong>',
            content: this.$store.getters['page/settings'].big_board_intro,
            link: '/',
            linkText: 'See the Big Board by Danny Kelly instead'
          }
        case 'draft_results':
          return {
            headline: '<strong>Draft Results</strong>',
            content: this.$store.getters['page/settings'].big_board_intro,
            link: '/',
            linkText: 'See the Mock Draft instead'
          }
        default:
          return {
            headline: '',
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

<style lang="scss">
.main-section__intro{
  margin-top:-15px;
  margin-bottom:70px;
  h2{
    font-family: 'Decima';
    text-transform:uppercase;
    letter-spacing:0;
    font-weight:300;
    font-size:42px;
    line-height:70px;
    color:$black;
    @include mobile{
      font-size:32px;
    }
    strong{
      font-weight:normal !important;
    }
  }
  p{
    font-size:18px;
    line-height:25px;
    margin-bottom:15px;
    color:$darkmediumgray;
    @include mobile{
      font-size:16px;
      line-height:21px;
    }
  }
  &-link{
    margin:20px 0 40px;
    a{
      // color:$highlight2;
      color:$darkmediumgray;
      text-decoration:underline;
    }
  }
}
</style>