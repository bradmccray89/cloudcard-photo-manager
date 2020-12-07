<template>
    <v-container>
        <v-form
            lazy-validation>
            <v-checkbox
                v-model="repeat"
                label="Repeat download"
                solo>
            </v-checkbox>
            <div class="delay-input">
                <v-text-field
                    v-model="days"
                    :rules="dayRules"
                    hide-details="auto"
                    :disabled="!repeat"
                    outlined>
                    <p slot="append">days</p>
                </v-text-field>
                <v-text-field class="delay-input"
                    v-model="hours"
                    :rules="hourRules"
                    hide-details="auto"
                    :disabled="!repeat"
                    outlined>
                    <p slot="append">hours</p>
                </v-text-field>
                <v-text-field class="delay-input"
                    v-model="minutes"
                    :rules="minuteRules"
                    hide-details="auto"
                    :disabled="!repeat"
                    outlined>
                    <p slot="append">minutes</p>
                </v-text-field>
            </div>
        </v-form>
        <v-btn
            class="float-right mb-3 mt-3"
            @click="setRepeat()">
                Next
        </v-btn>
    </v-container>
</template>

<script>
    export default {
        name: 'Storage',

        data: () => ({
            days: 0,
            hours: 0,
            minutes: 10,
            repeat: false,
            delay: 0,
            dayRules: [
                value => /[0-9]+/.test(value) || 'Must be a number (no decimals)',
                value => value < 90 || 'Must be less than 90'
            ],
            hourRules: [
                value => /[0-9]+/.test(value) || 'Must be a number (no decimals)',
                value => value <= 24 || 'Max value 24',
            ],
            minuteRules: [
                value => /[0-9]+/.test(value) || 'Must be a number (no decimals)',
                value => value <= 60 || 'Max value 60',
            ],
            intRules: [
                value => /[0-9]+/.test(value) || 'Must be a number'
            ],
        }),

        methods: {
            setRepeat() {
                if (this.repeat) {
                    var result = {
                        type: 'repeat',
                        value: this.calculateDelay()
                    }
                    this.$emit('set_value', result)
                } else {
                    var result = {
                        type: 'repeat',
                        value: 0
                    }
                    this.$emit('set_value', result)
                }
            },
            calculateDelay() {
                let msDays = (this.days * 24 * 60 * 60 * 1000)
                let msHours = (this.hours * 60 * 60 * 1000)
                let msMinutes = (this.minutes * 60 * 1000)
                this.delay = msDays + msHours + msMinutes
                return this.delay
            }
        }
    }
</script>

<style scoped>
    .delay-input {
        display: flex;
        justify-content: center;
    }
    .delay-input > * {
        width: 20%;
        margin-right: 10px;
    }
    v-text-field {
        margin-right: 10px;
    }
</style>
