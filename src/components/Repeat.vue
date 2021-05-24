<template>
    <v-container>
        <v-form
            lazy-validation>
            <div class="d-flex flex-row align-center mb-1">
                <v-checkbox
                v-model="repeat"
                dense
                solo
                @change="emitChange"
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
                <v-text-field class="delay-input"
                    v-model="minutes"
                    :rules="minuteRules"
                    hide-details="auto"
                    :disabled="!repeat"
                    dense
                    solo
                    @change="emitChange">
                    <span slot="append">minutes</span>
                </v-text-field>
            </div>
        </v-form>
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
                            value: 600000
                        }
                    }
                }
            }
        },

        data: () => ({
            minutes: 0,
            repeat: true,
            delay: 0,
            minuteRules: [
                value => /[0-9]+/.test(value) || 'Must be a number (no decimals)',
                value => value <= 60 || 'Max value 60',
            ]
        }),

        created: function () {
            this.repeat = this.repeatData.repeat.value
            this.delay =  this.repeatData.delay.value
            this.minutes = this.delay / 60000
        },

        methods: {
            emitChange() {
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
                    this.delay = this.minutes * 60000
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
    .delay-input {
        max-width: 200px;
        min-width: 125px;
    }
</style>
