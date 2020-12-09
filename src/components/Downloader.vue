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
            let blob = new Blob([this.answers], { type: 'text/plain;charset=utf-8;' })
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, filename)
            } else {
                let link = document.createElement('a')
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    let url = URL.createObjectURL(blob)
                    link.setAttribute('href', url)
                    link.setAttribute('download', filename)
                    link.style.visibility = 'hidden'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
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
