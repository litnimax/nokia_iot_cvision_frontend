<template>
  <v-container grid-list-md fill-height fluid>
    <v-layout column>
      <v-flex d-flex md6>
        <v-layout row wrap>
          <v-flex d-flex md4>
            <v-layout column wrap>
              <v-flex d-flex md1 class="block_title">
                <h3 class="text-xs-center">{{$t('message.heatmap')}}</h3>
              </v-flex>
              <v-flex d-flex md11 class="block_content">
                <img class="detector_image" id="current_heatmap_image" src="">
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex md4>
            <v-layout column wrap>
              <v-flex d-flex md1 class="block_title">
                <h3 class="text-xs-center">{{$t('message.areas')}}</h3>
              </v-flex>
              <v-flex d-flex md11 class="block_content">
                <img class="detector_image" id="current_user_image" src="">
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex md4>
            <v-layout column wrap>
              <v-flex d-flex md1 class="block_title">
                <h3 class="text-xs-center">{{$t('message.current_fps')}}: {{current_fps}}</h3>
              </v-flex>
              <v-flex d-flex md11 class="block_content">
                <v-layout column wrap justify-center fill-height>
                  <v-flex d-flex md-3>
                    <v-btn color="error" @click="delete_areas">Удалить все зоны</v-btn>
                  </v-flex>
                  <v-flex d-flex md-3>
                    <v-btn color="warning" @click="set_areas">Добавить зону</v-btn>
                  </v-flex>
                  <v-flex d-flex md-3>
                    <v-btn color="warning" @click="set_resolution">Изменить разрешение</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md5>
        <v-layout row wrap>
          <v-flex d-flex md12>
            <v-layout column wrap>
              <v-flex d-flex md2 class="block_title">
                <h3 class="text-xs-center">{{$t('message.alarms')}}</h3>
              </v-flex>
              <v-flex d-flex md10 class="block_content">
                <events-table ref="eventsTable" @event_row_clicked="table_click"
                              :data="events"></events-table>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md1 class="footer-internal">
        <div class="caption text-center align-self-center relative_block">
          2018-2019 © Nokia IoT Laboratory, Moscow.   Powered by Nokia Glial™ and IMPACT™.   Version: {{frontend_version}}
        </div>
      </v-flex>
    </v-layout>
    <canvas-dialog ref="canvas_dialog"></canvas-dialog>
    <resolution-dialog ref="resolution_dialog"></resolution-dialog>
  </v-container>
</template>

<script>
  import Vue from "vue";
  import VueTimers from "vue-timers";
  Vue.use(VueTimers);

  import Axios from "axios";
  import VueAxios from "vue-axios";
  import Vue_i18n from 'vue-i18n';

  Vue.use(VueAxios, Axios, Vue_i18n);

  import table from "./components/table.vue";
  import canvasDialog from "./components/canvas_dialog";
  import resolutionDialog from "./components/resolution_dialog";

  export default {
    components: {
      eventsTable: table,
      canvasDialog: canvasDialog,
      resolutionDialog: resolutionDialog,
    },
    data: () => ({
      frontend_version: VERSION,
      current_fps: 0,
    }),
    timers: {
      get_all_data: { time: 500, autostart: true, repeat: true }
    },
    methods: {

      get_all_data () {
        this.get_current_user_image();
        this.get_current_heatmap_image();
        this.get_current_fps();
      },
      table_click (){

      },
      get_current_user_image() {
        Vue.axios
          .get(this.$store.getters.getOpenCVURL + "/get_user_image")
          .then(response => {
            document.getElementById('current_user_image')
              .setAttribute(
                'src', "data:image/jpg;base64, " + response.data
              );
          })
          .catch(error => {
            console.log(error)
          });
      },
      get_current_heatmap_image() {
        Vue.axios
          .get(this.$store.getters.getOpenCVURL + "/get_heatmap_image")
          .then(response => {
            document.getElementById('current_heatmap_image')
              .setAttribute(
                'src', "data:image/jpg;base64, " + response.data
              );
          })
          .catch(error => {
            console.log(error)
          });
      },
      get_current_fps() {
        Vue.axios
          .get(this.$store.getters.getOpenCVURL + "/get_fps")
          .then(response => {
            this.current_fps = response.data.fps;
          })
          .catch(error => {
            console.log(error)
          });
      },
      set_areas () {
        this.$refs.canvas_dialog.show();
      },
      update_areas (new_points) {
        Vue.axios
          .get(this.$store.getters.getOpenCVURL + "/get_areas")
          .then(response => {
            let all_points = response.data;
            let new_area_id = 'area_' + Math.random().toString(36).substr(2, 9);
            all_points[new_area_id] = new_points;
            Vue.axios
              .post(this.$store.getters.getOpenCVURL + "/set_areas", all_points)
              .then(response => {
                this.$refs.canvas_dialog.clear_canvas_points();
                this.$refs.canvas_dialog.get_canvas_image();
              })
              .catch(error => {
                console.log(error)
              });
          })
          .catch(error => {
            console.log(error)
          });
      },
      delete_areas () {
        Vue.axios
          .post(this.$store.getters.getOpenCVURL + "/set_areas", {})
          .then(response => {
            this.areas = {}
            this.$refs.canvas_dialog.get_canvas_image();
          })
          .catch(error => {
            console.log(error)
          });
      },
      set_resolution () {
        this.$refs.resolution_dialog.show();
      }
    },
    computed: {
      events() {
        return [
          {
            "alarm_time": "02/25/12:00:13",
            "alarm_zone": "41231-ffe-2121",
            "alarm_type": "Intrusion",
          },
          {
            "alarm_time": "02/26/12:05:53",
            "alarm_zone": "41231-ffe-2121",
            "alarm_type": "Intrusion",
          },
          {
            "alarm_time": "02/26/16:25:56",
            "alarm_zone": "t4351-ffr-2121",
            "alarm_type": "Intrusion",
          },
          {
            "alarm_time": "02/28/19:55:12",
            "alarm_zone": "t4351-ffr-2121",
            "alarm_type": "Intrusion",
          },
        ]
      }
    }
  }
</script>
