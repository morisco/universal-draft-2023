import axios from 'axios';
// initial state
const state = () => ({
  settings: null,
  configuration: null,
  cardExpanded: false
})

// getters
const getters = {
  settings: (state) => state.settings,
  configuration: (state) => state.configuration,
  cardExpanded: (state) => state.cardExpanded,
  badges: (state) => state.settings.badges
}

// actions
const actions = {
  setCardExpanded ({commit}) {
    commit('setCardExpanded', true);
  }
}

// mutations
const mutations = {
  setPage (state, page) {
    let badges = {};
    page.badges.forEach((badge) => badges[badge.id] = badge);
    page.badges = badges;
    state.settings = page
  },
  setConfig (state, config) {
    state.configuration = config
  },
  setCardExpanded(state) {
    state.cardExpanded = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}