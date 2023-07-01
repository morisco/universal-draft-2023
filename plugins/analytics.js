import Vue from 'vue'
import inEU from '@segment/in-eu';
import VueGtag from 'vue-gtag';

const ineu = inEU();
const consented = window.localStorage.getItem(`ringer-${process.env.PROJECT_LEAGUE}draft-gdpr`);
if(!ineu || consented) {
  Vue.use(VueGtag, {
    config: { id: "G-3ZG4W67K51" }
  })
}