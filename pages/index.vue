<template>
  <section class="main-section big-board" ref="bigBoard">
    <MainSectionIntro type="big_board" />
    <transition-group name="player-card" class="big-board__inner" tag="div">
      <template v-for="(playerId, index) in bigBoardIds">
        <PlayerCard 
          :playerId="playerId" 
          :key="playerId" 
          rankKey="order" 
          v-on:card-expanded="setCardExpanded" 
          :cardExpanded="cardExpanded" 
        />
        <Interstitial 
          v-if="interstitials[index+1]" 
          :key="'interstitial-' + (index+1)" 
          :list="'bigBoard'" 
          :interKey="index+1" 
        />
      </template>
    </transition-group>
    <RelatedArticles :articles="relatedArticles" v-if="showAll" />
  </section>
</template>

<script>
import RelatedArticles from '~/components/RelatedArticles';
import PlayerCard from '~/components/PlayerCard';
import Interstitial from '~/components/Interstitial';
import MainSectionIntro from '~/components/MainSectionIntro';
import { mapActions } from 'vuex'

export default {
  name: 'BigBoard',
  components: { MainSectionIntro, PlayerCard, RelatedArticles, Interstitial },
  transition: {
    name:"main-section",
    mode:"out-in",
  },
  scrollToTop: false,
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
  computed: {
    interstitials() {
      return this.$store.getters['content/interstitials']('bigBoard')
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth']
    },
    viewPosition () {
      return this.$store.getters['viewOptions/position']
    },
    cardExpanded () {
      return this.$store.getters['page/cardExpanded']
    },
    relatedArticles () {
      return this.$store.getters['content/relatedArticles'];
    },
    bigBoardIds () {
      const itemCount = this.viewDepth === 'compact' ? 10 : 4;
      return this.showAll ? this.$store.getters['content/bigBoard'](this.viewPosition) : this.$store.getters['content/bigBoard'](this.viewPosition).slice(0,itemCount)
    }
  },
  methods: {
   ...mapActions({
      'setCardExpanded': 'page/setCardExpanded',
    }),
    handleScroll() {
      if(window.scrollY > this.$refs.bigBoard.offsetParent.offsetTop + this.$refs.bigBoard.offsetTop - window.innerHeight) {
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
        })
        .then(response => {
          store.commit('page/setPage', response.data[0].data);
          return response.data;
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
.big-board{
  min-height:calc(100vh + 4px);
}
</style>
