<template>
    <div id="nav-menu">
        <v-app-bar app dark clipped-left>
            <v-toolbar-title>
                <v-btn class="home-button" large text to="/" exact>
                    <img src="../assets/cc-logo-sm.png" />
                </v-btn>
            </v-toolbar-title>
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
                <div class="finish-button">
                    <v-btn block
                        color="success">
                        <i class="far fa-check-circle mr-1"></i>
                        Finish
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
                    v-bind:dbConnectionData="dbConnectionData">
                </router-view>
            </v-container>
        </v-main>
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

export default {
    name: 'Downloader',

    components: {
        Login,
        Api,
        Storage,
        Repeat,
        Status,
        AdvancedSettings
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
            apiData: '',
            loginData: '',
            storageData: '',
            repeatData: '',
            statusData: '',
            scriptData: {},
            databaseConnectionData: {}
        }
    },

    created: function () {
        if (this.$route.query.jsonInputData.length !== 0) {
            this.downloadData = this.$route.query.jsonInputData
        }
        fileService.setPropDataForComponents()
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
            if (this.tabs[this.currentTabIndex + 1]) {
                this.goToNextStep()
            }    
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
        saveToFile() {
            var dataToSave = this.downloadData
            fs.writeFileSync('application-properties.json', JSON.stringify(dataToSave, null, 4))
            this.runDownloadScript(dataToSave)
        },
        async runDownloadScript(jsonScriptData) {
            for (var key in jsonScriptData) {
                if (jsonScriptData.hasOwnProperty(key)) {
                    var val = jsonScriptData[key]
                    if (key === 'downloader.photoDirectories') {
                        var param = ' -D' + key + '="' + val + '"'
                    } else {
                        var param = ' -D' + key + '=' + val
                    }
                    this.cmd = this.cmd.concat(param)
                }
            }
            this.cmd = this.cmd.concat(' -jar cloudcard-photo-downloader.jar')
            let output = await this.execute(this.cmd)
            let result = output.stdout ? output.stdout : output.stderr
            let stringOutput = ''
            for (let line of result.split('\n')) {
                stringOutput = stringOutput.concat(`${line}\n`)
            }
            fs.writeFileSync('downloader.txt', stringOutput)
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
        setPropDataForComponents() {
            this.apiData = {
                type: 'cloudcard.api.url',
                value: this.downloadData['cloudcard.api.url']
            },
            this.loginData = {
                accessToken: {
                    type: 'cloudcard.api.accessToken',
                    value: this.downloadData['cloudcard.api.accessToken']
                },
                username: {
                    type: 'username',
                    value: this.downloadData['username']
                }
            },
            this.storageData = {
                storageType: {
                    type: 'downloader.storageService',
                    value: this.downloadData['downloader.storageService']
                },
                photoStorageLocation: {
                    type: 'downloader.photoDirectories',
                    value: this.downloadData['downloader.photoDirectories']
                },
                summaryLocation: {
                    type: 'SimpleSummaryService.directory',
                    value: this.downloadData['SimpleSummaryService.directory']
                },
                dbTableName: {
                    type: 'db.mapping.table',
                    value: this.downloadData['db.mapping.table']
                },
                dbStudentColumnName: {
                    type: 'db.mapping.column.studentId',
                    value: this.downloadData['db.mapping.column.studentId']
                },
                dbPhotoColumnName: {
                    type: 'db.mapping.column.photoId',
                    value: this.downloadData['db.mapping.column.photoId']
                }
            },
            this.dbConnectionData = {
                dataSourceEnable: {
                    type: 'db.datasource.enabled',
                    value: this.downloadData['db.datasource.enabled']
                },
                driverClassName: {
                    type: 'db.datasource.driverClassName',
                    value: this.downloadData['db.datasource.driverClassName']
                },
                url: {
                    type: 'db.datasource.url',
                    value: this.downloadData['db.datasource.url']
                },
                username: {
                    type: 'db.datasource.username',
                    value: this.downloadData['db.datasource.username']
                },
                password: {
                    type: 'db.datasource.password',
                    value: this.downloadData['db.datasource.password']
                },
                schema: {
                    type: 'db.datasource.schema',
                    value: this.downloadData['db.datasource.schema']
                },
                dialect: {
                    type: 'spring.jpa.hibernate.dialect',
                    value: this.downloadData['spring.jpa.hibernate.dialect']
                }
            }
            this.repeatData = {
                repeat: {
                    type: 'downloader.repeat',
                    value: this.downloadData['downloader.repeat']
                },
                delay: {
                    type: 'donwloader.delay.milliseconds',
                    value: this.downloadData['downloader.delay.milliseconds']
                }
            },
            this.statusData = {
                fetchStatuses: {
                    type: 'downloader.fetchStatuses',
                    value: this.downloadData['downloader.fetchStatuses']
                },
                putStatus: {
                    type: 'downloader.putStatus',
                    value: this.downloadData['downloader.putStatus']
                },
                minimumIdLength: {
                    type: 'downloader.minPhotoIdLength',
                    value: this.downloadData['downloader.minPhotoIdLength']
                }
            }
        },
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
    /* .nav-drawer {
        display: flex;
        flex-flow: column;
        height: 100%;
    } */
    .nav-container {
        display: flex;
        flex-flow: column;
        height: 100%;
    }
    .finish-button {
        flex: 0 1 auto;
        margin: 0 2em 1em 2em;
    }
    .spacer {
        flex: 1 1 auto;
    }
</style>
