<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      Logger Works
    </v-dialog>
  </v-row>
</template>
<script>
export default {
    name: 'Logger',

    props: [
        'logFileLocation',
    ],

    data() {
        return {
            overlay: false,
            logInfo: '',
            tail: null,
            fileExists: false
        }
    },

    created: function() {
        console.log('logger works')
    },

    methods: {
    }
}
</script>
<style scoped>
</style>
