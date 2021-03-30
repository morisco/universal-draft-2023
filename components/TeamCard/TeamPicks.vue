<template>
  <div class="team-card__picks">
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
      @include mobile{
        padding:30px 20px 0;
      }
    }
    &__pick{
      display:flex;
      align-items:center;
      margin-bottom:15px;
      &-label{
        p{
          font-size:14px;
          line-height:16px;
          margin:0;
        }
        max-width:175px;
      }
      &-number{
        height:60px;
        width:60px;
        flex: 0 0 auto;
        position: relative;
        display: inline-block;
        margin: 0;
        text-align: center;
        padding-top: 1px;
        text-align: center;
        @include stat-value;
        background: #D1D1D1;
        border-radius: 4px;
        margin-right:10px;
        span{
          position: absolute;
          padding-top: 3px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
</style>