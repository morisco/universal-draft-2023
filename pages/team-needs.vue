<template>
  <section class="main-section team-needs" ref="teamNeeds">
    <MainSectionIntro type="team_needs" />
    <transition-group name="player-card" class="mock-draft__inner main-section__inner" tag="div">
      <template v-for="(teamId, index) in teamNeedsIds">
        <NFLTeamCard 
          v-if="league === 'nfl'"
          :teamId="teamId" 
          :key="teamId" 
        />
        <NBATeamCard 
          v-else-if="league === 'nba'"
          :teamId="teamId" 
          :key="teamId" 
        />
        <Interstitial 
          v-if="interstitials[index+1]" 
          :key="'interstitial-' + (index+1)" 
          :list="'teamNeeds'" 
          :interKey="index+1" 
        />
      </template>
    </transition-group>
    <MoreCoverage :articles="relatedArticles" v-if="showAll" />
  </section>
</template>

<script>
import NFLTeamCard from '~/components/NFLTeamCard'
import NBATeamCard from '~/components/NBATeamCard'
import MainSectionIntro from '~/components/MainSectionIntro'
import Interstitial from '~/components/Interstitial'
import asyncDataProcessor from '~/plugins/asyncDataProcessor';
import headeBuilder from '~/plugins/headBuilder';
import MoreCoverage from '~/components/MoreCoverage'


export default {
  name: 'TeamNeeds',
  transition: {
    name:"main-section",
    mode:"out-in",
  },
  scrollToTop: false,
  components: { MainSectionIntro, NFLTeamCard, NBATeamCard, Interstitial, MoreCoverage },
  mounted() {
    if(!this.pageSettings.breakdown_by_team) {
      this.$router.push({
        path: '/'
      })
    }
  },
  data() {
    return {
      initTimeout: null,
      showAll: this.$route.params.team_id ? true : false
    }
  },
  created() {
    if(process.client){
      window.addEventListener('scroll', this.handleScroll, {passive: true});
    }
  },
  destroyed() {
    if(process.client){
      window.removeEventListener('scroll', this.handleScroll, {passive: true});
    }
  },
  destroyed() {
    clearTimeout(this.initTimeout);
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
    interstitials() {
      return this.$store.getters['content/interstitials']('teamNeeds')
    },
    relatedArticles () {
      return this.$store.getters['content/relatedArticles'];
    },
  },
  methods: {
    handleScroll() {
      if(window.scrollY > this.$refs.teamNeeds.offsetParent.offsetTop + this.$refs.teamNeeds.offsetTop - window.innerHeight) {
        this.showAll = true;
      }
    }
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
  asyncData({$axios, store, route}) {
    return asyncDataProcessor({$axios, store, route});
  },
  head()  {
    return headeBuilder(this);
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
