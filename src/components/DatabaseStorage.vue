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
        <v-btn class="db-button mb-3"
            small
            color="secondary"
            block>
            Add Database Connection
        </v-btn>
    </v-container>
</template>
<script>
export default {
    name: 'DatabaseStorage',

    props: {
        databaseData: {
            type: Object,
            default: function() {
                return {
                    dbTableName: {
                        type: 'db.mapping.table',
                        value: this.downloadData['db.mapping.table']
                    },
                    dbStudentColumnName: {
                        type: 'db.mapping.column.studentId',
                        value: this.downloadData['db.mapping.column.studentId']
                    },
                    dbPhotoColumnName: {
                        type: 'db.mapping.column.photoId',
                        value: this.downloadData['db.mapping.column.photoId']
                    }
                }
            }
        }
    },

    data() {
        return {
            tableName: '',
            studentColumnName: '',
            photoColumnName: ''
        }
    },

    created: function() {
        this.tableName = this.databaseData['dbTableName'].value,
        this.studentColumnName = this.databaseData['dbStudentColumnName'].value,
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
                }
            }
            this.$emit('setDbData', data)
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