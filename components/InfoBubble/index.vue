<template>
  <div class="info-bubble ">
    <span>
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  props: ['content']
}
</script>

<style lang="scss">
  .info-bubble{
    display:flex;
    justify-content:center;
    align-items:center;
    height:115px;
    width:115px;
    border-radius: 100%;
    color:$white;
    span{
      display:block;
      @include info-bubble;
    }
    &-leave{
      opacity:1;
    }
    &-leave-to{
      opacity:0;
    }
    &-leave-active{
      transition:opacity 0.25s linear; 
    }
  }
</style>