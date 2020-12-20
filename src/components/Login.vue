<template>
    <v-container>
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
            class="float-right mb-3"
            color="primary"
            :disabled="!input.username || !input.password"
            @click="login()">
                Login
        </v-btn>
    </v-container>
</template>

<script>
    export default {
        name: 'Login',

        props: [
            'data',
            'endpoint'
        ],

        created: function () {
            this.loggedIn = this.data?.value ? true : false
        },

        data: () => ({
            valid: true,
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
        }),

        methods: {
            login() {
                this.$http.post(this.endpoint + '/login', {
                    username: this.input.username,
                    password: this.input.password
                })
                .then(result => {
                    this.accessToken = result.data.access_token
                    this.roles = result.data.roles
                    this.office = this.roles.includes('ROLE_OFFICE')
                    this.service = this.roles.includes('ROLE_SERVICE')
                    if (!this.office || !this.service) {
                        if (!this.office) {
                            throw Error('Please sign into an account with the OFFICE role!')
                        } else if (!this.service) {
                            throw Error('Please sign into an account with the SERVICE role!')
                        } else if (!this.office && !this.service) {
                            throw Error('Please sign into an account with both the OFFICE and SERVICE roles!')
                        }
                    } else {
                        var result = {
                            type: 'access_token',
                            value: this.accessToken
                        }
                        this.$emit('set_value', result)
                    }
                })
                .catch(error => {
                    console.error('ERROR:', error.message)
                })
            }
        }
    }
</script>

<style scoped>
    #login-info {
        width: 80%;
    }
</style>
