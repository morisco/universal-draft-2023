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

<style lang="scss">
.intro{
  &__inner{
    margin:60px auto;
    width:calc(100% - 30px);
    max-width:750px;
    @include player-card-body;
    strong{
      font-family: 'Decima';
    }
  }
  .hr-divider{
    height:1px;
    background:#bdbdbd;
    width:100%;
    margin:0 0 25px;
  }
}
</style>
