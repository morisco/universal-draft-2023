// initial state
const state = () => ({
  viewDepth:    'default',
  viewPosition: 'all',

})

// getters
const getters = {
  depth:    (state) => state.viewDepth,
  position: (state) => state.viewPosition
}

// actions
const actions = {
  setViewDepth ({ commit }, depth) {
    commit('setDepth', depth)
  },
  setViewPosition ({ commit }, position) {
    commit('setPosition', position)
  }
}

// mutations
const mutations = {
  setDepth (state, depth) {
    state.viewDepth = depth
  },
  setPosition (state, position) {
    state.viewPosition = position
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}