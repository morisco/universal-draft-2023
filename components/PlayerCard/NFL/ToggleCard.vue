<template>
  <div
    class="player-card__toggle"
    @click="$emit('toggle-card', $event)"
  >
    <svg viewBox="0 0 39.5 39.5">
      <path d="M19.75,39.5A19.75,19.75,0,1,1,39.5,19.75,19.75,19.75,0,0,1,19.75,39.5Zm0-38A18.25,18.25,0,1,0,38,19.75,18.25,18.25,0,0,0,19.75,1.5Z" />
      <circle
        cx="19.75"
        cy="19.75"
        r="19.75"
      />
      <rect
        x="19"
        y="11.75"
        width="1.5"
        height="15"
      />
      <rect
        x="18.77"
        y="22.59"
        width="8.15"
        height="1.5"
        transform="translate(-9.81 22.99) rotate(-45)"
      />
      <rect
        x="15.89"
        y="19.26"
        width="1.5"
        height="8.15"
        transform="translate(-11.63 18.6) rotate(-45)"
      />
    </svg>
    <transition
      name="player-card__toggle-span"
      mode="out-in"
    >
      <span
        v-if="expanded"
        key="less"
        class="player-card__toggle-span"
      >{{ lessText }}</span>
      <span
        v-else
        key="more"
        class="player-card__toggle-span"
      >{{ moreText }}</span>
    </transition>
    <transition name="info-bubble">
      <InfoBubble v-if="false && !cardExpanded && $mq !== 'mobile'">
        Read our full<br>
        scouting report
      </InfoBubble>
    </transition>
  </div>
</template>

<script>
import InfoBubble from '~/components/InfoBubble'
export default {
  name: "NFLInfoBubble",
  components: { InfoBubble },
  props: ['offenseDefense', 'toggleCard', 'expanded', 'cardExpanded', 'openText', 'closeText'],
  emits: ['toggle-card'],
  computed: {
    moreText() {
      return this.openText ? this.openText : this.$mq === 'mobile' ? 'Read the full scouting report.' : 'Read the full scouting report.';
    },
    lessText() {
      return this.closeText ? this.closeText : this.$mq === 'mobile' ? 'Click to hide scouting report.' : 'Click to hide scouting report.';
    }
  }
}
</script>

<style lang="scss" scoped>
  .player-card{
    .app--supports-hover & {
      &:hover{
        .player-card__toggle{
          .info-bubble{
            opacity:1;
            transition:opacity 0.25s linear 0.375s;
          }
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
      z-index:8;
      transition:bottom 0.25s linear 0s;
      // @include mobile{
        width:auto;
        right:20px;
        flex-direction:row;
        bottom:-20px;
        right:30px;
        left:330px;
        // .player-card--collapsed & {
        //   bottom:20px;
        // }
        .player-card:not(.player-card--collapsed):hover & {
          .app--supports-hover & {
            transition:bottom 0.25s linear 0.5s;
            bottom:-25px;
          }
        }
        .player-card--expanded &,
        .player-card--collapsing & {
          bottom:-25px;
        }
        @include tablet-portrait-only{
          left:320px;
        }
        @include mobile{
          left:20px;
          .player-card--collapsed &,
          .player-card--expanded &,
          .app__content--collapsed & {
            bottom:-16px;
            svg{
              width:32px;
            }
          }
        }
      // }
      
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
          background-color:$highlight2;
        }
        @include medium-desktop {
          left:auto;
          right:-100%;
        }
      }
      .player-card--expanded & {
        transition:bottom 0.25s linear 0.125s;
        @include mobile{
          bottom:-20px;
        }
      }
      @include non-mobile{
        .player-card--collapsed:not(.player-card--expanded) & {
          bottom:50%;
          left:100%;
          transform:translate(-50%, 50%);
          transition:bottom 0.5s linear 0.125s;
          right:auto;
          svg circle{
            fill:#D4D6D9;
          }
          &-span{
            display:none;
          }
        }
        
      }
      .player-card--collapsed.player-card--expanding & {
        opacity:0;
        transition:opacity 0.25s linear;
      }
      .player-card--collapsed.player-card--expanded:not(.player-card--expanding) & {
        opacity:1;
        transition:opacity 0.25s linear;
      }
      @include mobile {
        .player-card--collapsed & {
          left:100%;
          right:auto;
          transform:translateX(-100%);
          &-span{
            display:none;
          }
        }
      }
      .player-card--transitioning & {
        transition:bottom 0.5s linear 0.125s;
      }
      .app--supports-hover & {

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
      }
      svg{
        width:35px;
        transform:rotate(0deg);
        transition:transform 0.25s ease-in-out;

        path, rect{
          fill: $darkmediumgray;
          transition:fill 0.25s ease-in-out 0.5s;
        }
        circle{
          fill:$mediumgray;
          transition:fill 0.25s ease-in-out 0.5s;
        }
        .player-card--expanded & {
          transform:rotate(180deg);
        }
        @include mobile{
          circle{
            fill: $highlight2-light;
          }
          rect{
            fill:$white;
          }
        }
          width:40px;
          margin-right:5px;
        // }
      }

      .player-card:hover &{
        .app--supports-hover & {
          &:hover{
            svg{
              circle{
                fill: $highlight2-light;
                transition:fill 0.25s ease-in-out;
              }
              rect{
                fill:$white;
                transition:fill 0.25s ease-in-out;
              }
            }
          }
          svg{
            circle{
              fill: $highlight2-light;
            }
            rect{
              fill:$white;
            }
          }
        }
      }
      span{
        display:block;
        margin:3.75px 0 0;
        text-align:center;
        @include selling-point;
        line-height:1;
        color:$black;
        opacity:0;
        transition:color 0.25s ease-in-out, opacity 0.25s linear 0s;
        //  @include mobile{
          margin: 10px 0 0;
          display:block;
          @include mobile-expand-label;
        // }
        .player-card:hover & {
          .app--supports-hover & {
            opacity:1;
            transition:color 0.25s ease-in-out, opacity 0.25s linear 0.75s;

          }
        }
        .player-card--expanded & {
          opacity:1;
        }
        .player-card--expanding &,
        .player-card--collapsing & {
          opacity:0 !important;
          transition:color 0.25s ease-in-out, opacity 0.25s linear 0s;
        }
        @include single-column{
          opacity:1;
        }
        @include mobile{
          opacity:1;
          margin-top:15px;
          .player-card--expanded &{
            margin-top:15px;
          }
        }
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
     
  @keyframes toggleTransition {
    0% {
      opacity: 1; 
    } 20%, 80% {
      opacity: 0; 
    } 100% {
      opacity: 1; 
    }
  }
</style>