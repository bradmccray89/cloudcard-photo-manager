<template>    
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
</template>
<script>
export default {
    name: 'AdvancedSettings',

    data () {
        return {
            tabs: [
                {
                    id: 1,
                    name: "API",
                    url: "/Downloader/API",
                },
                {
                    id: 2,
                    name: "Login",
                    url: "/Downloader/Login",
                },
                {
                    id: 3,
                    name: "Storage",
                    url: "/Downloader/Storage",
                },
                {
                    id: 4,
                    name: "Repeat",
                    url: "/Downloader/Repeat",
                },
                {
                    id: 5,
                    name: "Status",
                    url: "/Downloader/Status",
                },
            ]
        }
    }
}
</script>
