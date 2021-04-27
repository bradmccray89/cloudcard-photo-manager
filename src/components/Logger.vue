<template>
    <div>
        Logger Works
    </div>
</template>
<script>
export default {
    name: 'Logger',

    props: [
        'logFileLocation',
    ],

    data() {
        return {
            overlay: false,
            logInfo: '',
            tail: null,
            fileExists: false
        }
    },

    created: function() {
        console.log('logger works')
    },

    methods: {
    }
}
</script>
<style scoped>
</style>
