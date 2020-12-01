<template>
    <v-container>
        <v-form
            lazy-validation>
            <v-checkbox
                v-model="repeat"
                label="Repeat download"
                solo>
            </v-checkbox>
            <v-text-field
                v-model="delay"
                label="Interval"
                :rules="intRules"
                solo>
            </v-text-field>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: 'Storage',

        data: () => ({
            repeat: false,
            delay: 600000,
            intRules: [
                value => /[0-9]*/.test(value) || 'Must be a number'
            ],
        }),

        methods: {
            setRepeat() {
                console.log('set_value', this.repeat)
            }
        }
    }
</script>

<style scoped>
</style>
