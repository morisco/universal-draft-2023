import axios from 'axios';

const asyncDataProcessor = async function asyncData({$axios, store, commit}) {
  let configuration = store.getters['page/configuration'];
  if(!configuration){
    configuration = await $axios.get("https://storage.googleapis.com/draft-nuxt-storage/public/data/" + process.env.HEDDEK_PROJECT_ID + "/page." + process.env.HEDDEK_LOCATION + ".json.gz?ignoreCache=4",  {
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
  return { configuration: configuration, settings: pageSettings }
}

export default asyncDataProcessor