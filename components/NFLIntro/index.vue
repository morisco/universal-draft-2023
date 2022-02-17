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
      .app--nfl & {
        p{
          @include non-mobile{
            font-size:18px;
          }
        }
        strong{
          font-family: 'Decima';
          text-transform:uppercase;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
.intro{
  &__inner{
    width:calc(100% - 45px);
    max-width:805px;
    @include player-card-body;
    margin:60px auto 120px;
    @include mobile{
      margin-bottom:90px;
      width:calc(100% - 30px);
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
