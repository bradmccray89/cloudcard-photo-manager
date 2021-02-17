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
                    name: "Scripts",
                    url: "/Downloader/Scripts",
                },
                {
                    id: 2,
                    name: "FileNameResolver",
                    url: "/Downloader/FileNameResolver",
                },
                {
                    id: 3,
                    name: "Pre-Processor",
                    url: "/Downloader/Pre-Processor",
                },
                {
                    id: 4,
                    name: "Post-Processor",
                    url: "/Downloader/Post-Processor",
                },
                {
                    id: 5,
                    name: "SummaryService",
                    url: "/Downloader/SummaryService",
                },
            ]
        }
    }
}
</script>
