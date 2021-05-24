<template>
    <v-container>
        <div class="d-flex flex-row mb-1">
            <span>File Name</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-1"
                    v-bind="attrs"
                    v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>This is the file name for the summary file, not including the file path.</span><br/>
                <span>note: if no file name is specified a new file will be generated each day named.</span><br/>
                <span><code>cloudcard-download-summary_yyyy-MM-dd.txt</code></span>
            </v-tooltip>
        </div>
        <v-text-field
            v-on:change="emitChange"
            v-model="summaryFileName"
            dense
            solo>
        </v-text-field>
        <div class="d-flex flex-row mb-1 mt-3">
            <span>Summary Directory</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>This is the full or relative file path to the directory into which the summary file will be saved.</span>
            </v-tooltip>
        </div>
        <div class="mt-1 mb-3" id="folder-input">
            <v-btn class="ma-2" @click="saveFolder()">Select Folder</v-btn>
            <span :v-if="summaryDirectory !== ''">{{ summaryDirectory }}</span>
        </div>
    </v-container>
</template>
<script>
const { app, dialog } = require('electron').remote
const path = require('path')

export default {
    name: 'SummaryService',

    props: [
        'summaryServiceData'
    ],

    data() {
        return {
            serviceSelection: '',
            serviceOptions: [],
            summaryFileName: '',
            summaryDirectory: ''
        }
    },

    created: function() {
        this.serviceSelection = this.summaryServiceData.summaryService.value
        this.summaryFileName = this.summaryServiceData.fileName.value
        this.summaryDirectory = this.summaryServiceData.directory.value
    },

    methods: {
        saveFolder() {
            dialog.showOpenDialog({
                properties:['openDirectory', 'createDirectory']
            }).then(result => {
                this.summaryDirectory = result.filePaths[0]
                this.emitChange()
            })
        },
        emitChange() {
            var result = [
                    {
                        type: 'downloader.summaryService',
                        value: this.serviceSelection
                    },
                    {
                        type: 'SimpleSummaryService.fileName',
                        value: this.summaryFileName
                    },
                    {
                        type: 'SimpleSummaryService.directory',
                        value: this.summaryDirectory
                    }
            ]
            this.$emit('set_value', result)
        }
    }
}
</script>
<style scoped>
    #folder-input {
        border: 1px dashed rgba(0, 0, 0, 0.3);
    }
    #folder-input-button {
        display: none;
        margin: 8px;
    }
</style>