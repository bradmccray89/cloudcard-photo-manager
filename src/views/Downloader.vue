<template>
    <div id="nav-menu">
        <v-app-bar app dark clipped-left>
            <v-toolbar-title>
                <v-btn class="home-button" large text to="/" exact>
                    <img src="../assets/cc-logo-sm.png" />
                </v-btn>
            </v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer permanent app clipped>
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
        </v-navigation-drawer>
        <v-main>
            <v-container fluid>
                <router-view 
                    v-on:set_value="setValue($event)"
                    v-bind:apiData="apiData"
                    v-bind:loginData="loginData"
                    v-bind:storageData="storageData"
                    v-bind:repeatData="repeatData"
                    v-bind:statusData="statusData">
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
import { exec } from 'child_process'

const fs = require('fs')
const execSync = require('child_process').execSync

export default {
    name: 'Downloader',

    components: {
        Login,
        Api,
        Storage,
        Repeat,
        Status
    },

    watch: {
        $route (to, from) {
            this.setCurrentTab(to.path)
        },
    },

    data () {
        return {
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
            statusData: ''
        }
    },

    computed: {
        endpoint: function () {
            if (this.currentTab?.name === 'Login') {
                return this.downloadData.find(result => result.type === 'cloudcard.api.url')?.value
            } else {
                return undefined
            }
        },
        apiData: function () {
            return {
                'cloudcard.api.url': this.downloadData['cloudcard.api.url'],
            }
        },
    },

    created: function () {
        if (this.$route.query.inputDataFromFile.length !== 0) {
            this.downloadData = this.$route.query.jsonInputData
        }
    },

    methods: {
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
            if (!this.tabs[this.currentTabIndex + 1]) {
                this.saveToFile()
            } else {
                this.goToNextStep()
            }
        },
        saveValueToDownloadData() {
            var foundIndex = this.downloadData.findIndex(result => this.value.type === result.type)
            if (foundIndex >= 0) {
                this.downloadData[foundIndex] = this.value
            } else if (this.value) {
                this.downloadData.push(this.value);
            }
            this.value = '';
        },
        goToNextStep() {
            this.$router.push({ name: this.tabs[this.currentTabIndex + 1].name })
            this.setCurrentTab()
        },
        saveToFile(filename) {
            var dataToSave = this.createJsonFromArray(this.downloadData)
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
        createJsonFromArray(dataArray) {
            var downloadData = {}
            dataArray.forEach(item => {
                downloadData[item.type] = item.value
            })
            this.createArrayFromJson(downloadData)
            return downloadData
        },
        createArrayFromJson(downloadData) {
            var dataArray = []
            for (var key in downloadData) {
                if (downloadData.hasOwnProperty(key)) {
                    var value = downloadData[key]
                    var item = {
                        type: key,
                        value: value
                    }
                    this.downloadData.push(item)
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
</style>
