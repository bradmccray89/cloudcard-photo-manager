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
        <div id="folder-input">
            <input id="folder-input-button" type="file" webkitdirectory directory />
        </div>
        <SimpleDatabaseStorage></SimpleDatabaseStorage>
    </v-container>
</template>

<script>
    import SimpleDatabaseStorage from './SimpleDatabaseStorage'

    export default {
        name: 'Storage',

        components: {
            SimpleDatabaseStorage
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
            }
        },

        methods: {
            emitChange() {
                var result = {
                    type: 'storage_service',
                    value: this.storageChoice
                }
                console.log('storageChoice', this.storageChoice)
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
        margin: 8px;
    }
</style>
