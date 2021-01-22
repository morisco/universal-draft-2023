T<template>
  <section class="main-section team-needs" ref="teamNeeds">
    <MainSectionIntro type="team_needs" />
    <transition-group name="player-card" class="mock-draft__inner" tag="div">
      <template v-for="(teamId, index) in teamNeedsIds">
        <TeamCard 
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
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import TeamCard from '~/components/TeamCard'
import MainSectionIntro from '~/components/MainSectionIntro'
import Interstitial from '~/components/Interstitial'
import asyncDataProcessor from '~/plugins/asyncDataProcessor';
export default {
  name: 'TeamNeeds',
  transition: {
    name:"main-section",
    mode:"out-in",
  },
  scrollToTop: false,
  components: { MainSectionIntro, TeamCard, Interstitial },
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
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  destroyed() {
    clearTimeout(this.initTimeout);
  },
  computed: {
    teamNeedsIds () {
      const itemCount = 4;
      return this.showAll ? this.$store.getters['content/teamNeeds'] : this.$store.getters['content/teamNeeds'].slice(0,itemCount)
    },
    interstitials() {
      return this.$store.getters['content/interstitials']('teamNeeds')
    },
  },
  methods: {
    handleScroll() {
      if(window.scrollY > this.$refs.teamNeeds.offsetParent.offsetTop + this.$refs.teamNeeds.offsetTop - window.innerHeight) {
        this.showAll = true;
      }
    }
  },
  asyncData({$axios, store, route}) {
    return asyncDataProcessor({$axios, store, route});
  },
  head()  {
    const metaDescription = this.sharedTeam ? 'See what the ' + this.sharedTeam.title.trim() + ' need to address in the draft.' : this.configuration.facebook_page_share_description;
    return {
      meta: [{
        hid: 'og:title',
        name: 'og:title',
        content: this.configuration.facebook_page_share_title
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: metaDescription
      }]
    }
  }
}
</script>

<style scoped lang="scss">
.team-needs{
   min-height:calc(100vh + 4px);
}
</style>
