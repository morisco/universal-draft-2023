// initial state
const state = () => ({
  viewDepth:    'default',
  viewPosition: 'all',
  viewCollapsed: false,
  viewStrength: [],
  teamSort: 'order'
})

// getters
const getters = {
  depth:    (state) => state.viewDepth,
  position: (state) => state.viewPosition,
  viewCollapsed: (state) => state.viewCollapsed,
  strength: (state) => state.viewStrength,
  teamSort: (state) => state.teamSort,
}

// actions
const actions = {
  setTeamSort ( { commit }, sort) {
    commit('setTeamSort', sort);
  },
  setViewDepth ({ commit }, depth) {
    commit('setDepth', depth)
  },
  setViewPosition ({ commit }, position) {
    commit('setPosition', position)
  },
  setViewCollapsed ({ commit }) {
    commit('setViewCollapsed')
  },
  setViewStrength ({ commit }, strengths) {
    commit('setViewStrength', strengths)
  },
  resetFilters ({commit}) {
    commit('resetFilters')
  }
}

// mutations
const mutations = {
  setTeamSort (state, sort) {
    console.log('sort value', sort);
    state.teamSort = sort
  },
  setDepth (state, depth) {
    state.viewDepth = depth
  },
  setPosition (state, position) {
    state.viewPosition = position
  },
  setViewCollapsed (state) {
    state.viewCollapsed = true;
  },
  setViewStrength (state, strengths) {
    state.viewStrength = strengths;
  },
  resetFilters (state) {
    state.viewPosition = 'all'
    state.viewStrength = []
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}