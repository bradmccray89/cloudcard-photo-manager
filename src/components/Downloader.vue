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
                    v-bind:endpoint="endpoint">
                </router-view>
            </v-container>
        </v-main>
    </div>
</template>

<script>
import Login from './Login'
import Api from './Api'
import Storage from './Storage'
import Repeat from './Repeat'
import Status from './Status'

const fs = require('fs')

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
            value: ''
        }
    },

    computed: {
        endpoint: function () {
            if (this.currentTab?.name === 'Login') {
                return this.results.find(result => result.type === 'endpoint')?.value
            } else {
                return undefined
            }
        },
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
            if (event.type === 'status') {
                event.value.forEach((value, index) => {
                    this.value = {
                        type: (index === 0) ? 'fetch_status' : 'put_status',
                        value: value
                    }
                    this.saveValueToResults()
                })
            } else {
                this.value = event;
                this.saveValueToResults()
            }
            if (this.tabs.length !== this.currentTabIndex + 1) {
                this.goToNextStep()
            } else {
                console.log('this.results', this.results)
                this.saveToFile()
            }
        },
        saveValueToResults() {
            var foundIndex = this.results.findIndex(result => this.value.type === result.type)
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
            fs.writeFileSync('application.properties', JSON.stringify(dataToSave))
        },
        createJsonFromArray(dataArray) {
            var jsonData = {}
            dataArray.forEach(item => {
                switch (item.type) {
                    case 'endpoint':
                        console.log('endpoint')
                        jsonData['cloudcard.api.url'] = item.value
                        break;
                    case 'access_token':
                        console.log('access_token')
                        jsonData['cloudcard.api.accessToken'] = item.value
                        break;
                    case 'fetch_status':
                        console.log('fetch_status')
                        jsonData['downloader.fetchStatuses'] = item.value
                        break;
                    case 'put_status':
                        console.log('put_status')
                        jsonData['downloader.putStatus'] = item.value
                        break;
                    case 'storage_service':
                        console.log('storage_service')
                        jsonData['downloader.storageService'] = item.value
                        break;
                    case 'repeat':
                        console.log('repeat')
                        jsonData['downloader.repeat'] = item.value
                        break;
                    default:
                        console.log('default')
                        break;
                }
            })
            return jsonData
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
