<template>
  <div class="image-column__meta">
    <div class="image-column__meta-inner">
      <div class="image-column__meta-column">
        <span class="image-column__meta-row"><strong>Height</strong> {{ playerMeta.height }}</span>
        <span class="image-column__meta-row"><strong>Weight</strong> {{ playerMeta.weight }}</span>
      </div>
      <div class="image-column__meta-column">
        <span class="image-column__meta-row"><strong>Age</strong> {{ playerMeta.age }}</span>
        <span class="image-column__meta-row"><strong>Wingspan</strong> {{ playerMeta.wingspan }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NBAMeta',
  props: ['playerMeta']
}
</script>

<style lang="scss" scoped>
  .image-column__meta{
    position:absolute;
    bottom:30px;
    left:0;
    right:0;
    border-top:3px solid black;
    background:$white;
    transform:translateY(0);
    transition:transform 0.175s linear .125s, border-color 0.25s linear;
    font-size:14px;
    z-index:5;
    @include mobile{
      bottom:0;
      border-top:0;
      background:transparent;
      font-size:16px;
    }
    .player-card__info-column & {
      position:relative;
      transform:translateY(0) !important;
      transition:transform 0.175s linear 0s, border-color 0.25s linear;
      // border-color:black;
    }
    &:after{
      content:'';
      display:block;
      position:absolute;
      bottom:0px;
      left:10px;
      right:10px;
      height:1px;
      background-color:$darkmediumgray;
      opacity:0;
      .player-card--expanded & {
        opacity: 1;
        transition:opacity 0.25s linear 0.25s;
      }
      .player-card__info-column & {
        left:0;
        right:0;
        opacity:1;
      }
    }
    .player-card--expanded & {
      transform:translateY(calc(100%  + 30px));
      background:$white;
      transition:transform 0.175s linear 0.125s, border-color 0.25s linear;

      @include mobile{
        background:transparent;
      }
    }
    &-inner{
      position:relative;
      display:flex;
      &:after{
        content:'';
        position:absolute;
        display:block;
        left:calc(50% - 1px);
        width:1px;
        background:$darkmediumgray;
        top:10px;
        bottom:10px;
      }
    }
    &-column{
      width:50%;
      padding:10px;
      @include mobile {
        padding-left:15px;
        &:first-of-type{
          padding-left:0;
        }
      }
      &:last-of-type{
        // s  
      }
    }
    &-row{
      display:block;
      font-weight:300;
      strong{
        font-weight:500;
        text-transform:uppercase;
      }
    }
  }
</style>