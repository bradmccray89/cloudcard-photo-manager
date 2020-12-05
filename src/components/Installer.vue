<template>
    <div id="nav-menu">
        <v-app>
            <v-navigation-drawer permanent app>
                <v-list dense rounded nav>
                    <v-list-item-group
                        v-model="stepNumber"
                        color="primary">
                        <v-list-item
                            v-for="tab in tabs"
                            v-bind:key="tab.id"
                            :to="tab.name">
                            <v-list-item-content>
                                <v-list-item-title v-text="tab.name"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            <v-main>
                <v-container fluid>
                    <router-view v-on:set_value="setValue($event); nextStep($event)"></router-view>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<script>
import Login from './Login'
import Api from './Api'
import Storage from './Storage'
import Repeat from './Repeat'
import Status from './Status'

export default {
    name: 'Installer',

    components: {
        Login,
        Api,
        Storage,
        Repeat,
        Status
    },

    watch: {
        $route (to, from) {
            this.saveValueToResults();
            this.currentTab = this.tabs.filter(tab => tab.url === to.path)
            console.log('currentTab', this.currentTab)
        },
    },

    data () {
        return {
            stepNumber: 1,
            currentTab: null,
            nextTab: null,
            tabs: [
                {
                    id: 1,
                    name: "API",
                    url: "/API",
                    component: Api
                },
                {
                    id: 2,
                    name: "Login",
                    url: "/Login",
                    component: Login
                },
                {
                    id: 3,
                    name: "Storage",
                    url: "/Storage",
                    component: Storage
                },
                {
                    id: 4,
                    name: "Repeat",
                    url: "/Repeat",
                    component: Repeat
                },
                {
                    id: 5,
                    name: "Status",
                    url: "/Status",
                    component: Status
                },
            ],
            results: [],
            value: ''
        }
    },
    methods: {
        previousStep(n) {
            this.stepNumber = n - 1
        },
        nextStep(event) {
            console.log('event', event)
            this.stepNumber = event.id + 1
        },
        setValue(event) {
            console.log('event', event)
            this.value = event;
        },
        saveValueToResults() {
            var foundIndex = this.results.findIndex(result => this.value.type === result.type)
            if (foundIndex >= 0) {
                this.results[foundIndex] = this.value
            } else {
                if (this.value) {
                    this.results.push(this.value);
                }
            }
            this.value = '';
            this.nextTabs = this.tabs
            // this.$router.push({ name:  })
            console.log('results', this.results)
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
</style>
