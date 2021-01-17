<template>
    <v-container>
        <v-snackbar
            v-model="alert"
            color="red"
            top
            :timeout="timeout">
            {{ errorMessage }}
        </v-snackbar>
        <div class="d-flex flex-row mb-1">
            <span>Login</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-2"
                    v-bind="attrs"
                    v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>Login to get your access token in order to download your organizations photos. Make sure to login with an account with the "SERVICE" and "OFFICE" roles</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <span class="ml-5" v-if="loginData.accessToken.value">
                <span>Currently logged in as <strong>{{ loginData.username.value }}</strong></span>
            </span>
        </div>
        <v-form id="login-info"
            v-model="valid"
            lazy-validation>
            <v-text-field
                v-model="input.username"
                solo
                dense
                label="Email"
                :rules="usernameRules"
                hide-details="auto">
            </v-text-field>
            <v-text-field
                v-model="input.password"
                class="mt-2"
                type="password"
                solo
                dense
                label="Password">
            </v-text-field>
        </v-form>
        <v-btn
            class="float-right"
            color="primary"
            :disabled="!input.username || !input.password || !this.valid || this.validateOverride"
            @click="login()">
                Login
        </v-btn>
        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                color="primary">
            </v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script>
    export default {
        name: 'Login',

        props: {
            loginData: {
                type: Object,
                default: function() {
                    return {
                        accessToken: {
                            type: 'cloudcard.api.accessToken',
                            value: ''
                        },
                        username: {
                            type: 'username',
                            value: ''
                        }
                    }
                }
            },
            apiData: {
                type: Object,
                default: function() {
                    return {
                        type: 'cloudcard.api.url',
                        value: ''
                    }
                }
            }
        },

        created: function () {
            this.loggedIn = (this.loginData.accessToken.value != '')
            this.endpoint = this.apiData.value
            if (this.endpoint == '') {
                this.validateOverride = true
                this.errorAlert('No API is chosen. Please go back to \'API\' step to choose one to login to.')
            }
        },

        data: () => ({
            valid: false,
            validateOverride: false,
            usernameRules: [
                value => !!value || 'Username is Required.',
                value => /^[\w-\+\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || 'Must be a valid E-mail'
            ],
            input: {
                username: '',
                password: ''
            },
            access_token: '',
            roles: '',
            office: '',
            service: '',
            loggedIn: false,
            overlay: false,
            errorMessage: '',
            alert: false,
            timeout: 5000,
        }),

        methods: {
            login() {
                this.overlay = true
                this.$http.post(this.endpoint + '/login', {
                    username: this.input.username,
                    password: this.input.password
                })
                .then(result => {
                    this.accessToken = result.data.access_token
                    this.roles = result.data.roles
                    this.office = this.roles.includes('ROLE_OFFICE')
                    this.service = this.roles.includes('ROLE_SERVICE')
                    this.overlay = false
                    if (!this.office || !this.service) {
                        if (!this.office) {
                            this.errorAlert('Please sign into an account with the OFFICE role!')
                        } else if (!this.service) {
                            this.errorAlert('Please sign into an account with the SERVICE role!')
                        } else if (!this.office && !this.service) {
                            this.errorAlert('Please sign into an account with both the OFFICE and SERVICE roles!')
                        }
                    } else {
                        var result = [
                            {
                                type: 'cloudcard.api.accessToken',
                                value: this.accessToken
                            },
                            {
                                type: 'username',
                                value: this.input.username
                            }
                        ]
                        this.$emit('set_value', result)
                    }
                })
                .catch(error => {
                    this.overlay = false
                    if (error.response) {
                        var status = error.response.status.toString()
                        if (status.startsWith('5')) {
                            this.errorAlert('Something happened on our end. Please try again later.')
                        } else if (status.startsWith('4')) {
                            this.errorAlert('Make sure you entered your email and password correctly.')
                        } else {
                            this.errorAlert('An error has occurred. Please try again later.')
                        }
                    } else if (error.request) {
                        this.errorAlert('An error has occurred. Make sure you have a good internet connection.')
                    } else {
                        this.errorAlert('Error: ' + error.message)
                    }
                })
            },
            errorAlert(message) {
                this.alert = true
                this.errorMessage = message
            }
        }
    }
</script>

<style scoped>
</style>
