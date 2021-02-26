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
                    @change="setPostDownload">
                </v-file-input>
            </div>
        </div>
    </v-container>
</template>

<script>
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
            this.preExecuteFilePath = this.scriptData.preExecuteScript?.value
            this.preDownloadFilePath = this.scriptData.preDownloadScript?.value
            this.postExecuteFilePath = this.scriptData.postExecuteScript?.value
            this.postDownloadFilePath = this.scriptData.postDownloadScript?.value
        },

        methods: {
            setPreExecute(event) {
                this.preExecuteFile = event
                this.preExecuteFilePath = event.path
                console.log('preExecuteFile: ', this.preExecuteFile)
            },
            setPreDownload(event) {
                this.preDownloadFile = event
                this.preDownloadFilePath = event.path
                console.log('preDownloadFile: ', this.preDownloadFile)
            },
            setPostExecute(event) {
                this.postExecuteFile = event
                this.postExecuteFilePath = event.path
                console.log('postExecuteFile: ', this.postExecuteFile)
            },
            setPostDownload(event) {
                this.postDownloadFile = event
                this.postDownloadFilePath = event.path
                console.log('postDownloadFile: ', this.postDownloadFile)
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
