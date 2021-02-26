<template>
    <v-container>
        <div class="d-flex flex-row mb-1">
            <span>Input Photo Status</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>Photos with these statuses will be downloaded.</span>
            </v-tooltip>
        </div>
        <v-select
            v-model="fetchStatus"
            :items="photoStatus"
            dense
            chips
            label="Input Photo Status"
            multiple
            solo
            @change="emitChange">
        </v-select>
        <div class="d-flex flex-row mb-1">
            <span>Output Photo Status</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>Downloaded photos will be marked with this status in the CloudCard web application.</span>
            </v-tooltip>
        </div>
        <v-select
            v-model="putStatus"
            :items="photoStatus"
            dense
            label="Output Photo Status"
            solo
            @change="emitChange">
        </v-select>
        <div class="d-flex flex-row mb-1">
            <span>Minimum Photo ID Length</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>Causes photo IDs to be left padded with zeros (0) until they have at least this many digits.</span>
            </v-tooltip>
        </div>
        <v-text-field class="minimum-id-length"
            v-model="minimumIdLength"
            :rules="idRules"
            dense
            hide-details="auto"
            solo
            @change="emitChange">
        </v-text-field>
    </v-container>
</template>

<script>
    export default {
        name: 'Status',

        props: {
            statusData: {
                type: Object,
                default: function() {
                    return {
                        fetchStatuses: {
                            type: 'downloader.fetchStatuses',
                            value: this.fetchStatus
                        },
                        putStatus: {
                            type: 'downloader.putStatus',
                            value: this.putStatus
                        },
                        minimumIdLength: {
                            type: 'downloader.minPhotoIdLength',
                            value: this.minimumIdLength
                        }
                    }
                }
            }
        },

        created: function () {
            this.fetchStatus = this.statusData.fetchStatuses.value.split(',')
            this.putStatus = this.statusData.putStatus.value
            this.minimumIdLength = this.statusData.minimumIdLength.value
        },

        data () {
            return {
                fetchStatus: [],
                putStatus: '',
                minimumIdLength: 0,
                idRules: [
                    value => /[0-9]+/.test(value) || 'Must be a number (no decimals)',
                ],
                photoStatus: [
                    'PENDING',
                    'APPROVED',
                    'DENIED',
                    'READY_FOR_DOWNLOAD',
                    'DOWNLOADED',
                    'DISCARDED',
                    'DONE'
                ]
            }
        },

        methods: {
            emitChange() {
                var concatFetchStatuses = ''
                this.fetchStatus.forEach((status, index) => {
                    if (index === 0) {
                        concatFetchStatuses = concatFetchStatuses.concat(status)
                    } else {
                        concatFetchStatuses = concatFetchStatuses.concat(',' + status)
                    }
                })
                var result = [
                    {
                        type: 'downloader.fetchStatuses',
                        value: concatFetchStatuses
                    },
                    {
                        type: 'downloader.putStatus',
                        value: this.putStatus
                    },
                    {
                        type: 'downloader.minPhotoIdLength',
                        value: this.minimumIdLength
                    }
                ]
                this.$emit('set_value', result)
            },
        }
    }
</script>

<style scoped>
</style>
