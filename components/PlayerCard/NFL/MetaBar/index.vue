<template>
  <div
    ref="metaBar"
    class="player-card__meta-bar"
  >
    <div
      v-if="rank"
      class="player-card__meta-bar-rank"
    >
      <span>{{ rank }}</span>
    </div>
    <DraftTeam
      v-if="['mock-draft', 'draft-grades'].indexOf($route.name) >= 0 && teamNameLogo && (collapsed || $mq !== 'mobile')"
      :team-name-logo="teamNameLogo"
    />
    <Trend
      v-if="player.player_updates"
      :trend="player.player_updates.rank_movement"
    />
    <div class="player-card__meta-bar-name-school player-card__image-column">
      <h3>
        <span>{{ playerMeta.firstName }}</span>
        <span>{{ playerMeta.lastName }}</span>
      </h3>
      <div
        v-if="$mq === 'mobile'"
        class="player-card__meta-bar-position-school"
      >
        <span class="position">{{ playerMeta.position }}</span>
        <span class="separator" />
        <span class="school">{{ playerMeta.school }}</span>
      </div>
    </div>
    <div
      v-if="$mq !== 'mobile'"
      class="player-card__meta-bar-details"
    >
      <div
        v-if="$mq !== 'mobile'"
        class="player-card__meta-bar-position-school"
      >
        <span class="position">{{ playerMeta.position }}</span>
        <span class="separator" />
        <span class="school">{{ playerMeta.school }}</span>
      </div>
      <template v-if="['mock-draft', 'mock_draft_player_share', 'draft-grades', 'draft_results_player_share'].indexOf($route.name) === -1">
        <LetterTrigger
          v-if="playerMeta.fanLetter && $mq !== 'mobile'"
          :expanded="expanded"
          @show-letter="showLetter"
        />
      </template>
    </div>  
  </div>
</template>

<script>
import DraftTeam from '~/components/PlayerCard/NFL/DraftTeam'
import Trend from '~/components/PlayerCard/NFL/Trend'
import LetterTrigger from '../LetterTrigger';
export default {
  name: 'NFLMetaBar',
  components: {DraftTeam, Trend, LetterTrigger},
  props: ['player', 'rankKey', 'collapsed', 'expanded', 'rankOverride'],
  emits: ['set-height', 'show-letter'],
  computed: {
    rank() {
      const map = {
        order: 'bigBoard',
        order_mockdraft: 'mockDraft',
        order_draftresults: 'draftResults'
      };
      const baseZero = this.$store.getters['content/baseZeroSettings'][map[this.rankKey]];
      return this.rankOverride ? this.rankOverride : this.rankKey ? this.player[this.rankKey] + (baseZero ? 1 : 0) : null;
    },
    teamNameLogo () {
      const map = {
        order: 'bigBoard',
        order_mockdraft: 'mockDraft',
        order_draftresults: 'draftResults'
      };
      const baseZero = this.$store.getters['content/baseZeroSettings'][map[this.rankKey]];
      if(this.rankKey === 'order_draftresults') {
        return this.$store.getters['content/teamNameLogoResults'](this.player.drafted_team, this.player.results_via);
      }
      return this.$store.getters['content/teamNameLogo'](baseZero ? this.player[this.rankKey] : this.player[this.rankKey] - 1);
    },
    playerMeta() {
      let playerData = this.player;
      return {
        firstName: playerData.first_name,
        lastName: playerData.last_name,
        school: playerData.player_meta.school,
        position: this.$store.getters['content/playerPosition'](playerData.position),
        year: playerData.player_meta.year,
        age: playerData.player_meta.age,
        height: playerData.player_meta.height,
        weight: playerData.player_meta.weight,
        shadesOf: playerData.player_meta.shades_of,
        fanLetter: playerData.fan_letter
      };
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth']
    },
  },
  watch: {
    viewDepth() {
      this.$emit('set-height',this.$refs.metaBar.offsetHeight);
    }
  },
  mounted() {
    this.$emit('set-height',this.$refs.metaBar.offsetHeight);
  },
  methods: {
    showLetter(showLetter) {
      this.$emit('show-letter', showLetter);
    },
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
    flex: 0 0 auto;
    z-index:2;
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
            // padding: 0 15px;
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
      left:auto;
      width:75px;
      height:75px;
      opacity: 1;
      top:50%;
      transform:translateY(-50%);
      background: transparent !important;
      transition:all 0.25s linear 0s;
      transition:all 0.25s linear 0s;
      img {
        max-height:90%;
      }
      
      @include tablet-portrait-only{
        top:3px;
        transform:none;
      }
      @include mobile{
        transform: translate(0);
        right:auto;
        top: 40px !important;
        left:8px;
        width: 30px;
        height: 30px;
        background: $mediumgray !important;
        .player-card--expanded &{
          opacity:0;
          transition:opacity 0.25s linear;
        }
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
      min-width:300px;
      margin-right:30px;
      @include mobile{
        min-width:0;
        margin-right:0;
      }
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
          .player-card:hover
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
      display:flex;
      align-items:center;

      .separator{
        height:20px;
        width:1px;
        background-color:black;
        margin:0 5px;
        transition: background-color 0.25s linear 0.5s;
        transform:translateY(-1px);
        // @include mobile{
        //   background-color: white;
        // }
        .player-card:hover &,
        .player-card--expanded & {
          background-color:white;
        }
      }
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
      padding: 0 0 !important;
      display:flex;
      align-items:center;
      font-size:15px;
      .player-card--collapsed & {
        .mock-draft &,
        .draft-grades & {
          // padding-right:40px;
        }
      }
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
          margin-top:17px;
          .player-card--collapsed & {
            display:none;
          }
        }
      }
      &-column{
        position:relative;
        min-width:160px;
        // padding:0 15px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        &:last-of-type{
          &:after{
            display:none;
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
          line-height:1;
          // padding-left:50px;
          flex:1;
          @include tablet-portrait-only{
            margin-left:-40px;
          }

          .label{
            font-size:16px;
            line-height:1.15;
          }
          .player-card__meta-bar-details-row--shade-value{
            font-size:16px;
            line-height:1.15;
          }
          

          .shades-of-icon{
            position:absolute;
            top:0;
            // left:15px;
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
            margin:15px 0 10px;
            padding-left:35px;
            flex-wrap:wrap;
            @include mobile{
              padding-left:0;
              margin-top:0;
            }
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
          // &:after{
          //   display:none;
          // }
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