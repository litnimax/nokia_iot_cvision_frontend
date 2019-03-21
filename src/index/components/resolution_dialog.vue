<template>
  <div>
    <v-dialog v-on:keydown.esc="hide()" v-on:keydown.enter="submit_resolution()" :value="visible" persistent max-width="450" min-height="300">
      <v-card>
        <v-card-title class="headline">
          <span>{{$t("message.camera_control")}}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="hide()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text id="canvas_container" class="text-xs-center">
          <v-layout row wrap justify-space-around>
            <v-flex xs12>
                <v-btn-toggle class="no-shadow-never justify-space-around full-width" v-model="resolution_index">
                  <v-btn class="res-select-button" :value="0">
                    640x360
                  </v-btn>
                  <v-btn class="res-select-button" :value="1">
                    800x450
                  </v-btn>
                  <v-btn class="res-select-button" :value="2">
                    1024x576
                  </v-btn>
                  <v-btn class="res-select-button" :value="3">
                    1280x720
                  </v-btn>
                </v-btn-toggle>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="submit_resolution()">{{$t("message.set_resolution")}}</v-btn>
          <v-spacer></v-spacer>
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
      resolution_index: 0,
      target_resolution: {
        width: undefined,
        height: undefined
      },
      resolutions_list: [{width:640, height:360}, {width:800, height:450}, {width:1024, height:576}, {width:1280, height:720}]
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
        this.target_resolution = this.default_resolution;
        this.change_resolution();
      },
      submit_resolution () {
        this.$parent.delete_areas();
        setTimeout(() => { this.change_resolution(); }, 300);
        this.hide();
      },
      change_resolution () {
        console.log(this.target_resolution);
        if (this.target_resolution.width && this.target_resolution.height) {
          Vue.axios
            .post(this.$store.getters.getOpenCVURL + "/set_size", this.target_resolution)
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
      resolution_index: function (newValue) {
        console.log(this)
        this.target_resolution = this.resolutions_list[newValue];
      }
    }
  };
</script>
