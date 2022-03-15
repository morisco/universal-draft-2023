import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import inEU from '@segment/in-eu';

const ineu = inEU();
const consented = window.localStorage.getItem(`ringer-${process.env.PROJECT_LEAGUE}draft-gdpr`);
Vue.use(VueAnalytics, {
  id: process.env.ANALYTICS_ID,
  disabled: ineu && !consented,
  debug: {
    enabled: true,
    sendHitTask: true,
  },
})