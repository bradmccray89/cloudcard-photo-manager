<template>
    <v-container>
        <div class="d-flex flex-row mb-1">
            <span>Storage Type</span>
            <v-tooltip bottom max-width="350px">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        info_outline
                    </v-icon>
                </template>
                <span>Determines how the downloaded photos will be stored.</span>
            </v-tooltip>
        </div>
        <v-select
            v-model="storageChoice"
            :items="storageTypes"
            item-text="name"
            item-value="entry"
            label="Storage Service"
            dense
            solo
            @change="changeData()">
        </v-select>
        <v-divider></v-divider>
        <FileStorage v-if="storageChoice === 'FileStorageService'"
            v-bind:selectedPath="storageData.photoStorageLocation.value"
            v-on:set_folders="setFolderForStorage">
        </FileStorage>
        <DatabaseStorage v-if="storageChoice === 'SimpleDatabaseStorageService'"
            v-bind:databaseData="databaseData"
            v-bind:dbConnectionData="dbConnectionData"
            v-on:setDbData="setDbData">
        </DatabaseStorage>
        <div class="d-flex float-right">
            <v-btn
                color="primary"
                @click="emitChange">
                Next
            </v-btn>
        </div>
    </v-container>
</template>

<script>
    import FileStorage from './FileStorage'
    import DatabaseStorage from './DatabaseStorage'

    const path = require('path')

    export default {
        name: 'Storage',

        components: {
            FileStorage,
            DatabaseStorage
        },

        props: {
            storageData: {
                type: Object,
                default: function() {
                    return {
                        storageType: {
                            type: 'downloader.storageService',
                            value: this.downloadData['downloader.storageService']
                        },
                        photoStorageLocation: {
                            type: 'downloader.photoDirectories',
                            value: this.downloadData['downloader.photoDirectories']
                        },
                        summaryLocation: {
                            type: 'SimpleSummaryService.directory',
                            value: this.downloadData['SimpleSummaryService.directory']
                        },
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
            },
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

        created: function () {
            this.storageChoice = this.storageTypes.find(f => f.entry === this.storageData.storageType.value).entry
            this.photoStorageLocation = this.storageData.photoStorageLocation.value
            this.summaryLocation = this.storageData.summaryLocation.value
            this.databaseData.dbTableName = this.storageData.dbTableName
            this.databaseData.dbStudentColumnName = this.storageData.dbStudentColumnName
            this.databaseData.dbPhotoColumnName = this.storageData.dbPhotoColumnName
        },

        data() {
            return {
                storageTypes: [
                    {
                        name: 'File Storage',
                        entry: 'FileStorageService'
                    },
                    {
                        name: 'Database Storage',
                        entry: 'SimpleDatabaseStorageService'
                    }
                ],
                storageChoice: '',
                photoStorageLocation: '',
                summaryLocation: '',
                databaseData: {},
                dbTable: '',
                dbStudentColumn: '',
                dbPhotoColumn: ''
            }
        },

        methods: {
            changeData() {
                if (this.storageType !== '' && this.photoStorageLocation !== '') {
                    this.summaryLocation = path.dirname(this.photoStorageLocation)
                }
            },
            emitChange() {
                var result = []
                if (this.storageChoice === 'FileStorageService') {
                    result = [
                        {
                            type: 'downloader.storageService',
                            value: this.storageChoice
                        },
                        {
                            type: 'downloader.photoDirectories',
                            value: this.photoStorageLocation
                        },
                        {
                            type: 'SimpleSummaryService.directory',
                            value: this.summaryLocation
                        }
                    ]
                } else if (this.storageChoice === 'SimpleDatabaseStorageService') {
                    result = [
                        {
                            type: 'downloader.storageService',
                            value: this.storageChoice
                        },
                        {
                            type: 'db.mapping.table',
                            value: this.dbTable ? this.dbTable : this.databaseData.dbTableName.value
                        },
                        {
                            type: 'db.mapping.column.studentId',
                            value: this.dbStudentColumn ? this.dbStudentColumn : this.databaseData.dbStudentColumnName.value
                        },
                        {
                            type: 'db.mapping.column.photoId',
                            value: this.dbPhotoColumn ? this.dbPhotoColumn : this.databaseData.dbPhotoColumnName.value
                        },
                        {
                            type: 'db.datasource.enabled',
                            value: this.databaseData.dataSourceEnable.value
                        },
                        {
                            type: 'db.datasource.driverClassName',
                            value: this.databaseData.driverClassName.value
                        },
                        {
                            type: 'db.datasource.url',
                            value: this.databaseData.url.value
                        },
                        {
                            type: 'db.datasource.username',
                            value: this.databaseData.username.value
                        },
                        {
                            type: 'db.datasource.password',
                            value: this.databaseData.password.value
                        },
                        {
                            type: 'db.datasource.schema',
                            value: this.databaseData.schema.value
                        },
                        {
                            type: 'spring.jpa.hibernate.dialect',
                            value: this.databaseData.dialect.value
                        },
                        {
                            type: 'SimpleSummaryService.directory',
                            value: this.summaryLocation
                        }
                    ]
                }
                this.$emit('set_value', result)
            },
            setFolderForStorage(event) {
                event.forEach(item => {
                    if (item.type === 'downloader.photoDirectories') {
                        this.photoStorageLocation = item.value
                    }
                })
            },
            setDbData(data) {
                this.databaseData.dbTableName = data.tableName
                this.databaseData.dbStudentColumnName = data.studentName
                this.databaseData.dbPhotoColumnName = data.photoName
                this.databaseData.driverClassName = data.driverClassName
                this.databaseData.url = data.url
                this.databaseData.dataSourceEnable = data.dataSourceEnable
                this.databaseData.dialect = data.dialect
                this.databaseData.username = data.username
                this.databaseData.password = data.password
                this.databaseData.schema = data.schema

                this.dbTable = data.tableName.value
                this.dbStudentColumn = data.studentName.value
                this.dbPhotoColumn = data.photoName.value
            },
        }
    }
</script>

<style scoped>
</style>
