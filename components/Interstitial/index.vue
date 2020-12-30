<template>
  <div>
    <ListInter v-if="interstitial.category === 'list_inter'" :interstitial="interstitial" />
    <VideoInter v-if="interstitial.category === 'video_inter'" :interstitial="interstitial" />
  </div>
</template>

<script>
import ListInter from './List.vue';
import VideoInter from './Video.vue';
export default {
  components: { ListInter, VideoInter },
  props: ['list', 'interKey'],
  computed: {
    interstitial() {
      return this.$store.getters['content/interstitial'](this.list, this.interKey);
    }
  }
}
</script>

<style lang="scss" scoped>
.interstitial{
}
</style>