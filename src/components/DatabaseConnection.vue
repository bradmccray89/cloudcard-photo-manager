<template>
    <v-container>
        <div class="d-flex flex-row align-center mb-1">
            <v-checkbox
                v-model="enableDatasource"
                dense
                solo>
            </v-checkbox>
            <span>Enable Datasource</span>
        </div>
        <div class="d-flex flex-row mb-1">
            <span>Driver Class Name</span>
        </div>
        <v-select
            v-model="driverClassName"
            :items="driverClassNameOptions"
            item-text="name"
            item-value="value"
            label="Driver Class"
            :disabled="!enableDatasource"
            dense
            solo>
        </v-select>
        <div class="d-flex flex-row mb-1">
            <span>Datasource URL</span>
        </div>
        <v-text-field
            v-model="datasourceUrl"
            solo
            dense>
        </v-text-field>
    </v-container>
</template>

<script>
    export default {
        name: 'DatabaseConnection',

        props: {
        },

        data() {
            return {
                enableDatasource: false,
                driverClassName: '',
                datasourceUrl: '',
                username: '',
                password: '',
                schema: '',
                springHibernateDialect: '',
                driverClassNameOptions: [
                    {
                        name: 'Oracle',
                        value: 'oracle.jdbc.OracleDriver'
                    },
                    {
                        name: 'MS SQLServer',
                        value: 'com.microsoft.sqlserver.jdbc.SQLServerDriver'
                    },
                    {
                        name: 'MySQL',
                        value: 'com.mysql.jdbc.Driver'
                    }
                ],
                springHibernateDialectOptions: [
                    {
                        name: 'Oracle',
                        value: 'org.hibernate.dialect.Oracle10gDialect'
                    },
                    {
                        name: 'MS SQLServer',
                        value: 'org.hibernate.dialect.SQLServer2012Dialect'
                    },
                    {
                        name: 'MySQL',
                        value: 'com.mysql.jdbc.Driver'
                    }
                ]
            }
        },

        methods: {
        }
    }
</script>

<style scoped>
    .container {
        padding: 12px 0;
    }
</style>
