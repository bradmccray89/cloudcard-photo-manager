<template>
    <v-app>
        <v-main>
            <Home v-if="homepage"
                v-on:save_process_id="setPID($event)"
                v-on:stop_downloader="killTree()"/>
            <Downloader v-if="!homepage" />
        </v-main>
    </v-app>
</template>

<script>
import Downloader from './views/Downloader';
import Home from './views/Home'

const kill = require('tree-kill')

export default {
    name: 'App',

    components: {
        Home,
        Downloader,
    },

    watch: {
        $route (to, from) {
            if (to.path === '/') {
                this.homepage = true;
            } else {
                this.homepage = false;
            }
        },
    },

    data: () => ({
        homepage: true,
        pid: 0
    }),

    mounted() {
      window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    },

    destroyed() {
      window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    },

    created () {
    },

    methods: {
        killTree() {
            console.log('killTree', this.pid)
            if (this.pid > 0) {
                kill(this.pid)
            }
        },
        setPID(processid) {
            console.log('processid', processid)
            this.pid = processid
        },
        beforeunloadHandler(e){
            kill(this.pid)
        },
    }
};
</script>
<style>
</style>
