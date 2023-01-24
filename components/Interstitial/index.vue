<template>
  <div class="interstitial">
    <client-only>
      <NFLListInter
        v-if="league === 'nfl' && interstitial.category === 'list_inter'"
        :interstitial="interstitial"
      />
      <NBAListInter
        v-else-if="league === 'nba' && interstitial.category === 'list_inter'"
        :interstitial="interstitial"
      />
      <VideoInter
        v-if="interstitial.category === 'video_inter'"
        :interstitial="interstitial"
      />
      <ArticleInter
        v-if="interstitial.category === 'article_inter'"
        :interstitial="interstitial"
      />
      <PodcastInter
        v-if="interstitial.category === 'podcast_inter'"
        :interstitial="interstitial"
      />
      <ToutInter
        v-if="interstitial.category === 'tout'"
        :interstitial="interstitial"
      />
      <WriteupInter
        v-if="interstitial.category === 'writeup_inter'"
        :interstitial="interstitial"
      />
    </client-only>
  </div>
</template>

<script>
import NFLListInter from './NFLList.vue';
import NBAListInter from './NBAList.vue';
import VideoInter from './Video.vue';
import ArticleInter from './Article.vue';
import PodcastInter from './Podcast.vue';
import ToutInter from './Tout.vue';
import WriteupInter from './Writeup.vue';

export default {
  name: "InterstitialWrapper",
  components: { ArticleInter, NFLListInter, NBAListInter, VideoInter, PodcastInter, ToutInter, WriteupInter },
  props: ['list', 'interKey'],
  data() {
    return {
      showInter: true
    }
  },
  computed: {
    interstitial() {
      return this.$store.getters['content/interstitial'](this.list, this.interKey);
    },
    viewPosition() {
      return this.$store.getters['viewOptions/position']
    },
    viewStrength() {
      return this.$store.getters['viewOptions/strength']
    },
    league() {
      return process.env.PROJECT_LEAGUE.toLowerCase()
    }
  },
  watch: {
    viewStrength() {
      if(this.viewStrength.length > 0){
        this.showInter = false
      } else if(this.viewPosition === 'all'){
        this.showInter = true;
      }
    },
    viewPosition() {
      if(this.viewPosition !== 'all'){
        this.showInter = false
      } else if(this.viewStrength.length === 0){
        this.showInter = true;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.interstitial{
  margin-bottom:40px;
}
</style>