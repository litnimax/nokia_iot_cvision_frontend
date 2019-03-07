<template>
  <div>
    <v-dialog v-on:keydown.esc="hide()" v-on:keydown.enter="update_areas()" :value="visible" persistent min-height="500">
      <v-card>
        <v-card-title class="headline">Добавить зону</v-card-title>
        <v-card-text id="canvas_container" class="text-xs-center">
          <canvas style="position: absolute; z-index:200" id="points_canvas" class="canvas1"></canvas>
          <canvas style="position: relative; z-index:100" id="current_user_image_canvas" class="canvas2"></canvas>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" flat @click="$parent.delete_areas()">Удалить все зоны</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="warning darken-1" flat @click="clear_canvas_points">Сбросить текущую область</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="update_areas()">Создать зону</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <snackbar ref="snackbar"></snackbar>
  </div>
</template>

<script>
  import Vue from "vue";
  import VueTimers from "vue-timers";

  Vue.use(VueTimers);

  import Axios from "axios";
  import VueAxios from "vue-axios";

  Vue.use(VueAxios, Axios);

  import snackbar from "./snackbar.vue";

  export default {
    data: () => ({
      visible: false,
      canvas_container_width: 0,
      canvas_container_height: 0,
      canvas: false,
      points_canvas: false,
      canvas_ctx: {},
      points_canvas_ctx: {},
      new_area_points: []
    }),
    components: {
      snackbar
    },
    timers: {
      get_canvas_image: {time: 500, autostart: false, repeat: true}
    },
    mounted: function () {
      this.get_canvas_image();
    },
    methods: {
      get_canvas_image() {
        if (!this.canvas) {
          this.create_canvases();
        }
        Vue.axios
          .get(this.$store.getters.getOpenCVURL + "/get_user_image")
          .then(response => {
            let image = new Image();
            image.onload = () => {
              this.canvas.width = this.points_canvas.width = image.width;
              this.canvas.height = this.points_canvas.height = image.height;
              this.canvas_ctx.drawImage(image, 0, 0);
            };
            image.src = "data:image/jpg;base64, " + response.data;
          })
          .catch(error => {
            console.log(error)
          });
      },
      create_canvases() {
        this.canvas = document.getElementById("current_user_image_canvas");
        this.canvas_ctx = this.canvas.getContext("2d");

        this.points_canvas = document.getElementById("points_canvas");
        this.points_canvas_ctx = this.points_canvas.getContext("2d");

        this.points_canvas.addEventListener("mousedown", this.getPosition, false);
      },
      getPosition() {
        let rect = this.points_canvas.getBoundingClientRect();
        let x = Math.round(event.clientX - rect.left);
        let y = Math.round(event.clientY - rect.top);
        this.new_area_points.push([x,y]);
        console.log(this.new_area_points);
      },
      show() {
        this.visible = true;
        this.$timer.start('get_canvas_image')
      },
      hide() {
        this.visible = false;
        this.$timer.stop('get_canvas_image')
      },
      update_areas() {
        this.$parent.update_areas(this.new_area_points);
      },
      clear_canvas_points() {
        this.new_area_points = []
      }
    },
    watch: {
      new_area_points: function (points) {
        this.$timer.stop('get_canvas_image');
        let ctx = this.points_canvas_ctx;
        ctx.clearRect(0, 0, this.points_canvas.width, this.points_canvas.height);

        for(let i=0;i<points.length;i++) {
          ctx.beginPath();
          ctx.arc(points[i][0], points[i][1], 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = 'white';
          ctx.fill();
        }

        if (points.length > 1) {
          for(let i=0;i<points.length;i++){
            ctx.beginPath();
            ctx.moveTo(points[0][0],points[0][1]);
            for(let i=1;i<points.length;i++){
              ctx.lineTo(points[i][0],points[i][1]);
            }
            ctx.strokeStyle='red';
            ctx.lineWidth=2;
            if (points.length > 2) {
              ctx.fillStyle = "rgba(255, 102, 102, 0.2)";
              ctx.closePath();
              ctx.fill();
            }
            ctx.stroke();
          }
        }
      }
    }
  };
</script>
