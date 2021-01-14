<template>
    <v-card
        class="mx-auto"
        width="300px">
        <v-card-text large>
            {{ msg }}
        </v-card-text>
        <v-container>
            <v-row class="d-flex justify-center mb-3">
                <v-btn
                    class="mb-3 mt-5"
                    :to="{ path: '/Downloader/Api', query: { inputDataFromFile: this.results } }">
                        New Download
                </v-btn>
            </v-row>
            <v-row class="d-flex justify-center">
                <v-btn
                    class="mb-3"
                    color="primary"
                    v-if="showRedownloadButton"
                    @click="redownloadPhotos">
                        Re-run Download
                </v-btn>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
const fs = require('fs')

export default {
  name: 'Welcome',

  props: [ 
    'msg',
    'showRedownloadButton'
  ],

  data: () => {
    return {
        savedDownloadSettingsFileName: 'application-properties.json',
        savedDownloadScriptBatch: 'run.bat',
        savedDownloadScriptShell: 'run.sh',
        savedDownloadSettings: null,
        batch: '',
        shell: '',
        results: []
    }
  },
  created: function () {
    this.getFileData()
    if (fs.existsSync(this.savedDownloadScriptBatch)) {
        this.batch = fs.readFileSync(this.savedDownloadScriptBatch)
    } else if (fs.existsSync(this.savedDownloadScriptShell)) {
        this.shell = fs.readFileSync(this.savedDownloadScriptShell)
    }
  },

  methods: {
    redownloadPhotos() {
        if (this.batch) {
            this.execute()
        } else if (this.shell) {
            this.execute
        } else {
            console.log('No script file found!')
        }
    },
    getFileData() {
        if (fs.existsSync(this.savedDownloadSettingsFileName)) {
            this.savedDownloadSettings = JSON.parse(fs.readFileSync(this.savedDownloadSettingsFileName))
            for (var key in this.savedDownloadSettings) {
                var value = this.savedDownloadSettings[key]
                var item = {
                    type: key,
                    value: value
                }
                this.results.push(item)
            }
        }
    }
  }
}
</script>
