<template>
  <div 
    class="player-card__info-column" 
    :class="{
      'player-card__info-column--expanded': expanded,
      'player-card__info-column--mounted': mounted,
      'player-card__info-column--animate': animateHeight
    }"
    :style="[maxHeight] ? {maxHeight: maxHeight + 'px'}: []"
  >
    <!-- <div class="player-card__info-rule" v-bind:style="[ruleHeight] ? {maxHeight: (ruleHeight) + 'px', top: ruleTop + 'px'}: []" v-if="$mq !== 'mobile'"/> -->
    <div
      ref="topData"
      class="player-card__top-data"
    >
      <MetaBar
        v-if="$mq === 'mobile'"
        ref="metaBar"
        :player="player"
        :rank-key="rankKey"
        :collapsed="collapsed"
        :expanded="expanded"
        @set-height="setMetaHeight"
      />
      <template v-if="['mock-draft', 'mock_draft_player_share', 'draft-grades', 'draft_results_player_share'].indexOf($route.name) >= 0">
        <div ref="peruseContent">
          <DraftInfo
            v-if="teamNameLogo"
            :team-name-logo="teamNameLogo"
            :info-text="['mock-draft', 'mock_draft_player_share'].indexOf($route.name) >= 0 ? player.mock_insight : player.results_insight"
            :grade="['draft-grades', 'draft_grades_player_share'].indexOf($route.name) >= 0 ? player.results_grade : null"
          />
        </div>
      </template>
      <template v-if="['mock-draft', 'mock_draft_player_share', 'draft-grades', 'draft_results_player_share'].indexOf($route.name) === -1">
        <transition
          name="player-card__info-column-mobile-expand"
          duration="5000"
        >
          <div
            v-if="expanded && $mq === 'mobile'"
            class="player-card__info-column-mobile-expand"
          >
            <NBAMeta :player-meta="playerMeta" />
            <Stats :player="player" />
          </div>
        </transition>
        <div
          ref="peruseContent"
          class="player-card__peruse-content"
        >
          <Headline
            :headline="player.player_description"
            :selling="player.player_meta.main_selling_point"
            :player="player"
            :player-meta="playerMeta"
          />
          <Badges
            v-if="player.badges && player.badges.length > 0 && $mq !== 'mobile'"
            :player="player"
          />
        </div>
      </template>
    </div>
    <div
      ref="bottomData"
      class="player-card__bottom-data"
    >
      <template v-if="['mock-draft', 'mock_draft_player_share', 'draft-grades', 'draft_results_player_share'].indexOf($route.name) >= 0">
        <Stats
          v-if="$mq === 'mobile'"
          :player="player"
        />
        <NBAMeta
          v-if="$mq === 'mobile'"
          :player-meta="playerMeta"
        />
        <Headline
          v-if="$mq !== 'mobile'"
          :headline="player.player_description"
          :selling="player.player_meta.main_selling_point"
          :player-meta="playerMeta"
          :player="player"
        />
        <Badges
          v-if="player.badges && player.badges.length > 0 && $mq !== 'mobile'"
          :player="player"
        />
        <Headline
          v-if="$mq === 'mobile'"
          :headline="player.player_description"
          :selling="player.player_meta.main_selling_point"
          :player-meta="playerMeta"
          :player="player"
        />
      </template>
      <Badges
        v-if="player.badges && player.badges.length > 0 && $mq === 'mobile'"
        :player="player"
      />
      <ExpandedMeta
        v-if="player.pluses_minuses"
        :player="player"
      />
      <div
        v-if="$mq === 'mobile' && (playerVideo || player.player_podcast || player.player_articles)"
        class="player-card__bottom-data-extended"
      >
        <VideoThumb
          v-if="playerVideo"
          :play-video="playVideo"
          :player-video="playerVideo"
          :expanded="expanded"
          :active-card="activeCard"
        />
        <PodcastCardPlayer
          v-if="player.player_podcast"
          :player-id="playerId"
          :player-podcast="player.player_podcast"
          :player="player"
          :info-height="topHeight"
          :podcast="player.player_podcast"
        />
        <RelatedArticles
          v-if="player.player_articles"
          :articles="player.player_articles"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Stats from './Stats';
import Badges from './Badges';
import Headline from './Headline';
import ExpandedMeta from './ExpandedMeta';
import MetaBar from './MetaBar';
import VideoThumb from './VideoThumb'
import DraftInfo from './DraftInfo'
import RelatedArticles from './RelatedArticles'
import NBAMeta from './NBAMeta'
import PodcastCardPlayer from '~/components/Podcast/NewCardPlayer'

export default {
  name: "NBAInfoColumn",
  components: { Stats, Headline, ExpandedMeta, Badges, MetaBar, PodcastCardPlayer, VideoThumb, RelatedArticles, DraftInfo, NBAMeta },
  props: ['playerId', 'expanded', 'collapsed', 'setMaxHeight', 'setAnimateHeight', 'rankKey', 'playVideo', 'activeCard'],
  emits: ['set-top-height','set-info-height','set-meta-height'],
  data () {
    return {
      mounted: false,
      windowSize: null,
      topHeight: null,
      maxHeight: null,
      animateHeight: false,
      ruleHeight: null,
      ruleTop: null
    }
  },
  computed: {
    player () {
      return this.$store.getters['content/player'](this.playerId);
    },
    playerVideo() {
      return this.player.player_video && this.player.player_video.video_id ? this.player.player_video : false
    },
    teamNameLogo () {
      return this.rankKey  === 'order_mockdraft' ?  this.$store.getters['content/teamNameLogo'](this.player[this.rankKey]) : this.rankKey === 'order_draftresults' ? this.$store.getters['content/teamNameLogoResults'](this.player.drafted_team, this.player.results_via) : this.$store.getters['content/resultsTeamNameLogo'](this.rank);    
    },
    viewDepth () {
      return this.$store.getters['viewOptions/depth'];
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
        shadesOf: playerData.player_meta.shades_of,
        player_podcast: playerData.player_podcast !== '' ? playerData.player_podcast : false,
      };
    },
  },
  watch : {
    viewDepth(newDepth) {
      this.setHeights();
    },
    collapsed(newCollapsed) {
      let interiorHeight = this.$mq === 'mobile' ? 0 : 60;
      this.$refs.topData.children.forEach((child) => interiorHeight += child.offsetHeight);
      this.topHeight = Math.max(255, interiorHeight);
      this.setHeights();
    },
    expanded(newExpanded) {
      this.setHeights();
    },
    topHeight(newTopHeight, oldTopHeight) {
      if(newTopHeight !== this.maxHeight){
        this.setHeights();
      }
    },
    mounted(newMounted) {
      this.topHeight = this.$refs.topData.offsetHeight
      this.setHeights();
    },
    '$mq'() {
      const self = this;
      setTimeout(() => {
        self.topHeight = this.$refs.topData.offsetHeight
        self.setHeights();
      }, 500);
    }
  },
  mounted() {
    const self = this;
    this.ruleHeight = this.$refs.peruseContent ? this.$refs.peruseContent.offsetHeight - 2 : 0
    this.ruleTop = this.$refs.peruseContent ? this.$refs.peruseContent.offsetTop + 2 : 0
    setTimeout(() => {
      self.mounted = true;
    }, 500);
    window.addEventListener('resize', this.windowResized);
  },
  unmounted(){
    window.removeEventListener('resize', this.windowResized);
  },
  methods: {
    windowResized () {
      this.setHeights();
    },
    setMetaHeight(height) {
      this.$emit('set-meta-height', height);
    },
    setHeights() {
      const self = this;
      if(!this.mounted) return
      if(this.expanded || this.viewDepth === 'deep'){
        this.maxHeight = this.topHeight + this.$refs.bottomData.offsetHeight + (this.$mq === 'mobile' ? 160 : 15)
        this.ruleHeight = this.maxHeight - 45 - this.ruleTop
      } else if(this.collapsed){
        this.maxHeight = this.$mq === 'mobile' ? this.topHeight : 125
        if (this.$refs.peruseContent) {
          this.ruleHeight = this.$refs.peruseContent.offsetHeight
        }
      } else {
        this.maxHeight = this.topHeight
        if (this.$refs.peruseContent) {
          this.ruleHeight = this.$refs.peruseContent.offsetHeight
        }
      }
      this.setMaxHeight(this.maxHeight);
      this.$emit('set-top-height', this.topHeight)
      this.$emit('set-info-height', this.maxHeight);
      setTimeout(() => {
        this.setAnimateHeight(true);
        self.animateHeight = true;
      }, 500);
    }
  }
}
</script>

<style lang="scss">
  .player-card{
    .app--nba & {

        // max-height:313px;
        &__info-rule{
          height:100%;
          position:absolute;
          left:0;
          top:30px;
          width:1px;
          background-color:$darkmediumgray;
          transition:max-height 0.375s ease-in-out;
        }
        &__info-column{
          position:relative;
          flex:1;
          opacity:1;
          overflow-x:visible;
          overflow-y:hidden;
            
          &-mobile-expand{
            max-height:160px;
            overflow:hidden;
            &-enter{
              max-height:0;
              opacity:0;
            }
            &-enter-to{
              max-height:160px;
              opacity:1;
              transition:all 0.5s ease-out;
            }
            &-leave{
              max-height:160px;
              opacity:1;
            }
            &-leave-to{
              max-height:0;
              opacity:0;
              transition:all 0.5s ease-in;
            }
          }
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
            background:transparent;
            padding-bottom:30px;
            .player-card--collapsed &{
              overflow:visible;
              padding-bottom:30px;
              // padding-bottom:15px;
              // border-radius:0.625rem;
              .player-card--expanded & {
                padding-bottom:0;
              }
            }
            .player-card--expanded & {
              &:after{
                position:absolute;
                left:0;
                right:0;
                bottom:15px;
                content:'';
                display:block;
                height:1px;
                background:$black;
                margin-bottom:15px;
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
              .player-card__top-data,
              .player-card__bottom-data{
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
            // border-radius: 0 0 0.625rem 0.625rem;
            min-height:0;
            overflow:visible;
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
            padding:0 30px 30px;
          }
          @include tablet-portrait-only{
            padding:0 20px;
          }
    
          @include mobile{
            background:transparent;
            padding: 0 0 60px;
            margin:0 auto;
            // border-radius:0 0 0.625rem 0.625rem;
            .player-card--expanded & {
              margin-top:0;
            }
            // padding-top:0.625rem;
            // .mock-draft & {
            //   padding-top:0;
            // }
            &-extended{
              padding:0 0;
              margin-top:30px;
              &:before{
                content:'';
                display:block;
                width:100%;
                height:1px;
                background:$black;
                margin-bottom:20px;
              }
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