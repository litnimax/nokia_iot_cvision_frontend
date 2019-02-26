import Vue from 'vue'
import main_template from './main_template.vue'

import main_page from './index/main_page.vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

let theme_nokia = require('./assets/nokia_colors');
Vue.use(Vuetify, {
  theme: theme_nokia
});

import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(solid.faDatabase)
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/main',
    name: 'main',
    component: main_page
  },
    {
      path: '*',
      redirect: '/main'
    }]
});

import Axios from "axios";
import VueAxios from "vue-axios";
import Vuex from 'vuex';
import Vue_i18n from 'vue-i18n';

Vue.use(Vuex, VueAxios, Axios, Vue_i18n);

const store = new Vuex.Store({
  state: {
    locale: localStorage.getItem('locale') ? localStorage.getItem('locale') : 'ru',
    influxdb_server: "http://192.168.1.45:8086",
  },
  mutations: {
    updateLocale(state, locale) {
      this.state.locale = locale;
      localStorage.setItem('locale', locale);
    }
  },
  getters: {
    getLocale: state => {
      return state.locale;
    },
    getInfluxServerAddress: state => {
      return state.influxdb_server;
    }
  },
  actions: {
    changeLocale: ({commit}, locale) => {
      commit("updateLocale", locale)
    }
  }
});

import L from 'leaflet'
import "../node_modules/leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../node_modules/leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('../node_modules/leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('../node_modules/leaflet/dist/images/marker-shadow.png')
})

const messages = require('./assets/translation.json');
const i18n = new Vue_i18n({
  locale: store.state.locale,
  messages,
})

import "../src/assets/global.css";

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(main_template)
})
