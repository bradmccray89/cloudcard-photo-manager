<template>
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
                        value: this.downloadData['db.datasource.enabled']
                    },
                    driverClassName: {
                        type: 'db.datasource.driverClassName',
                        value: this.downloadData['db.datasource.driverClassName']
                    },
                    url: {
                        type: 'db.datasource.url',
                        value: this.downloadData['db.datasource.url']
                    },
                    username: {
                        type: 'db.datasource.username',
                        value: this.downloadData['db.datasource.username']
                    },
                    password: {
                        type: 'db.datasource.password',
                        value: this.downloadData['db.datasource.password']
                    },
                    schema: {
                        type: 'db.datasource.schema',
                        value: this.downloadData['db.datasource.schema']
                    },
                    dialect: {
                        type: 'spring.jpa.hibernate.dialect',
                        value: this.downloadData['spring.jpa.hibernate.dialect']
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
                tableName: {
                    type: 'db.mapping.table',
                    value: this.tableName
                },
                studentName: {
                    type: 'db.mapping.column.studentId',
                    value: this.studentColumnName
                },
                photoName: {
                    type: 'db.mapping.column.photoId',
                    value: this.photoColumnName
                }
            }
            this.$emit('setDbConnectionData', data)
        }
    }
    
}
</script>
<style scoped>
    .container {
        padding: 12px 0;
    }
</style>