import { processPlayers, processTeams, processRelated, processInterstitials } from '~/plugins/contentProcessor';  

const asyncDataProcessor = async function asyncData({$axios, store, route}) {
  let configuration = store.getters['page/configuration'];
  var d = new Date();
  var t = d.getTime();
  if(!configuration){
    var date = new Date();
    configuration = await $axios.get("https://storage.googleapis.com/" +  process.env.GCS_BUCKET + "/hardrefresh/data/" + process.env.HEDDEK_PROJECT_ID + "/settings." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=" + t,  {
      headers: {
        'Content-Encoding': 'gzip'
      }
    })
      .then(response => { 
        store.commit('page/setConfig', response.data[0]);
        return response.data[0];
      }).catch(err => console.log(err));
  }
  let pageSettings = store.getters['page/settings'];
  if(!pageSettings){
    pageSettings = await $axios.get("https://storage.googleapis.com/" +  process.env.GCS_BUCKET + "/hardrefresh/data/" + process.env.HEDDEK_PROJECT_ID + "/page." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=" + t,  {
      headers: {
        'Content-Encoding': 'gzip'
      }
    })
      .then(response => {

        response.data[0].data.title = response.data[0].title;
        response.data[0].data.description = response.data[0].description;
        store.commit('page/setPage', response.data[0].data);
        return response.data[0].data;
      })
      .catch(err => console.log(err));
  }
  const shareId = route.params ? (route.params.player_id ? route.params.player_id : route.params.team_id) : false;
  let contentLoaded = store.getters['content/contentLoaded'];
  let sharedPlayer = contentLoaded ? store.getters['content/playerByShare'](shareId) : false;
  let sharedTeam = contentLoaded ? store.getters['content/teamByShare'](shareId) : false;
  if(!contentLoaded && shareId){
    await $axios.get("https://storage.googleapis.com/" +  process.env.GCS_BUCKET + "/hardrefresh/data/" + process.env.HEDDEK_PROJECT_ID + "/content." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=" + t,  {
      headers: {
        'Content-Encoding': 'gzip',
        'Content-Type': 'json'
      },
    })
    .then(response => {
      const contents = response.data.contents;
      const processedPlayers = processPlayers(contents.players.content);
      const processedInters = processInterstitials(contents);
      const processedTeams = processTeams(contents.teams.content, processedPlayers.teamPlayers);
      const processedRelated = processRelated(contents.coverage.content);
      store.commit('content/setInterstitialData', processedInters);
      store.commit('content/setPlayerData', processedPlayers)
      store.commit('content/setTeamData', processedTeams)
      store.commit('content/setRelatedData', processedRelated)
      const postFetchPlayer = Object.keys(processedPlayers.playerData).find((id) => {
        return shareId === processedPlayers.playerData[id].id_string
      });
      sharedPlayer = shareId ? processedPlayers.playerData[postFetchPlayer] : false;

      const postFetchTeam = Object.keys(processedTeams.teamData).find((id) => {
        return shareId === processedTeams.teamData[id].id_string
      });
      sharedTeam = shareId ? processedTeams.teamData[postFetchTeam] : false;
    })
    .catch(err => console.log(err));
  }
  return { configuration: configuration, settings: pageSettings, sharedPlayer: sharedPlayer, sharedTeam: sharedTeam }
}

export default asyncDataProcessor