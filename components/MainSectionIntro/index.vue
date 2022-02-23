<template>
  <div class="main-section__intro">
    <h3 v-html="introData.headline" />
    <div
      v-if="type !== 'team_needs'"
      class="main-section__intro-content"
      v-html="introData.content"
    />
    <p
      v-if="introData.linkText"
      class="main-section__intro-link"
      @click="scrollToTop"
    >
      <NuxtLink :to="introData.link">
        {{ introData.linkText }}
      </NuxtLink>
    </p>
  </div>
</template>

<script>
import { scrollIt } from '~/plugins/scroller';
export default {
  name: "MainSectionIntro",
  props: ['type'],
  computed: {
    introData() {
      switch(this.type){
        case 'big_board':
          return {
            headline: `<strong>Big Board</strong> By ${this.league === 'nfl' ? "Danny Kelly" : "Kevin O'Connor"}`,
            content: this.$store.getters['page/settings'].big_board_intro,
            link: '/mock-draft',
            linkText: this.$store.getters['page/settings'].big_board_link,
          }
        case 'mock_draft':
          return {
            headline: `<strong>Mock Draft</strong> By ${this.league === 'nfl' ? "Danny Kelly" : "Kevin O'Connor"}`,
            content: this.$store.getters['page/settings'].mock_draft_intro,
            link: '/',
            linkText: this.$store.getters['page/settings'].mock_draft_link,
          }
        case 'team_needs':
          return {
            headline: `<strong>Team Needs</strong> ${this.league === 'nfl' ? "" : "By Matt Dollinger"}`,
            content: this.$store.getters['page/settings'].team_needs_intro,
            link: '/mock-draft',
            linkText: this.$store.getters['page/settings'].team_needs_link,
          }
        case 'draft_grades':
          return {
            headline: `<strong>Draft Grades</strong> ${this.league === 'nfl' ? "By Danny Kelly" : "By Kevin O'Connor"}`,
            content: this.$store.getters['page/settings'].draft_results_intro,
            link: '/big-board',
            linkText: this.$store.getters['page/settings'].draft_results_link,
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
      var offset = this.$mq === 'mobile' ? document.getElementById('mobile-navigation').offsetTop + 4 : document.getElementById('navigation').offsetTop + 4
      scrollIt(offset, 500);
    }
  }
}
</script>

<style lang="scss">
.main-section__intro{
  margin-bottom:70px;
  .app--nba & {
    margin-bottom:45px;
    @include mobile{
      padding:0 30px;
    }
  }
  h3{
    text-transform:uppercase;
    font-weight:300;
    margin-bottom:15px;
    strong{
      font-weight:normal;
    }
    .app--nba & {
      font-family: "GT America Condensed";
      font-size: 32px;
      strong{
        font-weight: 500;
      }
    }
  }
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
  &-content{
    @include non-mobile{
      max-width:78%;
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