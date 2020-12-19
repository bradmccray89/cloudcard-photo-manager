<template>
    <v-container>
        <div class="d-flex flex-row mb-1">
            <span>Input Photo Status</span>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-1"
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
            multiple
            chips
            label="Input Photo Status"
            solo>
        </v-select>
        <div class="d-flex flex-row mb-1">
            <span>Output Photo Status</span>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-1"
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
            solo>
        </v-select>
        <div class="d-flex flex-row mb-1">
            <span>Minimum Photo ID Length</span>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-1"
                        v-bind="attrs"
                        v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>This setting causes photo IDs to be left padded with zeros (0) until they have at least this many digits.</span>
            </v-tooltip>
        </div>
        <v-text-field class="minimum-id-length"
            v-model="minimumIdLength"
            :rules="idRules"
            dense
            hide-details="auto"
            solo>
        </v-text-field>
        <v-btn
            class="float-right mb-3 mt-3"
            @click="setPhotoStatuses()">
                Next
        </v-btn>
    </v-container>
</template>

<script>
    export default {
        name: 'Status',

        props: [
            'data',
            'fetchData'
        ],

        created: function () {
            this.putStatus = this.data?.value
            this.fetchStatus = this.fetchdata?.value
        },

        data: () => ({
            fetchStatus: "READY_FOR_DOWNLOAD",
            putStatus: "DOWNLOADED",
            minimumIdLength: 0,
            idRules: [
                value => /[0-9]+/.test(value) || 'Must be a number (no decimals)',
            ],
            photoStatus: [
                "PENDING",
                "APPROVED",
                "DENIED",
                "READY_FOR_DOWNLOAD",
                "DOWNLOADED",
                "DISCARDED",
                "DONE"
            ]
        }),

        methods: {
            setPhotoStatuses() {
                var status = [
                    this.fetchStatus,
                    this.putStatus
                ]
                var result = {
                    type: 'status',
                    value: status
                }
                this.$emit('set_value', result)
            },
        }
    }
</script>

<style scoped>
</style>
