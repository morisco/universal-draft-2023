  <template>
  <section class="intro">
    <div class="intro__inner" v-html="intro"></div>
  </section>
</template>

<script>
// import Nav from './Nav.vue';
export default {
  computed: {
    intro () {
      return this.$store.getters['page/settings'].intro
    }
  }
}
</script>

<style scoped lang="scss">
.intro{
  &__inner{
    margin:60px auto;
    width:calc(100% - 30px);
    max-width:750px;
  }
}
</style>
