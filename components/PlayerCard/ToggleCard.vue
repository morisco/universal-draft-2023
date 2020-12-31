<template>
  <div class="player-card__toggle" v-on:click="$emit('toggle-card', $event)">
    <svg viewBox="0 0 39.5 39.5">
      <path d="M19.75,39.5A19.75,19.75,0,1,1,39.5,19.75,19.75,19.75,0,0,1,19.75,39.5Zm0-38A18.25,18.25,0,1,0,38,19.75,18.25,18.25,0,0,0,19.75,1.5Z"></path>
      <rect x="19" y="11.75" width="1.5" height="15"></rect>
      <rect x="18.77" y="22.59" width="8.15" height="1.5" transform="translate(-9.81 22.99) rotate(-45)"></rect>
      <rect x="15.89" y="19.26" width="1.5" height="8.15" transform="translate(-11.63 18.6) rotate(-45)"></rect>
    </svg>
    <transition name="player-card__toggle-span" mode="out-in">
      <span class="player-card__toggle-span" v-if="expanded" key="less">LESS</span>
      <span class="player-card__toggle-span" v-else key="more">MORE</span>
    </transition>
    <transition name="info-bubble">
      <InfoBubble v-if="!cardExpanded && $mq !== 'mobile'">
        Read our full<br/>
        scouting report
      </InfoBubble>
    </transition>
  </div>
</template>

<script>
import InfoBubble from '~/components/InfoBubble'
export default {
  components: { InfoBubble },
  props: ['offenseDefense', 'toggleCard', 'expanded', 'cardExpanded']
}
</script>

<style lang="scss" scoped>
  .player-card{
    &:hover{
      .player-card__toggle{
        .info-bubble{
          opacity:1;
          transition:opacity 0.25s linear 0.375s;
        }
      }
    }
    &__toggle{
      display:flex;
      flex-direction:column;
      align-items:center;
      position:absolute;
      width:37px;
      bottom:30px;
      right:20px;
      cursor:pointer;
      transition:bottom 0.25s linear 0.125s;
      @include mobile{
        bottom:25px;
        right:15px;
        .player-card--collapsed & {
          bottom:20px;
        }
      }
      .info-bubble{
        position:absolute;
        left:calc(100% + 5px);
        top:calc(50% - 10px);
        transform:translateY(-50%);
        opacity:0;
        transition:opacity 0.25s linear;
        @include non-mobile{
          .player-card--collapsed & {
            top:50%;
            transition:opacity 0.25s linear, top 0.25s linear;
          }
        }
        .player-card--defense & {
          background-color:$defense;
        }
        .player-card--offense & {
          background-color:$offense;
        }
        @include medium-desktop {
          left:auto;
          right:-100%;
        }
      }
      .player-card--expanded & {
        bottom:10px;
        transition:bottom 0.25s linear 0.125s;
        .mock-draft & {
          bottom:27.5px;
        }
        @include mobile{
          bottom:22.5px;
          .mock-draft & {
            bottom:22.5px;
          }
        }
      }
      @include non-mobile{
        .player-card--collapsed &{
          bottom:35px;
          transition:bottom 0.5s linear 0.125s;
        }
      }
      .player-card--transitioning & {
        transition:bottom 0.5s linear 0.125s;
      }
      &:hover{
        span{
          .player-card--offense & {
            color:$offense;
          }
          .player-card--defense & {
            color:$defense;
          }
        }
        svg{
          path, rect{
            .player-card--offense & {
              fill:$offense;
            }
            .player-card--defense & {
              fill:$defense;
            }
            transition:fill 0.25s ease-in-out;
          }
        }
      }
      svg{
        width:35px;
        transform:rotate(0deg);
        transition:transform 0.25s ease-in-out;
        path, rect{
          fill: $black;
          transition:fill 0.25s ease-in-out;
        }
        .player-card--expanded & {
          transform:rotate(180deg);
        }
      }
      span{
        display:block;
        margin:3.75px 0 0;
        text-align:center;
        @include meta-list-label;
        line-height:1;
        color:$black;
        transition:color 0.25s ease-in-out;
      }
      &-span{
        &-enter{
          opacity:0;
          transform:translateY(5px);
        }
        &-enter-top{
          opacity:1;
          transform:translateY(0);
        }
        &-enter-active{
          transition:all 0.25s ease-in-out 0.125s;
        }
        &-leave{
          opacity:1;
          transform:translateY(0);
        }
        &-leave-to{
          opacity:0;
          transform:translateY(-5px);
        }
        &-leave-active{
          transition:all 0.25s ease-in-out;
        }
      }
    }
  }
</style>