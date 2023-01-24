<template>
  <ul class="player-card__badges" />
</template>

<script>
export default {
  name: 'NBABadges',
  props: ['player'],
  computed: {
   
  }  
}
</script>

<style lang="scss" scoped>
.player-card{
  &__badges{
    display:flex;
    filter: grayscale(1);
    justify-content:flex-start;
    // flex:1;
    // min-width:calc(20% + 10px);
    margin-right:-5px;
    margin-left:-5px;
    list-style:none;
    transform:translateX(0);
    transition: transform 0s linear 0.125s, filter 0.375s linear 0.5s;
    margin-top:30px;
    padding-top:5px;
    .draft-grades & {
      margin-bottom:30px;
    }

    .player-card:hover & {
      .app--supports-hover & {
        filter: grayscale(0);  
      }
    }
    .player-card--expanded & {
      filter: grayscale(0);  
    }
   
    @include tablet-portrait-only{
      width:calc(100% + 4px);
      margin-left:-2px;
      margin-right:-2px;
    }
    // @include non-mobile{
    //   .player-card--collapsed & {
    //     margin-right:50px;
    //     transform:translateX(-50px);
    //   }
    // }
    @include medium-desktop {
      margin-left:-2px;
      margin-right:-2px;
    }
     @include mobile {
      justify-content:flex-start;
      filter:grayscale(1);
      padding:0 0;
      margin-left:0;
      margin-right:0;
      flex-wrap:wrap;
      margin-top:30px;
      margin-bottom:30px;
      padding-bottom:0;
      width:calc(100% + 15px);
      .player-card--collapsed & {
        margin-left:-5px;
        margin-right:-5px;
      }
      .player-card--active & {
        filter:grayscale(0);
      }
      &:after{
        content:'';
        display:block;
        position:absolute;
        bottom:0;
        left:0;
        right:0;
        height:1px;
        background:$darkmediumgray;
      }
      
    }
    .player-card__badge{
      &-label{
        line-height:1.1;
        margin-top:3px;
        font-size:15px;
        display:flex; 
        flex-direction:column;
        height:100%;
        padding-bottom:6px;
        font-family: 'GT America';
        @include player-card-body;
        margin-bottom:0;
        font-size:14px;
        line-height:1.1;
        span{
          flex:1;
          @include mobile{
            flex: 0 0 auto;
            font-size:12px;
            line-height:1.1;
          }
        }
        @include tablet-portrait-only{
          padding-bottom:0;
        }
        @include mobile {
          padding-right:5px;
        }
        // @include mobile{
        //   // padding-bottom:0;
        // }
        img{
          width:90%;
          @include tablet-portrait-only{
          
            width:60px;
          }
          @include mobile{
            margin-top:3px;
            width:100%;
      
          }
        }
        @include medium-desktop {
          font-size:14px;
        }
        @include mobile{
          font-size:13px;
        }
      }
      &-image{
        position:relative;
        width:100%;
        // padding-top:100%;
        border-radius:4px;
        background:$mediumgray;
        width:60px;
        height:60px;
        flex: 0 0 auto;
        margin-right:7.5px;
        @include mobile{
          width:100%;
          height:auto;
          margin-bottom:5px;
        }
        img{
          width:100%;
          opacity:0;
          transition:opacity 0.25s linear;
          vertical-align:bottom;
          &.isLoaded{
            opacity:1;
          }
        }
      }
    }
    li{
      position:relative;
      display: flex;
      flex-direction:row;
      align-items:flex-start;
      margin: 0 5px 0;
      // flex: 1;
      // max-width: 70px;
      width:calc(25% - 15px);
      @include mobile {
        width:calc(25% - 15px);
        align-items:space-between;
        flex-direction:column;
        .app--nba & {
          margin:0 10px 10px 0;
        }
      }

      img{
        width:50px;
      }
      @include medium-desktop {
        margin:0 2px 0;
        width:calc(25% - 4px);

      }
      @include tablet-portrait-only{
        margin:0 2px 15px;
        width:calc(25% - 4px);
        flex-direction:column;
        align-items:flex-start;
      }

      @include mobile {
        margin: 0 5px 15px;
        transition:opacity 0.25s linear;
        // width:55px;
        width:calc(25% - 10px);
        .player-card__stats-list--full & {
          margin-right:0;
        }
        .player-card--collapsed & {
          margin:0 5px 20px;
          &:nth-child(n+5) {
            opacity:0;
            .player-card--expanded &{
              opacity:1;
            }
          }
        }
        
      }
      &:hover{
        .player-card__stat-tooltip{
          transform: translateX(-50%) scale(1);
          opacity:1;
        }
      }
    }
    .player-card{
      &__stat{
        background:$white;
        border-radius: 10px;
        background-clip: padding-box;
        width:100%;
      }
      &__stat-title{
        display:block;
        border-bottom: 2px solid $lightgray;
        text-align: center;
        padding: 8px 0 4px;
        box-sizing:content-box;
        line-height:1;
        @include stat-title;
      }
      &__stat-value{
        display:block;
        margin: 10px 0;
        text-align: center;
        padding-top: 1px;
        text-align:center;
        @include stat-value;
        
      }
      &__stat-tooltip{
        position:absolute;
        bottom: calc(100% + 2.5px);
        left: 50%;
        transform: translateX(-50%) scale(0);
        width: auto;
        color: #fff!important;
        white-space: nowrap;
        word-break: keep-all;
        padding: 4px 6px 5px;
        opacity: 0;
        transition: all 125ms linear;
        text-transform: none;
        border-radius: 2px;
        background-clip: padding-box;
        @include tooltip;
        .player-card--offense & {
          background-color: $offense;
        }
        .player-card--defense & {
          background-color: $defense;
        }
        &:after{
          content: '';
          display: block;
          position: absolute;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          bottom: -5px;
          height: 10px;
          width: 10px;
          z-index: -1;
          .player-card--offense & {
            background-color: $offense;
          }
          .player-card--defense & {
            background-color: $defense;
          }
        }
      }
    }
  }
}
</style>