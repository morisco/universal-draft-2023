<template>
  <div 
    class="info-bubble draft-team" 
    :class="{
      'draft-team--animated': animate,
      'draft-team--loaded': infoHeight > 0
    }"
  >
    <img :src="teamNameLogo.logo.small" />
    <span class="draft-team__name">
      {{teamNameLogo.teamName}}
      <span v-if="teamNameLogo.via">({{teamNameLogo.via}})</span>
    </span>
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
    background:$mediumgray;
    max-height:95px;
    max-width:95px;
    left:-15px;
    top:0;
    transform:translateY(calc(-100% - 15px));
    z-index:3;
    cursor:default;
    opacity:0;
    transition:opacity 0.25s linear;
    // box-shadow:0px 2px 4px rgba(0,0,0,0.22);

    @include tablet-landscape-and-below{
      max-width:95px;
      max-height:95px;
      left:-5px;
      // box-shadow:none;
    }


    @include mobile{
      max-width:80px;
      max-height:80px;
      top:150px !important;
      left:auto;
      right:30px;
      transform:none;
    }
    &--animated{
      // transition: all 0.375s linear 0.125s, background-color 0.25s linear 0s;
    }
    &--loaded{
      opacity:1;
    }
    .player-card--collapsed & {
      background:$lightgray !important;
    }

    img{
      max-width:75% !important;
      max-height:75% !important;
      top:auto !important;
      left:auto !important;
      transform:translateX(0) !important;
      opacity:0;
      transition:opacity 0.25s linear;
      position:relative;
      top:auto;
    }
    img.isLoaded {
      opacity:1;
    }

    &__name{
      position:absolute;
      top:50%;
      left:50%;
      width:90%;
      text-align:center;
      transform:translate(-50%,-50%);
      opacity:0;
      z-index:0;
      transition:opacity 0.25s linear 0s;
      // text-transform:uppercase;
      // margin-top:3px;
      pointer-events:none;
      span{
        display:block;
        text-align:center;
      }
    }

    // .player-card--collapsed & {
    //   max-width:40px;
    //   max-height:40px;
    //   top:100% !important;
    //   left:10px;
    //   transform:translateY(calc(-100% - 10px));
    // }
    .player-card--collapsed & {
      transition: all 0.375s linear 0.125s, opacity 0.375s linear 0s, background-color 0.25s linear 0s;
    }
    .player-card--transitioning & {
      opacity:0;
      transition: all 0.375s linear 0.125s, opacity 0.125s linear 0s;
    }
  
    &:hover{
      .player-card--offense &{
        background-color: $highlight1;
      }
      .player-card--defense &{
        background-color: $highlight1;
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