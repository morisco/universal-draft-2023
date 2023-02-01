<template>
  <div class="draft-info">
    <span class="draft-info__name">{{ teamNameLogo.teamName }} <span
      v-if="grade"
      class="grade"
    > {{ grade }}</span></span>
    <div
      class="draft-info__content"
      v-html="infoText"
    />
  </div>
</template>

<script>
export default {
  name: "NFLDraftInfo",
  props: ['teamNameLogo', 'infoText', 'grade'],
}
</script>

<style lang="scss">
  .app--nfl {
    .draft-info {
      &__content{
        p{
          @include player-card-body;
          &:last-of-type{
            margin-bottom:0;
          }
          a{
            text-decoration:underline;
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .draft-info{
    // position:absolute;
    // border:1px solid $darkmediumgray;
    // right:0;
    // left:0;
    transition: all 0.375s linear 0.125s, opacity 0.25s linear 0s, visibility 0s linear 0.25s, margin-top 0.5s ease-in-out 0.25s;
    margin-top:0;
    position:relative;
    z-index:0;
    // opacity:0;
    z-index:0;
    color:$black;
    // visibility:hidden;

    
    
    @include mobile{
      background:$lightgray;
      padding:30px 20px 30px;
      // margin-top:-20px;
      .player-card--expanded{
        padding:30px 20px 20px;
      }
    }
    &__name{
      font-weight:500;
      text-transform:uppercase;
      margin-bottom:12px;
      display:block;
      @include expanded-label;
      display:flex;
      align-items:center;
      .grade{
        padding:6px 8px 4px;
        margin-left:10px;
        margin-bottom:2px;
        border-radius: 4px;
        background:$highlight2;
        display:flex;
        justify-content:center;
        align-items:center;
        color:white;
      }
    }
    &__content{
      @include player-card-body;
      margin-bottom:0;
      p{
        @include player-card-body;
        strong{
          font-weight:500;
        }
        &:last-of-type{
          margin-bottom:0;
        }
      }
      @include non-mobile{
        max-width:85%;
      }
    }

    // .player-card--collapsed & {
    //   opacity:0;
    //   transition: opacity 0.375s linear 0s;
    // }
    // .player-card--transitioning & {
    //   opacity:1;
    //   // transition: opacity 0.125s linear 0s;
    // }

    .player-card--expanded & {
      // visibility:visible;
      // opacity:1;
      // margin-top:-25px;
      transition: opacity 0.125s linear 0.375s, margin-top 0.5s ease-in-out;
    }

    .player-card--expanded.player-card--collapsed & {
      transition: opacity 0.125s linear 1s;
    }
    // .player-card--collapsed.player-card--expanded & {
    //     transition: opacity 0.125s linear 1s;
    //   }
  }
</style>