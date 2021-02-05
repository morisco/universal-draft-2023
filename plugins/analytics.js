import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import inEU from '@segment/in-eu';

const ineu = inEU();
const consented = window.localStorage.getItem('ringer-nfldraft-gdpr');
Vue.use(VueAnalytics, {
  id: 'UA-132999529-1',
  disabled: ineu && !consented,
  debug: {
    enabled: true,
    sendHitTask: true,
  },
})