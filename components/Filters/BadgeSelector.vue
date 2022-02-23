<template>
  <transition name="badge-selector">
    <div
      v-if="showBadges"
      class="badge-selector"
    >
      <button
        v-for="strength in strengthMap"
        :key="'badge-select-' + strength.strengthKey"
        class="badge-select"
        :class="{'badge-select--active': strengths.indexOf(strength.strengthKey) >= 0}"
        @click="() => toggleBadge(strength.strengthKey)"
      >
        <img :src="strength.image">
        <span>
          {{ strength.fullLabel }}
        </span>
      </button>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['strengthMap', 'showBadges', 'closeBadgeSelector'],
  data() {
    return {
      clickEvent: null
    }
  },
  computed: {
    strengths() {
      return this.$store.getters['viewOptions/strength']
    }
  },
  watch: {
    showBadges () {
      const self = this;
      if(this.showBadges){
        this.clickEvent = document.body.addEventListener('click', (e) => {
          if(!this.parentHasClass(e.target, 'badge-selector')){
            self.closeBadgeSelector();
          }
        }, true)
      }
    }
  },
  mounted () {
    const self = this;
    window.addEventListener('scroll', () => {
      if(window.scrollY > document.body.offsetHeight - window.innerHeight - 680){
        self.closeBadgeSelector()
      }
    })
  },
  methods: {
    ...mapActions({
      'setViewStrength': 'viewOptions/setViewStrength'
    }),
    parentHasClass(element, className) {
      var regex = new RegExp('\\b' + className + '\\b');
      do {
        if (regex.exec(element.className)) {
          return true;
        }
        element = element.parentNode;
      } while (element);
      return false;
    },
    toggleBadge (id) {
      let existingStrengths = [...this.strengths]
      if(existingStrengths.indexOf(id) < 0){
        existingStrengths.push(id)
      } else {
        existingStrengths.splice(existingStrengths.indexOf(id), 1);
      }
      this.setViewStrength(existingStrengths)
    }
  }
}
</script>

<style lang="scss" scoped>
.badge-selector{
  position:absolute;
  top:0;
  bottom:auto;
  left:-30px;
  right:20px;
  background:$cardback;
  transform:translateY(0);
  padding:0;
  border-radius:8px;
  overflow:auto;
  max-height:calc(100vh - 135px);
  @include single-column{
    top:30px;
    border-radius:0;
    right:auto;
    left:auto;
    width:300px;
    height:calc(calc(var(--vh, 1vh) * 100) - 78px);
    max-height:calc(calc(var(--vh, 1vh) * 100) - 78px);
  }

  &-enter{
    transform: translateY(calc(-100% - 45px));
  }

  &-enter-to{
    transform: translateY(0);
    transition:transform 0.5s ease-in-out;
  }

  &-leave{
    transform: translateY(0);
  }

  &-leave-to{
    transform: translateY(calc(-100% - 45px));
    transition:transform 0.5s ease-in-out;
  }
}
.badge-select{
  position:relative;
  display:flex;
  align-items:flex-start;
  padding:5px 15px;
  width:100%;
  background-color:transparent;
  transition:background-color 0.25s linear;
  &:after{
    content:'';
    display:block;
    position:absolute;
    top:10px;
    right:15px;
    opacity:0;
    height:12px;
    width:12px;
    background-image:url('~assets/img/close.svg');
    background-size:contain;
    background-repeat:no-repeat;
    transition:opacity 0.25s linear;
  }
  &--active {
    background-color:$cardbackdark;
    &:after{
      opacity:1;
    }
  }
  &:first-of-type{
    padding-top:15px;
    &:after{
      top:17px;
    }
  }
  &:last-of-type{
    padding-bottom:15px;
  }
  img{
    width:50px;
    margin-right:10px;
    vertical-align:bottom;
  }
  span{
    display:inline-block;
    width:70px;
    text-align:left;
    font-size:14px;
  }
}
</style>