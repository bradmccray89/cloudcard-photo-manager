export default class FileService {
    setPropData(data) {
        return {
            apiData: {
                type: 'cloudcard.api.url',
                value: data['cloudcard.api.url']
            },
            loginData: {
                accessToken: {
                    type: 'cloudcard.api.accessToken',
                    value: data['cloudcard.api.accessToken']
                },
                username: {
                    type: 'username',
                    value: data['username']
                }
            },
            storageData: {
                storageType: {
                    type: 'downloader.storageService',
                    value: data['downloader.storageService']
                },
                photoStorageLocation: {
                    type: 'downloader.photoDirectories',
                    value: data['downloader.photoDirectories']
                },
                summaryLocation: {
                    type: 'SimpleSummaryService.directory',
                    value: data['SimpleSummaryService.directory']
                },
                dbTableName: {
                    type: 'db.mapping.table',
                    value: data['db.mapping.table']
                },
                dbStudentColumnName: {
                    type: 'db.mapping.column.studentId',
                    value: data['db.mapping.column.studentId']
                },
                dbPhotoColumnName: {
                    type: 'db.mapping.column.photoId',
                    value: data['db.mapping.column.photoId']
                }
            },
            dbConnectionData: {
                dataSourceEnable: {
                    type: 'db.datasource.enabled',
                    value: data['db.datasource.enabled']
                },
                driverClassName: {
                    type: 'db.datasource.driverClassName',
                    value: data['db.datasource.driverClassName']
                },
                url: {
                    type: 'db.datasource.url',
                    value: data['db.datasource.url']
                },
                username: {
                    type: 'db.datasource.username',
                    value: data['db.datasource.username']
                },
                password: {
                    type: 'db.datasource.password',
                    value: data['db.datasource.password']
                },
                schema: {
                    type: 'db.datasource.schema',
                    value: data['db.datasource.schema']
                },
                dialect: {
                    type: 'spring.jpa.hibernate.dialect',
                    value: data['spring.jpa.hibernate.dialect']
                }
            },
            repeatData: {
                repeat: {
                    type: 'downloader.repeat',
                    value: data['downloader.repeat']
                },
                delay: {
                    type: 'donwloader.delay.milliseconds',
                    value: data['downloader.delay.milliseconds']
                }
            },
            statusData: {
                fetchStatuses: {
                    type: 'downloader.fetchStatuses',
                    value: data['downloader.fetchStatuses']
                },
                putStatus: {
                    type: 'downloader.putStatus',
                    value: data['downloader.putStatus']
                },
                minimumIdLength: {
                    type: 'downloader.minPhotoIdLength',
                    value: data['downloader.minPhotoIdLength']
                }
            },
            fileNameResolverData: {
                resolver: {
                    type: 'downloader.fileNameResolver',
                    value: data['downloader.fileNameResolver']
                },
                query: {
                    type: 'DatabaseFileNameResolver.baseFileName.query',
                    value: data['DatabaseFileNameResolver.baseFileName.query']
                }
            }
        }
    }
}