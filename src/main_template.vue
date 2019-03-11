<template lang=html>
  <v-app id="inspire">
    <v-toolbar color="primary" dark app fixed clipped-left class="toolbar">
      <v-menu>
        <v-toolbar-title class="no-logo-margin"  slot="activator" @click="$router.push('/main')">
          <img class="mr-3 mt-2" src="./assets/logo_nokia.svg" height="25px" alt="Nokia Logo">
          {{$t("message.video_analytics")}}
        </v-toolbar-title>
      </v-menu>
      <language-select class="language-select"></language-select>
      <v-toolbar-items class="hidden-sm-and-down">
        <div class="title mt-4 main-title">{{$t("message.working_on_glial_impact")}}</div>
      </v-toolbar-items>
    </v-toolbar>
    <v-content style="padding-bottom:20px;">
      <router-view></router-view>
    </v-content>
    <div>
      <div class="caption text-center align-self-center relative_block" style="position:fixed; height: 20px;">
        2018-2019 © Nokia IoT Laboratory, Moscow.   Powered by Nokia Glial™ and IMPACT™.   Version: {{frontend_version}}
      </div>
    </div>
  </v-app>
</template>

<script>
  import Vue from "vue";
  import Vue_i18n from "vue-i18n";
  import Vuex from "vuex";

  Vue.use(Vue_i18n, Vuex);

  import languageSelect from "./common/language-select.vue";

  export default {
    components: {
      languageSelect
    },
    data: () => ({
      frontend_version: VERSION,
      menu_collapsed: true
    }),
    methods: {
      get_expanded_status(path) {
        if (window.location.href.includes(path)) {
          return true;
        }
        return false;
      },
      toggle_menu() {
        this.menu_collapsed = !this.menu_collapsed;
      }
    },
    computed: {
      items() {
        return [
          {
            number: 1,
            icon: "fa-project-diagram",
            path: "/main",
          }
        ];
      }
    }
  };
</script>
