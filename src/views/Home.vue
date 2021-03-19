<template>
  <div class="text-center">
    <v-container fluid>
      <img alt="CloudCard Photo Manager" src="../assets/logo-only-300x300.png">
      <Welcome v-bind:showRedownloadButton="showRedownloadButton"/>
    </v-container>
    <v-overlay :value="showLogger">
      <Logger v-bind:file="downloadLogFile" v-on:close="closeLogger"></Logger>
    </v-overlay>
  </div>
</template>

<script>
import Welcome from '@/components/Welcome.vue'
import Logger from '@/components/Logger.vue'

const fs = require('fs')

export default {
  name: 'Home',

  components: {
    Welcome,
    Logger
  },

  data: () => {
    return {
      savedDownloadSettings: [],
      showRedownloadButton: false,
      showLogger: false,
      downloadLogFile: ''
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
    }
  }
}
</script>

<style scoped>
    .main {
        text-align: center;
    }
</style>
