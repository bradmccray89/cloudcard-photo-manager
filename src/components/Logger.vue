<template>
    <div class="text-center">
        <v-card class="logger-card">
            <v-card-title>Log</v-card-title>
            <v-card-text>
                {{ output }}
            </v-card-text>
            <v-card-actions>
                <v-btn @click="close">Close</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
const Tail = require('tail').Tail
export default {
    name: 'Logger',

    props: [
        'file',
        'output'
    ],

    data() {
        return {
            overlay: false,
            logInfo: '',
            tail: null
        }
    },

    created: function() {
        this.tail = new Tail(this.file)
        this.tail.watch()
        this.tail.on("line", function(data) {
            this.logInfo += data
            console.log('data', data)
        })
    },

    methods: {
        close() {
            this.tail.unwatch()
            this.$emit('close', null)
        }
    }
}
</script>
<style scoped>
    .logger-card {
        height: 500px;
        width: 700px;
    }
</style>
