import axios from 'axios';
import { processPlayers, processTeams, processRelated, processInterstitials } from '~/plugins/contentProcessor';  



const asyncDataProcessor = async function asyncData({$axios, store, route}) {
  let configuration = store.getters['page/configuration'];
  if(!configuration){
    configuration = await $axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/" + process.env.HEDDEK_PROJECT_ID + "/config." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=4",  {
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
    pageSettings = await $axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/" + process.env.HEDDEK_PROJECT_ID + "/page." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=4",  {
      headers: {
        'Content-Encoding': 'gzip'
      }
    })
      .then(response => {
        store.commit('page/setPage', response.data[0].data);
        return response.data[0].data;
      })
      .catch(err => console.log(err));
  }
  const shareId = route.params && route.params.player_id;
  let contentLoaded = store.getters['content/contentLoaded'];
  let sharedPlayer = contentLoaded ? store.getters['content/playerByShare'](shareId) : false;
  if(!contentLoaded && shareId ){
    var d = new Date();
    var t = d.getTime();
    await $axios.get("https://draft-nuxt-storage.storage.googleapis.com/public/data/" + process.env.HEDDEK_PROJECT_ID + "/content." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=" + t,  {
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
      sharedPlayer = store.getters['content/playerByShare'](shareId);
    })
    .catch(err => console.log(err));
  }
  return { configuration: configuration, settings: pageSettings, sharedPlayer: sharedPlayer }
}

export default asyncDataProcessor