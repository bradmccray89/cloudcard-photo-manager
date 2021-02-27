<template>
    <v-container id="container">
        <v-row>
            <v-col col="auto">
                <div class="d-flex flex-row mb-1">
                    <span>Pre-Processor</span>
                    <v-tooltip bottom max-width="350px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon class="ml-1"
                            v-bind="attrs"
                            v-on="on"
                            >
                                info_outline
                            </v-icon>
                        </template>
                        <span>DoNothingPreProcessor - placeholder service that makes no changes to the photo before storing it.</span><br>
                        <span>BytesLinkPreProcessor - modifies the external URL from which the binary photo file is retrieved, AKA the Bytes Link.</span>
                    </v-tooltip>
                </div>
                <v-select
                    v-model="preProcessorSelection"
                    :items="preProcessorOptions"
                    hide-details
                    dense
                    solo
                    @change="emitChange()">
                </v-select>
            </v-col>
            <v-col col="auto">
                <div v-if="preProcessorSelection === 'BytesLinkPreProcessor'">
                    <div class="d-flex flex-row mb-1">
                        <span>Bytes Link URL Template</span>
                        <v-tooltip bottom max-width="350px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon class="ml-1"
                                v-bind="attrs"
                                v-on="on"
                                >
                                    info_outline
                                </v-icon>
                            </template>
                            <span>This is the template to use for rewriting the bytes link. The photo's public key with replace the token <code>{publicKey}</code> if it exists in the template.</span><br>
                        </v-tooltip>
                    </div>
                    <v-textarea
                        v-model="urlTemplate"
                        rows="1"
                        hide-details
                        solo
                        dense
                        @change="emitChange()">
                    </v-textarea>
                </div>
            </v-col>
        </v-row>
        <v-divider class="my-3"></v-divider>
        <v-row>
            <v-col col="6">
                <div class="d-flex flex-row mb-1">
                    <span>Post-Processor</span>
                    <v-tooltip bottom max-width="350px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon class="ml-1"
                            v-bind="attrs"
                            v-on="on"
                            >
                                info_outline
                            </v-icon>
                        </template>
                        <span>DoNothingPreProcessor - placeholder service that performs no actions.</span><br>
                        <span>BytesLinkPreProcessor - executes a database query in response after downloading the photo.</span>
                    </v-tooltip>
                </div>
                <v-select
                    v-model="postProcessorSelection"
                    :items="postProcessorOptions"
                    hide-details
                    dense
                    solo
                    @change="emitChange()">
                </v-select>
            </v-col>
            <v-col col="6">
                <div v-if="postProcessorSelection === 'DatabasePostProcessor'">
                    <div class="d-flex flex-row mb-1">
                        <span>Query</span>
                        <v-tooltip bottom max-width="350px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon class="ml-1"
                                v-bind="attrs"
                                v-on="on"
                                >
                                    info_outline
                                </v-icon>
                            </template>
                            <span>This is the update/insert query that will update/insert into the DB</span><br>
                        </v-tooltip>
                    </div>
                    <v-textarea
                        v-model="querySelection"
                        rows="2"
                        hide-details
                        solo
                        dense
                        placeholder="ex. UPDATE my_table SET date_created = ?, file_location = ? WHERE student_id = ?"
                        @change="emitChange()">
                    </v-textarea>
                </div>
            </v-col>
        </v-row>
        <div class="d-flex flex-row mb-1 mt-3">
            <span>Photo File Path</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span> When saving the metadata about a photo, this file path is saved instead of the actual file path of the downloaded photo. The file name itself remains unchanged. Useful for network drives that may be mapped/mounted differently on different servers/workstations.</span>
            </v-tooltip>
        </div>
        <div class="mt-1 mb-3" id="folder-input">
            <v-btn class="ma-2" @click="saveFolder()">Select Folder</v-btn>
            <span :v-if="photoFilePath !== ''">{{ photoFilePath }}</span>
        </div>
        <div class="d-flex flex-row mb-1">
            <span>Param Names</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-1"
                    v-bind="attrs"
                    v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>These are the names of the parameters that will be passed into the update/insert query.</span>
            </v-tooltip>
        </div>
        <v-text-field
            v-on:change="emitChange"
            v-model="paramNameSelection"
            dense
            solo>
        </v-text-field>
        <div class="d-flex flex-row mb-1">
            <span>Param Types</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-1"
                    v-bind="attrs"
                    v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>These are the sql types of the parameters that will be passed into the update query.</span>
            </v-tooltip>
        </div>
        <v-text-field
            v-on:change="emitChange"
            v-model="paramTypeSelection"
            dense
            solo>
        </v-text-field>
    </v-container>
</template>
<script>
const { dialog } = require('electron').remote
export default {
    name: 'Processor',
    
    props: {
        processorData: {
            type: Object,
            default: function() {
                return {
                    preProcessor: {
                        type: 'downloader.preProcessor',
                        value: 'DoNothingPreProcessor'
                    },
                    bytesLink: {
                        type: 'BytesLinkPreprocessor.urlTemplate',
                        value: ''
                    },
                    postProcessor: {
                        type: 'downloader.postProcessor',
                        value: 'DoNothingPostProcessor'
                    },
                    photoFilePath: {
                        type: 'DatabasePostProcessor.override.photoFilePath',
                        value: ''
                    },
                    query: {
                        type: 'DatabasePostProcessor.query',
                        value: ''
                    },
                    paramNames: {
                        type: 'DatabasePostProcessor.query.paramNames',
                        value: ''
                    },
                    paramTypes: {
                        type: 'DatabasePostProcessor.query.paramTypes',
                        value: ''
                    }
                }
            }
        }
    },

    data() {
        return {
            preProcessorSelection: '',
            preProcessorOptions: [ 'DoNothingPreProcessor', 'BytesLinkPreProcessor' ],
            postProcessorSelection: '',
            postProcessorOptions: [ 'DoNothingPostProcessor', 'DatabasePostProcessor' ],
            urlTemplate: '',
            querySelection: '',
            photoFilePath: '',
            paramNameSelection: '',
            paramTypeSelection: '',
        }
    },

    created: function() {
        this.preProcessorSelection = this.processorData.preProcessor.value
        this.postProcessorSelection = this.processorData.postProcessor.value
        this.urlTemplate = this.processorData.bytesLink.value
        this.querySelection = this.processorData.query.value
        this.photoFilePath = this.processorData.photoFilePath.value
        this.paramNameSelection = this.processorData.paramNames.value
        this.paramTypeSelection = this.processorData.paramTypes.value
    },

    methods: {
        saveFolder() {
            dialog.showOpenDialog({
                properties:['openDirectory', 'createDirectory']
            }).then(result => {
                this.photoFilePath = result.filePaths[0]
                this.emitChange()
            })
        },
        emitChange() {
            var result = [
                {
                    type: 'downloader.preProcessor',
                    value: this.preProcessorSelection
                },
                {
                    type: 'BytesLinkPreprocessor.urlTemplate',
                    value: this.urlTemplate
                },
                {
                    type: 'downloader.postProcessor',
                    value: this.postProcessorSelection
                },
                {
                    type: 'DatabasePostProcessor.override.photoFilePath',
                    value: this.photoFilePath
                },
                {
                    type: 'DatabasePostProcessor.query',
                    value: this.querySelection
                },
                {
                    type: 'DatabasePostProcessor.query.paramNames',
                    value: this.paramNameSelection
                },
                {
                    type: 'DatabasePostProcessor.query.paramTypes',
                    value: this.paramTypeSelection
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