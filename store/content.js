import axios from 'axios';
import { processPlayers, processTeams } from '~/plugins/contentProcessor';  
import { positionMap } from '~/plugins/playerPositionMap';
// initial state
const state = () => ({
  playerData: {},
  bigBoard: [],
  mockDraft: [],
  draftResults: [],
  teamData: {},
  teamNameLogo: []
})

// getters
const getters = {
  bigBoard: (state) => (selectedPosition) => {
    const activePositionArray = positionMap[selectedPosition];
    return state.bigBoard.filter((playerId) => {
      const position = state.playerData[playerId].player_position_stats.position;
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
      const position = state.playerData[playerId].player_position_stats.position;
      if(selectedPosition === 'all'){
        return playerId;
      } else {
        if(activePositionArray.indexOf(position) >= 0){
          return playerId;
        }
      }
    })
  },
  player: (state) => (playerId) => state.playerData[playerId],
  playerType: () => (position) => {
    const offensePositions = ["qb",  "wr", "t",  "rb", "c", "g", "te"]
    // const defensePositions = ["de", "lb", "db", "idl", "s"];
    return offensePositions.indexOf(position) >= 0 ? 'offense' : 'defense';
  },
  playerPosition: () => (playerPosition) => {
    const positionMap = { "qb": 'Quarterback',  "wr": "Wide Receiver", "t": "Tackle",  "rb": "Running Back", "c": "Center", "g": "Guard", "te": "Tight End", "de": 'Edge Rusher', "lb": "Line Backer", "db": "Defensive Back", "idl": "Interior Defensive Lineman", "s": "Safety"}
    return positionMap[playerPosition];
  },
  team: (state) => (teamId) => state.teamData[teamId],
  teamNameLogo: (state) => (index) => state.teamNameLogo && state.teamNameLogo[index],
}

// actions
const actions = {
  getContents ({commit}) {
    axios.get("https://s3.amazonaws.com/heddek/contents/ringernfl2020/production/ringernfl2020.json")
    .then(response => {
      const contents = response.data.contents;
      const processedPlayers = processPlayers(contents.players.content);
      const processedTeams = processTeams(contents.teams.content);
      commit('setPlayerData', processedPlayers)
      commit('setTeamData', processedTeams)
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
  },

  setTeamData (state, processedTeams) {
    state.teamData = processedTeams.teamData;
    state.teamNameLogo = processedTeams.teamNameLogo;
  },

  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}