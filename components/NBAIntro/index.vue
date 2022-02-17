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
      .app--nba & {
        p{
          @include non-mobile{
            font-size:18px;
          }
          @include mobile {
            font-size:15px;
            line-height:1.3;
          }
        }
        strong{
          font-family: 'GT America';
          font-weight:500;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
.intro{
  background:#000;
  margin: 0 auto;
  padding:60px 0;
  color:$white;
  position:relative;
  z-index:3;
  
  &__inner{
    width:calc(100% - 45px);
    max-width:740px;

    @include player-card-body;
    margin:0 auto 120px;
    @include tablet{
      margin:60px auto 120px;
    }
    @include mobile{
      margin-top:0;
      margin-bottom:0;
    }
    
    @include mobile{
      margin-bottom:30px;
      width:calc(100% - 60px);
    }
  }
  .hr-divider{
    height:1px;
    background:#bdbdbd;
    width:100%;
    margin:0 0 25px;
    display:none;
  }
}
</style>
