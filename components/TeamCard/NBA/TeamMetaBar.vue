<template>
  <div
    ref="metaBar"
    class="player-card__meta-bar team-card__meta-bar"
  >
    <div class="player-card__meta-bar-name-school team-card__meta-bar-name-school player-card__image-column team-card__image-column">
      <img
        :src="team.image.medium"
        class="team-card__meta-bar-logo"
      >
    </div>
    <div
      v-if="['mobile', 'tablet'].indexOf($mq) < 0"
      class="player-card__meta-bar-details team-card__meta-bar-details"
    >
      <TeamPicks
        v-if="['mobile', 'tablet'].indexOf($mq) < 0"
        :team="team"
      />
    <!-- <div class="player-card__meta-bar-details-column" v-if="$mq !== 'tablet'">
      <div class="player-card__meta-bar-details-row">
        <span class="label">Team Needs</span><br/>
        <span class="value">{{teamNeeds}}</span> 
      </div>
    </div> -->
    </div>
  </div>  
</template>

<script>
import TeamPicks from './TeamPicks.vue';
export default {
  name: 'NBATeamMetaBar',
  components: { TeamPicks },
  props: ['team', 'teamId'],
  emits: ['set-height'],
  computed: {
    rank() {
      return this.rankKey ? this.player[this.rankKey] + 1 : null;
    },
    teamNameLogo () {
      return this.$store.getters['content/teamNameLogo'](this.player[this.rankKey]);
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth']
    },
    hasPlayers() {
      return this.$store.getters['content/team'](this.teamId).players && this.$store.getters['content/team'](this.teamId).players.length
    },
    teamNeeds () {
      const tn = this.team.needs.map((need) => {
        return need.need
      })
      return tn.join(', ')
    }
  },
  watch: {
    viewDepth() {
      this.$emit('set-height', this.$refs.metaBar.offsetHeight);
    }
  }
}
</script>

<style lang="scss">
  .app--nba{
    .team-card{
      &__meta-bar{
        display:flex;
        align-items:stretch;
        padding:0 !important;
        background-color:$mediumgray !important;
        min-height:182px;
        @include tablet{
          min-height:175px;
        }
        &-logo{
          position:absolute;
          max-height:calc(100% - 60px);
          max-width:80%;
  
          left:50%;
          top:50%;
          transform:translate(-50%, -50%);
        }
        &-details{
          padding:0 30px;
          flex:1;
          margin-bottom:0;
          height:unset;

        }
        h3{
          margin-top:3px;
        }
        .team-card{
          &__image-column{
            min-height:182px;
          }
        }
        .player-card__meta-bar-name-school{
          @include tablet{
            display:flex;
            flex-direction:row;
            align-items:center;
            height:175px;
            width:100% !important;
          }
        }
        .player-card__meta-bar-details{
          position:relative;
          // margin-left:15px;
          overflow:hidden;
          width:100%;
          // height:100%;
          display:flex;
          align-items:center;
          &:before{
            content:'';
            display:block;
            position:absolute;
            left:0;
            top:15px;
            bottom:15px;
            width:1px;
            background:$darkmediumgray;
            @include tablet{
              
            }
          }
          @include tablet{
            &:after{
              display:none;
            }
          }
          &-column{
            padding-left:30px;
            &:after{
              left:0;
              right:auto;
            }
            @include tablet{
              padding-left:0;
              border:0;
              
            }
          }
        }
      }
  
    }
  }
</style>