<template>
  <div 
    class="player-card__info-column" 
    :class="{
      'player-card__info-column--expanded': expanded,
      'player-card__info-column--mounted': mounted
    }"
    v-bind:style="[maxHeight] ? {maxHeight: maxHeight + 'px'}: []"
  >
    
    <div class="player-card__top-data" ref="topData">
      <div class="player-card__meta-stats">
        <div class="player-card__meta-column">
          <BasicMeta :player="player" />
        </div>
        <div class="player-card__meta-column">
          <Stats :player="player" />
          <MetaList :playerMeta="player.player_meta" v-if="$mq !== 'mobile' || !this.collapsed " />
        </div>
      </div>
      <Headline :headline="player.player_description" :selling="player.player_meta.main_selling_point" v-if="$mq !== 'mobile' || !this.collapsed " />
    </div>
    <div class="player-card__bottom-data" ref="bottomData">
      <MetaList :playerMeta="player.player_meta" v-if="$mq === 'mobile' && this.collapsed " />
      <Headline :headline="player.player_description" :selling="player.player_meta.main_selling_point" v-if="$mq === 'mobile' && this.collapsed" />
      <ExpandedMeta :player="player" />
      <CombineResults :results="player.combine_results" :topHeight="topHeight" v-if="$route.name === 'mock-draft' || $mq === 'mobile'" />
    </div>
  </div>
</template>

<script>
import BasicMeta from './BasicMeta';
import Stats from './Stats';
import MetaList from './MetaList';
import Headline from './Headline';
import ExpandedMeta from './ExpandedMeta';
export default {
  props: ['playerId', 'expanded', 'collapsed', 'setMaxHeight'],
  data () {
    return {
      mounted: false,
      windowSize: null,
      topHeight: null,
      maxHeight: null
    }
  },
  mounted() {
    const self = this;
    setTimeout(() => {
      self.mounted = true;
    }, 500);
    window.addEventListener('resize', this.windowResized);
  },
  destroyed(){
    window.removeEventListener('resize', this.windowResized);
  },
  components: { BasicMeta, Stats, MetaList, Headline, ExpandedMeta },
  computed: {
    player () {
      return this.$store.getters['content/player'](this.playerId);
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth'];
    },
    // topDataHeight() {  
    //   if(!this.mounted) return
    //   return this.$refs.topData.offsetHeight;
    // },
    // maxHeight() {
    //   if(!this.mounted){ 
    //     return false 
    //   }
    //   if(this.expanded){
    //     console.log(this.topHeight);
    //     return this.topHeight + this.$refs.bottomData.offsetHeight
    //   } else if(this.collapsed){
    //     console.log(this.topHeight);
    //     return this.$mq === 'mobile' ? this.topHeight : 125;
    //   } else {
    //     return  this.$refs.topData.offsetHeight;
    //   }
    // }
  },
  methods: {
    windowResized () {
      this.setHeights();
    },
    setHeights() {
      if(!this.mounted) return
      if(this.expanded){
        this.maxHeight = this.topHeight + this.$refs.bottomData.offsetHeight
      } else if(this.collapsed){
        this.maxHeight = this.$mq === 'mobile' ? this.topHeight : 125
      } else {
        console.log('tth', this.topHeight);
        this.maxHeight = this.topHeight
      }
      this.setMaxHeight(this.maxHeight);
      this.$emit('set-top-height', this.topHeight)
      this.$emit('set-info-height', this.maxHeight);
    }
  },
  watch : {
    collapsed(newCollapsed) {
      this.topHeight = this.$refs.topData.offsetHeight
      this.setHeights();
    },
    expanded(newExpanded) {
      this.setHeights();
    },
    topHeight(newTopHeight, oldTopHeight) {
      if(newTopHeight !== this.maxHeight){
        this.setHeights();
      }
    },
    mounted(newMounted) {
      this.topHeight = this.$refs.topData.offsetHeight
      console.log(this.$refs.topData.offsetHeight);
      this.setHeights();
    }
  }
}
</script>

<style scoped lang="scss">
  .player-card{
    // max-height:313px;
    &__info-column{
      position:relative;
      width:100%;
      max-width:800px;
      opacity:1;
      transition:max-height 0.5s ease-out, max-width 0s linear 0.125s;
      overflow-x:visible;
      overflow-y:hidden;
      // max-height:313px;
      @include tablet-portrait-only{
        max-width:87.5%;
      }
      @include mobile {
        width:100%;
        max-width:100%;
        .player-card--collapsed &{
          padding-bottom:15px;
          .player-card--expanded & {
            padding-bottom:0;
          }
        }

      }
      @include non-mobile{
        .player-card--collapsed &{
          max-width:84.5%;
          transition:all 0.25s ease-in-out 0.125s, max-height 0.25s ease-in-out 0.125s;
        }
      }
      .player-card--transitioning & {
        transition:all 0.5s ease-in-out 0.125s, max-height 0.2s ease-in-out 0s;
        .player-card__top-data,
        .player-card__bottom-data{
          -webkit-animation: infoColumn-collapse 0.75s 1 linear;
            animation: infoColumn-collapse 0.75s 1 linear;
        }
      }
    }
    &__meta-column{
      display:flex;
      flex-direction:column;
      flex:1;
    }
    &__top-data{
      display:flex;
      flex-direction:column;
      padding:30px;
      @include mobile {
        padding:20px 15px 0;
        flex-direction:column;
      }
    }
    &__meta-stats{
      display:flex;
      justify-content:space-between;
      width:100%;
      @include mobile {
        flex-direction:column;
      }
    }
  }
  
  @keyframes infoColumn-collapse {
    0% {
      opacity: 1; 
    } 20%, 80% {
      opacity: 0; 
    } 100% {
      opacity: 1; 
    }
  }
</style>