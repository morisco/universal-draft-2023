<template>
  <div class="info-bubble draft-team" :style="{top: infoHeight + 'px'}" :class="{'draft-team--animated': animate}">
    <img :src="teamNameLogo.logo.small" />
    <span class="draft-team__name">{{teamNameLogo.teamName}}</span>
  </div>
</template>

<script>
export default {
  props: ['teamNameLogo', 'infoHeight'],
  data () {
    return {
      animate: false,
      delayAnimateTimeout: null
    }
  },
  watch: {
    infoHeight() {
      this.delayAnimateTimeout = setTimeout(() => {
        this.animate = true;
      }, 500);
    }
  }
}
</script>

<style lang="scss" scoped>
  .draft-team{
    position:absolute;
    background:$lightgray;
    max-height:100px;
    max-width:100px;
    left:20px;
    top:222.5px;
    transform:translateY(calc(-100% - 20px));
    z-index:1;

    @include mobile{
      max-width:35px;
      max-height:35px;
      left:auto;
      right:15px;
      top:25px !important;
      transform:none;
      border:1px solid $highlight1;
    }
    &--animated{
      // transition: all 0.375s linear 0.125s, background-color 0.25s linear 0s;
    }
    .player-card--collapsed & {
      background:$lightgray !important;
    }

    img{
      max-width:75%;
      max-height:75%;
      opacity:0;
      transition:opacity 0.25s linear;
    }
    img.isLoaded {
      opacity:1;
    }

    &__name{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      opacity:0;
      z-index:0;
      transition:opacity 0.25s linear 0s;
      text-transform:uppercase;
      margin-top:3px;
    }

    .player-card--collapsed & {
      max-width:40px;
      max-height:40px;
      top:100% !important;
      left:10px;
      transform:translateY(calc(-100% - 10px));
    }
    .player-card--collapsed & {
      transition: all 0.375s linear 0.125s, opacity 0.375s linear 0s, background-color 0.25s linear 0s;
    }
    .player-card--transitioning & {
      opacity:0;
      transition: all 0.375s linear 0.125s, opacity 0.125s linear 0s;
    }

    
  
    &:hover{
      .player-card--offense &{
        background-color: $offense;
      }
      .player-card--defense &{
        background-color: $defense;
      }
      img,
      img[lazy=loaded]{
        opacity:0;
        .player-card--collapsed & {
          opacity:1;
        }
        transition:opacity 0.25s linear 0s;
      }
      .draft-team__name{
        opacity:1;
        .player-card--collapsed & {
          opacity:0;
        }
        transition:opacity 0.25s linear 0.25s;
      }
    }
    
  }
</style>