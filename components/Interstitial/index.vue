<template>
  <div>
    <client-only>
      <ListInter v-if="interstitial.category === 'list_inter'" :interstitial="interstitial" />
      <VideoInter v-if="interstitial.category === 'video_inter'" :interstitial="interstitial" />
      <ArticleInter v-if="interstitial.category === 'article_inter'" :interstitial="interstitial" />
      <PodcastInter v-if="interstitial.category === 'podcast_inter'" :interstitial="interstitial" />
    </client-only>
  </div>
</template>

<script>
import ListInter from './List.vue';
import VideoInter from './Video.vue';
import ArticleInter from './Article.vue';
import PodcastInter from './Podcast.vue';

export default {
  components: { ArticleInter, ListInter, VideoInter, PodcastInter },
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
}
</style>