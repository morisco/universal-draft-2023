<template>
  <div class="team-card__team-meta">
    <div class="team-card__team-meta-logo">
      <img :src="team.image.small" :alt="team.title + 'logo'" />
    </div>
    <div class="team-card__team-meta-name-picks">
      <h3>{{team.title}}</h3> 
      <div class="team-card__team-meta-picks-needs">
        <div class="team-card__team-picks">
          <div class="team-card__team-pick team-card__team-pick--headline">
            <span class="team-card__team-pick-left">Top Picks</span>
            <span class="team-card__team-pick-right">How they acquired it</span>
          </div>
          <div class="team-card__team-pick" v-for="pick in team.picks" :key="team.title + pick.number">
            <span class="team-card__team-pick-left">{{pick.number}}</span>
            <span class="team-card__team-pick-right" v-html="pick.how"></span>
          </div>
        </div>
        <div class="team-card__team-needs">
          <div class="team-card__team-needs-headline">Team Needs</div>
          <ul class="team-card__team-needs-list">
            <li v-for="(need, index) in team.needs" :key="team.title + 'need' + index">
              {{need.need}}
            </li>
          </ul>
        </div>
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
    &__team-meta{
      display:flex;
      width:100%;
      @include mobile{
        flex-direction:column;
      }
    }
    &__team-meta-logo{
      width:140px;
      max-width:20%;
      flex:0 0 auto;
      img{
        width:100%;
        margin-top:-0px;
      }
      @include tablet-portrait-only{
        width:75px;
      }
      @include mobile{
        max-width:100%;
        width:40px;
        margin-bottom:10px;
      }
    }
    &__team-meta-name-picks{
      flex: 1;
      padding-left:30px;
      width:100%;
      @include mobile{
        padding-left:0;
      }
    }
    &__team-meta-picks-needs{
      display:flex;
      margin-top:25px;
      margin-bottom:25px;
      @include mobile{
        flex-direction:column;
      }
    }
    &__team-picks{
      flex:1;

    }
    &__team-needs{
      width:200px;
      @include mobile{
        widtH:100%;
        margin-top:15px;
      }
      &-headline{
        @include mobile-nav-label;
      }
      ul{
        list-style:disc;
        list-style-position:inside;
      }
    }
    &__team-pick{
      display:flex;
      align-items:flex-start;
      margin-bottom:10px;
      p{
        margin-bottom:0;
        font-size:16px;
        line-height:0.9;
      }
      
      span{
        display:block;
      }
      &-left{
        width:90px;
        flex:0 0 auto;
        font-weight:700;
        line-height:1;
        @include tablet-portrait-only{
          width:80px
        }

      }
      &-right{
        flex:1;
        margin-bottom:0;
      }
      &--headline{
        margin-bottom:5px;
        span{
          display:block;
          @include mobile-nav-label;
          margin-bottom:5px;
          text-transform:uppercase;
        }
      }
    }
  }
</style>