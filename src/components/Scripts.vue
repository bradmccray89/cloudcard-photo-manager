<template>
    <!-- Eventually Make these file uploaders that limit selection to *.sh, *.bat *.cmd script files -->
    <v-container>
        <div class="d-flex flex-row mb-8">
            <div class="flex-col flex-grow-1 mr-5">
                <div class="d-flex flex-row mb-1">
                    <span>Pre-Execute Script File</span>
                    <v-tooltip bottom max-width="350px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon class="ml-1"
                            v-bind="attrs"
                            v-on="on"
                            >
                                info_outline
                            </v-icon>
                        </template>
                        <span>This shell/batch script will be executed each time before the downloader executes regardless of whether any photos are ready to be downloaded.</span>
                    </v-tooltip>
                </div>
                <v-file-input class="mb-2"
                    solo
                    dense
                    hide-details
                    @change="setPreExecute">
                </v-file-input>
            </div>
            <div class="flex-col flex-grow-1">
                <div class="d-flex flex-row mb-1">
                    <span>Post-Execute Script File</span>
                    <v-tooltip bottom max-width="350px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon class="ml-1"
                            v-bind="attrs"
                            v-on="on"
                            >
                                info_outline
                            </v-icon>
                        </template>
                        <span>This shell/batch script will be executed each time after the downloader executes regardless of whether any photos were downloaded.</span>
                    </v-tooltip>
                </div>
                <v-file-input class="mb-2"
                    solo
                    dense
                    hide-details
                    @change="setPostExecute">
                </v-file-input>
            </div>
        </div>
        <div class="d-flex flex-row mb-8">
            <div class="flex-col flex-grow-1 mr-5">
                <div class="d-flex flex-row mb-1">
                    <span>Pre-Download Script File</span>
                    <v-tooltip bottom max-width="350px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon class="ml-1"
                            v-bind="attrs"
                            v-on="on"
                            >
                                info_outline
                            </v-icon>
                        </template>
                        <span>This shell/batch script will be executed after finding photos that are ready to be downloaded but before downloading them.</span>
                    </v-tooltip>
                </div>
                <v-file-input class="mb-2"
                    solo
                    dense
                    hide-details
                    @change="setPreDownload">
                </v-file-input>
            </div>
            <div class="flex-col flex-grow-1">
                <div class="d-flex flex-row mb-1">
                    <span>Post-Download Script File</span>
                    <v-tooltip bottom max-width="350px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon class="ml-1"
                            v-bind="attrs"
                            v-on="on"
                            >
                                info_outline
                            </v-icon>
                        </template>
                        <span>This shell/batch script will be executed after each time that the downloader successfully downloads photos.</span>
                    </v-tooltip>
                </div>
                <v-file-input class="mb-2"
                    dense
                    solo
                    hide-details
                    v-model="postDownloadFile"
                    @change="setPostDownload">
                </v-file-input>
            </div>
        </div>
    </v-container>
</template>

<script>
    const fs = require('fs')

    export default {
        name: 'Scripts',

        props: {
            scriptData: {
                type: Object,
                default: function() {
                    return {
                        preExecuteScript: {
                            type: 'ShellCommandService.preExecuteCommand',
                            value: ''
                        },
                        preDownloadScript: {
                            type: 'ShellCommandService.preDownloadCommand',
                            value: ''
                        },
                        postExecuteScript: {
                            type: 'ShellCommandService.postExecuteCommand',
                            value: ''
                        },
                        postDownloadScript: {
                            type: 'ShellCommandService.postDownloadCommand',
                            value: ''
                        }
                    }
                }
            },
        },

        data() {
            return {
                preExecuteFile: {},
                preExecuteFilePath: '',
                preDownloadFile: {},
                preDownloadFilePath: '',
                postExecuteFile: {},
                postExecuteFilePath: '',
                postDownloadFile: {},
                postDownloadFilePath: ''
            }
        },

        created: function() {
            this.preExecuteFilePath = this.scriptData.preExecuteScript.value
            this.preDownloadFilePath = this.scriptData.preDownloadScript.value
            this.postExecuteFilePath = this.scriptData.postExecuteScript.value
            this.postDownloadFilePath = this.scriptData.postDownloadScript.value
            this.setFileObjects()
        },

        methods: {
            setFileObjects() {
                this.postDownloadFile = this.postDownloadFilePath !== '' ? new File(fs.readFileSync(this.postDownloadFilePath), this.postDownloadFilePath) : null
                console.log(this.postDownloadFile)
            },
            setPreExecute(event) {
                this.preExecuteFile = event
                this.preExecuteFilePath = event.path
                this.emitChanges()
            },
            setPreDownload(event) {
                this.preDownloadFile = event
                this.preDownloadFilePath = event.path
                this.emitChanges()
            },
            setPostExecute(event) {
                this.postExecuteFile = event
                this.postExecuteFilePath = event.path
                this.emitChanges()
            },
            setPostDownload(event) {
                this.postDownloadFile = event ? event : null
                this.postDownloadFilePath = event ? event.path : ''
                this.emitChanges()
            },
            emitChanges() {
                const result = [
                    {
                        type: 'ShellCommandService.preExecuteCommand',
                        value: this.preExecuteFilePath
                    },
                    {
                        type: 'ShellCommandService.preDownloadCommand',
                        value: this.preDownloadFilePath
                    },
                    {
                        type: 'ShellCommandService.postExecuteCommand',
                        value: this.postExecuteFilePath
                    },
                    {
                        type: 'ShellCommandService.postDownloadCommand',
                        value: this.postDownloadFilePath
                    }
                ]
                console.log('result', result)
                this.$emit('set_value', result)
            }
        }
    }
</script>

<style scoped>
    .container {
        padding: 12px 0;
    }
    .text-area-code {
        font-family: Consolas;
        font-size: 14px;
        line-height: 1rem !important;
    }
</style>
