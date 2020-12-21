<template>
  <div 
    class="player-card__info-column" 
    :class="{'player-card__info-column--expanded': expanded}" 
    v-bind:style="[maxHeight] ? {maxHeight: maxHeight + 'px'}: []"
  >
    
    <div class="player-card__top-data" ref="topData">
      <div class="player-card__meta-stats">
        <div class="player-card__meta-column">
          <BasicMeta :player="player" />
        </div>
        <div class="player-card__meta-column">
          <Stats :player="player" />
          <MetaList :playerMeta="player.player_meta" />
        </div>
      </div>
      <Headline :headline="player.player_description" :selling="player.player_meta.main_selling_point" />
    </div>
    <div class="player-card__bottom-data" ref="bottomData">
      <ExpandedMeta :player="player" />
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
      windowSize: null
    }
  },
  mounted() {
    this.mounted = true;
    this.$emit('set-info-height', this.$refs.topData.offsetHeight);
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
    maxHeight() {
      if(!this.mounted){ 
        return false 
      }
      if(this.expanded){
        return this.$refs.topData.offsetHeight + this.$refs.bottomData.offsetHeight + 200
      } else if(this.collapsed){
        return this.$mq === 'mobile' ? 212 : 125;
      } else {
        return  this.$refs.topData.offsetHeight;
      }
    }
  },
  methods: {
    windowResized () {

      // this.windowSize = window.innerWidth;
    }
  },
  watch : {
    maxHeight(newMax) {
      this.setMaxHeight(newMax);
    }
  }
}
</script>

<style scoped lang="scss">
  .player-card{
    max-height:313px;
    &__info-column{
      position:relative;
      width:100%;
      max-width:800px;
      opacity:1;
      transition:max-height 0.5s ease-out, max-width 0s linear 0.125s;
      overflow-x:visible;
      overflow-y:hidden;
      max-height:313px;
      @include tablet-portrait-only{
        max-width:87.5%;
      }
      @include mobile {
        width:100%;
        max-width:100%;
        .player-card--collapsed &{
          padding-bottom:15px;
          .player-card--open & {
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