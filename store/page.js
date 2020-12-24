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
  cardExpanded: (state) => state.cardExpanded
}

// actions
const actions = {
  getPageSettings ({ commit, state }) {
    axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/config.json.gz?ignoreCache=1",  {
      headers: {
         'Content-Encoding': 'gzip'
      }
    })
    .then(response => {
      const page = response.data[0].data;
      commit('setPage', page)
    })
    .catch(err => console.log(err));
    axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/page.json.gz?ignoreCache=1",  {
      headers: {
         'Content-Encoding': 'gzip'
      }
    })
    .then(response => { 
      const config = response.data[0];
      commit('setConfig', config)
    }).catch(err => console.log(err));
  },
  setCardExpanded ({commit}) {
    commit('setCardExpanded', true);
  },
}

// mutations
const mutations = {
  setPage (state, page) {
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