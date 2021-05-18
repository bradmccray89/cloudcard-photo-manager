<template>
    <div id="nav-menu">
        <v-app-bar app dark clipped-left>
            <v-toolbar-title>
                <v-btn class="home-button" large text to="/" exact>
                    <img src="../assets/cc-logo-sm.png" />
                </v-btn>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <span v-if="downloadData.username">{{downloadData.username}}</span>
        </v-app-bar>
        <v-navigation-drawer class="nav-drawer" permanent app clipped>
            <div class="nav-container">
                <v-list dense rounded nav>
                    <v-list-item-group
                        color="primary">
                        <v-list-item
                            v-for="tab in tabs"
                            v-bind:key="tab.id"
                            :to="tab.name" exact>
                            <v-list-item-content>
                                <v-list-item-title v-text="tab.name"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <v-divider></v-divider>
                <div>
                    <v-switch class="advanced-settings p-0 ml-4 mt-0"
                        v-model="advancedSettings"
                        dense
                        hide-details
                        :label="'Advanced Settings'">
                    </v-switch>
                </div>
                <AdvancedSettings v-if="advancedSettings"></AdvancedSettings>
                <div class="spacer"></div>
                <div class="finish-buttons">
                    <v-btn block
                        color="primary"
                        @click="save">
                        <i class="far fa-save mr-1"></i>
                        Save
                    </v-btn>                    
                    <v-btn class="mt-3"
                        block
                        color="secondary"
                        @click="saveAndRun">
                        <i class="far fa-save mr-1"></i>
                        Save & Run
                    </v-btn>
                </div>
            </div>
        </v-navigation-drawer>
        <v-main class="mr-10">
            <v-container fluid>
                <router-view
                    v-on:set_value="setValue($event)"
                    v-bind:apiData="apiData"
                    v-bind:loginData="loginData"
                    v-bind:storageData="storageData"
                    v-bind:repeatData="repeatData"
                    v-bind:statusData="statusData"
                    v-bind:scriptData="scriptData"
                    v-bind:dbConnectionData="dbConnectionData"
                    v-bind:fileNameResolverData="fileNameResolverData"
                    v-bind:processorData="processorData"
                    v-bind:summaryServiceData="summaryServiceData">
                </router-view>
            </v-container>
        </v-main>
        <!-- <v-overlay :value="loading">
            <v-progress-circular
                indeterminate
                color="primary">
            </v-progress-circular>
        </v-overlay> -->
    </div>
</template>

<script>
import Login from '../components/Login'
import Api from '../components/Api'
import Storage from '../components/Storage'
import Repeat from '../components/Repeat'
import Status from '../components/Status'
import AdvancedSettings from '../components/AdvancedSettings'
import { exec } from 'child_process'
import FileService from '../services/file.service'

const fs = require('fs')
const fileService = new FileService()
const path = require('path')
const { app } = require('electron').remote

export default {
    name: 'Downloader',

    components: {
        Login,
        Api,
        Storage,
        Repeat,
        Status,
        AdvancedSettings,
    },

    watch: {
        $route (to, from) {
            this.setCurrentTab(to.path)
        },
    },

    data () {
        return {
            advancedSettings: false,
            cmd: 'java',
            loading: false,
            downloadSuccess: false,
            showLogger: false,
            stringOutput: '',
            downloadLogFile: '',
            currentTab: null,
            currentTabIndex: 0,
            nextTab: null,
            tabs: [
                {
                    id: 1,
                    name: "API",
                    url: "/Downloader/API",
                    component: Api
                },
                {
                    id: 2,
                    name: "Login",
                    url: "/Downloader/Login",
                    component: Login
                },
                {
                    id: 3,
                    name: "Storage",
                    url: "/Downloader/Storage",
                    component: Storage
                },
                {
                    id: 4,
                    name: "Repeat",
                    url: "/Downloader/Repeat",
                    component: Repeat
                },
                {
                    id: 5,
                    name: "Status",
                    url: "/Downloader/Status",
                    component: Status
                },
            ],
            downloadData: {},
            value: '',
            apiData: {},
            loginData: {},
            storageData: {},
            repeatData: {},
            statusData: {},
            scriptData: {},
            dbConnectionData: {},
            fileNameResolverData: {},
            processorData: {},
            summaryServiceData: {},
            propData: {}
        }
    },

    created: function () {
        if (this.$route.query.jsonInputData && this.$route.query.jsonInputData.length !== 0) {
            this.downloadData = this.$route.query.jsonInputData
        } else {
            this.downloadData = fileService.setDefaults()
        }
        this.setPropDataForComponents()
    },

    methods: {
        toggle() {
            this.advancedSettings = !this.advancedSettings
        },
        setCurrentTab(currentPath = null) {
            if (currentPath) {
                this.currentTab = this.tabs.find((tab, index) => {
                    if (tab.url === currentPath) {
                        this.currentTabIndex = index
                        return true
                    } else {
                        return false
                    }
                })
            } else {
                this.currentTabIndex = this.currentTabIndex + 1
                this.currentTab = this.tabs[this.currentTabIndex]
            }
        },
        setValue(event) {
            event.forEach(item => {
                this.value = {
                    type: item.type,
                    value: item.value
                }
                this.saveValueToDownloadData()
            })
        },
        saveValueToDownloadData() {
            this.downloadData[this.value.type] = this.value.value
            this.value = '';
            this.setPropDataForComponents()
        },
        goToNextStep() {
            this.$router.push({ name: this.tabs[this.currentTabIndex + 1].name })
            this.setCurrentTab()
        },
        save() {
            var dataToSave = this.downloadData
            for (var key in dataToSave) {
                if (dataToSave[key] === '') {
                    delete dataToSave[key]
                }
            }
            if (dataToSave['downloader.repeat'] === false) {
                delete dataToSave['downloader.delay.milliseconds']
            }
            this.downloadLogFile = path.join(this.summaryServiceData.directory.value, 'downloader.txt')
            const batchFileLocation = path.resolve('run.bat')
            dataToSave['batchFileLocation'] = batchFileLocation
            dataToSave['logFileLocation'] = this.downloadLogFile
            this.downloadData = dataToSave
            fs.writeFile('application-properties.json', '', function() {
                fs.writeFileSync('application-properties.json', JSON.stringify(dataToSave, null, 4))
            })
            this.cmd = 'java'
            for (var key in dataToSave) {
                if (dataToSave.hasOwnProperty(key)) {
                    var val = dataToSave[key]
                    if (this.addToCommand(key)) {
                        if (this.doesNotNeedQuotes(key)) {
                            var param = ' -D' + key + '=' + val
                        } else {
                            var param = ' -D' + key + '="' + val + '"'
                        }
                        this.cmd = this.cmd.concat(param)
                    }
                }
            }
            // this.cmd = this.cmd.concat(' -jar cloudcard-photo-downloader.jar')
            this.cmd = this.cmd.concat(` -jar cloudcard-photo-downloader.jar > "${this.downloadLogFile}" 2>&1`)
            console.log('cmd', this.cmd)
            const commandToSave = this.cmd
            fs.writeFile( 'run.bat', '', function() {
                fs.writeFileSync('run.bat', commandToSave)
            })
        },
        saveAndRun() {
            this.save();
            this.runDownloadScript(this.downloadData)
        },
        async runDownloadScript() {
            this.loading = true
            let output = await this.execute(this.cmd)
            this.loading = false
            this.downloadSuccess = (output.stderr === '')
            let result = output.stdout ? output.stdout : output.stderr
            this.stringOutput = ''
            for (let line of result.split('\n')) {
                this.stringOutput = this.stringOutput.concat(`${line}\n`)
            }
            fs.writeFileSync(this.downloadLogFile, this.stringOutput)
            if (this.downloadSuccess) {
                this.$router.push({ path:'/', query: { downloadSuccessful: this.downloadSuccess , downloadLogFile: this.downloadLogFile } })
            }
        },
        async execute(cmd) {
            return new Promise(function (resolve, reject) {
                exec(cmd, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ stdout, stderr });
                    }
                });
            })
        },
        doesNotNeedQuotes(value) {
            return value === 'downloader.summaryService' ||
                value === 'downloader.postProcessor' ||
                value === 'downloader.preProcessor' ||
                value === 'downloader.fileNameResolver' ||
                value === 'db.datasource.driverClassName' ||
                value === 'db.datasource.enabled' ||
                value === 'downloader.minPhotoIdLength' ||
                value === 'downloader.delay.milliseconds' ||
                value === 'downloader.repeat' ||
                value === 'downloader.storageService'
        },
        addToCommand(value) {
            return value !== 'username'
        },
        setPropDataForComponents() {
            this.propData = fileService.setPropData(this.downloadData)
            this.apiData = this.propData.apiData
            this.loginData = this.propData.loginData
            this.storageData = this.propData.storageData
            this.dbConnectionData = this.propData.dbConnectionData
            this.repeatData = this.propData.repeatData
            this.statusData = this.propData.statusData
            this.fileNameResolverData = this.propData.fileNameResolverData
            this.scriptData = this.propData.scriptData
            this.processorData = this.propData.processorData
            this.summaryServiceData = this.propData.summaryServiceData
        },
        closeLogger() {
            this.showLogger = false
        }
    }
};
</script>

<style scoped>
    .v-main {
        padding: 0 !important;
    }
    .home-button {
        padding: 1em;
        font-size: 1.2em
    }
    .nav-container {
        display: flex;
        flex-flow: column;
        height: 100%;
    }
    .finish-buttons {
        flex: 0 1 auto;
        margin: 0 2em 1em 2em;
    }
    .spacer {
        flex: 1 1 auto;
    }
</style>
