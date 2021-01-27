<template>
<div class="player-card__meta-bar" ref="metaBar">
  <div class="player-card__meta-bar-rank" v-if="rank">
    <span>{{rank}}</span>
  </div>
  <DraftTeam v-if="['mock-draft', 'draft-results'].indexOf($route.name) >= 0 && teamNameLogo && collapsed" :teamNameLogo="teamNameLogo" />
  <Trend v-if="player.player_updates" :trend="player.player_updates.rank_movement" />
  <div class="player-card__meta-bar-name-school player-card__image-column">
    <h3>
      <span>{{playerMeta.firstName}}</span>
      <span>{{playerMeta.lastName}}</span>
    </h3>
    <div class="player-card__meta-bar-position-school">
      <span class="position">{{playerMeta.position}}</span>
      <span class="school">{{playerMeta.school}}</span>
    </div>
  </div>
  <div class="player-card__meta-bar-details">
    <div class="player-card__meta-bar-details-column" v-if="$mq !== 'tablet'">
      <div class="player-card__meta-bar-details-row">
        <span class="label">Year</span> {{playerMeta.year}}
      </div>
      <div class="player-card__meta-bar-details-row">
        <span class="label">Age</span> {{playerMeta.age}}
      </div>
    </div>
    <div class="player-card__meta-bar-details-column" v-if="$mq !== 'tablet'">
      <div class="player-card__meta-bar-details-row">
        <span class="label">Height</span> {{playerMeta.height}}
      </div>
      <div class="player-card__meta-bar-details-row">
        <span class="label">Weight</span> {{playerMeta.weight}}
      </div>
    </div>
     <div class="player-card__meta-bar-details-column player-card__meta-bar-details-column--shades">
      <div class="shades-of-icon">
        <img src="@/assets/img/icons/shades-of.svg" alt="Venn Diagaram Icon" data-not-lazy class="hover" />
        <img src="@/assets/img/icons/shades-of-icon-black.svg" alt="Venn Diagaram Icon" data-not-lazy class="non-hover" />
      </div>
      <div class="player-card__meta-bar-details-row">
        <span class="label">Shades Of:</span>
      </div>
      <div class="player-card__meta-bar-details-row player-card__meta-bar-details-row--shade-value">
        {{playerMeta.shadesOf}}
      </div>
    </div>
  </div>
  <div class="player-card__meta-bar-tablet" v-if="$mq === 'tablet'">
    <div class="player-card__meta-bar-details-column">
      <div class="player-card__meta-bar-details-row">
        <span class="label">Year</span> {{playerMeta.year}}
      </div>
      <div class="player-card__meta-bar-details-row">
        <span class="label">Age</span> {{playerMeta.age}}
      </div>
    </div>
    <div class="player-card__meta-bar-details-column">
      <div class="player-card__meta-bar-details-row">
        <span class="label">Height</span> {{playerMeta.height}}
      </div>
      <div class="player-card__meta-bar-details-row">
        <span class="label">Weight</span> {{playerMeta.weight}}
      </div>
    </div>
  </div>
</div>  
</template>

<script>
import DraftTeam from './DraftTeam'
import Trend from './Trend'

export default {
  name: 'MetaBar',
  components: {DraftTeam, Trend},
  props: ['player', 'rankKey', 'collapsed'],
  mounted() {
    this.$emit('setHeight',this.$refs.metaBar.offsetHeight);
  },
  computed: {
    rank() {
      return this.rankKey ? this.player[this.rankKey] + 1 : null;
    },
    teamNameLogo () {
      return this.$store.getters['content/teamNameLogo'](this.player[this.rankKey]);
    },
    playerMeta() {
      let playerData = this.player
      return {
        firstName: playerData.first_name,
        lastName: playerData.last_name,
        school: playerData.player_meta.school,
        position: this.$store.getters['content/playerPosition'](playerData.position),
        year: playerData.player_meta.year,
        age: playerData.player_meta.age,
        height: playerData.player_meta.height,
        weight: playerData.player_meta.weight,
        shadesOf: playerData.player_meta.shades_of
      };
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth']
    },
  },
  watch: {
    viewDepth() {
      this.$emit('setHeight',this.$refs.metaBar.offsetHeight);
    }
  }
}
</script>

<style lang="scss" scoped>
  .player-card{
    &__meta-bar{
      position:relative;
      width:100%;
      background:$mediumgray;
      padding:15px 0 12px;
      border-radius:0.625rem 0.625rem 0 0;
      font-family: 'Decima';
      display: flex;
      text-transform:uppercase;
      transition:all 0.25s linear 0.5s, border-radius 0.25s linear 0s;
      @include tablet{
        flex-wrap:wrap;
      }
      &-tablet{
        flex: 0 0 auto;
        min-width:calc(100% - 60px);
        display:flex;
        margin-left:40px;
        margin-right:20px;
        margin-top:7.5px;
        padding-top:8px;
        border-top:1px solid $darkmediumgray;
        .player-card__meta-bar-details-column{
          flex-direction:row;
          flex:1;
          padding:0;
          &:after{
            display:none;
          }
          &:last-of-type{
            .player-card__meta-bar-details-row{
              padding: 0 15px;
            }
          }
          &:last-of-type{
            .player-card__meta-bar-details-row{
              &:last-of-type{
                border-right:0;
              }
            }
          }
        }
        .player-card__meta-bar-details-row{
          flex:1;
          padding: 2px 15px 0px;
          border-right:1px solid $darkmediumgray;
          display:flex;
          align-items:center;
          span{
            margin-right:4px;
          }
          &:first-of-type{
            padding-left:0px;
          }
        }
      }
      .draft-team{
        box-shadow:none;
        right:20px;
        top:50%;
        left:auto;
        width:80px;
        height:80px;
        transform:translateY(-50%);
        opacity: 1;
        background: transparent !important;
        transition:opacity 0.25s linear 0.5s;
        .player-card--expanded &{
          opacity:0;
          transition:opacity 0.25s linear;
        }
        @include tablet-portrait-only{
          top:3px;
          transform:none;
        }
        @include mobile{
          transform: translate(0);
          right:auto;
          top: 46px !important;
          left:10px;
          width: 26px;
          height: 26px;
          background: $mediumgray !important;
        }
      }
      .player-card--collapsed & {
        border-radius:0.625rem;
        border-bottom-color: transparent;
      }
      .player-card--expanded & {
        border-radius:0.625rem 0.625rem 0 0;
      }
      @include non-mobile{
        .player-card:hover &,
        .player-card--expanded & {
          background:$highlight2;
          color:$white;
        }
      }
      @include mobile{
        background:transparent !important;
        border-radius:0;
        flex-direction:column;
        padding:0;
        border-bottom:0;
      }
    
      &-rank{
        position:absolute;
        left:-26px;
        top:50%;
        transform:translateY(-50%);
        background:$black;
        color:$white;
        height:52px;
        width:52px;
        border-radius:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        opacity:1;
        padding-top:4px;
        transition:background-color 0.25s linear 0.5s;

        .player-card:hover & {
          .app--supports-hover & {
            background-color:$mediumgray;
            span{
              color:$black;
            }
          }
        }
        .player-card--expanded & {
          background-color:$mediumgray;
          span{
            color:$black;
          }
        }
        
        @include tablet-portrait-only{
          top:12.5px;
          left:-20px;
          transform:translateY(0);
        }
        @include card-rank;
        @include mobile {
          opacity:0;
          left:10px;
          top:15px;
          transform:translateY(0);
          z-index:5;
          font-size:14px;
          height:26px;
          width:26px;
          padding-top:2px;
          background-color:$darkgray;
          transition:opacity 0.25s linear 0.5s;
          .player-card--collapsed & {
            opacity:1;
          }
          .player-card--expanded & {
            opacity:0;
            transition:opacity 0.25s linear;
          }
        }
        span{
          color:$white;
          transition:color 0.25s linear 0.5s;
        }
      }
      &-name-school{
        
        &.player-card__image-column{
          padding:0 0 0 40px;
          @include tablet-portrait-only{
            width:50%;
          }
          @include mobile{
            max-height:100% !important;
            background-color:$mediumgray;
            color:$black;
            transition:all 0.5s linear 0s;
            border-radius:0.625rem 0.625rem 0 0;
            padding:17px 0 15px 20px;
            .player-card--collapsed & {
              padding:15px 0 15px 40px;
            }
            min-height:0;
            .player-card--active &{
              color:$white;
              background-color:$darkgray;
            }
            .player-card--expanded & {
              padding: 15px 0 15px 20px;
              transition:all 0.5s linear 0s, padding 0.25s linear 0.25s;
            }
          }
        }
  
      }
      &-position-school{
        @include meta-bar-detail;
        margin-top:-3px;
        @include mobile{
          margin-top:-2px;
        }
        // margin-bottom:5px;
        .school{
          font-weight:300;
        }
        // @include mobile{
        //   font-size:18px;
        // }
      }
      &-details{
        flex:1;
        padding: 0 15px;
        display:flex;
        align-items:center;
        font-size:15px;
        @include non-mobile{
          margin-bottom:-3px;
        }
        @include tablet-portrait-only{
          margin-bottom:0;
        }
        @include meta-bar-detail;
        @include mobile{
          background:$lightgray;
          padding: 20px;
          flex-wrap:wrap;
          font-size:15px;
          &:after{
            content:'';
            display:block;
            width:100%;
            height:1px;
            background:#bdbdbd;
            .player-card--collapsed & {
              display:none;
            }
          }
        }
        &-column{
          position:relative;
          min-width:160px;
          padding:0 15px;
          display:flex;
          flex-direction:column;
          justify-content:center;
          @include mobile{
            min-width:50%;
            padding:0;
          }

          &:after{
            content:'';
            position:absolute;
            right:0;
            top:50%;
            transform:translateY(-50%);
            display:block;
            width:1px;
            height:40px;
            background:$darkmediumgray;
            @include mobile{
              display:none;
            }
          }
          &--shades{
            @include meta-bar-detail;
            line-height:1;
            padding-left:50px;
            @include tablet-portrait-only{
              margin-left:-40px;
            }

            .shades-of-icon{
              position:absolute;
              top:0;
              left:15px;
              width:30px;
              img{
                position:absolute;
                left:0;
                top:0;
                transition:opacity 0.5s linear 0.5s;
                &.hover{
                  opacity:0;
                }
                &.non-hover{
                  opacity:1;
                }
                @include non-mobile{
                  .player-card:hover &,
                  .player-card--expanded & {
                    &.hover{
                      opacity:1;
                    }
                    &.non-hover{
                      opacity:0;
                    } 
                  }
                }
              }
            }

            @include mobile{
              font-size:19px;
              min-width:100%;
              flex-direction:row;
              justify-content:flex-start;
              line-height:20px;
              margin:15px 0 17px;
              padding-left:35px;
              flex-wrap:wrap;
              .player-card__meta-bar-details-row{
                &--shade-value{
                  flex:0 0 auto;
                }
              }
              .shades-of-icon{
                left:0;
              }
              > div{
                flex: 0 0 auto;
                display:inline-block;
                margin-right:3px;
              }
            }
            &:after{
              display:none;
            }
          }
        }
        &-row{
          font-weight:300;
          .label{
            font-weight:normal;
          }
        }
      }
    }
  }
</style>