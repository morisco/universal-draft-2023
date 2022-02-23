<template>
  <div class="team-card__team-meta">
    <div class="team-card__team-meta-logo">
      <img
        :src="team.image.small"
        :alt="team.title + 'logo'"
      >
    </div>
    <div class="team-card__team-meta-name-picks">
      <h3>{{ team.title }}</h3> 
      <div class="team-card__team-meta-picks-needs">
        <div class="team-card__team-picks">
          <div class="team-card__team-pick team-card__team-pick--headline">
            <span class="team-card__team-pick-left">Top Picks</span>
            <span class="team-card__team-pick-right">How they acquired it</span>
          </div>
          <div
            v-for="pick in team.picks"
            :key="team.title + pick.number"
            class="team-card__team-pick"
          >
            <span class="team-card__team-pick-left">{{ pick.number }}</span>
            <span
              class="team-card__team-pick-right"
              v-html="pick.how"
            />
          </div>
        </div>
        <div class="team-card__team-needs">
          <div class="team-card__team-needs-headline">
            Team Needs
          </div>
          <ul class="team-card__team-needs-list">
            <li
              v-for="(need, index) in team.needs"
              :key="team.title + 'need' + index"
            >
              {{ need.need }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NBATeamMeta",
  props: ['team']
}
</script>

<style lang="scss" scoped>
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
  .team-card{
    &__image-column{
      display:flex;
      flex-direction:column;
      position:relative;
      padding:0 0 0;  
      // max-width: calc(100% - 800px);
      width:300px;
      min-width:300px;
      flex:0 0 auto;
      transition:opacity 0.25s linear 0.25s, max-width 0.625s ease-in-out 0s, max-height 0.25s ease-in-out 0.25s, min-height 0.5s linear 0s;
      z-index:2;
      opacity:1;
    
      // @include tablet-portrait-only{
      //   max-width:17.5%;
      // }
      
      @include mobile {
        padding-top:0;
        width:100%;
        max-width:100%;
        min-height:250px;
        background:white;
      }

      .player-card--transitioning &,
      .player-card--collapsed:not(.player-card--expanded) & {
        // transition:opacity 0.25s linear;
        @include mobile {
          min-height:0;
          overflow:hidden;
          transition:all 0s linear;
        }
      }
      // .player-card--collapsed & {
      //   transition:max-width 0.25s ease-in-out 0s;
      // }
      &-content{
        // display:none;
        // .player-card--expanded & {
        //   display:block;
        // }
        position:relative;
        
        @include mobile{
          position:absolute;
          width:100%;
          top: 0 !important;
          transform:translateY(-100%);
        }
      }
      &-inner{
        position:relative;
        flex:1;
        width:100%;
        // width:calc(100% - 40px); 
        // border-right:1px solid $darkmediumgray;
        padding:0 30px 0;
        // background:$black;  
        // background-size: 20px;
        // background-position: center top;
        border-radius: .625rem  0 0 .625rem;
        overflow:hidden;
        transition:padding-bottom 0.125s linear 0.25s;
        @include tablet-portrait-only{
          padding:0 20px 30px;
        }
        @include mobile{
          padding:0;
        }
        .player-card--expanded & {
          padding-bottom:30px;
          @include mobile{
            padding:0;
          }
        }
        .player-x-o{
          margin: 0 auto;
          z-index: -1;
          right: auto;
          width: auto;
          height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          max-height:220px;
          opacity:1;
          @include mobile {
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            height: 100%;
            max-height: 100%;
          }
        }
      
        // .player-card--offense &{
        //   background-image: url('~@/assets/img/icons/offense-o.svg');
        // }
        // .player-card--defense & {
        //   background-image: url('~@/assets/img/icons/defense-x.svg');
        // }
      }
      @include non-mobile{
        // .player-card--collapsed &{
        //   max-width: 15.5%;
        // }
        .player-card--expanded & {
          max-width: calc(100% - 800px);
        }
      }
      @include tablet{
        .player-card--expanded & {
          max-width:17.5%;
        }
      }
      @include mobile {
        .player-card--expanded & {
          max-width:100%;
        }
      }
      &-img-wrapper{
        position:relative;
        height:500px;
        width:100%;
        overflow:hidden;
        box-sizing:content-box;
        border-bottom:1px solid $darkmediumgray;
        @include mobile {
          max-height:250px !important;
          border-bottom:0;
        }
      }
      &-img-wrapper img{
        position:absolute;
        top:0;
        width:100%;
        opacity:0;
        transition:opacity 0.25s linear 0.1s;
        &:not(.player-x-o){
          top:20px;
          @include mobile{
            max-width:300px;
            top:0;
            left:50%;
            transform:translateX(-50%);
          }
        }
      }
      &-img-wrapper img.isLoaded {
        opacity:1;
      }
    }
    &__rank{
      @include card-rank;
      position:absolute;
      background:$black;
      color:$white;
      top: 15px;
      right: -25px;
      width: 50px;
      height: 50px;
      display:flex;
      justify-content:center;
      align-items:center;
      border-radius:100%;
      transition:top 0.5s linear 0.125s;
      span{
        display:block;
        margin-top:5px;
      }
      @include non-mobile{
        // .player-card--collapsed & {
        //   top:35px;
        //   transition:top 0.5s linear 0.125s;
        // }
      }
      @include mobile{
        top:15px;
        left:50%;
        margin-left:-135px;
        right:auto;
        .player-card--collapsed & {
          opacity:0;
        }
        .player-card--collapsed.player-card--expanded & {
          opacity:1;
          transition:opacity 0.25s linear 0.75s;
        }
        span{
          padding-top:1px;
        }
      }
    }
  }
  .team-card{
    // max-height:313px;
    &__info-column{
      position:relative;
      flex:1;
      opacity:1;
      overflow-x:visible;
      overflow-y:hidden;
      &--animate{
        transition:max-height 0.5s ease-out, max-width 0s linear 0.125s;
        @include mobile { 
          transition:max-height 0.5s linear, max-width 0s linear 0.125s;
          .player-card--expanded & {
            transition:max-height 0.5s ease-out, max-width 0s linear 0.125s;
          }
        }
      }
      // max-height:313px;
      @include tablet-portrait-only{
        // max-width:87.5%;
      }
      @include mobile {
        width:100%;
        max-width:100%;
        background:white;
        // padding-bottom:30px;
        .player-card--collapsed &{
          // padding-bottom:15px;
          border-radius:0.625rem;
          .player-card--expanded & {
            padding-bottom:0;
          }
        }
      }
      @include non-mobile{
        .player-card--collapsed &{
          max-width:84.5%;
          transition:all 0.25s ease-in-out 0.125s, max-height 0.25s ease-in-out 0.125s;
        }
        .player-card--transitioning & {
          transition:all 0.5s ease-in-out 0.125s, max-height 0.2s ease-in-out 0s;
          .team-card__top-data,
          .team-card__bottom-data{
            -webkit-animation: infoColumn-collapse 0.75s 1 linear;
              animation: infoColumn-collapse 0.75s 1 linear;
          }
        }
      }
    }
    &__meta-column{
      display:flex;
      flex-direction:column;
      flex:1;
    }
    &__top-data{
      position:relative;
      z-index:0;
      display:flex;
      flex-direction:column;
      justify-content:center;
      padding:30px 30px 30px;
      min-height:255px;
      // .player-card--collapsed & {
      //   min-height:0;
      // }
      @include tablet-portrait-only{
        padding: 30px 20px 30px;
      }
      @include mobile {
        padding:0;
        flex-direction:column;
        border-radius: 0 0 0.625rem 0.625rem;
        min-height:0;
        overflow:hidden;
      }
    }
    &__meta-stats{
      display:flex;
      justify-content:space-between;
      width:100%;
      @include mobile {
        flex-direction:column;
      }
    }
    &__bottom-data{
      position:relative;
      z-index:1;
      overflow-x:hidden;
      
      > *{
        opacity:0;
        transition:opacity 0.25s linear 0s;
      }
      .player-card--expanded & {
        margin-top:0;
        > *{
          opacity:1;
          transition:opacity 0.25s linear 0.5s;
        }
      }
      @include non-mobile{
        padding:0 30px;
      }
      @include tablet-portrait-only{
        padding:0 20px;
      }

      @include mobile{
        background:$lightgray;
        padding-top:0;
        padding-bottom:40px;
        border-radius:0 0 0.625rem 0.625rem;
        .player-card--expanded & {
          margin-top:-15px;
        }
        // padding-top:0.625rem;
        // .mock-draft & {
        //   padding-top:0;
        // }
        &-extended{
          padding:0 20px;
          margin-top:30px;
          &:before{
            content:'';
            display:block;
            width:100%;
            height:1px;
            background:#bdbdbd;
            margin-bottom:30px;
          }
        }
      }
    }
  }

  @keyframes infoColumn-collapse {
    0% {
      opacity: 1; 
    } 20%, 80% {
      opacity: 0; 
    } 100% {
      opacity: 1; 
    }
  }
</style>