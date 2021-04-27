import axios from 'axios';
import { processPlayers, processTeams, processRelated, processInterstitials } from '~/plugins/contentProcessor';  
import { positionMap, positionLabelMap, offensePositions } from '~/plugins/playerPositionMap';
// initial state
const state = () => ({
  playerData: {},
  bigBoard: [],
  mockDraft: [],
  teamNeeds: [],
  draftResults: [],
  teamData: {},
  teamNameLogo: [],
  resultsTeamNameLogo: [],
  relatedData: [],
  interstitials: {},
  contentLoaded: false,
  cardsReady: 0,
  allCardsSet: false
})

// getters
const getters = {
  contentLoaded: (state => state.contentLoaded),
  allCardsSet: (state) => state.allCardsSet,
  teamPlayer: (state) => (playerId) => {
    return state.teamPlayers[playerId]
  },
  bigBoard: (state) => (selectedPosition) => {
    const activePositionArray = positionMap[selectedPosition];
    return state.bigBoard.filter((playerId) => {
      const position = state.playerData[playerId].position;
      if(selectedPosition === 'all'){
        return playerId;
      } else {
        if(activePositionArray.indexOf(position) >= 0){
          return playerId;
        }
      }
    })
  },
  mockDraft: (state) => (selectedPosition) => {
    const activePositionArray = positionMap[selectedPosition];
    return state.mockDraft.filter((playerId) => {
      const position = state.playerData[playerId].position;
      if(selectedPosition === 'all'){
        return playerId;
      } else {
        if(activePositionArray.indexOf(position) >= 0){
          return playerId;
        }
      }
    })
  },
  draftResults: (state) => (selectedPosition) => {
    const activePositionArray = positionMap[selectedPosition];
    return state.draftResults.filter((playerId) => {
      const position = state.playerData[playerId].position;
      if(selectedPosition === 'all'){
        return playerId;
      } else {
        if(activePositionArray.indexOf(position) >= 0){
          return playerId;
        }
      }
    })
  },
  playerByShare: (state) => (shareId) => {
    var sharedPlayerId = Object.keys(state.playerData).find((id) => {
      return shareId === state.playerData[id].id_string
    });
    return state.playerData[sharedPlayerId];
  },
  player: (state) => (playerId) => state.playerData[playerId],
  playerType: () => (position) => {
    return offensePositions.indexOf(position) >= 0 ? 'offense' : 'defense';
  },
  playerPosition: () => (playerPosition) => {
    return positionLabelMap[playerPosition];
  },
  teamNeeds: (state) => state.teamNeeds,
  team: (state) => (teamId) => state.teamData[teamId],
  teamByShare: (state) => (shareId) => {
    var sharedPlayerId = Object.keys(state.teamData).find((id) => {
      return shareId === state.teamData[id].id_string
    });
    return state.teamData[sharedPlayerId];
  },
  teamNameLogo: (state) => (index) => {
    return state.teamNameLogo && state.teamNameLogo[index]
  },
  resultsTeamNameLogo: (state) => (index) => {
    return state.resultsTeamNameLogo && state.resultsTeamNameLogo[index]
  },
  relatedArticles: (state) => state.relatedData,
  interstitials: (state) => (list)  => state.interstitials[list],
  interstitial: (state) => (list, interKey)  => state.interstitials[list] ? state.interstitials[list][interKey] : false
}

// actions
const actions = {
  getContents ({commit}) {
    var d = new Date();
    var t = d.getTime();

    axios.get("https://storage.googleapis.com/" + process.env.GCS_BUCKET + "/hardrefresh/data/" + process.env.HEDDEK_PROJECT_ID + "/content." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=" + t,  {
      headers: {
        'Content-Encoding': 'gzip',
        'Content-Type': 'json',
        'Access-Control-Allow-Origin': 'http://localhost:3333',
      },
    })
    .then(response => {
      const contents = response.data.contents;
      const processedPlayers = processPlayers(contents.players.content);
      const processedInters = processInterstitials(contents);
      const processedTeams = processTeams(contents.teams.content, processedPlayers.teamPlayers);
      const processedRelated = processRelated(contents.coverage.content);
      commit('setInterstitialData', processedInters);
      commit('setPlayerData', processedPlayers)
      commit('setTeamData', processedTeams)
      commit('setRelatedData', processedRelated)
    })
    .catch(err => console.log(err));
   
  }
}

// mutations
const mutations = {
  setPlayerData (state, processedPlayers) {
    state.playerData = processedPlayers.playerData;
    state.bigBoard = processedPlayers.bigBoard;
    state.mockDraft = processedPlayers.mockDraft;
    state.draftResults = processedPlayers.draftResults;
    state.teamPlayers = processedPlayers.teamPlayers;
    state.contentLoaded = true
  },

  setTeamData (state, processedTeams) {
    state.teamData = processedTeams.teamData;
    state.teamNeeds = processedTeams.teamNeeds;
    state.teamNameLogo = processedTeams.teamNameLogo;
    state.resultsTeamNameLogo = processedTeams.resultsTeamNameLogo;
  },

  setRelatedData(state, processedRelated) {
    state.relatedData = processedRelated;
  },

  setInterstitialData(state, processedInters) {
    state.interstitials = processedInters;
  },

  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  },

  cardReady(state, route) {
    state.cardsReady += 1;
    if(['index', 'big_board_player_share'].indexOf(route.name) >=0 && state.cardsReady === Object.keys(state.playerData).length){
      state.allCardsSet = true;
    } else if(['mock-draft', 'mock_draft_player_share'].indexOf(route.name) >=0 && state.cardsReady === 32){
      state.allCardsSet = true;
    } else if(['team-needs', 'team_needs_team_share'].indexOf(route.name) >=0 && state.cardsReady === 32){
      state.allCardsSet = true;
    } else if(['draft-results', 'draft_results_player_share'].indexOf(route.name) >=0 && state.cardsReady === 32){
      state.allCardsSet = true;
    }
  },
  
  resetReady(state) {
    state.cardsReady = 0;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}