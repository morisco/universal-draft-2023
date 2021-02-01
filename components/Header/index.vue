<template>
  <header class="header">
    <Nav />
    <div class="header__inner">
      <div class="header__inner-text">
        <h1 class="headline">
          <span class="headline--small">The Ringer's 2021</span>
          <span class="headline--big"><span>NFL Draft Guide</span></span>
        </h1>
        <h2 class="subheadline">With scouting reports by Danny Kelly</h2>
      </div>
      <div class="header__inner-updated" v-if="$mq === 'mobile'">
        <span v-if="pageSettings" class="header__footer-updated">{{pageSettings.intro_updated}}</span>
      </div>
    </div>
    <div class="header__footer">
      <div class="header__footer-inner">
        <div class="header__footer-sponsor">
          <span>Presented By</span>
          <img src="@/assets/img/state-farm-white.svg" alt="State Farm Logo" data-not-lazy />
        </div>
        <div v-if="$mq !== 'mobile'">
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
  height: calc(var(--vh, 1vh) * 100);
  justify-content:center;
  @include non-mobile{
    min-height:800px;
  }
  &__inner {
    display:flex;
    flex-direction:column;    
    width: 100%;
    padding: 20px 4.5vw 0;
    justify-content:center;
    flex:1;
    &-text{
      display:flex;
      flex-direction:column;
      // flex:1;
      align-items:center;
    }
    @include mobile{
      &-text{
        flex: 0 0 auto;
      }
      &:before{
        content:'';
        display:block;
        flex:1;
      }
    }
    @include non-mobile{
      // width:71.375vw;
      padding: 60px 4.5vw 0;
    }
    &-updated{
      flex:1;
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
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
    // max-width:60vh;
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
    margin:0 0 0.125vw;
    font-size:2.5vw;
    letter-spacing:0.025em;
    @include mobile{
      font-size:6vw;
      line-height:6vw;
      width:70%;
      margin: 0 auto;
    }
  }
  &__footer{
    height:64px;
    background:$highlight2;
    width:100%;
    @include mobile{
      height:50px;
    }
    &-sponsor{
      display:flex;
      align-items:center;
      span{
        @include header-sponsored-by;
        flex: 0 0 auto;
      }
      @include mobile{
        justify-content:center;
        width:100%;
      }
      img{
        margin-left:10px;
        height:20px;
        @include mobile{
          height:16px;
          margin-left:5px;
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
          width:8px;
          height:8px;
          margin-right:5px;
          margin-top:-3px;
        }
      }
      
      &-enter-to{
        opacity:1;
      }
      &-enter-active{
        transition:opacity 1s linear;
      }
      @include mobile{
        padding:7px 4px 5px;
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
