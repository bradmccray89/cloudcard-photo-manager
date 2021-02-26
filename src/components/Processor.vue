<template>
    <v-container>
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
                        auto-grow
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
                        v-model="query"
                        rows="1"
                        hide-details
                        auto-grow
                        solo
                        dense
                        placeholder="ex. UPDATE my_table SET date_created = ?, file_location = ? WHERE student_id = ?"
                        @change="emitChange()">
                    </v-textarea>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
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
                        value: 'DoNothingProcessor'
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
            query: '',
        }
    },

    methods: {
        emitChange() {
            const result = []
            if (this.preProcessorSelection === 'DoNothingPreProcessor') {
                console.log('DoNothingPreProcessor')
            } else {
                console.log('BytesLinkPreProcessor')
            }
        }
    }
}
</script>
<style scoped>

</style>