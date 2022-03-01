<template>
  <div
    ref="metaBar"
    class="player-card__meta-bar"
  >
    <div
      v-if="rank && $mq !== 'mobile'"
      class="player-card__meta-bar-rank"
    >
      <span>{{ rank }}</span>
    </div>
    <DraftTeam
      v-if="['mock-draft', 'draft-grades'].indexOf($route.name) >= 0 && teamNameLogo && $mq !== 'mobile'"
      :team-name-logo="teamNameLogo"
    />
    <Trend
      v-if="player.player_updates"
      :trend="player.player_updates.rank_movement"
    />
    <div
      ref="nameDiv"
      class="player-card__meta-bar-name-school player-card__image-column"
    >
      <h3 class="h3">
        <transition name="mobile-collapsed-rank">
          <span
            v-if="$mq === 'mobile' && collapsed && !expanded"
            class="mobile-collapsed-rank"
          >{{ collapsedRank }}.</span>
        </transition>
        <span>{{ playerMeta.firstName }}</span>
        <span>{{ playerMeta.lastName }}</span>
      </h3>
      <div class="player-card__meta-bar-position-school">
        <span class="position">{{ playerMeta.position }}</span>
        <span class="school">{{ playerMeta.school }}<span v-if="false && $mq !== 'mobile'">{{ playerMeta.year && ', ' + playerMeta.year }}</span></span>
      </div>
    </div>
    <div
      v-if="$mq !== 'mobile'"
      ref="detailDiv"
      class="player-card__meta-bar-details"
    >
      <div class="player-card__meta-bar-details-column player-card__meta-bar-details-column--shades">
        <div class="player-card__meta-bar-details-row">
          <div class="shades-of-icon">
            <img
              src="@/assets/img/icons/shades-of.svg"
              alt="Venn Diagaram Icon"
              data-not-lazy
              class="hover"
            >
            <img
              src="@/assets/img/icons/shades-of-icon-black.svg"
              alt="Venn Diagaram Icon"
              data-not-lazy
              class="non-hover"
            >
          </div>
          <span class="label">Shades Of</span>
        </div>
        <div class="player-card__meta-bar-details-row player-card__meta-bar-details-row--shade-value">
          {{ playerMeta.shadesOf }}
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import DraftTeam from './DraftTeam'
import Trend from './Trend'

export default {
  name: 'NBAMetaBar',
  components: {DraftTeam, Trend},
  props: ['player', 'rankKey', 'collapsed', 'expanded'],
  emits: ['set-height'],
  computed: {
    rank() {
      return this.rankKey ? this.player[this.rankKey] + 1 : null;
    },
    teamNameLogo () {
      return this.rankKey  === 'order_mockdraft' ?  this.$store.getters['content/teamNameLogo'](this.rank-1) : this.rankKey === 'order_draftresults' ? this.$store.getters['content/teamNameLogoResults'](this.player.drafted_team, this.player.results_via) : this.$store.getters['content/resultsTeamNameLogo'](this.rank);    
    },
    collapsedRank(){
      return this.rank < 10 ? '0' + this.rank : this.rank
    },
    playerMeta() {
      let playerData = this.player
      return {
        firstName: playerData.first_name,
        lastName: playerData.last_name,
        school: playerData.player_meta.school,
        position: playerData.position_label,
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
      this.$emit('set-height',this.$refs.metaBar.offsetHeight)
    },
    collapsed () {
      this.$emit('set-height',this.$refs.metaBar.offsetHeight)
    }
  },
  mounted() {
    this.$emit('set-height',this.$refs.metaBar.offsetHeight);
  }
}
</script>

<style lang="scss" scoped>
  .player-card{
    &__meta-bar{
      position:relative;
      width:100%;
      background:$mediumgray;
      padding:15px 0 17px;
      border-radius:0.625rem 0.625rem 0 0;
      font-family: 'GT America Condensed';
      display: flex;
      transition:all 0.25s linear 0.5s, border-radius 0.25s linear 0s;
      flex: 0 0 auto;
      align-items:center;
      @include mobile{
        .player-card--expanded{
          padding-left:15px;
          padding-right:15px;
        }
      }
      .mobile-collapsed-rank{
        opacity:1;
        max-width:40px;

        &-enter{
          max-width:0;
          opacity:0;
        }
        
        &-enter-to{
          max-width:40px;
          opacity:1;
          transition: all 0.25s ease-in-out;
        }

        &-leave{
          max-width:40px;
          opacity:1;
        }
        
        &-enter-to{
          max-width:0;
          opacity:0;
          transition: all 0.25s ease-in-out;
        }
      }
      @include tablet{
        flex-wrap:wrap;
      }
      @include mobile{
        background:transparent;
      }
      .h3{
        text-transform:uppercase;
        margin-top:-4px;
        margin-bottom:4px;
        font-family: "GT America Condensed";
        font-weight: 500;
        font-size: 32px;
        @include mobile{
          margin-bottom:4px;
          
        }
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
        position:absolute;
        box-shadow:none;
        right: auto;
        left: -45px;
        top: 130px;
        top:calc(100% + 5px);
        width:120px;
        height:120px;
        opacity: 1;
        background: transparent;
        transition:opacity 0.25s linear 0.5s, background-color 0.25s linear;
        transform:translateY(0);
        > img{
          max-width:90% !important;
          max-height:90% !important;
        }
        &:hover{
          background-color: $mediumgray;
        }
        .player-card--collapsed & {
          right: 25px;
          top: 50%;
          transform:translateY(-50%);
          width:80px;
          height:80px;
          left:auto;
        }

        @media(max-width:1140px){
          max-width:55px;
          max-height:55px;
          left:-35px;
        }
        
        @include tablet-portrait-only{
          // top:3px;
          transform:none;
          left:-20px;
          width:70px;
          height:70px;
          .player-card--collapsed & {
            width:50px;
            height:50px;
          }
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
      @include non-mobile{
        .player-card--collapsed & {
          border-radius:0.625rem;
          background-color:$lightgray;
          border-bottom-color: transparent;
        }
        .player-card--expanded & {
          border-radius:0.625rem 0.625rem 0 0;
        }
      }
      @include non-mobile{
        .player-card:hover &,
        .player-card--expanded & {
          background:$black;
          color:$white;
        }
      }
      @include mobile{
        // background:transparent !important;
        border-radius:0;
        flex-direction:column;
        padding:0;
        border-bottom:0;
        border-top: 0px solid $black;
        transition:border-top 0.25s linear; 
        border-top: 3px solid $black;
        border-bottom:1px solid $darkmediumgray;
        .player-card--collapsed & {
          border-top:0;
          border-bottom:1px solid $darkmediumgray;
        }
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
        padding-top:0;
        padding-bottom:1px;
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
          left:-30px;
          top:18px;
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
        flex: 0 0 auto;
        &.player-card__image-column{
          padding:0 0 0 40px;
          width:auto;
          max-width:100%;
          flex:1;
          @include tablet-portrait-only{
            width:50%;
          }
          @include mobile{
            width:100%;
            max-height:100% !important;
            background-color:transparent;
            color:$black;
            transition:all 0.5s linear 0s, padding 0.25s linear 0s;
            border-radius:0.625rem 0.625rem 0 0;
            padding:15px 0 10px 0;
            .player-card--collapsed & {
              padding:15px 0 10px;
            }
            min-height:0;
            .player-card--expanded & {
              padding: 15px 0 15px;
              transition:all 0.5s linear 0.25s, padding 0.25s linear 0s;
            }
          }
        }
  
      }
      &-position-school{
        @include meta-bar-detail;
        font-family: 'GT America';
        margin-top:-3px;
        text-transform:none;
        padding-left:2px;
        font-weight:500;
        letter-spacing:0;
        @include mobile{
          margin-top:-2px;
          padding-left:0;
        }
        // margin-bottom:5px;
        .school{
          font-family:'GT America';
          font-weight:300;
          text-transform:none;
        }
        // @include mobile{
        //   font-size:18px;
        // }
      }
      &-details{
        flex:1;
        padding: 0 15px 0 0;
        display:flex;
        align-items:center;
        justify-content:flex-end;
        font-size:15px;
        @include non-mobile{
          // margin-bottom:-3px;
        }
        @include tablet-portrait-only{
          margin-bottom:0;
        }
        @include meta-bar-detail;
        @include mobile{
          display:block;
          // background:$lightgray;
          padding: 0;
          flex-wrap:wrap;
          font-size:15px;
          .player-card__meta-bar-details-column--shades{
            padding-left:0;
            border-top:1px solid $black;
            margin:0;
            padding:10px 0;
            border-bottom:3px solid $black;
            transition:padding 0.25s linear;
            .player-card--expanded & {
              padding:10px;
            }
           
          }
          .player-card__meta-bar-details-row--shade-value{
            width:100%;
            text-align:left !important;
            color:$darkmediumgray;
          }
          &:after{
            content:'';
            display:none;
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
          .player-card--collapsed & {
            padding-right:100px;
            @include tablet-portrait-only{
              padding-right:70px;
            }
          }
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
            padding-left:20px;
            align-items:flex-end;
            letter-spacing:0;
            @include tablet-portrait-only{
              margin-left:-40px;
            }
            .player-card__meta-bar-details-row{
              display:flex;
              align-items:center;
              text-align:right;
            }
            .label{
              font-weight: 400;
              letter-spacing: .03em;
              text-transform:uppercase;
              font-size:16px;
            }

            .shades-of-icon{
              position:relative;
              width:30px;
              margin-right:5px;
              img{
                position:relative;
                vertical-align:bottom;
                transition:opacity 0.5s linear 0.5s;
                &.hover{
                  opacity:0;
                  position:absolute;
                  top:0;
                  left:0;
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

            .player-card__meta-bar-details-row{
              &--shade-value{
                font-family: 'GT America';
                text-transform:none;
              }
            }

            @include mobile{
              // font-size:19px;
              min-width:100%;
              flex-direction:row;
              justify-content:flex-start;
              // line-height:20px;
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
          &--shade-value{
            margin-top:3px;
          }
          .label{
            font-weight:normal;
            letter-spacing: 0.03em;
          }
        }
      }
    }
  }
</style>