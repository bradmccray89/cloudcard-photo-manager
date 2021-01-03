<template>
    <!-- Eventually Make these file uploaders that limit selection to *.sh, *.bat *.cmd script files -->
    <v-container>
        <v-textarea class="text-area-code"
            filled
            outlined
            auto-grow
            dense
            spellcheck="false"
            row-height="20px"
            v-model="preExecuteCommand">
        </v-textarea>
        <v-textarea class="text-area-code"
            filled
            outlined
            auto-grow
            dense
            spellcheck="false"
            row-height="20px"
            v-model="postExecuteCommand">
        </v-textarea>
        <v-textarea class="text-area-code"
            filled
            outlined
            auto-grow
            dense
            spellcheck="false"
            row-height="20px"
            v-model="preDownloadCommand">
        </v-textarea>
        <v-textarea class="text-area-code"
            filled
            outlined
            auto-grow
            dense
            spellcheck="false"
            row-height="20px"
            v-model="postDownloadCommand">
        </v-textarea>
    </v-container>
</template>

<script>
    export default {
        name: 'Scripts',

        props: {
        },

        data() {
            return {
                preExecuteCommand: 'preExecuteCommand text',
                preDownloadCommand: 'preDownloadCommand text',
                postExecuteCommand: 'postExecuteCommand text',
                postDownloadCommand: 'postDownloadCommand text'
            }
        },

        methods: {
        }
    }
</script>

<style scoped>
    .container {
        padding: 12px 0;
    }
    .text-area-code {
        font-family: Consolas;
        font-size: 14px;
        line-height: 1rem !important;
    }
</style>
