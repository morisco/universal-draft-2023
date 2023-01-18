<template>
  <div
    class="player-card__image-column"
    :style="{'maxHeight': collapsed && !expanded ? 0 : maxHeight + 'px', 'minHeight' : maxHeight || collapsed ? 0 : null}"
  >
    <div
      ref="imageColumn"
      class="player-card__image-column-inner"
    > 
      <div
        class="player-card__image-column-img-wrapper"
        :style="{'maxHeight': imageHeight + 'px'}"
      > 
        <div class="player-card__image-column-img-wrapper-inner">
          <img
            :src="player.image"
            :alt="player.imageAlt"
          >
          <img
            v-if="player.imageHover"
            :src="player.imageHover"
            class="hover-image"
            :alt="player.imageAlt"
          >
          <div
            v-if="player.position_label"
            class="position"
          >
            {{ player.position_label }}
          </div>
        </div>
        <NBAMeta
          v-if="$mq !== 'mobile'"
          :player-meta="playerMeta"
        />
      </div>
      <div class="player-card__image-column-content">
        <div v-if="$mq !== 'mobile'">
          <Stats :player="fullPlayer" />
          <VideoThumb
            v-if="playerVideo"
            :play-video="playVideo"
            :video-settings="videoSettings"
            :player-video="playerVideo"
            :active-card="activeCard"
            @reset-video-settings="$emit('reset-video-settings')"
          />
          <PodcastCardPlayer
            v-if="player.player_podcast && $mq !== 'mobile'"
            :player-id="playerId"
            :player-podcast="player.player_podcast"
            :player="player"
            :info-height="topHeight"
            :podcast="player.player_podcast"
          />
          <RelatedArticles
            v-if="fullPlayer.player_articles"
            :articles="fullPlayer.player_articles"
          />
        </div>
      </div>
    </div>
    <DraftTeam
      v-if="['mock-draft', 'draft-grades'].indexOf($route.name) >= 0 && teamNameLogo && $mq === 'mobile'"
      :team-name-logo="teamNameLogo"
    />
    <div
      v-if="$mq === 'mobile'"
      class="player-card__rank"
    >
      <span>{{ rank+1 }}</span>
    </div>
  </div>
</template>

<script>
import DraftTeam from './DraftTeam'
import PodcastCardPlayer from '~/components/Podcast/NewCardPlayer'
import VideoThumb from './VideoThumb'
import RelatedArticles from './RelatedArticles'
import NBAMeta from './NBAMeta'
import Stats from './Stats'
export default {
  name: "NBAImageColumn",
  components: {DraftTeam, PodcastCardPlayer, VideoThumb, RelatedArticles, Stats, NBAMeta},
  props: ['playerId', 'collapsed', 'rank', 'infoHeight', 'rankKey', 'topHeight', 'playVideo', 'setImageColHeight', 'expanded', 'videoSettings', 'activeCard'],
  emits: ['reset-video-settings'],
  data() {
    return {
      maxHeight: false,
      imageHeight: null
    }
  },
  computed: {
    fullPlayer() {
      return  this.$store.getters['content/player'](this.playerId);
    },
    player () {
      const playerData = this.$store.getters['content/player'](this.playerId);
      return {
        position_label: playerData.position_label,
        offenseDefense: playerData.offenseDefense,
        image: playerData.image_data.image.medium,
        imageHover: playerData.image_data.imageHover && playerData.image_data.imageHover.medium,
        imageAlt: playerData.title,
        player_podcast: playerData.player_podcast !== '' ? playerData.player_podcast : false,
        drafted_team: playerData.drafted_team, 
        results_via: playerData.results_via,
        player_podcast: playerData.player_podcast !== '' ? playerData.player_podcast : false,
      }
    },
    playerMeta() {
      const playerData = this.$store.getters['content/player'](this.playerId);
      return {
        firstName: playerData.first_name,
        lastName: playerData.last_name,
        school: playerData.player_meta.school,
        position: playerData.position_label,
        year: playerData.player_meta.year,
        age: playerData.player_meta.age,
        height: playerData.player_meta.height,
        weight: playerData.player_meta.weight,
        shadesOf: playerData.player_meta.shades_of
      };
    },
    teamNameLogo () {
      return this.rankKey  === 'order_mockdraft' ?  this.$store.getters['content/teamNameLogo'](this.rank) : this.rankKey === 'order_draftresults' ? this.$store.getters['content/teamNameLogoResults'](this.player.drafted_team, this.player.results_via) : this.$store.getters['content/resultsTeamNameLogo'](this.rank);    
    },
    playerVideo() {
      return this.fullPlayer.player_video && this.fullPlayer.player_video.video_id ? this.fullPlayer.player_video : false
    }
  },
  watch:{
    expanded() {
      if(!this.$refs.imageColumn) return;
      this.setHeights();
    },
    topHeight() {
      if(!this.$refs.imageColumn) return;
      if(!this.expanded) {
        this.maxHeight = this.$mq === 'mobile' ? 250 : this.topHeight;
        this.imageHeight = this.topHeight
      } else {
        this.imageHeight = this.topHeight + 20
      }
      this.setImageColHeight(this.$refs.imageColumn.offsetHeight);
    },
    '$mq'() {
      this.setHeights();
    }
  },
  mounted () {
    if(this.$mq !== 'mobile'){
      this.imageHeight = this.topHeight
    }
  },
  methods: {
    setHeights() {
      if(this.expanded) {
        let interiorHeight = 30;
        this.$refs.imageColumn.children.forEach((child) => interiorHeight += child.offsetHeight);
        this.setImageColHeight(interiorHeight);
        this.maxHeight = this.$mq === 'mobile' ? 250 : interiorHeight;
        if(this.$mq !== 'mobile'){
          this.imageHeight = this.topHeight + 20
        }
      } else {
        this.maxHeight = this.$mq === 'mobile' ? 250 : this.topHeight;
        if(this.$mq !== 'mobile'){
          this.imageHeight = this.topHeight
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .player-card{   
    &__image-column{
      display:flex;
      flex-direction:column;
      position:relative;
      padding:0 0 0;  
      width:300px;
      min-width:300px;
      flex:0 0 auto;
      transition:opacity 0.25s linear 0.25s, max-width 0.625s ease-in-out 0s, max-height 0.25s ease-in-out 0.25s, min-height 0.5s linear 0s;
      z-index:2;
      padding-right:30px;
      padding-left:30px;
      opacity:1;
      
      @include mobile {
        padding-top:0;
        padding-right:0;
        padding-left:0;
        width:100%;
        max-width:100%;
        min-height:250px;
        min-width:0;
        &:before{
          content:'';
          display:block;
          background:$black;
          height:3px;
          bottom:0;
          left:0;
          right:0;
        }
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
      @include mobile {
        .player-card--collapsed & {
          opacity:0;
        }
        .player-card--collapsed.player-card--expanded & {
          opacity:1;
          transition:opacity 0.25s linear 0.75s;
        }
      }
      // .player-card--collapsed & {
      //   transition:max-width 0.25s ease-in-out 0s;
      // }

      .draft-team{
        opacity:1;
        top:0 !important;
        right:-20px;
        left:auto;
        background-color:transparent;
            color:$darkgray;
        &:hover{
          background-color:$mediumgray;
        }
      }
      &-content{
        // display:none;
        // .player-card--expanded & {
        //   display:block;
        // }
        position:relative;
        padding-top:0;
        transition:padding-top 0.125s linear 0.5s, opacity 0.125s linear 0s;
        opacity:0;
        .player-card--expanded & {
          transition:all 0.125s linear 0.125s;
          padding-top:60px;
          opacity:1;
        }
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
        padding:0 0 0;
        // background:$black;  
        // background-size: 20px;
        // background-position: center top;
        border-radius: .625rem  0 0 .625rem;
        // overflow:hidden;
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
        box-sizing:content-box;
        border-bottom:1px solid $darkmediumgray;
        transition:max-height 0.125s linear 0.175s;
        .position{
          position:absolute;
          bottom:60px;
          left:0;
          padding:0 10px;
          color:white;
          background:black;
          display:flex;
          align-items:center;
          height:28px;
          font-family: 'GT America Condensed';
          font-size:14px;
          font-weight:500;
          text-transform:uppercase;
          padding-top:3px;
          transition: bottom 0.125s linear 0.175s;
          .player-card--expanded & {
            bottom:0;
          }
        }
        &-inner{
          position:absolute;
          top:0;
          left:0;
          right:0;
          bottom:30px;
          overflow:hidden;
          transition:bottom 0.125s linear 0s;
          .player-card--expanded & {
            bottom:0;
            transition:bottom 0.125s linear 0.125s;
          }
          @include mobile{
            bottom:0;
          }
        }
        &:before{
          content:'';
          display:block;
          position:absolute;
          top:40px;
          left:0;
          right:0;
          background:url('~assets/img/nba/squiggle-pattern-black.svg');
          background-size:auto 29px;
          background-position:center top;
          bottom:30px;
          transition:bottom 0.25s linear 0s;
          @include mobile{
            bottom:0;
          }
          .player-card--expanded & {
            bottom:0;
            transition:bottom 0.25s linear 0.125s;
          }
          @include mobile {
            top:20px;
          }
        }
        @include mobile {
          max-height:250px !important;
          border-bottom:0;
        }
      }
      &-img-wrapper img{
        position:absolute;
        top:0;
        width:100%;
        left:50%;
        transform:translateX(-50%);
        opacity:0;
        transition:opacity 0.25s linear 0.5s, filter 0.25s linear;
        filter: grayscale(100%);
        .player-card--active & {
          filter: grayscale(0%);
        }
        &.isLoaded {
          opacity:1;
        }
        &.hover-image{
          position:absolute;
          opacity:0;
        }
        .player-card:hover &,
        .player-card--expanded & {
          &.hover-image{
            opacity:1 !important;
          }
        }
        .player-card--active & {
          @include mobile{
           &.hover-image{
              opacity:1 !important;
            } 
          }
        }
        &:not(.player-x-o){
          top:20px;
          @include mobile{
            // max-width:300px;
            top:0;
            left:50%;
            transform:translateX(-50%);
          }
        }
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
        // margin-top:5px;
        padding:0 0 3px;
      }
      @include non-mobile{
        // .player-card--collapsed & {
        //   top:35px;
        //   transition:top 0.5s linear 0.125s;
        // }
      }
      @include mobile{
        top:10px;
        left:0;
        transform:translateX(-25%);
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
</style>