<template>
<div class="player-card__meta-bar team-card__meta-bar" ref="metaBar">
  <div class="player-card__meta-bar-name-school player-card__image-column">
    <img :src="team.image.medium" class="team-card__meta-bar-logo" />
  </div>
  <div class="player-card__meta-bar-details" v-if="['mobile', 'tablet'].indexOf($mq) < 0">
    <TeamPlayers :teamId="teamId" v-if="['mobile', 'tablet'].indexOf($mq) < 0" :maxPlayers="3" />
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
import TeamPlayers from './TeamPlayers';
export default {
  name: 'TeamMetaBar',
  componetns: {TeamPlayers},
  props: ['team', 'teamId'],
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
      this.$emit('setHeight',this.$refs.metaBar.offsetHeight);
    }
  }
}
</script>

<style lang="scss">
  @import '~/components/PlayerCard/NFL/MetaBar/style.scss';
  .team-card{
    &__meta-bar{
      padding:0 !important;
      background-color:$mediumgray !important;
      min-height:200px;
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
        padding-left:45px;
      }
      h3{
        margin-top:3px;
      }
      .player-card__meta-bar-details{
        margin-bottom:0;
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
        margin-left:15px;
        overflow:hidden;
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
</style>