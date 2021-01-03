<template>
    <v-container>
        <div class="d-flex flex-row mb-1">
            <span>API Url</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-1"
                    v-bind="attrs"
                    v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>Specifies the URL of your Cloudcard Online Photo Submission API.</span>
            </v-tooltip>
        </div>
        <v-select
            v-model="endpoint"
            :items="api"
            item-text="name"
            item-value="url"
            label="API Endpoint"
            hint="Choose an API to use"
            dense
            solo
            @change="emitChange()">
        </v-select>
    </v-container>
</template>

<script>
    export default {
        name: 'Api',

        props: {
            data: {
                type: Object,
                default: function() {
                    return {
                        type: 'endpoint',
                        value: 'https://api.onlinephotosubmission.com/api'
                    }
                }
            }
        },

        created: function () {
            this.endpoint = this.api.find(f => f.url === this.data.value).url
        },

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
                endpoint: ''
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
