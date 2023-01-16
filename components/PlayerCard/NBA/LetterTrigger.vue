
<template>
  <div
    class="letter-trigger"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <v-lottie-player
      name="letter-trigger"
      width="128px"
      height="auto"
      :autoplay="false"
      :animation-data="require('~/assets/json/letter.json')"
      @animControl="initAnim"
    />
  </div>
</template>

<script>
import * as animationData from '~/assets/json/letter.json';

export default {
  name: 'LetterTrigger',
  props: ['expanded'],
  emits: ['show-letter'],
  data() {
    return {
      lottie: null,
        src: JSON.stringify(animationData),
        options: {
            minimizable: false,
            playerSize: "standard",
            backgroundColor: '#fff',
            backgroundStyle: 'color',
            
        }
    }
  },
  watch: {
    expanded() {
      if(this.expanded){
        this.mouseEnter();
      } else {
        this.mouseLeave();
      }
    }
  },
  methods: {
    mouseEnter() {
      this.$emit('show-letter', true);
      this.lottie.setDirection(1);
      this.lottie.play();
    },
    mouseLeave() {
      if(this.expanded) return;
      this.$emit('show-letter', false);
      this.lottie.setDirection(-1);
      this.lottie.play();
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
    right:30px;
    top:60%;
    transform:translateY(-50%);
    width:128px;
    z-index:3;
  }
</style> 