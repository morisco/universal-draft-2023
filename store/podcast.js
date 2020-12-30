// initial state
const state = () => ({
  activePlayer: null,
  activeMP3: null,
  activePlayerCompletionPercentage: null,
  activePlayerStartTime: null,
  activePlayerEndTime: null,
  activePlayingState: false,
  activeRemainingTime: null,
})

// getters
const getters = {
  currentCompletionPercentage: (state) => state.activePlayerCompletionPercentage,
  activePlayer: (state) => state.activePlayer,
  activePlayingState: (state) => state.activePlayingState,
  activeMP3: (state) => state.activeMP3,
  startTime: (state) => state.activePlayerStartTime,
  endTime: (state) => state.activePlayerEndTime,
  playingState: (state) => state.activePlayingState,
  remainingTime: (state) => state.activeRemainingTime
}

// actions
const actions = {
  setPlayingState ({ commit }, playState) {
    commit('setPlayingState', playState)
  },
  setActive ({ commit },activePodcast) {
    commit('setActive', activePodcast)
  },
  setCompletionPercentage ({commit}, currentPercentage) {
    commit('setCompletionPercentage', currentPercentage);
  },
  resetPodcast ({ commit }){
    commit('resetPodcast');
  },
  setRemaining ({ commit }, remaining){
    commit('setRemaining', remaining)
  }
}

// mutations
const mutations = {
  setPlayingState (state, playState) {
    state.activePlayingState = playState
  },
  setActive (state, activePodcast) {
    state.activePlayer            = activePodcast.playerId
    state.activePlayerCompletionPercentage = 0
    state.activeMP3               = activePodcast.mp3
    state.activePlayerStartTime   = activePodcast.startSeconds
    state.activePlayerEndTime     = activePodcast.endSeconds
    state.activePlayerState       = 1
  },
  setCompletionPercentage (state, completionPercentage) {
    state.activePlayerCompletionPercentage = completionPercentage;
  },
  resetPodcast (state) {
    state.activePlayerCompletionPercentage = 0
    state.activePlayerState = 0
    state.activePlayer = null
    state.activeMP3 = null
    state.activePlayerStartTime = null
    state.activePlayerEndTime = null
    state.activeRemainingTime = null
  },
  setRemaining(state, remainingTime) {
    state.activeRemainingTime = remainingTime
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}