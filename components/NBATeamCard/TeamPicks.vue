<template>
  <div class="team-card__picks">
    <h5>Draft Picks</h5>
    <div v-for="(pick, index) in team.picks" :key="team.title + 'pick' + index" class="team-card__pick">
      <div class="team-card__pick-number">
        <span>{{pick.number}}</span>
      </div>
      <div class="team-card__pick-label" v-html="pick.how">
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props: ['team']
}
</script>

<style lang="scss">
  .team-card{
    &__picks{
      margin-bottom:30px;
      h5{
        margin:30px 0 10px !important;
        text-transform:uppercase;
      }
      @include mobile{
        padding:10px 0 0;
        margin-bottom:15px;
      }
    }
    &__pick{
      display:flex;
      align-items:center;
      margin-bottom:15px;
      &:last-of-type{
        margin-bottom:0;
      }
      &-label{
        p{
          font-size:14px;
          line-height:16px;
          margin:0;
        }
        max-width:175px;
        @include tablet{
          max-width:100%;
        }
      }
      &-number{
        height:45px;
        width:45px;
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
        margin-right:10px;
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