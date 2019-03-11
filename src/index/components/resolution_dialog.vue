<template>
  <div>
    <v-dialog v-on:keydown.esc="hide()" v-on:keydown.enter="submit_resolution()" :value="visible" persistent max-width="450" min-height="300">
      <v-card>
        <v-card-title class="headline">{{$t("message.camera_control")}}</v-card-title>
        <v-card-text id="canvas_container" class="text-xs-center">
          <v-layout row wrap justify-space-around>
          <v-flex xs12 sm6 md3>
            <v-text-field
              solo
              v-bind:label="$t('message.width')"
              v-bind:placeholder="$t('message.width')"
              v-model="width"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-text-field
              solo
              v-bind:label="$t('message.height')"
              v-bind:placeholder="$t('message.height')"
              v-model="height"
            ></v-text-field>
          </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" flat @click="set_default_resolution()">{{$t("message.default_resolution")}}</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="submit_resolution()">{{$t("message.set_resolution")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <snackbar ref="snackbar"></snackbar>
  </div>
</template>

<script>
  import Vue from "vue";
  import Axios from "axios";
  import VueAxios from "vue-axios";

  Vue.use(VueAxios, Axios);

  import snackbar from "./snackbar.vue";

  export default {
    data: () => ({
      visible: false,
      default_resolution: {
        width: 640,
        height: 360
      },
      width: undefined,
      height: undefined
    }),
    components: {
      snackbar
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      set_default_resolution() {
        this.height = this.default_resolution.height;
        this.width = this.default_resolution.width;
      },
      submit_resolution () {
        this.$parent.delete_areas();
        setTimeout(() => { this.change_resolution(); }, 300);
        this.hide();
      },
      change_resolution () {
        if (this.width && this.height) {
          let resolution = {
            width: parseInt(this.width),
            height: parseInt(this.height)
          }
          Vue.axios
            .post(this.$store.getters.getOpenCVURL + "/set_size", resolution)
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error)
            });
        }
      }
    },
    watch: {

    }
  };
</script>
