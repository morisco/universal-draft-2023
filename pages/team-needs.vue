T<template>
  <section class="main-section team-needs" ref="teamNeeds">
    <MainSectionIntro type="mock_draft" />
    <transition-group name="player-card" class="mock-draft__inner" tag="div">
      <TeamCard 
        v-for="teamId in teamNeedsIds" 
        :teamId="teamId" 
        :key="teamId" 
      />
    </transition-group>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import TeamCard from '~/components/TeamCard'
import MainSectionIntro from '~/components/MainSectionIntro'
export default {
  name: 'TeamNeeds',
  transition: {
    name:"main-section",
    mode:"out-in",
    duration: 750
  },
  scrollToTop: false,
  components: { MainSectionIntro, TeamCard },
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
    }
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
      configuration = await $axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/config.production.json.gz?ignoreCache=3",  {
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
      pageSettings = await $axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/page.production.json.gz?ignoreCache=3",  {
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
