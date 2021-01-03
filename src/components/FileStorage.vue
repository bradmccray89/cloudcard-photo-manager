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
            <v-btn class="ma-2" @click="saveFolder()">Select Folder</v-btn>
        </div>
        <div class="d-flex flex-row mb-1 mt-1">
            <span>Jar File Location</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>The absolute path to the spring <code>.jar</code> file.</span>
            </v-tooltip>
        </div>
        <div id="folder-input">
            <v-btn class="ma-2" @click="uploadJar()">Select Jar File</v-btn>
            <span :v-if="jarFileName !== ''">{{ jarFileName }}</span>
        </div>
    </v-container>
</template>

<script>
    const { dialog } = require('electron').remote
    const path = require('path')
    const removeFileName = dirname => path.parse(dirname).dir

    export default {
        name: 'FileStorage',

        props: {
        },

        data() {
            return {
                selectedPath: '',
                jarFilePath: '',
                jarFileName: ''
            }
        },

        methods: {
            saveFolder() {
                dialog.showOpenDialog({
                    properties:['openDirectory', 'createDirectory', 'multiSelections']
                }).then(result => {
                    var total = 0
                    result.filePaths.forEach((path, index) => {
                        if (index === 0) {
                            this.selectedPath = path
                        } else {
                            this.selectedPath = this.selectedPath + ',' + path
                        }
                        total = index + 1
                    })
                    var folderChoice = {
                        type: 'file_storage',
                        value: this.selectedPath
                    }
                    this.$emit('set_folder', folderChoice)
                })
            },
            uploadJar() {
                dialog.showOpenDialog({
                    properties:['openFile'],
                    filters:[{ name: 'JAR', extensions: ['jar'] }]
                }).then(result => {
                    if (!result.canceled) {
                        this.jarFilePath = removeFileName(result.filePaths[0])
                        this.jarFileName = path.basename(result.filePaths[0])
                    }
                })
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
