<template>
    <v-container>
        <v-form
            lazy-validation>
            <div class="d-flex flex-row align-center mb-1">
                <v-checkbox
                v-model="repeat"
                dense
                solo
                >
                </v-checkbox>
                <span>Repeat download</span>
                <v-tooltip bottom max-width="350px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                        >
                            info_outline
                        </v-icon>
                    </template>
                    <span>Determines if the downloader will run once and exit, or run continually.</span>
                </v-tooltip>
            </div>
            <div class="d-flex flex-row mb-1">
                <span>Interval</span>
                <v-tooltip bottom max-width="350px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon class="ml-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            info_outline
                        </v-icon>
                    </template>
                    <span>The amount of time the downloader will wait in between download attempts.</span>
                </v-tooltip>
            </div>
            <div class="delay-input">
                <v-text-field
                    v-model="days"
                    :rules="dayRules"
                    hide-details="auto"
                    :disabled="!repeat"
                    dense
                    solo>
                    <span slot="append">days</span>
                </v-text-field>
                <v-text-field class="delay-input"
                    v-model="hours"
                    :rules="hourRules"
                    hide-details="auto"
                    :disabled="!repeat"
                    dense
                    solo>
                    <span slot="append">hours</span>
                </v-text-field>
                <v-text-field class="delay-input"
                    v-model="minutes"
                    :rules="minuteRules"
                    hide-details="auto"
                    :disabled="!repeat"
                    dense
                    solo>
                    <span slot="append">minutes</span>
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
            repeat: true,
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
        max-width: 500px;
    }
    .delay-input > * {
        min-width: 120px;
        width: 20%;
        margin-right: 10px;
    }
    v-text-field {
        margin-right: 10px;
    }
    .v-input--selection-controls {
        padding-top: 0;
    }
</style>
