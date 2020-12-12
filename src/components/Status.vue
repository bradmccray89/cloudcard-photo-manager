<template>
    <v-container>
        <v-select
            v-model="fetchStatus"
            :items="photoStatus"
            label="Input Photo Status"
            solo>
        </v-select>
        <v-select
            v-model="putStatus"
            :items="photoStatus"
            label="Output Photo Status"
            solo>
        </v-select>
        <v-btn
            class="float-right mb-3"
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
            console.log('data', this.data)
            this.putStatus = this.data?.value
            this.fetchStatus = this.fetchdata?.value
        },

        data: () => ({
            fetchStatus: "READY_FOR_DOWNLOAD",
            putStatus: "DOWNLOADED",
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
