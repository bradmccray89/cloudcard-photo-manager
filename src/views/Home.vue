<template>
  <div class="text-center">
    <v-container fluid>
      <img alt="CloudCard Photo Manager" src="../assets/logo-only-300x300.png">
      <Welcome v-bind:showRedownloadButton="showRedownloadButton" v-on:openLogger="openLogger"/>
      <v-row v-if="showLogger" justify="center">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <Logger></Logger>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Welcome from '@/components/Welcome.vue'
import Logger from '@/components/Logger'

const fs = require('fs')

export default {
  name: 'Home',

  components: {
    Welcome,
    Logger
  },

  data: () => {
    return {
      dialog: false,
      savedDownloadSettings: [],
      showRedownloadButton: false,
      showLogger: false,
      logFileLocation: ''
    }
  },

  created: function() {
    let jsonFile = 'application-properties.json'
    if (fs.existsSync(jsonFile)) {
      this.showRedownloadButton = true
      this.savedDownloadSettings = JSON.parse(fs.readFileSync(jsonFile))
    }
  },

  methods: {
    closeLogger() {
      this.showLogger = false
    },
    openLogger(info) {
      console.log('info', info)
      this.showLogger = true
    }
  }
}
</script>

<style scoped>
    .main {
        text-align: center;
    }
</style>
