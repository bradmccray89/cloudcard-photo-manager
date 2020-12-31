<template>
    <v-container>
        <div id="folder-input">
            <v-btn class="ma-2" @click="activateFolderInput()">Select Folder</v-btn>
            <input id="folder-input-button" @change="saveFolderSelection" type="file" webkitdirectory directory />
        </div>
    </v-container>
</template>

<script>
    const path = require('path')
    const removeFileName = dirname => path.parse(dirname).dir

    export default {
        name: 'FileStorage',

        props: {
        },

        data: {
            folderInput: '',
            selectedPath: ''
        },

        methods: {
            activateFolderInput() {
                this.folderInput = document.getElementById('folder-input-button')
                this.folderInput.click()
            },
            saveFolderSelection(event) {
                this.selectedPath = event.path[0].files[0].path
                if (this.selectedPath) {
                    this.selectedPath = removeFileName(this.selectedPath)
                }
            }
        }
    }
</script>

<style scoped>
    #folder-input {
        border: 1px dashed rgba(0, 0, 0, 0.3);
    }
    #folder-input-button {
        display: none;
        margin: 8px;
    }
    .container {
        padding: 12px 0;
    }
</style>
