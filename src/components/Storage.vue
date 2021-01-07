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
            :items="storageType"
            item-text="name"
            item-value="entry"
            label="Storage Service"
            dense
            solo
            @change="emitChange()">
        </v-select>
        <v-divider></v-divider>
        <FileStorage v-if="storageChoice === 'FileStorageService'"
            v-on:set_folders="setFolderForStorage">
        </FileStorage>
    </v-container>
</template>

<script>
    import FileStorage from './FileStorage'

    export default {
        name: 'Storage',

        components: {
            FileStorage,
        },

        props: {
            data: {
                type: Object,
                default: function() {
                    return {
                        type: 'storage_service',
                        value: 'FileStorageService'
                    }
                }
            }
        },

        created: function () {
            this.storageChoice = this.storageType.find(f => f.entry === this.data?.value)?.entry
        },

        data() {
            return {
                storageType: [
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
                folderLocation: '',
                folderLocationObject: {},
                jarFileLocation: '',
                jarFileLocationObject: {}
            }
        },

        methods: {
            emitChange() {
                if (this.storageType !== '' && this.folderLocation !== '') {
                    var result = [
                        {
                            type: 'downloader.storageService',
                            value: this.storageChoice
                        },
                        {
                            type: 'downloader.photoDirectories',
                            value: this.folderLocation
                        },
                    ]
                    this.$emit('set_value', result)
                }
            },
            setFolderForStorage(event) {
                event.forEach(item => {
                    if (item.type === 'downloader.PhotoDirectories') {
                        this.folderLocation = item.value
                    }
                })
                console.log('event', event)
                this.emitChange()
            }
        }
    }
</script>

<style scoped>
</style>
