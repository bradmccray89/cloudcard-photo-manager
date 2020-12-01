<template>
    <v-container>
        <v-select
            v-model="endpoint"
            :items="api"
            item-text="name"
            item-value="url"
            label="API Endpoint"
            solo
            @change="emitChange()">
        </v-select>
    </v-container>
</template>

<script>
    export default {
        name: 'Api',

        data() {
            return {
                rules: [
                    value => !!value || 'Required.',
                ],
                api: [
                    {
                        name: 'Production',
                        url: 'https://api.onlinephotosubmission.com/api'
                    },
                    {
                        name: 'Test',
                        url: 'https://test-api.onlinephotosubmission.com/api'
                    }
                ],
                endpoint: '',
            }
        },

        methods: {
            emitChange() {
                var result = {
                    type: 'endpoint',
                    value: this.endpoint
                }
                this.$emit('set_value', result)
            }
        }
    }
</script>

<style scoped>
</style>
