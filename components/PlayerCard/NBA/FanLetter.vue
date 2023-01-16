<template>
  <div
    class="fan-letter"
    :class="{'fan-letter--show':showLetter && !expanded}"
  >
    <div
      class="fan-letter-content"
      v-html="fanLetter + fanLetter + fanLetter + fanLetter"
    />
  </div>  
</template>

<script>
export default {
  name: "FanLetter",
  props: ['showLetter', 'fanLetter', 'expanded']
}
</script>

<style lang="scss" scoped>
.fan-letter{
  position:absolute;
  top:30px;
  left:30px;
  right:30px;
  bottom:30px;
  opacity:0;
  pointer-events:none;
  transition:all 0.25s linear;
  background:#FFF;
  display:flex;
  flex-direction:column;
  justify-content:center;
  z-index:2;
  padding:0 30px;
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
    }
  }
</style>