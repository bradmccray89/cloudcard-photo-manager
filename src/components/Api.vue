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
            v-model="apiChoice"
            :items="api"
            item-text="name"
            item-value="value"
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
            apiData: {
                type: Object,
                default: function() {
                    return {
                        type: 'cloudcard.api.url',
                        value: 'https://api.onlinephotosubmission.com/api'
                    }
                }
            }
        },

        created: function () {
            this.endpoint = this.api.find(f => f.value === this.apiData['cloudcard.api.url'])?.value
            this.apiChoice = this.api.find(f => f.value === this.apiData.value)
        },

        data() {
            return {
                rules: [
                    value => !!value || 'Required.',
                ],
                api: [
                    {
                        name: 'Production',
                        value: 'https://api.onlinephotosubmission.com/api'
                    },
                    {
                        name: 'Test',
                        value: 'https://test-api.onlinephotosubmission.com/api'
                    }
                ],
                apiChoice: {}
            }
        },

        methods: {
            emitChange() {
                var result = [
                    {
                        type: this.apiData.type,
                        value: this.endpoint
                    }
                ]
                this.$emit('set_value', result)
            }
        }
    }
</script>

<style scoped>
</style>
