<template>
    <v-stepper v-model="stepNumber" alt-labels>
        <v-stepper-header>
            <template v-for="tab in tabs">
                <v-stepper-step
                    :key="`${tab.id}-step`"
                    :step="tab.id"
                    :complete="stepNumber > tab.id">
                    {{ tab.name }}
                </v-stepper-step>
            </template>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content v-for="tab in tabs"
                :key="`${tab.id}-content`"
                :step="tab.id">
                <component v-bind:is="tab.component" v-on:set_value="setValue($event)"></component>

                <v-btn
                    class="float-left mb-1"
                    v-if="stepNumber !== 1"
                    @click="previousStep(tab.id)">
                        Previous
                </v-btn>

                <v-btn
                    class="float-right mb-1"
                    color="primary"
                    :disabled="!value"
                    @click="nextStep(tab.id); saveValueToResults()">
                        Next
                </v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
import Login from './Login'
import Api from './Api'
import Storage from './Storage'
import Repeat from './Repeat'
import Status from './Status'

export default {
    name: 'Installer',

    components: {
        Login,
        Api,
        Storage,
        Repeat,
        Status
    },

    data () {
        return {
            stepNumber: 1,
            tabs: [
                {
                    id: 1,
                    name: "API",
                    component: Api
                },
                {
                    id: 2,
                    name: "Login",
                    component: Login
                },
                {
                    id: 3,
                    name: "Storage",
                    component: Storage
                },
                {
                    id: 4,
                    name: "Repeat",
                    component: Repeat
                },
                {
                    id: 5,
                    name: "Status",
                    component: Status
                },
            ],
            results: [],
            value: ''
        }
    },
    methods: {
        previousStep(n) {
            this.stepNumber = n - 1
        },
        nextStep(n) {
            this.stepNumber = n + 1
        },
        setValue(event) {
            console.log('event', event)
            this.value = event;
        },
        saveValueToResults() {
            this.results.push(this.value);
            this.value = '';
            console.log('results', this.results)
        },
        saveToFile(filename) {
            let blob = new Blob([this.answers], { type: 'text/plain;charset=utf-8;' })
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, filename)
            } else {
                let link = document.createElement('a')
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    let url = URL.createObjectURL(blob)
                    link.setAttribute('href', url)
                    link.setAttribute('download', filename)
                    link.style.visibility = 'hidden'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                }
            }
        }
    }
};
</script>
