<template>
  <v-container grid-list-md fill-height fluid>
    <v-layout column>
      <v-flex d-flex md6>
        <v-layout row wrap>
          <v-flex d-flex md5>
            <v-layout row wrap>
              <v-flex d-flex md12>

              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex md7>
            <v-layout row wrap>
              <v-flex d-flex md12>
                <v-layout column>

                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex md5>
        <v-layout row wrap>

        </v-layout>
      </v-flex>
      <v-flex d-flex md1 class="footer-internal">
        <div class="caption text-center align-self-center relative_block">
          2018-2019 © Nokia IoT Laboratory, Moscow.   Powered by Nokia Glial™ and IMPACT™.   Version: {{frontend_version}}
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vue from "vue";
  import Axios from "axios";
  import VueAxios from "vue-axios";
  import Vue_i18n from 'vue-i18n';

  Vue.use(VueAxios, Axios, Vue_i18n);

  import table from "./components/table.vue";

  export default {
    components: {
      eventsTable: table,
    },
    data: () => ({
      frontend_version: VERSION,
    }),
    methods: {

    },
    computed: {
    }
  }
</script>
