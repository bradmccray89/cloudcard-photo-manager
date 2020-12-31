<template>
    <v-container>
        <div class="d-flex flex-row mb-1 mt-1">
            <span>Photo Download Directory</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>The absolute path to the directory(ies) into which the photos will be saved. If multiple directories are specified, a copy of each downloaded photo wil be saved to each directory.</span>
            </v-tooltip>
        </div>
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

        data() {
            return {
                folderInput: '',
                selectedPath: ''
            }
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
