<template>
    <v-container>
        <div class="d-flex flex-row mb-1">
            <span>Table Name</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-1"
                    v-bind="attrs"
                    v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>The name of the table where the photos will be stored.</span>
            </v-tooltip>
        </div>
        <v-text-field
            v-on:change="emitChange"
            v-model="tableName"
            dense
            solo>
        </v-text-field>
        <div class="d-flex flex-row mb-1">
            <span>Student Column Name</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-1"
                    v-bind="attrs"
                    v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>The name of the <code>VARCHAR</code> column where the cardholder's ID will be stored.</span>
            </v-tooltip>
        </div>
        <v-text-field
            v-on:change="emitChange"
            v-model="studentColumnName"
            dense
            solo>
        </v-text-field>
        <div class="d-flex flex-row mb-1">
            <span>Photo Column Name</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-1"
                    v-bind="attrs"
                    v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>The name of the <code>BLOB</code> column where the cardholder's jpeg encoded image will be stored.</span>
            </v-tooltip>
        </div>
        <v-text-field
            v-on:change="emitChange"
            v-model="photoColumnName"
            dense
            solo>
        </v-text-field>
        <div class="text-center">
            <v-dialog
                v-model="dialog"
                max-width="800px"
                persistent>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="db-button mb-3"
                    color="secondary"
                    block
                    small
                    v-bind="attrs"
                    v-on="on"
                    >
                        Add Database Connection
                    </v-btn>
                </template>
                <DatabaseConnection
                    v-bind:databaseConnectionData="dbConnectionData"
                    v-on:closeDialog="closeDialog"
                    v-on:saveDatabaseConnection="saveDatabaseConnection">
                </DatabaseConnection>
            </v-dialog>
        </div>
    </v-container>
</template>
<script>
import DatabaseConnection from './DatabaseConnection'

export default {
    name: 'DatabaseStorage',

    components: {
        DatabaseConnection
    },

    props: {
        databaseData: {
            type: Object,
            default: function() {
                return {
                    dbTableName: {
                        type: 'db.mapping.table',
                        value: 'CLOUDCARD'
                    },
                    dbStudentColumnName: {
                        type: 'db.mapping.column.studentId',
                        value: 'STUDENT_ID'
                    },
                    dbPhotoColumnName: {
                        type: 'db.mapping.column.photoId',
                        value: 'PHOTO'
                    }
                }
            }
        },
        dbConnectionData: {
            type: Object,
            default: function() {
                return {

                }
            }
        }
    },

    data() {
        return {
            tableName: '',
            studentColumnName: '',
            photoColumnName: '',
            dialog: false,
        }
    },

    created: function() {
        this.tableName = this.databaseData['dbTableName'].value
        this.studentColumnName = this.databaseData['dbStudentColumnName'].value
        this.photoColumnName = this.databaseData['dbPhotoColumnName'].value
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
                },
                dataSourceEnable: this.databaseConnectionData.dataSourceEnable,
                driverClassName: this.databaseConnectionData.driverClassName,
                url: this.databaseConnectionData.url,
                username: this.databaseConnectionData.username,
                password: this.databaseConnectionData.password,
                schema: this.databaseConnectionData.schema,
                dialect: this.databaseConnectionData.dialect
            }
            this.$emit('setDbData', data)
        },
        closeDialog() {
            this.dialog = false;
        },
        saveDatabaseConnection(dbConnectionData) {
            this.closeDialog()
            this.databaseConnectionData = dbConnectionData
            this.emitChange()
        }
    }
    
}
</script>
<style scoped>
    .container {
        padding: 12px 0;
    }
    .db-button {
        width: 80%;
    }
</style>