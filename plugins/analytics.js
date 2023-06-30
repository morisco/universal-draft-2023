import Vue from 'vue'
import inEU from '@segment/in-eu';
import VueGtag from 'vue-gtag';

const ineu = true; //inEU();
const consented = false;// window.localStorage.getItem(`ringer-${process.env.PROJECT_LEAGUE}draft-gdpr`);
console.log("HIIIIIII");
if(!ineu || consented) {
  console.log("HEYYYYYYYYY");
  Vue.use(VueGtag, {
    config: { id: "G-3ZG4W67K51" }
  })
}