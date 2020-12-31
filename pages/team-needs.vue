T<template>
  <section class="main-section team-needs" ref="teamNeeds">
    <MainSectionIntro type="mock_draft" />
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
      showAll: false
    }
  },
  created() {
    if(process.client){
      window.addEventListener('scroll', this.handleScroll);
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
  async asyncData({$axios, store, commit}) {
    let configuration = store.getters['page/configuration'];
    if(!configuration){
      configuration = await $axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/" + process.env.HEDDEK_PROJECT_ID + "/config." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=4",  {
      headers: {
         'Content-Encoding': 'gzip'
      }
    })
        .then(response => { 
          store.commit('page/setConfig', response.data[0]);
          return response.data[0];
        }).catch(err => console.log(err));
    }
    let pageSettings = store.getters['page/settings'];
    if(!pageSettings){
      pageSettings = await $axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/" + process.env.HEDDEK_PROJECT_ID + "/page." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=4",  {
      headers: {
         'Content-Encoding': 'gzip'
      }
    })
        .then(response => {
          store.commit('page/setPage', response.data[0].data);
          return response.data[0].data;
        })
        .catch(err => console.log(err));
    }
    return { configuration: configuration, settings: pageSettings }
  },
  head()  {
    return {
      meta: [{
        hid: 'og:title',
        name: 'og:title',
        content: this.configuration.facebook_page_share_title
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: this.configuration.facebook_page_share_description
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
