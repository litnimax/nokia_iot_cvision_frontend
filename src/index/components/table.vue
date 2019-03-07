<template>
  <div>
    <v-layout column class="table-column">
      <v-flex md10 d-flex class="flex-full-height">
        <v-card class="no-shadow">
          <v-data-table :headers="table_headers" :items="data" :pagination.sync="pagination" hide-actions
                        class="elevation-1">
            <template slot="headers" slot-scope="props">
              <tr class="text-center">
                <th v-for="header in props.headers" :key="header.text" :width="header.width" :align="header.align">
                  {{ header.text }}
                </th>
              </tr>
            </template>
            <template slot="items" slot-scope="props">
              <tr :class="props.item.selected ? 'row-selected text-center' : 'text-center'">
                <td>{{ props.item.alarm_time}}</td>
                <td>{{ props.item.alarm_zone}}</td>
                <td>{{ props.item.alarm_type}}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-flex md2 v-if="pagination.totalItems > pagination.rowsPerPage" d-flex>
        <v-card class="no-shadow pagination-block">
          <v-pagination class="custom-pagination" v-model="pagination.page" :length="pages"></v-pagination>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import Vue from "vue";
  import Vue_i18n from 'vue-i18n';

  Vue.use(Vue_i18n);

  export default {
    components: {
    },
    data: () => ({
      pagination: {rowsPerPage: 3}
    }),
    props: ["data"],
    computed: {
      pages() {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) {
          return 0;
        }
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
      },
      table_headers() {
        return [
          {text: this.$i18n.t("message.alarm_time"), value: "alarm_time", width: "10%", align: "center"},
          {
            text: this.$i18n.t("message.alarm_zone"),
            value: "alarm_zone",
            width: "10%",
            align: "center"
          },
          {text: this.$i18n.t("message.alarm_type"), value: "alarm_type", width: "10%", align: "center"},
        ]
      }
    },
    methods: {
    }
  };
</script>

<style scoped>
  .row-selected {
    background-color: rgb(155, 204, 255);
  }

  thead tr {
    height: 25px !important;
  }

  .table-column >>> tbody tr {
    height: 50px !important;
    cursor: pointer;
  }

  .button-sm {
    margin: -11px !important;
  }

  .button-sm button {
    height: 16px;
    width: 16px;
    margin: 0 !important;
  }

  .table-column {
    height: 100% !important;
  }
</style>

