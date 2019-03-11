import Vue from 'vue'
import main_template from './main_template.vue'

import main_page from './index/main_page.vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: "#124191",
    secondary: "#1976D2",
    accent: "#80D8FF",
    error: "#B71C1C",
    warning: "#FBC02D",
    info: "#2196f3",
    success: "#4caf50",
    lightblue: "#E6F0FF"
  }
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
    openCV_url: "http://0.0.0.0:9001",
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
    getOpenCVURL: state => {
      return state.openCV_url;
    }
  },
  actions: {
    changeLocale: ({commit}, locale) => {
      commit("updateLocale", locale)
    }
  }
});

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
