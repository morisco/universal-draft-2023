import axios from 'axios';
// initial state
const state = () => ({
  settings: null,
  configuration: null,
  cardExpanded: false,
  currentPod: null,
  podPlaying: null,
  podTime: 0,
  podClicked: false,
})

// getters
const getters = {
  settings: (state) => state.settings,
  configuration: (state) => state.configuration,
  cardExpanded: (state) => state.cardExpanded,
  badges: (state) => state.settings.badges,
  defaultPod: (state) => state.settings.default_podcast,
  currentPod: (state) => state.currentPod,
  podPlaying: (state) => state.podPlaying,
  podTime: (state) => state.podTime,
  podClicked: (state) => state.podClicked,
}

// actions
const actions = {
  setCardExpanded ({commit}) {
    commit('setCardExpanded', true);
  },
  setPodClicked ({commit}) {
    commit('setPodClicked', true);
  },
  setCurrentPod ({commit}, podId) {
    commit('setCurrentPod', podId);
  },
  setPlaying ({commit}, playing) {
    commit('setPlaying', playing);
  },
  setPodTime ({commit}, time) {
    commit('setPodTime', time);
  }
}

// mutations
const mutations = {
  setPodClicked (state, clicked) {
    state.podClicked = clicked;
  },
  setPage (state, page) {
    let badges = {};
    page.badges.forEach((badge) => badges[badge.id] = badge);
    page.badges = badges;
    state.settings = page;
  },
  setConfig (state, config) {
    state.configuration = config
  },
  setCardExpanded(state) {
    state.cardExpanded = true
  },
  setCurrentPod(state, podId) {
    state.currentPod = podId
  },
  setPlaying(state, playing) {
    state.podPlaying = playing
  },
  setPodTime(state, podTime) {
    state.podTime = podTime
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}