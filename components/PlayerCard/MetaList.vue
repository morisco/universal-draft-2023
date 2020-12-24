<template>
  <ul class="player-card__meta-list">
    <li class="player-card__meta-row">
      <span class="player-card__meta-label">HEIGHT/WEIGHT</span>
      <span class="player-card__meta-value">{{playerMeta.height}}, {{playerMeta.weight}}</span>
    </li>
    <li class="player-card__meta-row">
      <span class="player-card__meta-label">AGE</span>
      <span class="player-card__meta-value">{{playerMeta.age}}</span>
    </li>
    <li class="player-card__meta-row">
      <span class="player-card__meta-label">SHADES OF</span>
      <span class="player-card__meta-value">{{playerMeta.shades_of}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  props: ['playerMeta'],
}
</script>

<style lang="scss" scoped>
  .player-card{
    &__meta-list{
      display:flex;
      flex-direction:column;
      list-style:none;
      opacity:1;
      transition: opacity 0s linear 0.125s;
      @include non-mobile{
        .player-card--collapsed &{
          opacity:0;
        }
      }
      @include mobile{
        .player-card--collapsed & {
          display:none;
          margin:0 15px;
        }
        .player-card--open & {
          display:block;

        }
      }
    }
    &__meta-row{
      position:relative;
      display:flex;
      justify-content:space-between;
      margin:2px 0 3px;
      &:after{
        content:'.......................................................................................................................................................................................................................................';
        display:block;
        position:absolute;
        bottom:-3px;
        left:0;
        right:0;
        overflow:hidden;
        z-index:0;
      }
      span{
        position:relative;
        z-index:1;
        background:$lightgray;
      }
    }
    &__meta-label{
      @include meta-list-label;
      padding-right:5px;
      
    }
    &__meta-value{
      @include meta-list-value;
      padding-left:5px;
    }
  }
</style>