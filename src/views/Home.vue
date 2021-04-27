<template>
  <div class="text-center">
    <v-container fluid>
      <img alt="CloudCard Photo Manager" src="../assets/logo-only-300x300.png">
      <Welcome v-bind:showRedownloadButton="showRedownloadButton" v-on:openLogger="openLogger"/>
    </v-container>
  </div>
</template>

<script>
import Welcome from '@/components/Welcome.vue'

const fs = require('fs')
const electron = require('electron').remote
const BrowserWindow = electron.BrowserWindow

export default {
  name: 'Home',

  components: {
    Welcome,
  },

  data: () => {
    return {
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
      let loggerWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true,
          webSecurity: false
        },
        parent: electron.getCurrentWindow(),
        autoHideMenuBar: true,
        title: `Logger - ${info.logFileLocation}`
      })
      loggerWindow.on('close', function() { loggerWindow = null })
      const loggerUrl = window.location.origin + '/logger'
      console.log(loggerUrl)
      loggerWindow.loadURL(loggerUrl)
    }
  }
}
</script>

<style scoped>
    .main {
        text-align: center;
    }
</style>
