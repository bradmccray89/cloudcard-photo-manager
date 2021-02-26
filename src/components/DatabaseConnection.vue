<template>
    <v-card>
        <v-card-title>
            <span>Database Connection Information</span>
            <v-spacer></v-spacer>
            <v-btn rounded icon @click="closeDialog"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-form lazy-validation>
                    <div class="d-flex flex-row align-center">
                        <v-checkbox
                        v-model="dataSourceEnable"
                        dense
                        solo
                        >
                        </v-checkbox>
                        <span>DataSource Enabled</span>
                        <v-tooltip bottom max-width="350px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon class="ml-2"
                                v-bind="attrs"
                                v-on="on"
                                >
                                    info_outline
                                </v-icon>
                            </template>
                            <span>Must be selected for the database connection information to be used.</span>
                        </v-tooltip>
                    </div>
                    <v-row>
                        <v-col col="6">
                            <div>
                                <span>Driver Class Name</span>
                            </div>
                            <v-select
                                v-model="driverClassName"
                                :items="driverClassOptions"
                                item-text="type"
                                item-value="value"
                                solo
                                dense>
                            </v-select>
                        </v-col>
                        <v-col col="6">
                            <div>
                                <span>Hibernate Dialect</span>
                            </div>
                            <v-select
                                v-model="dialect"
                                :items="dialectOptions"
                                item-text="type"
                                item-value="value"
                                solo
                                dense>
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col col="6">
                            <div>
                                <span>DataSource URL</span>
                            </div>
                            <v-text-field
                                v-model="url"
                                solo
                                dense>
                            </v-text-field>
                        </v-col>
                        <v-col col="6">
                            <div>
                                <span>Schema</span>
                            </div>
                            <v-text-field
                                v-model="schema"
                                solo
                                dense>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col col="6">
                            <div>
                                <span>Username</span>
                            </div>
                            <v-text-field
                                v-model="username"
                                solo
                                dense>
                            </v-text-field>
                        </v-col>
                        <v-col col="6">
                            <div>
                                <span>Password</span>
                            </div>
                            <v-text-field
                                v-model="password"
                                :type="passwordFieldType"
                                solo
                                dense>
                                <v-btn
                                    class="mt-0"
                                    icon
                                    @click="togglePassword"
                                    slot="append">
                                    <v-icon v-if="!showPassword">mdi-eye</v-icon>
                                    <v-icon v-if="showPassword">mdi-eye-off</v-icon>
                                </v-btn>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                @click="save">
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    name: 'DatabaseConnection',

    props: {
        databaseConnectionData: {
            type: Object,
            default: function() {
                return {
                    dataSourceEnable: {
                        type: 'db.datasource.enabled',
                        value: false
                    },
                    driverClassName: {
                        type: 'db.datasource.driverClassName',
                        value: ''
                    },
                    url: {
                        type: 'db.datasource.url',
                        value: ''
                    },
                    username: {
                        type: 'db.datasource.username',
                        value: ''
                    },
                    password: {
                        type: 'db.datasource.password',
                        value: ''
                    },
                    schema: {
                        type: 'db.datasource.schema',
                        value: ''
                    },
                    dialect: {
                        type: 'spring.jpa.hibernate.dialect',
                        value: ''
                    }
                }
            }
        }
    },

    data() {
        return {
            dataSourceEnable: false,
            driverClassName: '',
            url: '',
            username: '',
            password: '',
            passwordFieldType: 'password',
            showPassword: false,
            schema: '',
            dialect: '',
            dialectOptions: [
                {
                    type: 'Oracle',
                    value: 'org.hibernate.dialect.Oracle10gDialect'
                },
                {
                    type: 'MS SQLServer',
                    value: 'org.hibernate.dialect.SQLServer2012Dialect'
                },
                {
                    type: 'MySQL',
                    value: 'org.hibernate.dialect.MySQL5InnoDBDialect'
                }
            ],
            driverClassOptions: [
                {
                    type: 'Oracle',
                    value: 'oracle.jdbc.OracleDriver'
                },
                {
                    type: 'MS SQLServer',
                    value: 'com.microsoft.sqlserver.jdbc.SQLServerDriver'
                },
                {
                    type: 'MySQL',
                    value: 'com.mysql.jdbc.Driver'
                }
            ]
        }
    },

    created: function() {
        this.dataSourceEnable = this.databaseConnectionData.dataSourceEnable ? this.databaseConnectionData.dataSourceEnable.value : false
        this.driverClassName = this.databaseConnectionData.driverClassName.value
        this.url = this.databaseConnectionData.url.value
        this.username = this.databaseConnectionData.username.value
        this.password = this.databaseConnectionData.password.value
        this.schema = this.databaseConnectionData.schema.value
        this.dialect = this.databaseConnectionData.dialect.value
    },

    methods: {
        togglePassword() { 
            this.showPassword = !this.showPassword
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
        },
        closeDialog() {
            this.$emit('closeDialog')
        },
        save() {
            this.databaseConnectionData.dataSourceEnable.value = this.dataSourceEnable
            this.databaseConnectionData.driverClassName.value = this.driverClassName
            this.databaseConnectionData.url.value = this.url
            this.databaseConnectionData.username.value = this.username
            this.databaseConnectionData.password.value = this.password
            this.databaseConnectionData.dialect.value = this.dialect
            this.databaseConnectionData.schema.value = this.schema

            this.$emit('saveDatabaseConnection', this.databaseConnectionData)
        }
    }
    
}
</script>
<style scoped>
    .container {
        padding: 12px 0;
    }
</style>