<template>
    <v-card>
        <v-toolbar
            dark
            color="secondary"
        >
            <v-toolbar-title>Log File - {{ logFileLocation }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                dark
                v-if="logFileLocation"
                @click="openLogFile"
            >
                Open Log File
            </v-btn>
            <v-btn
                icon
                dark
                @click="closeLogger"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text class="log-text-container" ref="container">
            {{ logFileContent }}
        </v-card-text>
    </v-card>
</template>
<script>
const shell = require('electron').shell
const Tail = require('tail').Tail

export default {
    name: 'Logger',

    props: [
        'logFileLocation',
    ],

    data() {
        return {
            overlay: false,
            logInfo: '',
            tail: null,
            fileExists: false,
            logFileContent: ''
        }
    },

    created: function() {
        this.tailLogFile()
    },

    beforeDestroy: function() {
        if (this.logFileLocation) {
            this.tail.unwatch()
        }
    },

    methods: {
        tailLogFile() {
            if (this.logFileLocation) {
                const options = { nLines: 25 }
                this.tail = new Tail(this.logFileLocation, options)
                this.tail.on('line', (data) => {
                    this.logFileContent = this.logFileContent + data + '\n'
                })
                this.tail.on('error', (error) => {
                    console.log('ERROR: ', error)
                    this.tail.unwatch()
                })
            }
        },
        openLogFile() {
            if (this.logFileLocation) {
                shell.openPath(this.logFileLocation)
            }
        },
        closeLogger() {
            this.$emit('close_logger', this.logFileLocation)
        },
    }
}
</script>
<style scoped>
    .log-text-container {
        height: 85vh;
        width: unset;
        margin: 1em;
        padding: 5px !important;
        background-color: #e7e7e7;
        border: 1px solid rgb(190, 190, 190);
        border-radius: 5px;
        scroll-behavior: auto;
        white-space: pre;
    }
</style>
