<template>
    <v-container>
        <div id="folder-input">
            <input id="folder-input-button" type="file" webkitdirectory directory />
        </div>
    </v-container>
</template>

<script>
    export default {
        name: 'FileStorage',

        props: {
        },

        created: function () {
        },

        methods: {
        }
    }
</script>

<style scoped>
    #folder-input {
        border: 1px dashed rgba(0, 0, 0, 0.3);
    }
    #folder-input-button {
        margin: 8px;
    }
</style>
