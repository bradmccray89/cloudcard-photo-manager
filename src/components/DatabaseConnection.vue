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
                    <div class="d-flex flex-row align-center mb-1">
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
                            <span>Allows database connection settings to be used when downloading photos.</span>
                        </v-tooltip>
                    </div>
                    <div class="d-flex flex-row mb-8">
                        <div class="flex-col flex-grow-1 mr-5">
                            <div class="d-flex flex-row mb-1">
                                <span>Driver Class Name</span>
                            </div>
                            <v-select
                                v-model="driverClassName"
                                :items="driverClassOptions"
                                item-text="name"
                                item-value="entry"
                                outlined
                                dense>
                            </v-select>
                        </div>
                        <div class="flex-col flex-grow-1">
                            <div class="d-flex flex-row mb-1">
                                <span>Hibernate Dialect</span>
                            </div>
                            <v-select
                                v-model="dialect"
                                :items="dialectOptions"
                                item-text="name"
                                item-value="entry"
                                outlined
                                dense>
                            </v-select>
                        </div>
                    </div>
                </v-form>
            </v-container>
        </v-card-text>
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
                    name: 'Oracle',
                    entry: 'org.hibernate.dialect.Oracle10gDialect'
                },
                {
                    name: 'MS SQLServer',
                    entry: 'org.hibernate.dialect.SQLServer2012Dialect'
                },
                {
                    name: 'MySQL',
                    entry: 'org.hibernate.dialect.MySQL5InnoDBDialect'
                }
            ],
            driverClassOptions: [
                {
                    name: 'Oracle',
                    entry: 'oracle.jdbc.OracleDriver'
                },
                {
                    name: 'MS SQLServer',
                    entry: 'com.microsoft.sqlserver.jdbc.SQLServerDriver'
                },
                {
                    name: 'MySQL',
                    entry: 'com.mysql.jdbc.Driver'
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
        }
    }
    
}
</script>
<style scoped>
    .container {
        padding: 12px 0;
    }
</style>