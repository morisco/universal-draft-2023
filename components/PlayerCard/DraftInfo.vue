<template>
  <div class="draft-info" :style="{top: infoHeight + 'px'}">
    <span class="draft-info__name">{{teamNameLogo.teamName}}</span>
    <div class="draft-info__content">
      There’s still a possibility that the Timberwolves trade down with the Hornets, who would likely take James Wiseman with the first pick. If they did, the Wolves could still possibly select Edwards third. Regardless, Edwards is the top prospect who makes the most sense in Minnesota, as he’s the best positional fit next to D’Angelo Russell and Karl-Anthony Towns. Minnesota needs a defensive presence, and while Edwards is inconsistent, he has the massive frame and quickness to defend across positions if his fundamentals and focus improve. Offensively, his go-to scoring instincts complement Russell well in the backcourt; they’ll need a player who can attack the rim and draw fouls, which he should be able to do throughout his career. The question is what level Edwards reaches, and that will largely depend on how his perimeter shooting and decision-making evolve as he matures.
    </div>
  </div>
</template>

<script>
export default {
  props: ['teamNameLogo', 'infoHeight'],
}
</script>

<style lang="scss" scoped>
  .draft-info{
    position:absolute;
    background:rgba(0,0,0,0.875);
    right:25px;
    left:25px;
    padding: 15px 10px 10px;
    transition: all 0.375s linear 0.125s, opacity 0.25s linear 0s, visibility 0s linear 0.25s;
    transform:translateY(-30px);
    opacity:0;
    z-index:0;
    color:$white;
    border:2px solid $white;
    visibility:hidden;
    @include mobile{
      display:none;
    }
    &__name{
      font-weight:500;
      text-transform:uppercase;
      padding-bottom:2px;
      border-bottom:2px solid $white;
      margin-bottom:10px;
      display:block;
      font-size:14px;
    }
    &__content{
      font-size:12px;
    }

    .player-card--collapsed & {
      opacity:0;
      transition: opacity 0.375s linear 0s;
    }
    .player-card--transitioning & {
      opacity:0;
      transition: opacity 0.125s linear 0s;
    }

    .player-card--expanded & {
      visibility:visible;
      opacity:1;
      transition: opacity 0.125s linear 0.375s;
    }

    .player-card--expanded.player-card--collapsed & {
      transition: opacity 0.125s linear 1s;
    }
    // .player-card--collapsed.player-card--expanded & {
    //     transition: opacity 0.125s linear 1s;
    //   }
  }
</style>