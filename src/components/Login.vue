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

        data() {
            return {
                rules: [
                    value => !!value || 'Required.',
                ],
                input: {
                    username: '',
                    password: ''
                }
            }
        },

        methods: {
            login() {
                console.log('username', this.input.username);
                console.log('password', this.input.password);
            }
        }
    }
</script>

<style scoped>
    #login-info {
        width: 50%;
    }
</style>
