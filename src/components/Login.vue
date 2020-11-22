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

        data() {
            return {
                rules: [
                    value => !!value || 'Required.',
                ],
                input: {
                    username: '',
                    password: ''
                },
                accessToken: '',
                roles: '',
                office: '',
                service: ''
            }
        },

        methods: {
            login() {
                console.log('username', this.input.username);
                console.log('password', this.input.password);
                this.$http.post('https://test-api.onlinephotosubmission.com/api/login', {
                    username: this.input.username,
                    password: this.input.password
                })
                .then(result => {
                    this.accessToken = result.data.access_token
                    this.roles = result.data.roles
                    this.office = this.roles.includes('ROLE_OFFICE')
                    this.service = this.roles.includes('ROLE_SERVICE')
                    console.log('token', this.accessToken)
                    console.log('roles', this.roles)
                    console.log('office', this.office)
                    console.log('service', this.service)
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
