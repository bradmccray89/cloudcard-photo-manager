WW<template>
  <div class="text-center">
    <v-container fluid>
      <img alt="CloudCard Photo Manager" src="../assets/logo-only-300x300.png">
      <Welcome
        v-bind:showRedownloadButton="showRedownloadButton"
        v-on:openLogger="openLogger"
        v-on:save_pid="savePID($event)"
        v-on:stop_downloader="stopDownloader()"
      >
      </Welcome>
      <v-dialog
        v-model="dialog"
        fullscreen
        scrollable
        transition="dialog-bottom-transition"
      >
        <template>
            <Logger v-if="dialog"
              v-bind:logFileLocation="logFileLocation"
              v-on:close_logger="closeLogger"
            >
            </Logger>
        </template>
      </v-dialog>
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
      showLogFileButton: false,
      showBatchFileButton: false,
      logFileLocation: ''
    }
  },

  created: function() {
    let jsonFile = 'application-properties.json'
    var fileBuffer = fs.readFileSync(jsonFile)
    if (fs.existsSync(jsonFile) && fileBuffer.length > 0) {
      let jsonFileData = fs.readFileSync(jsonFile)
      this.showRedownloadButton = true
      this.savedDownloadSettings = JSON.parse(jsonFileData)
      if (this.savedDownloadSettings.length > 0) {
        this.setBatchAndLogFileButtons(this.savedDownloadSettings)
      }
    }
  },

  methods: {
    setBatchAndLogFileButtons(settings) {
      if(settings['batchFileLocation']) {
        this.batchFileLocation = settings['batchFileLocation'];
        this.showBatchFileButton = true;
      }
      if(settings['logFileLocation']) {
        this.logFileLocation = settings['logFileLocation']
        this.showLogFileButton = true;
      }
    },
    closeLogger() {
      this.dialog = false
    },
    openLogger() {
      this.logFileLocation = this.savedDownloadSettings['logFileLocation']
      this.dialog = true
    },
    showBatchFileLocation() {
      console.log('showBatchFileLocation')
    },
    savePID(pid) {
      this.savedDownloadSettings['PID'] = pid
      this.$emit('save_process_id', pid)
      const dataToSave = this.savedDownloadSettings
      fs.writeFile('application-properties.json', '', function() {
          fs.writeFileSync('application-properties.json', JSON.stringify(dataToSave, null, 4))
      })
    },
    removePID() {
      delete this.savedDownloadSettings['PID']
      const dataToSave = this.savedDownloadSettings
      fs.writeFile('application-properties.json', '', function() {
          fs.writeFileSync('application-properties.json', JSON.stringify(dataToSave, null, 4))
      })
    },
    stopDownloader() {
      this.removePID()
      this.$emit('stop_downloader')
    }
  }
}
</script>

<style scoped>
    .main {
        text-align: center;
    }
</style>
