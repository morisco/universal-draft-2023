<template>
  <section
    ref="teamNeeds"
    class="main-section team-needs"
  >
    <MainSectionIntro type="team_needs" />
    <TransitionGroup
      class="mock-draft__inner main-section__inner"
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <TeamCard 
        v-for="(teamId, index) in sortedTeams"
        :key="teamId + '-' + index" 
        :team-id="teamId"
        :index="index" 
      />
    </TransitionGroup>
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
import gsap from 'gsap';

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
      showAll: this.$route.params.team_id ? true : false,
      sortedTeams: [],
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
    teamSort() {
      return this.$store.getters['viewOptions/teamSort'];
    }
  },
  watch: {
    teamSort() {
      this.setTeams();
    },
    teamNeedsIds() {
      this.setTeams();
    },
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
    this.setTeams();
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
    setTeams() {
      console.log('in here');
      if(this.teamSort && this.teamNeedsIds){
        if(this.teamSort === 'order') {
          this.sortedTeams = this.teamNeedsIds;
        } else {
          const teamsToSort = [...this.teamNeedsIds];
          this.sortedTeams = teamsToSort.sort((a, b) => {
            const teamA = this.$store.getters['content/team'](a)
            const teamB = this.$store.getters['content/team'](b)
            if(teamA && teamB){
              return teamA.title < teamB.title ? -1 : 1;
            }
          });
        }
      }
    },
    handleScroll() {
      if(this.$refs.teamNeeds && this.$refs.teamNeeds.offsetParent) {
        if((window.scrollY > this.$refs.teamNeeds.offsetParent.offsetTop + this.$refs.teamNeeds.offsetTop - window.innerHeight)) {
          this.showAll = true;
        }
      }
    },
     onBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    onEnter(el, done) {
      el.style.height = 'auto';
      gsap.to(el, {
        opacity: 1,
        delay: 0.5,
        onComplete: done
      })
    },
    onLeave(el, done) {
      gsap.to(el, {
        opacity: 0,
        onComplete: () => {
          done();
          el.style.height = 0;
        }
      })
    },
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
