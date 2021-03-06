<template>
    <div class="text-center">
        <v-card>
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
export default {
    name: 'Logger',

    props: [
        'file',
        'output'
    ],

    data() {
        return {
            overlay: false,
            logInfo: ''
        }
    },

    created: function() {
    },

    methods: {
        close() {
            this.$emit('close', null)
        }
    }
}
</script>
