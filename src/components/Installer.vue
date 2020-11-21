<template>
  <v-stepper v-model="e6" alt-labels>
    <v-stepper-header>
        <v-stepper-step
            :complete="e6 > 1"
            step="1"
        >
            {{questions.accesstoken.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="e6 > 2"
            step="2"
        >
            {{questions.api.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="e6 > 3"
            step="3">
            {{questions.storageService.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="e6 > 4"
            step="4">
            {{questions.repeat.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="e6 > 5"
            step="5">
            {{questions.delay.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="e6 > 6"
            step="6">
            {{questions.fetchStatus.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="e6 > 7"
            step="7">
            {{questions.putStatus.title}}
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="e6 > 8"
            step="8">
            {{questions.minPhotoIdLength.title}}
        </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
            class="float-right mb-1"
            color="primary"
            @click="e6 = 2">
                Next
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
            class="float-left mb-1"
            @click="e6 = 1">
                Previous
        </v-btn>
        <v-btn
            class="float-right mb-1"
            color="primary"
            @click="e6 = 3">
                Next
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
            class="float-left mb-1"
            @click="e6 = 2">
                Previous
        </v-btn>
        <v-btn
            class="float-right mb-1"
            color="primary"
            @click="e6 = 4">
                Next
        </v-btn>

      </v-stepper-content>
            <v-stepper-content step="4">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
            class="float-left mb-1"
            @click="e6 = 3">
                Previous
        </v-btn>
        <v-btn
            class="float-right mb-1"
            color="primary"
            @click="e6 = 5">
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
            @click="e6 = 4">
                Previous
        </v-btn>
        <v-btn
            class="float-right mb-1"
            color="primary"
            @click="e6 = 6">
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
            @click="e6 = 5">
                Previous
        </v-btn>
        <v-btn
            class="float-right mb-1"
            color="primary"
            @click="e6 = 7">
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
            @click="e6 = 6">
                Previous
        </v-btn>
        <v-btn
            class="float-right mb-1"
            color="primary"
            @click="e6 = 8">
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
            @click="e6 = 7">
                Previous
        </v-btn>
        <v-btn
            class="float-right mb-1"
            color="primary"
            @click="e6 = 9">
                Finish
        </v-btn>

      </v-stepper-content>

    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
    name: 'Installer',

    components: {
    },

    data () {
        return {
            e6: 1,
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
            amswers: {
                accesstoken: '',
                api: '',
                storageService: '',
                repeat: '',
                delay: '',
                fetchtatus: '',
                putStatus: '',
                minPhotoIdLength: ''
            },
        }
    },
};
</script>
