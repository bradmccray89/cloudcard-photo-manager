<template>
    <v-container>
        <v-snackbar
            v-model="downloadSuccess"
            color="green"
            top
            :timeout="timeout">
            <div class="d-flex justify-center">
                {{ alertMessage }}  
            </div>
        </v-snackbar>
        <v-card
            class="mx-auto"
            width="300px">
            <v-card-text large>
                {{ msg }}
            </v-card-text>
            <v-container>
                <v-row class="d-flex justify-center mb-3">
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
                                @click="showLogFileLocation">
                                    <v-icon>mdi-file-document</v-icon>
                            </v-btn>
                        </template>
                        <span>View log file location</span>
                    </v-tooltip>
                </v-row>
                <v-row class="d-flex justify-center mb-3">
                    <v-btn
                        class="mb-3"
                        :to="{ path: '/Downloader/Api', query: { jsonInputData: this.savedDownloadSettings } }">
                            Change Settings
                    </v-btn>
                </v-row>
                <v-row class="mb-3 d-flex justify-center align-center">
                    <v-btn
                        id="download-btn"
                        color="primary"
                        :disabled="!showRedownloadButton"
                        @click="redownloadPhotos">
                            Run Downloader
                    </v-btn>
                </v-row>
            </v-container>
            <v-overlay :value="loading">
                <v-progress-circular
                    indeterminate
                    color="primary">
                </v-progress-circular>
            </v-overlay>
        </v-card>
    </v-container>
</template>

<script>
import { exec } from 'child_process'

const fs = require('fs')
const path = require('path')
const { dialog } = require('electron').remote

export default {
    name: 'Welcome',

    props: {
        msg: {
            type: String,
            default: 'Welcome to Cloudcard Photo Manager' 
        },
        showRedownloadButton: {
            type: Boolean,
            default: false
        }
    },

    data: () => {
        return {
            savedDownloadSettingsFileName: 'application-properties.json',
            savedDownloadScriptBatch: 'run.bat',
            savedDownloadScriptShell: 'run.sh',
            savedDownloadSettings: null,
            loading: false,
            downloadSuccess: false,
            batch: '',
            shell: '',
            results: [],
            cmd: '',
            alertMessage: 'Download Successful!',
            timeout: 5000,
            batchFileLocation: '',
            logFileLocation: '',
            showBatchFileButton: false,
            showLogFileButton: false
        }
    },
    created: function () {
        this.getFileData()
        if (this.$route.query.downloadSuccessful) {
            this.downloadSuccess = true
        }
        if (fs.existsSync(this.savedDownloadScriptBatch)) {
            this.batch = fs.readFileSync(this.savedDownloadScriptBatch)
            this.showBatchFileButton = true
            this.showLogFileButton = true
        } else if (fs.existsSync(this.savedDownloadScriptShell)) {
            this.shell = fs.readFileSync(this.savedDownloadScriptShell)
        }
    },

    methods: {
        redownloadPhotos() {
            if (this.batch) {
                this.runDownloadScript()
            } else {
                console.error('No script file found!')
            }
        },
        async runDownloadScript() {
            this.loading = true
            let output = await this.execute('run')
            if (!output.stderr) {
                this.downloadSuccess = true
            }
            this.loading = false
            let result = output.stdout ? output.stdout : output.stderr
            let stringOutput = ''
            for (let line of result.split('\n')) {
                stringOutput = stringOutput.concat(`${line}\n`)
            }
            fs.writeFileSync(path.join('downloader.txt'), stringOutput)
        },
        async execute(cmd) {
            return new Promise(function (resolve, reject) {
                exec(cmd, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ stdout, stderr });
                    }
                });
            })
        },
        getFileData() {
            if (fs.existsSync(this.savedDownloadSettingsFileName)) {
                this.savedDownloadSettings = JSON.parse(fs.readFileSync(this.savedDownloadSettingsFileName))
                this.batchFileLocation = this.savedDownloadSettings['batchFileLocation']
                this.logFileLocation = this.savedDownloadSettings['logFileLocation']
                for (var key in this.savedDownloadSettings) {
                    var value = this.savedDownloadSettings[key]
                    var item = {
                        type: key,
                        value: value
                    }
                    this.results.push(item)
                }
            }
        },
        showBatchFileLocation() {
            dialog.showOpenDialog({
                defaultPath: this.batchFileLocation
            })
        },
        showLogFileLocation() {
            dialog.showOpenDialog({
                defaultPath: this.logFileLocation
            })
        }
    }
}
</script>

<style scoped>
    #download-btn{
        justify-self: center;
    }
</style>
