<template>
  <div class="player-card__advanced-qb-stats__stat-cards">
    <h5>Advanced Stats</h5>
    <<<<<<< HEAD
    <div
      v-for="card in cards"
      :key="card.label"
      class="card"
    >
      <div class="card__value">
        {{ card.value }}
      </div>
      <div class="card__label">
        {{ card.label }}
        =======
        <div
          v-for="card in cards"
          :key="card.label"
          class="card"
        >
          <div class="card__value">
            {{ card.value }}
          </div>
          <div class="card__label">
            {{ card.label }}
            >>>>>>> nfl
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    statData: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      cards: [],
    }
  },
  mounted() {
    this.setCards();
  },
  methods: {
    setCards() {
      const labels = {
        "accuracy_percentage": "Pinpoint %",
        "air_yards_per_attempt": "Air Yards per Attempt",
        "drop_percentage": "Drop %",
        "interceptable_percentage": "Interceptable %",
        "yac_percentage": "YAC %",
      }
      this.cards = Object.keys(labels).map((key) => (
        {
          label: labels[key],
          value: this.statData[key],
        }
      ));
    }
  }
}
</script>

<style lang="scss" scoped>
    .player-card__advanced-qb-stats{
      &__stat-cards{
        h5{
          @include advanced-section-label;
        }
        display:flex;
        flex-direction:column;
        .card{
          display:flex;
          align-items:center;
          margin-bottom:5px;
          &__value{
            background:$mediumgray;
            width: 60px;
            height:45px;
            margin-right:10px;
            display:flex;
            justify-content:center;
            align-items:center;
            font-family: "Decima";
    font-size: 26px;
    line-height: .77;
    font-weight: 300;
padding-top:3px;

          }
          &__label{
            @include advanced-situation-chart-label;
          }
        }
      }
    }
</style>