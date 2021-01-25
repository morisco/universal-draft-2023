<template>
  <header class="header">
    <Nav />
    <div class="header__inner">
      <h1 class="headline">
        <span class="headline--small">The Ringer's 2021</span>
        <span class="headline--big"><span>NFL Draft Guide</span></span>
      </h1>
      <h2 class="subheadline">With scouting reports by Danny Kelly</h2>
    </div>
    <div class="header__footer">
      <div class="header__footer-inner">
        <div class="header__footer-sponsor">
          <span>Presented By</span>
          <img src="@/assets/img/state-farm-red.svg" alt="State Farm Logo" data-not-lazy />

        </div>
        <div>
          <transition name="header__footer-updated" appear :duration="50000">
            <span v-if="pageSettings" class="header__footer-updated">{{pageSettings.intro_updated}}</span>
          </transition>
          <div class="header__loader">
            <LoadingSpinner :loaded="pageSettings" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Nav from './Nav.vue';
import LoadingSpinner from '~/components/LoadingSpinner';
export default {
  components: { Nav, LoadingSpinner },
  computed: {
    pageSettings () {
      return this.$store.getters['page/settings']
    }
  }
}
</script>

<style scoped lang="scss">
.header{
  position:relative;
  background:$highlight2-light;
  display:flex;
  flex-direction:column;
  align-items:center;
  height:100vh;
  justify-content:center;
  @include non-mobile{
    min-height:800px;
  }
  &__inner{
    display:flex;
    flex-direction:column;
    width: 100vw;
    padding: 20px 4.5vw 0;
    justify-content:center;
    flex:1;
    @include non-mobile{
      // width:71.375vw;
      padding: 60px 4.5vw 0;

    }
  }
  &__loader{
    position:absolute;
    bottom:15px;
    right:15px;
    height:15px;
    width:15px;
  }
  .headline{
    display:flex;
    flex-direction:column; 
    max-width:60vh;
    // &--big{
    //   margin:2.5vh 0;
    // }
    @include non-mobile{
      max-width:100%;
      
    }
  }
  .subheadline{
    margin:10px 0 5px;
    text-align:center;
    font-family:'Decima';
    text-transform:uppercase;

    @include non-mobile{
      margin:-0.5 0 0.125vw;
      font-size:2.5vw;
    }
    @include single-column{
      font-size:5vw;
      line-height:5vw;
    }
  }
  &__footer{
    height:64px;
    background:$highlight2;
    width:100%;
    &-sponsor{
      display:flex;
      align-items:center;
      span{
        @include header-sponsored-by;
        flex: 0 0 auto;
      }
      @include mobile{
        flex-direction:column;
        align-items:flex-start;
      }
      img{
        margin-left:10px;
        height:20px;
        @include mobile{
          height:20px;
          margin-left:0;
        }
      }
      
    }
    &-updated{
        @include header-nav-link;
        color:$highlight1;
        opacity:1;
        display:flex;
        align-items:center;
        &:before{
          content:'';
          display:inline-block;
          width:10px;
          height:10px;
          background:$highlight1;
          border-radius:100%;
          margin-right:10px;
          @include mobile{
            width:10px;
            height:10px;
            margin-right:5px;
          }
        }
        
        &-enter-to{
          opacity:1;
        }
        &-enter-active{
          transition:opacity 1s linear;
        }
      }
   
    &-inner{
      padding:0 30px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      height:100%;
      @include mobile{
        padding:0 15px;
      }
    }
  }
}
</style>
