<template>
  <div
    ref="card"
    class="player-card list-inter"
    :class="{ 'player-card--expanded': expanded }"
  >
    <div
      v-if="false"
      class="list-inter__image player-card__image-column"
    >
      <img :src="interstitial.image.small">
    </div>
    <div
      class="list-inter__info player-card__info-column"
      :style="{ maxHeight: maxHeight + 'px' }"
    >
      <div
        ref="topData"
        class="list-inter__top-data"
      >
        <div class="list-inter__title-presnted">
          <div
            class="list-inter__title"
            v-html="interstitial.title_html"
          />
        </div>
        <div class="list-inter__byline">
          By {{ interstitial.byline }}
        </div>
        <div class="list-inter__presented-by">
          <!-- <span>Presented By</span>
          <img src="@/assets/img/state-farm-red.svg" alt="State Farm Logo" data-not-lazy /> -->
        </div>
        <div
          class="list-inter__content"
          v-html="firstParagraph"
        />
      </div>
      <div
        ref="bottomData"
        class="list-inter__remaining-content"
        v-html="remainingContent"
      />
    </div>
    <ToggleCard
      :offense-defense="''"
      :expanded="expanded"
      :card-expanded="cardExpanded"
      :open-text="'Read More'"
      :close-text="'Read Less'"
      @toggle-card="toggleCard"
    />
  </div>
</template>

<script>
import ToggleCard from "~/components/PlayerCard/NFL/ToggleCard";
import { scrollIt } from "~/plugins/scroller";
export default {
  name: "InterstitialNFLList",
  components: { ToggleCard },
  props: ["interstitial"],
  data() {
    return {
      firstParagraph: "",
      remainingContent: "",
      expanded: false,
      maxHeight: null,
    };
  },
  watch: {
    expanded() {
      if (!this.$refs.topData) return;
      let scrollDestination =
        this.$refs.card.offsetParent.offsetTop +
        this.$refs.card.offsetTop -
        (this.$mq === "mobile" ? 60 : self.collapsed ? 75 : 85);
      scrollIt(scrollDestination, 500, "linear");
      if (this.expanded) {
        this.maxHeight =
          this.$refs.topData.offsetHeight + this.$refs.bottomData.offsetHeight;
      } else {
        this.maxHeight = this.$refs.topData.offsetHeight;
      }
    },
  },
  mounted() {
    const self = this;
    setTimeout(() => {
      if (!self.$refs.topData) return;
      self.maxHeight = self.$refs.topData.offsetHeight;
    }, 500);
  },
  created() {
    if (process.client) {
      let el = document.createElement("html");
      el.innerHTML =
        "<html><head><title>titleTest</title></head><body>" +
        this.interstitial.content +
        "</body></html>";
      const paragraphs = el.getElementsByTagName("p");
      let rest = "";
      paragraphs.forEach((p, i) => {
        if (i === 0) {
          this.firstParagraph = p.outerHTML;
        } else {
          rest += p.outerHTML;
        }
      });
      this.remainingContent = rest;
    }
  },
  methods: {
    toggleCard() {
      if (!this.expanded) {
        this.$gtag &&
          this.$gtag.event( "list-interstitial",{
            event_category: "list-interstitial",
            event_action: "expanded",
            event_label: this.interstitial.title_html,
          });
      }
      this.expanded = !this.expanded;
    },
    cardExpanded() {
      // this.expanded = !this.expanded;
    },
  },
};
</script>

<style lang="scss" scoped>
.list-inter {
  // overflow:hidden;
  // background:transparent;
  padding: 60px 90px 30px 60px;
  flex-direction: row;
  border-radius: 0.625rem !important;
  opacity: 1 !important;
  background: $black !important;
  color: $white !important;
  transition: all 0.5s linear 0.5s;
  .player-card--all-cards-set & {
    opacity: 1;
  }
  &:hover {
    .app--supports-hover & {
      background: $lightgray !important;
      color: $black !important;
      .list-inter__presented-by {
        span {
          color: $black;
        }
      }
    }
  }
  &.player-card--expanded {
    background: $lightgray;
    color: $black;
    .list-inter__presented-by {
      span {
        color: $black;
      }
    }
  }
  .player-card__toggle {
    left: 60px;
    @include mobile {
      left: 20px;
    }
  }
  @include mobile {
    padding: 30px 20px 40px;
  }
  &__image {
    img {
      object-fit: contain;
      object-position: center top;
      width: 100%;
      position: absolute;
    }
    @include mobile {
      display: none;
    }
  }
  &__info {
    padding: 0 0;
    background: transparent !important;
    transition: max-height 0.5s linear 0.125s;
    @include mobile {
      width: 100%;
      padding: 0;
      transition: max-height 0.5s linear 0s;
    }
  }
  &__title {
    @include inter-title;
    @include non-mobile {
      max-width: 80%;
    }
  }
  &__remaining-content {
    opacity: 0;
    padding-bottom: 1px;
    transition: opacity 0.25s linear 0s;
    .player-card--expanded & {
      opacity: 1;
      transition: opacity 0.25s linear 0.25s;
    }
  }
  &__presented-by {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    span {
      @include header-sponsored-by;
      transition: color 0.5s linear 0.5s;
    }
    img {
      height: 20px;
      margin-left: 7px;
    }
    @include mobile {
    }
  }
  &__byline {
    @include mobile-nav-label;
    margin: 15px 0 15px;
    @include single-column {
      margin: 20px 0 15px;
    }
    @include mobile {
      margin: 10px 0 8px;
    }
  }
  &__content {
    &:after {
      content: "";
      display: block;
      position: relative;
      width: 100%;
      height: 1px;
    }
  }
}
</style>

<style lang="scss">
.app--nfl {
  .list-inter {
    &__content {
      p {
        @include player-card-body;
        a {
          text-decoration: underline;
          // color:$highlight2;
        }
      }
    }
  }
}
</style>
