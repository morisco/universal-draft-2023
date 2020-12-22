<template>
<div 
  class="filters" 
  :class="{
    'filters--fixed': fixed,
    'filters--disabled': disabled
  }" 
  ref="filters"
>
  <div class="filters__sticky" v-bind:style="{width: width + 'px', left: left + 'px'}">
    <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
      <transition name="info-bubble--animated">
        <InfoBubble v-if="showInfoBubble">
          <span>
            See our full<br/>scouting reports<br/>in Deep<br/>Dive mode
            <img src="@/assets/img/icons/down-left-arrow.svg" alt="Arrow pointing to deep dive mode" />
          </span>
        </InfoBubble>
      </transition>
    </mq-layout>
    <div class="filters__section">
      <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
        <div class="filters__section-title">
          <span>How much do you</span> <span> want to know</span>
        </div>
      </mq-layout>
      <button class="filters__option" :class="{active: activeDepth === 'compact'}" v-on:click="setViewDepth($event,'compact')">
        <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
          <transition name="filters__option-emoji">
            <img v-if="activeDepth === 'compact'" class="filters__option-emoji" src="@/assets/img/emoji/compact.png" />
          </transition>
        </mq-layout>
        <span>Skim</span>
      </button>
      <button class="filters__option" :class="{active: activeDepth === 'default'}" v-on:click="setViewDepth($event,'default')">
        <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
          <transition name="filters__option-emoji">
            <img v-if="activeDepth === 'default'" class="filters__option-emoji" src="@/assets/img/emoji/default.png" />
          </transition>
        </mq-layout>
        <span>Peruse</span>
      </button>
      <button class="filters__option" :class="{active: activeDepth === 'detailed'}" v-on:click="setViewDepth($event,'detailed')">
        <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
          <transition name="filters__option-emoji">
            <img v-if="activeDepth === 'detailed'" class="filters__option-emoji" src="@/assets/img/emoji/detailed.png" />
          </transition>
        </mq-layout>
        <span>Deep Dive</span>
      </button>
    </div>
    <div class="filters__section">
      <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
        <div class="filters__section-title">
          <span v-html="$mq === 'mobile' ? 'Sort By<br/>Position' : 'Sort By Position'"></span>
        </div>
      </mq-layout>
      <div class="filters__section-list">
        <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
          <img src="@/assets/img/emoji/point-right.png" alt="Right Pointer" class="filters__sticky-emoji" v-bind:style="{top: positionArrowTop + 'px'}" />
        </mq-layout>
        <button class="filters__option" :class="{active: activePosition === 'all'}" v-on:click="handlePositionFilter($event,'all')">
          <span>All</span>
        </button>
        <button class="filters__option" :class="{active: activePosition === 'all-offense'}" v-on:click="handlePositionFilter($event,'all-offense')">
          <mq-layout :mq="['tablet', 'small_desktop']">
            <span>Offense</span>
          </mq-layout>
          <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
            <span>All Offense</span>
          </mq-layout>
        </button>
        <button class="filters__option" :class="{active: activePosition === 'all-defense'}" v-on:click="handlePositionFilter($event,'all-defense')">
          <mq-layout :mq="['tablet', 'small_desktop']">
            <span>Defense</span>
          </mq-layout>
          <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
            <span>All Defense</span>
          </mq-layout>
        </button>
        <button class="filters__option" :class="{active: activePosition === 'qb'}" v-on:click="handlePositionFilter($event,'qb')">
          <mq-layout :mq="['tablet', 'small_desktop']">
            <span>QB</span>
          </mq-layout>
          <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
            <span>Quarterbacks</span>
          </mq-layout>
        </button>
        <button class="filters__option" :class="{active: activePosition === 'rb'}" v-on:click="handlePositionFilter($event,'rb')">
          <mq-layout :mq="['tablet', 'small_desktop']">
            <span>RB</span>
          </mq-layout>
          <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
            <span>Running Backs</span>
          </mq-layout>
        </button>
        <button class="filters__option" :class="{active: activePosition === 'pc'}" v-on:click="handlePositionFilter($event,'pc')">
          <mq-layout :mq="['tablet', 'small_desktop']">
            <span>WR/TE</span>
          </mq-layout>
          <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
            <span>Pass Catchers</span>
          </mq-layout>
        </button>
        <button class="filters__option" :class="{active: activePosition === 'ol'}" v-on:click="handlePositionFilter($event,'ol')">
          <mq-layout :mq="['tablet', 'small_desktop']">
            <span>OL</span>
          </mq-layout>
          <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
            <span>Offensive Linemen</span>
          </mq-layout>
        </button>
        <button class="filters__option" :class="{active: activePosition === 'de'}" v-on:click="handlePositionFilter($event,'de')">
          <mq-layout :mq="['tablet', 'small_desktop']">
            <span>DE</span>
          </mq-layout>
          <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
            <span>Edge Rushers</span>
          </mq-layout>
        </button>
        <button class="filters__option" :class="{active: activePosition === 'idl'}" v-on:click="handlePositionFilter($event,'idl')">
          <mq-layout :mq="['tablet', 'small_desktop']">
            <span>IDL</span>
          </mq-layout>
          <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
            <span>Int. Defensive Linemen</span>
          </mq-layout>
        </button>
        <button class="filters__option" :class="{active: activePosition === 'lb'}" v-on:click="handlePositionFilter($event,'lb')">
          <mq-layout :mq="['tablet', 'small_desktop']">
            <span>LB</span>
          </mq-layout>
          <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
            <span>Linebackers</span>
          </mq-layout>
        </button>
        <button class="filters__option" :class="{active: activePosition === 'db'}" v-on:click="handlePositionFilter($event,'db')">
          <mq-layout :mq="['tablet', 'small_desktop']">
            <span>DB</span>
          </mq-layout>
          <mq-layout :mq="['mobile', 'medium_desktop', 'large_desktop']">
            <span>Defensive Backs</span>
          </mq-layout>
        </button>
      </div>
    </div>
  </div>
  <div class="filters__ghost"></div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { scrollIt } from '~/plugins/scroller'
import InfoBubble     from '~/components/InfoBubble'
export default {
  components: { InfoBubble },
  data() {
    return {
      fixed: false,
      width: null,
      left: null,
      bubbleDismissed: false,
      showInfoBubble: false,
      disabled: this.$route.name === 'team-needs'
    }
  },
  computed: {
    activeDepth () {
      return this.$store.getters['viewOptions/depth']
    },
    activePosition () {
      return this.$store.getters['viewOptions/position']
    },
    positionArrowTop () {
      const positions = ['all', 'all-offense', 'all-defense', 'qb', 'rb', 'pc', 'ol', 'de', 'idl', 'lb', 'db'];
      const positionIndex = positions.indexOf(this.$store.getters['viewOptions/position']);
      return 21 * positionIndex;
    }
  },
  methods: {
    handleScroll () {
      if(this.$mq === 'mobile') return;
      this.width = this.$refs.filters.offsetWidth;
      var distanceFromTopWhenSticky = ['tablet', 'small_desktop'].indexOf(this.$mq) >= 0 ? 50 : 110;
      if(window.scrollY > this.$refs.filters.offsetParent.offsetTop - distanceFromTopWhenSticky){
        this.fixed = true;
        this.showInfoBubble = this.$route.name === 'team-needs' || this.bubbleDismissed ? false : true;
        this.left = this.$refs.filters.offsetParent.offsetLeft;
      } else {
        this.fixed = false;
        this.left = 0;
        this.showInfoBubble = false
      }
    },
    handlePositionFilter(event, position) {
      if(this.$mq === 'mobile'){
        event.stopPropagation();
        this.setViewPosition(position);
        return;
      }
      const self = this;
      const variableOffset = ['tablet', 'small_desktop'].indexOf(this.$mq) >= 0 ? 45 : 95;
      const destinationOffset = this.$refs.filters.offsetParent.offsetTop - variableOffset; 
      const currentScroll = window.scrollY;
      const scrollDiff = Math.abs(destinationOffset - currentScroll);
      const ratio = scrollDiff/(window.innerHeight*3);
      const duration = Math.min(1500, Math.max(250, ratio * 1000));
      scrollIt(destinationOffset, duration, 'easeOutQuad', () => {
        self.setViewPosition(position);
      });
    },
    setViewDepth($event, depth) {
      $event.stopPropagation();
      this.storeViewDepth(depth);
    },
    ...mapActions({
      'storeViewDepth': 'viewOptions/setViewDepth',
      'setViewPosition': 'viewOptions/setViewPosition'
    })
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
  },
  mounted () {
    console.log(this.$route);
    this.width = this.$mq === 'mobile' ?  null : this.$refs.filters.offsetWidth;
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  },
  watch: {
    activeDepth () {
      this.bubbleDismissed = true;
      this.showInfoBubble = false
    },
    $route (newRoute) {
      this.disabled = newRoute.name === 'team-needs'
      this.showInfoBubble = !this.bubbleDismissed && newRoute.name !== 'team-needs'
    }
  }
}
</script>

<style scoped lang="scss">
.filters{
  position:absolute;
  left:0;
  height:calc(100vh - 110px);
  width: 16.25%;
  max-width: 180px;
  z-index:55555;
  transition:opacity 0.25s linear;
  &--disabled{
    opacity:0.5;
    pointer-events:none;
  }
  &--fixed{
    .filters__sticky{
      position:fixed;
      top:110px;
    }
  }
  &__sticky{
    position:absolute;
    top:0;
    height:100%;
  }
  
  &__ghost{
    height:calc(100vh - 110px);
  }
  &__section{
    margin-bottom:30px;
  }
  &__section-title{
    @include filter-section-title;
    margin-bottom:5px;
    span{
      display:block;  
    }
  }
  &__option{
    position:relative;
    margin-bottom:5px;
    color:$gray;
    @include filter-option;
    transition:color 0.25s linear;
    &.active,
    &:hover{
      color:$black;
    }
  }
  &__option-emoji{
    position:absolute;
    width:20px;
    height:20px;
    left:-25px;
    top:-2px;
    &-enter{
      opacity:0;
    }
    &-leave{
      opacity:1;
    }
    &-enter-to{
      opacity:1;
    }
    &-leave-to{
      opacity:0;
    }
    &-enter-active{
      transition:opacity 0.25s linear 0.25s;
    }
    &-leave-active{
      transition:opacity 0.25s linear;
    }
  }
  &__section-list{
    position:relative;
  }
  &__sticky-emoji{
    position:absolute;
    top:0;
    left:-25px;
    width:20px;
    transition:top 0.25s ease-in-out;
    transform:translateY(-1px);
  }
  .info-bubble{
    position:absolute;
    background:$highlight2;
    top:-35px;
    left:45%;
    z-index:3;
    span{
      display:flex;
      flex-direction:column;
    }
    flex-direction:column;
    img{
      width:10px;
      margin:4px auto -10px;
    }
    &--animated{
      &-enter{
        opacity:0;
        transform:scale(0);
        span{
          opacity:0;
        }
      }
      &-enter-to{
        opacity:1;
        transform:scale(1);
        span{
          opacity:1;
        }
      }
      &-enter-active{
        transition:transform 0.25s ease-out 0s, opacity 0.125s linear 0.125s;
        span{
          transition:opacity 0.125s linear 0.25s;
        }
      }
      &-leave{
        opacity:1;
        transform:scale(1);
        span{
          opacity:1;
        }
      }
      &-leave-to{
        opacity:0;
        transform:scale(0);
        span{
          opacity:0;
        }
      }
      &-leave-active{
        transition:opacity 0.125s linear 0.125s, transform 0.25s ease-in 0.125s;
        span{
          transition:opacity 0.125s linear;
        }
      }
    }
  }
  @include single-column-only {
    position:relative;
    width: 100vw;
    max-width: 100vw;
    margin-left:-37.5px;
    left:auto;
    transform:none;
    height:auto;
    top:auto;
    margin-bottom:30px;
    &--fixed{
      top:0 !important;
      .filters{
        &__sticky{
          position:fixed;
          top:48px !important;
          left:50% !important;
          transform:translateX(-50%);
          width: 100% !important;
          max-width:100vw;
          background-color:$black;
          max-height:30px;
          transition:background-color 0.25s linear 0s, max-height 0.25s linear;

          &:before,
          &:after{
            max-width:15px;
            transition:max-width 0.25s linear 0s;
          }
        }
        &__option{
          color:$white;
          transition:color 0.25s linear 0s;
          &.active{
            color:$highlight2;
          }
        }
      }
    }
    &__ghost{
      height:50px
    }
    &__sticky{
      display:flex;
      align-items:center;
      height:50px;
      top:0;
      width:100% !important;
      max-width:100% !important;
      background-color:transparent;
      transition:background-color 0.25s linear 0s, max-height 0.25s linear 0s;
      max-height:50px;
      &:before,
      &:after{
        content:'';
        width:37.5px;
        max-width:37.5px;
        height:1px;
        transition:max-width 0.25s linear 0s;
      }
    }
    &__section{
      display:flex;
      margin-bottom:0;
      &:first-of-type{
        flex:1;
      }
    }
    &__section-list{
      display:flex;
    }
    &__option{
      padding:0 5px;
      margin-bottom:0;
      transition:color 0.25s linear;
    }
  }
  @include mobile {
    position:relative;
    width:100% !important;
    max-width:100%;
    margin-top:20px;
    padding-left:25px;
    &__sticky{
      position:relative;
      top:auto;
      left:auto;
      display:flex;
      flex-direction:row-reverse;

    }
    &__section{
      width:50%;
    }
    &__section-title{
      height:30px;
    }
  }
}
</style>