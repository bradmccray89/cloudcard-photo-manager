<template>
    <div app>
        <Home v-if="homepage" />
        <Downloader v-if="!homepage" />
    </div>
</template>

<script>
import Downloader from './components/Downloader';
import Home from './views/Home'

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
        homepage: true
    }),
};
</script>
