<template>
  <div
    ref="letterWrapper"
    class="fan-letter"
    :class="{'fan-letter--show':showLetter && !expanded, 'fan-letter--expanded': expanded, 'fan-letter--below-min': belowMin}"
  >
    <div class="fan-letter-inner">
      <div
        ref="letterContent"
        class="fan-letter-content"
        v-html="fanLetter"
      />
    </div>
  </div>  
</template>

<script>
export default {
  name: "FanLetter",
  props: ['showLetter', 'fanLetter', 'expanded', 'topHeight'],
  emits: ['set-letter-height'],
  data() {
    return {
      belowMin: false
    }
  },
  watch: {
    topHeight () {
      this.belowMin = this.topHeight > this.$refs.letterContent.offsetHeight;
    },
  },
  mounted() {
    this.belowMin = this.topHeight > this.$refs.letterContent.offsetHeight;
    this.$emit('set-letter-height', this.$refs.letterContent.offsetHeight)
  }
}
</script>

<style lang="scss" scoped>
.fan-letter{
  position:absolute;
  top:30px;
  left:30px;
  right:30px;
  opacity:0;
  pointer-events:none;
  transition:opacity 0.25s linear;
  background:#FFF;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  z-index:2;
  padding:20px 30px;
  min-height:210px;
  @include mobile {
    position:relative;
    top:auto;
    left:auto;
    right:auto;
    opacity:1;
    padding:15px 20px;
    margin-bottom:35px;
  }
  &--below-min{
    justify-content:center;
  }
  &--expanded{
    position:relative;
    margin-top:0;
    // margin-bottom:30px;
    opacity:1;
    top:auto;
    left:0;
  }
  
  &--show{
    opacity:1;
    pointer-events:auto;
  }
  .fan-letter-headling{
    @include expanded-label;
    text-transform:uppercase;
  }
}
</style>

<style lang="scss" >
  .fan-letter{
    &-content p {
      @include player-card-body;
      strong{
        font-weight:700;
      }
      &:last-of-type{
        margin-bottom:0;
      }
    }
  }
</style>