<template>
    <v-container>
        <v-form id="login-info"
            v-model="valid"
            lazy-validation>
            <v-text-field
                v-model="input.username"
                background-color="white"
                outlined
                label="Email"
                :rules="usernameRules"
                hide-details="auto">
            </v-text-field>
            <v-text-field
                v-model="input.password"
                class="mt-2"
                type="password"
                background-color="white"
                outlined
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
