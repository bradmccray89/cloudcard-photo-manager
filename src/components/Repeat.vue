<template>
    <v-container>
        <v-checkbox
            v-model="repeat"
            label="Repeat download"
            solo>
        </v-checkbox>
    </v-container>
</template>

<script>
    export default {
        name: 'Storage',

        data() {
            return {
                repeat: false,
                delay: 600000,
            }
        },

        methods: {
            setRepeat() {
                console.log('repeat', this.repeat)
            }
        }
    }
</script>

<style scoped>
</style>
