<template>
  <v-container fill-height p-0 fluid class="invisible">
        <v-select
          v-model="selected_locale"
          :items="langs"
        ></v-select>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        selected_locale: '',
        langs: [
          {value: "en", text: "English"},
          {value: "ru", text: "Russian"}
        ]
      }
    },
    methods: {
      update_locale() {
        this.$i18n.locale = this.selected_locale;
        this.$store.dispatch("changeLocale", this.selected_locale);
      },
      set_initial_locale() {
        this.selected_locale = this.$store.getters.getLocale;
      }
    },
    watch: {
      selected_locale: "update_locale"
    },
    mounted() {
      this.set_initial_locale()
    }
  }
</script>

<style scoped>
  .invisible {
    opacity: 0;
  }
</style>