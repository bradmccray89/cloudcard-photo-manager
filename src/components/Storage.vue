<template>
    <v-container>
        <div class="d-flex flex-row mb-1">
            <span>Storage Type</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>Determines how the downloaded photos will be stored.</span>
            </v-tooltip>
        </div>
        <v-select
            v-model="storageChoice"
            :items="storageTypes"
            item-text="name"
            item-value="entry"
            label="Storage Service"
            dense
            solo
            @change="emitChange()">
        </v-select>
        <v-divider></v-divider>
        <FileStorage v-if="storageChoice === 'FileStorageService'"
            v-bind:selectedPath="storageData.photoStorageLocation.value"
            v-on:set_folders="setFolderForStorage">
        </FileStorage>
        <DatabaseConnection v-if="storageChoice === 'SimpleDatabaseStorageService'"></DatabaseConnection>
    </v-container>
</template>

<script>
    import FileStorage from './FileStorage'
    import DatabaseConnection from './DatabaseConnection'

    const path = require('path')

    export default {
        name: 'Storage',

        components: {
            FileStorage,
        },

        props: {
            storageData: {
                type: Object,
                default: function() {
                    return {
                        storageType: {
                            type: 'downloader.storageService',
                            value: this.downloadData['downloader.storageService']
                        },
                        photoStorageLocation: {
                            type: 'downloader.photoDirectories',
                            value: this.downloadData['downloader.photoDirectories']
                        },
                        summaryLocation: {
                            type: 'SimpleSummaryService.directory',
                            value: this.downloadData['SimpleSummaryService.directory']
                        }
                    }
                }
            }
        },

        created: function () {
            this.storageChoice = this.storageTypes.find(f => f.entry === this.storageData.storageType.value).entry
            this.photoStorageLocation = this.storageData.photoStorageLocation.value
            this.summaryLocation = this.storageData.summaryLocation.value
        },

        data() {
            return {
                storageTypes: [
                    {
                        name: 'File Storage',
                        entry: 'FileStorageService'
                    },
                    {
                        name: 'Database Storage',
                        entry: 'SimpleDatabaseStorageService'
                    }
                ],
                storageChoice: '',
                photoStorageLocation: '',
                summaryLocation: ''
            }
        },

        methods: {
            emitChange() {
                console.log('emitter')
                if (this.storageType !== '' && this.photoStorageLocation !== '') {
                    this.summaryLocation = path.dirname(this.photoStorageLocation)
                    var result = [
                        {
                            type: 'downloader.storageService',
                            value: this.storageChoice
                        },
                        {
                            type: 'downloader.photoDirectories',
                            value: this.photoStorageLocation
                        },
                        {
                            type: 'SimpleSummaryService.directory',
                            value: this.summaryLocation
                        }
                    ]
                    this.$emit('set_value', result)
                }
            },
            setFolderForStorage(event) {
                event.forEach(item => {
                    if (item.type === 'downloader.photoDirectories') {
                        this.photoStorageLocation = item.value
                    }
                })
                this.emitChange()
            }
        }
    }
</script>

<style scoped>
</style>
