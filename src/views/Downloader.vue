<template>
    <div id="nav-menu">
        <v-app-bar app dense dark clipped-left>
            <v-toolbar-title>
                <v-btn class="home-button" text to="/" exact>Cloudcard</v-btn>
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
                    v-bind:data="results[currentTabIndex]"
                    v-bind:endpoint="endpoint"
                    v-bind:fetchData="results[currentTabIndex + 1]">
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
            results: [],
            value: '',
            jarFileLocation: ''
        }
    },

    computed: {
        endpoint: function () {
            if (this.currentTab?.name === 'Login') {
                return this.results.find(result => result.type === 'cloudcard.api.url')?.value
            } else {
                return undefined
            }
        },
    },

    created: function () {
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
                if (item.type !== 'jarFileLocation') {
                    this.value = {
                        type: item.type,
                        value: item.value
                    }
                    this.saveValueToResults()
                } else {
                    this.jarFileLocation = item.value
                }
            })
            if (!this.tabs[this.currentTabIndex + 1]) {
                this.saveToFile()
            } else {
                this.goToNextStep()
            }
        },
        saveValueToResults() {
            var foundIndex = this.results.findIndex(result => this.value.type === result.type)
            console.log('value: ', this.value)
            if (foundIndex >= 0) {
                this.results[foundIndex] = this.value
            } else if (this.value) {
                this.results.push(this.value);
            }
            this.value = '';
        },
        goToNextStep() {
            this.$router.push({ name: this.tabs[this.currentTabIndex + 1].name })
            this.setCurrentTab()
        },
        saveToFile(filename) {
            var dataToSave = this.createJsonFromArray(this.results)
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
            console.log('cmd: ', this.cmd)
            let output = await this.execute('cd ' + '"' + this.jarFileLocation + '"' + ' && ' + this.cmd)
            let result = output.stdout ? output.stdout : output.stderr
            let stringOutput = ''
            for (let line of result.split('\n')) {
                stringOutput = stringOutput.concat(`${line}\n`)
            }
            console.log(stringOutput)
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
            var jsonData = {}
            dataArray.forEach(item => {
                jsonData[item.type] = item.value
                // switch (item.type) {
                //     case 'endpoint':
                //         jsonData['cloudcard.api.url'] = item.value
                //         break;
                //     case 'access_token':
                //         jsonData['cloudcard.api.accessToken'] = item.value
                //         break;
                //     case 'fetch_status':
                //         jsonData['downloader.fetchStatuses'] = item.value
                //         break;
                //     case 'put_status':
                //         jsonData['downloader.putStatus'] = item.value
                //         break;
                //     case 'storage_service':
                //         jsonData['downloader.storageService'] = item.value
                //         break;
                //     case 'repeat':
                //         jsonData['downloader.repeat'] = item.value
                //         break;
                //     default:
                //         break;
                // }
            })
            this.createArrayFromJson(jsonData)
            return jsonData
        },
        createArrayFromJson(jsonData) {
            var dataArray = []
            for (var key in jsonData) {
                if (jsonData.hasOwnProperty(key)) {
                    var value = jsonData[key]
                    var item = {
                        type: key,
                        value: value
                    }
                    // switch (key) {
                    //     case 'cloudcard.api.url':
                    //         item.type = 'endpoint'
                    //         item.value = value
                    //         break;
                    //     case 'cloudcard.api.accessToken':
                    //         item.type = 'access_token'
                    //         item.value = value
                    //         break;
                    //     case 'downloader.fetchStatuses':
                    //         item.type = 'fetch_status'
                    //         item.value = value
                    //         break;
                    //     case 'downloader.putStatus':
                    //         item.type = 'put_status'
                    //         item.value = value
                    //         break;
                    //     case 'downloader.storageService':
                    //         item.type = 'storage_service'
                    //         item.value = value
                    //         break;
                    //     case 'downloader.repeat':
                    //         item.type = 'repeat'
                    //         item.value = value
                    //         break;
                    //     default:
                    //         break;
                    // }
                    console.log('item', item)
                    this.results.push(item)
                }
            }
        }
    }
};
</script>

<style scoped>
    .v-main {
        padding: 0 !important;
    }
    .home-button {
        font-size: 1.2em
    }
</style>