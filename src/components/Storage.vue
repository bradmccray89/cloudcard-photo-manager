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
            solo>
        </v-select>
        <v-divider></v-divider>
        <DatabaseConnection></DatabaseConnection>
        <v-divider></v-divider>
        <SimpleDatabaseStorage v-if="storageChoice === 'SimpleDatabaseStorageService'"></SimpleDatabaseStorage>
        <FileStorage v-if="storageChoice === 'FileStorageService'"
            v-on:set_folder="setFolderForStorage">
        </FileStorage>
    </v-container>
</template>

<script>
    import SimpleDatabaseStorage from './SimpleDatabaseStorage'
    import FileStorage from './FileStorage'
    import DatabaseConnection from './DatabaseConnection'

    export default {
        name: 'Storage',

        components: {
            SimpleDatabaseStorage,
            FileStorage,
            DatabaseConnection
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
            this.storageChoice = this.storageType.find(f => f.entry === this.data?.value).entry
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
                folderLocation: ''
            }
        },

        methods: {
            emitChange() {
                var result = {
                    type: 'storage_service',
                    value: this.storageChoice
                }
                this.$emit('set_value', result)
            },
            setFolderForStorage(event) {
                this.folderLocation = event.value
                console.log('folderLocation', this.folderLocation)
            }
        }
    }
</script>

<style scoped>
</style>
