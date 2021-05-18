<template>
  <div class="text-center">
    <v-container fluid>
      <img alt="CloudCard Photo Manager" src="../assets/logo-only-300x300.png">
          <Welcome v-bind:showRedownloadButton="showRedownloadButton" v-on:openLogger="openLogger"/>
          <v-row class="d-flex justify-center my-3">
              <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          class="mb-3 flex-grow"
                          :disabled="!showBatchFileButton"
                          v-bind="attrs"
                          v-on="on"
                          @click="showBatchFileLocation">
                              <v-icon>mdi-file-code</v-icon>
                      </v-btn>
                  </template>
                  <span>View batch script file location</span>
              </v-tooltip>
              <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                      <v-btn
                          class="ml-2 flex-grow"
                          :disabled="!showLogFileButton"
                          v-bind="attrs"
                          v-on="on"
                          @click.stop="openLogger">
                              <v-icon>mdi-file-document</v-icon>
                      </v-btn>
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
                  </template>
                  <span>View log file location</span>
              </v-tooltip>
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
      showLogFileButton: false,
      showBatchFileButton: false,
      logFileLocation: ''
    }
  },

  created: function() {
    let jsonFile = 'application-properties.json'
    if (fs.existsSync(jsonFile)) {
      this.showRedownloadButton = true
      this.savedDownloadSettings = JSON.parse(fs.readFileSync(jsonFile))
      this.setBatchAndLogFileButtons(this.savedDownloadSettings)
    }
  },

  methods: {
    setBatchAndLogFileButtons(settings) {
      if(settings['batchFileLocation']) {
        console.log('batch', settings['batchFileLocation'])
        this.batchFileLocation = settings['batchFileLocation'];
        this.showBatchFileButton = true;
      }
      if(settings['logFileLocation']) {
        console.log('log', settings['logFileLocation'])
        this.logFileLocation = settings['logFileLocation']
        this.showLogFileButton = true;
      }
    },
    closeLogger() {
      this.dialog = false
    },
    openLogger() {
      this.dialog = true
    },
    showBatchFileLocation() {
      console.log('showBatchFileLocation')
    }
  }
}
</script>

<style scoped>
    .main {
        text-align: center;
    }
</style>
