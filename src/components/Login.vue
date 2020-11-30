<template>
    <v-container>
        <div id="login-info">
            <v-text-field
                v-model="input.username"
                background-color="white"
                outlined
                label="Email"
                :rules="rules"
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
        </div>
        <v-btn
            class="float-left mb-3"
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

        props: {
            endpoint: String
        },

        data() {
            return {
                rules: [
                    value => !!value || 'Required.',
                ],
                input: {
                    username: '',
                    password: ''
                },
                access_token: '',
                roles: '',
                office: '',
                service: ''
            }
        },

        methods: {
            login() {
                this.$http.post('https://test-api.onlinephotosubmission.com/api/login', {
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
                        this.$emit('access_token', result)
                    }
                })
                .catch(error => {
                    console.error(error.message)
                })
            }
        }
    }
</script>

<style scoped>
    #login-info {
        width: 50%;
    }
</style>