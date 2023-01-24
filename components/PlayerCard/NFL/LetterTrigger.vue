
<template>
  <div
    class="letter-trigger"
    :class="{'letter-trigger--show': showLetter}"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <div class="circle">
      <span>secret scout’s take</span>
    </div>
    <img src="~/assets/img/scout.png">
  </div>
</template>

<script>

export default {
  name: 'LetterTrigger',
  props: ['expanded'],
  emits: ['show-letter'],
  data() {
    return {
      showLetter: false,
    }
  },
  watch: {
    expanded() {
      console.log('watch expanded here', this.expanded);
      if(this.expanded){
        this.mouseEnter();
      } else {
        this.mouseLeave();
      }
    }
  },
  methods: {
    mouseEnter() {
      if(this.$mq === 'mobile') return;
      this.$emit('show-letter', true);
      this.showLetter = true;
    },
    mouseLeave() {
      if(this.expanded || this.$mq === 'mobile') return;
      this.$emit('show-letter', false);
      this.showLetter = false;
    },
    initAnim(anim) {
      this.lottie = anim;
    }
  }
}
</script>

<style lang="scss" scoped>
  .letter-trigger{
    position:absolute;
    right:20px;
    top:calc(60% + 11px);
    transform:translateY(-50%);
    z-index:3;
    color:white;
    padding-bottom:22px;
    overflow:hidden;
    @include mobile{
      position:relative;
      display:flex;
      right:auto;
      top:auto;
      transform:none;
      margin-bottom:-10px;
      margin-top:15px;
      padding-bottom:0;
      max-width:calc(100% - 60px);
      margin-left:auto;
      margin-right:auto;
    }
    .circle{
      background:$highlight2-light;
      display:flex;
      width:76px;
      height:76px;
      border-radius:100%;
      overflow:hidden;
      display:flex;
      justify-content:center;
      align-items:center;
      z-index:1;
    }
    img{
      transition: transform 0.25s ease-in-out 0s;
      position:absolute;
      left:50%;
      transform:translate(-50%, 100%);
      top:22px;
      z-index:2;
      max-width:100%;
      @include mobile{
        position:relative;
        left:auto;
        transform:none;
        opacity:1;
        top:auto;
        height:66px;
        margin-left:-10px;
        transform:none;
      }
    }
    span{
      color: rgba(240,240,240,1);
      font-family: "GT America Condensed";
      font-size: 14px;
      font-weight: 500;
      font-style: italic;
      letter-spacing: 0.57px;
      text-align: center;
      line-height: 15px;
      text-transform: uppercase;
      opacity:1;
      transition: opacity 0.25s linear 0.25s;
      transform: rotate(-4deg);
    }
    &--show{
      .circle{

      }
      span {
        opacity:0;
        transition: opacity 0.25s linear 0s;
      }
      img{
        transform:translate(-50%, 0);
        transition: transform 0.25s ease-in-out 0.25s;
      }
    }
    
   
  }
</style> 