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
                <v-row class="my-3 d-flex justify-center align-center">
                    <v-btn
                        class="flex-grow"
                        color="error"
                        v-if="showStopDownloaderButton"
                        @click="stopDownloader()">
                            Stop Downloader
                    </v-btn>
                </v-row>
                <v-row class="my-3 d-flex justify-center align-center">
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                class="flex-grow"
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
                        </template>
                        <span>View log file location</span>
                    </v-tooltip>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
import { exec } from 'child_process'

const fs = require('fs')
const shell = require('electron').shell

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

    data() {
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
            showLogFileButton: false,
            showStopDownloaderButton: false,
            dialog: false,
            childProcess: null,
        }
    },

    created: function () {
        this.getFileData()
        if (fs.existsSync(this.savedDownloadScriptBatch)) {
            this.batch = fs.readFileSync(this.savedDownloadScriptBatch)
        } else if (fs.existsSync(this.savedDownloadScriptShell)) {
            this.shell = fs.readFileSync(this.savedDownloadScriptShell)
        }
        if (this.$route.query.runDownload) {
            this.runDownloadScript()
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
        runDownloadScript() {
            this.showStopDownloaderButton = true
            this.openLogger()
            this.execute('run')
        },
        execute(cmd) {
            this.childProcess = exec(cmd)
            if(this.childProcess.pid > 0) {
                this.$emit('save_pid', this.childProcess.pid)
            }
        },
        getFileData() {
            if (fs.existsSync(this.savedDownloadSettingsFileName)) {
                var fileBuffer = fs.readFileSync(this.savedDownloadSettingsFileName)
                if (fileBuffer.length > 0) {
                    this.savedDownloadSettings = JSON.parse(fileBuffer)
                    this.batchFileLocation = this.savedDownloadSettings['batchFileLocation']
                    this.showBatchFileButton = this.batchFileLocation !== '' ? true : false
                    this.logFileLocation = this.savedDownloadSettings['logFileLocation']
                    this.showLogFileButton = this.logFileLocation !== '' ? true : false
                    this.summaryFileLocation = this.savedDownloadSettings['SimpleSummaryService.directory']
                    const savedPID = this.savedDownloadSettings['PID']
                    if (savedPID && this.processIsRunning(savedPID)) {
                        this.showStopDownloaderButton = true
                    }
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
        },
        showBatchFileLocation() {
            shell.showItemInFolder(this.batchFileLocation)
        },
        openLogger() {
            const loggerInfo = {
                logFileLocation: this.logFileLocation
            }
            this.$emit('openLogger', loggerInfo)
        },
        showSummaryFile() {
            console.log('show summaryfile')
        },
        closeLogger() {
            this.showLogger = false
        },
        stopDownloader() {
            this.showStopDownloaderButton = false
            this.$emit('stop_downloader')
        },
        processIsRunning(pid) {
            try {
                process.kill(pid, 0)
                return true
            } catch(e) {
                this.stopDownloader()
                return false
            }
        }
    }
}
</script>

<style scoped>
    #download-btn{
        justify-self: center;
    }
</style>
