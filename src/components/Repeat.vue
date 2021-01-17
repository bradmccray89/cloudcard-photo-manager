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
            <div class="d-flex">
                <v-text-field class="flex-grow-1 mr-2"
                    v-model="days"
                    :rules="dayRules"
                    hide-details="auto"
                    :disabled="!repeat"
                    dense
                    solo>
                    <span slot="append">days</span>
                </v-text-field>
                <v-text-field class="delay-input flex-grow-1 mr-2"
                    v-model="hours"
                    :rules="hourRules"
                    hide-details="auto"
                    :disabled="!repeat"
                    dense
                    solo>
                    <span slot="append">hours</span>
                </v-text-field>
                <v-text-field class="delay-input flex-grow-1"
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

        props: {
            repeatData: {
                type: Object,
                default: function() {
                    return {
                        repeat: {
                            type: 'downloader.repeat',
                            value: true
                        },
                        delay: {
                            type: 'downloader.delay.milliseconds',
                            value: 60000
                        }
                    }
                }
            }
        },

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

        created: function () {
            this.repeat = this.repeatData.repeat.value
            this.delay =  this.repeatData.delay.value
        },

        methods: {
            setRepeat() {
                var result = [
                    {
                        type: 'downloader.repeat',
                        value: this.repeat
                    },
                    {
                        type: 'downloader.delay.milliseconds',
                        value: this.calculateDelay()
                    }
                ]
                this.$emit('set_value', result)
            },
            calculateDelay() {
                if (this.repeat) {
                    let msDays = (this.days * 24 * 60 * 60 * 1000)
                    let msHours = (this.hours * 60 * 60 * 1000)
                    let msMinutes = (this.minutes * 60 * 1000)
                    this.delay = msDays + msHours + msMinutes
                } else {
                    this.delay = 0
                }
                return this.delay
            }
        }
    }
</script>

<style scoped>
    .v-input--selection-controls {
        padding-top: 0;
    }
</style>
