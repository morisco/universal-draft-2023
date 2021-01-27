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
  getPageSettings ({ commit, state }) {
    axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/" + process.env.HEDDEK_PROJECT_ID + "/config." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=4",  {
      headers: {
         'Content-Encoding': 'gzip'
      }
    })
    .then(response => {
      const page = response.data[0].data;
      commit('setPage', page)
    })
    .catch(err => console.log(err));
    axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/" + process.env.HEDDEK_PROJECT_ID + "/page." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=4",  {
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