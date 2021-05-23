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

    created () {
        window.addEventListener('beforeunload', this.killTree())
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
        }
    }
};
</script>
<style>
</style>
