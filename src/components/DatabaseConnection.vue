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
                                outlined
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
                                outlined
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
                                outlined
                                dense>
                            </v-text-field>
                        </v-col>
                        <v-col col="6">
                            <div>
                                <span>Schema</span>
                            </div>
                            <v-text-field
                                v-model="schema"
                                outlined
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
                                outlined
                                dense>
                            </v-text-field>
                        </v-col>
                        <v-col col="6">
                            <div>
                                <span>Password</span>
                            </div>
                            <v-text-field
                                v-model="password"
                                type="password"
                                outlined
                                dense>
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
        dbConnectionData: {
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
        this.dataSourceEnable = this.dbConnectionData.dataSourceEnable ? this.dbConnectionData.dataSourceEnable.value : false
        this.driverClassName = this.dbConnectionData.driverClassName.value
        this.url = this.dbConnectionData.url.value
        this.username = this.dbConnectionData.username.value
        this.password = this.dbConnectionData.password.value
        this.schema = this.dbConnectionData.schema.value
        this.dialect = this.dbConnectionData.dialect ? this.dialectOptions.find(f => f.entry === this.dbConnectionData.dialect.value) : ''
    },

    methods: {
        emitChange() {
            var data = {
            }
            this.$emit('setDbConnectionData', data)
        },
        closeDialog() {
            this.$emit('closeDialog')
        },
        save() {
            this.dbConnectionData.dataSourceEnable.value = this.dataSourceEnable
            this.dbConnectionData.driverClassName.value = this.driverClassName
            this.dbConnectionData.url.value = this.url
            this.dbConnectionData.username.value = this.username
            this.dbConnectionData.password.value = this.password
            this.dbConnectionData.dialect.value = this.dialect
            this.dbConnectionData.schema.value = this.schema

            console.log('dbConnectionData', this.dbConnectionData)

            this.$emit('saveDatabaseConnection', this.dbConnectionData)
        }
    }
    
}
</script>
<style scoped>
    .container {
        padding: 12px 0;
    }
</style>