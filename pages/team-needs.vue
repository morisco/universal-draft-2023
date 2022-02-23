<template>
  <section
    ref="teamNeeds"
    class="main-section team-needs"
  >
    <MainSectionIntro type="team_needs" />
    <transition-group
      name="player-card"
      class="mock-draft__inner main-section__inner"
      tag="div"
    >
      <TeamCard 
        v-for="(teamId, index) in teamNeedsIds"
        :key="teamId + '-' + index" 
        :team-id="teamId"
        :index="index" 
      />
    </transition-group>
    <MoreCoverage
      v-if="showAll"
      :articles="relatedArticles"
    />
  </section>
</template>

<script>
import TeamCard from '~/components/TeamCard'
import MainSectionIntro from '~/components/MainSectionIntro'
import asyncDataProcessor from '~/plugins/asyncDataProcessor';
import headeBuilder from '~/plugins/headBuilder';
import MoreCoverage from '~/components/MoreCoverage'


export default {
  name: 'TeamNeeds',
  components: { MainSectionIntro, TeamCard, MoreCoverage },
  scrollToTop: false,
  transition: {
    name:"main-section",
    mode:"out-in",
  },
  asyncData({$axios, store, route}) {
    return asyncDataProcessor({$axios, store, route});
  },
  data() {
    return {
      initTimeout: null,
      showAll: this.$route.params.team_id ? true : false
    }
  },
  head()  {
    return headeBuilder(this);
  },
  computed: {
    league() {
      return process.env.PROJECT_LEAGUE.toLowerCase()
    },
    pageSettings () {
      return this.$store.getters['page/settings'] || {}
    },
    teamNeedsIds () {
      const itemCount = 4;
      return this.showAll ? this.$store.getters['content/teamNeeds'] : this.$store.getters['content/teamNeeds'].slice(0,itemCount)
    },
    relatedArticles () {
      return this.$store.getters['content/relatedArticles'];
    },
  },
  watch: {
    pageSettings() {
      if(!this.pageSettings.breakdown_by_team) {
        this.$router.push({
          path: '/'
        })
      }
    }
  },
  mounted() {
    if(!this.pageSettings.breakdown_by_team) {
      this.$router.push({
        path: '/'
      })
    }
  },
  created() {
    if(process.client){
      window.addEventListener('scroll', this.handleScroll, {passive: true});
    }
  },
  unmounted() {
    if(process.client){
      window.removeEventListener('scroll', this.handleScroll, {passive: true});
    }
  },
  unmounted() {
    clearTimeout(this.initTimeout);
  },
  methods: {
    handleScroll() {
      if(this.$refs.teamNeeds && (window.scrollY > this.$refs.teamNeeds.offsetParent.offsetTop + this.$refs.teamNeeds.offsetTop - window.innerHeight)) {
        this.showAll = true;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.team-needs{
   min-height:calc(100vh + 4px);
   .mock-draft__inner{
     .app--nba & {
       width:calc(100vw - 40px);
       max-width:100%;
       margin:0 auto;
     }
   }
}
</style>
