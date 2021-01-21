// initial state
const state = () => ({
  viewDepth:    'default',
  viewPosition: 'all',
  viewCollapsed: false
})

// getters
const getters = {
  depth:    (state) => state.viewDepth,
  position: (state) => state.viewPosition,
  viewCollapsed: (state) => state.viewCollapsed
}

// actions
const actions = {
  setViewDepth ({ commit }, depth) {
    commit('setDepth', depth)
  },
  setViewPosition ({ commit }, position) {
    commit('setPosition', position)
  },
  setViewCollapsed ({ commit }) {
    commit('setViewCollapsed')
  }
}

// mutations
const mutations = {
  setDepth (state, depth) {
    state.viewDepth = depth
  },
  setPosition (state, position) {
    state.viewPosition = position
  },
  setViewCollapsed (state) {
    state.viewCollapsed = true;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}