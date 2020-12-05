<template>
    <v-container>
        <v-select
            v-model="fetchStatus"
            :items="photoStatus"
            label="Input Photo Status"
            solo
            @change="setFetchStatus()">
        </v-select>
        <v-select
            v-model="putStatus"
            :items="photoStatus"
            label="Output Photo Status"
            solo
            @change="setPutStatus()">
        </v-select>
    </v-container>
</template>

<script>
    export default {
        name: 'Status',

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
            setFetchStatus() {
                var result = {
                    type: 'fetch_status',
                    value: this.fetchStatus
                }
                this.$emit('set_value', result)
            },
            setPutStatus() {
                var result = {
                    type: 'put_status',
                    value: this.putStatus
                }
                this.$emit('set_value', result)
            }
        }
    }
</script>

<style scoped>
</style>
