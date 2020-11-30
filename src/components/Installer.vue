<template>
    <v-stepper v-model="stepNumber" alt-labels>
        <v-stepper-header>
            <template v-for="tab in tabs">
                <v-stepper-step
                    :key="`${tab.id}-step`"
                    :step="tab.id"
                    :complete="stepNumber > tab.id">
                    Step - {{ tab.name }}
                </v-stepper-step>
            </template>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content v-for="tab in tabs"
                :key="`${tab.id}-content`"
                :step="tab.id">
                <v-card
                    class="mb-12"
                    color="grey lighten-1"
                    height="200px">
                        <component v-bind:is="tab.component" v-on:setValue="setValue($event)"></component>
                </v-card>

                <v-btn
                    class="float-left mb-1"
                    v-if="stepNumber !== 1"
                    @click="previousStep(tab.id)">
                        Previous
                </v-btn>

                <v-btn
                    class="float-right mb-1"
                    color="primary"
                    @click="nextStep(tab.id); saveValueToResults()">
                        Next
                </v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>
    <!-- <v-stepper-header>
        <v-stepper-step
            :complete="step > 1"
            step="1">
            {{questions.api.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="step > 2"
            step="2">
            {{questions.accesstoken.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="step > 3"
            step="3">
            {{questions.storageService.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="step > 4"
            step="4">
            {{questions.repeat.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="step > 5"
            step="5">
            {{questions.delay.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="step > 6"
            step="6">
            {{questions.fetchStatus.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="step > 7"
            step="7">
            {{questions.putStatus.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="step > 8"
            step="8">
            {{questions.minPhotoIdLength.title}}
        </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
        <v-stepper-content step="1">
            <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px">
                    <Api v-on:endpoint="setValue($event)"></Api>
            </v-card>
            <v-btn
                class="float-left mb-1"
                color="primary"
                @click="saveToFile('application.properties')">
                    Test Write
            </v-btn>

            <v-btn
                class="float-right mb-1"
                color="primary"
                :disabled="this.value.type != 'endpoint'"
                @click="step = 2 ; saveValueToResults()">
                    Next
            </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
            <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px">
                    <Login v-on:access_token="setValue($event)"></Login>
            </v-card>

            <v-btn
                class="float-left mb-1"
                @click="step = 1">
                    Previous
            </v-btn>
            <v-btn
                class="float-right mb-1"
                color="primary"
                :disabled="this.value.type != 'access_token'"
                @click="step = 3 ; saveValueToResults()">
                    Next
            </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
            <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px">
                    <Storage v-on:storage_service="setValue($event)"></Storage>
            </v-card>

            <v-btn
                class="float-left mb-1"
                @click="step = 2">
                    Previous
            </v-btn>
            <v-btn
                class="float-right mb-1"
                color="primary"
                :disabled="this.value.type != 'storage_service'"
                @click="step = 4 ; saveValueToResults()">
                    Next
            </v-btn>

        </v-stepper-content>
                <v-stepper-content step="4">
            <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
            >
                <Repeat></Repeat>
            </v-card>

            <v-btn
                class="float-left mb-1"
                @click="step = 3">
                    Previous
            </v-btn>
            <v-btn
                class="float-right mb-1"
                color="primary"
                @click="step = 5">
                    Next
            </v-btn>

        </v-stepper-content>
        <v-stepper-content step="5">
            <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
            ></v-card>

            <v-btn
                class="float-left mb-1"
                @click="step = 4">
                    Previous
            </v-btn>
            <v-btn
                class="float-right mb-1"
                color="primary"
                @click="step = 6">
                    Next
            </v-btn>

        </v-stepper-content>
        <v-stepper-content step="6">
            <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
            ></v-card>

            <v-btn
                class="float-left mb-1"
                @click="step = 5">
                    Previous
            </v-btn>
            <v-btn
                class="float-right mb-1"
                color="primary"
                @click="step = 7">
                    Next
            </v-btn>

        </v-stepper-content>
        <v-stepper-content step="7">
            <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
            ></v-card>

            <v-btn
                class="float-left mb-1"
                @click="step = 6">
                    Previous
            </v-btn>
            <v-btn
                class="float-right mb-1"
                color="primary"
                @click="step = 8">
                    Next
            </v-btn>

        </v-stepper-content>
        <v-stepper-content step="8">
            <v-card
            class="mb-12"
            color="grey lighten-1"
            height="200px"
            ></v-card>

            <v-btn
                class="float-left mb-1"
                @click="step = 7">
                    Previous
            </v-btn>
            <v-btn
                class="float-right mb-1"
                color="primary"
                @click="step = 9 & saveFile()">
                    Finish
            </v-btn>

        </v-stepper-content>

    </v-stepper-items>
  </v-stepper>
</template> -->

<script>
import Login from './Login'
import Api from './Api'
import Storage from './Storage'
import Repeat from './Repeat'

export default {
    name: 'Installer',

    components: {
        Login,
        Api,
        Storage,
        Repeat
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
            ],
            questions: {
                accesstoken:  {
                    title: 'Login',
                    description: 'Please login to your service account'
                },
                api: {
                    title: 'API',
                    description: 'What is the url of the api?'
                },
                storageService: {
                    title: 'Storage',
                    description: 'How do you want your photos stored?'
                },
                repeat: {
                    title: 'Repeat',
                    description: 'Do you want the downloader to run more that once?'
                },
                delay: {
                    title: 'Delay',
                    description: 'How often do you want the downloader to run? (ms for testing)'
                },
                fetchStatus: {
                    title: 'Fetch Status',
                    description: 'Choose photo status that you would like to download.'
                },
                putStatus: {
                    title: 'Put Status',
                    description: 'Choose status to change photos to once downloaded.'
                },
                minPhotoIdLength: {
                    title: 'Photo Id Length',
                    description: 'Choose a minimum photo Id length if needed.'
                }
            },
            answers: {
                accessToken: 'token',
                api: 'api',
                storageService: 'storage',
                repeat: 'repeat',
                delay: 'delay',
                fetchtatus: 'fetch',
                putStatus: 'put',
                minPhotoIdLength: 'minLength'
            },
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
