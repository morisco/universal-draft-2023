<template>
  <div class="team-card__picks">
    <h5>Top Picks</h5>
    <div class="team-card__picks-grid">
      <div
        v-for="(pick, index) in team.picks"
        :key="team.title + 'pick' + index"
        class="team-card__pick"
      >
        <div class="team-card__pick-number">
          <span>{{ pick.number }}</span>
        </div>
        <div
          class="team-card__pick-label"
          v-html="pick.how"
        />
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: "NBATeamPicks",
  props: ['team']
}
</script>

<style lang="scss" scoped>
  .team-card{
    &__picks{
      width:100%;
      // height:100%;
      padding:30px 0;
      @include mobile{
        margin-top:0;
      }
      h5{
        margin:0 0 5px !important;
        text-transform:uppercase;
        @include mobile{
          margin:0 0 10px !important;
        }
      }
      @include mobile{
        padding:10px 0 0;
        margin-bottom:15px;
      }
      &-grid{
        display:grid;
        grid-gap: 15px;
        grid-template-columns: 1fr 1fr;
        flex-wrap:wrap;
        @include mobile{
          grid-template-columns: 1fr;
          flex-direction:column;
        }
      }
    }
    &__pick{
      display:flex;
      align-items:center;
      flex-basis:50%;
      &-label{
        padding-right:30px;
        // max-width:175px;
        @include tablet{
          max-width:100%;
        }
      }
      &-number{
        height:50px;
        width:50px;
        flex: 0 0 auto;
        position: relative;
        display: inline-block;
        margin: 0;
        text-align: center;
        padding-top: 1px;
        text-align: center;
        @include stat-value;
        background: #FFF;
        border-radius: 4px;
        margin-right:15px;
        span{
          position: absolute;
          padding-bottom: 2px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
</style>

<style lang="scss">
.team-card{
  &__pick{
    &-label{
      p{
        font-size:14px;
        line-height:16px;
        margin:0;
      }    
    }
  }
}
</style>
