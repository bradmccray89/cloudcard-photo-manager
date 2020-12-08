<template>
    <v-container>
        <v-select
            v-model="storageChoice"
            :items="storageType"
            item-text="name"
            item-value="entry"
            label="Storage Service"
            solo
            @change="emitChange()">
        </v-select>
    </v-container>
</template>

<script>
    export default {
        name: 'Storage',

        props: [
            'data'
        ],

        created: function () {
            this.storageChoice = this.data?.value
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
                this.$emit('set_value', result)
            }
        }
    }
</script>

<style scoped>
</style>
