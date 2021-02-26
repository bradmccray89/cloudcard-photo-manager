export default class FileService {
    setPropData(data) {
        return {
            apiData: {
                api: {
                    type: 'cloudcard.api.url',
                    value: data['cloudcard.api.url'] || 'https://api.onlinephotosubmission.com/api'
                }
            },
            loginData: {
                accessToken: {
                    type: 'cloudcard.api.accessToken',
                    value: data['cloudcard.api.accessToken'] || ''
                },
                username: {
                    type: 'username',
                    value: data['username'] || ''
                }
            },
            storageData: {
                storageType: {
                    type: 'downloader.storageService',
                    value: data['downloader.storageService'] || 'FileStorageService'
                },
                photoStorageLocation: {
                    type: 'downloader.photoDirectories',
                    value: data['downloader.photoDirectories'] || 'downloaded-photos'
                },
                dbTableName: {
                    type: 'db.mapping.table',
                    value: data['db.mapping.table'] || 'CLOUDCARD_PHOTOS'
                },
                dbStudentColumnName: {
                    type: 'db.mapping.column.studentId',
                    value: data['db.mapping.column.studentId'] || 'STUDENT_ID'
                },
                dbPhotoColumnName: {
                    type: 'db.mapping.column.photoId',
                    value: data['db.mapping.column.photoId'] || 'PHOTO'
                }
            },
            dbConnectionData: {
                dataSourceEnable: {
                    type: 'db.datasource.enabled',
                    value: data['db.datasource.enabled'] || false
                },
                driverClassName: {
                    type: 'db.datasource.driverClassName',
                    value: data['db.datasource.driverClassName'] || ''
                },
                url: {
                    type: 'db.datasource.url',
                    value: data['db.datasource.url'] || ''
                },
                username: {
                    type: 'db.datasource.username',
                    value: data['db.datasource.username'] || ''
                },
                password: {
                    type: 'db.datasource.password',
                    value: data['db.datasource.password'] || ''
                },
                schema: {
                    type: 'db.datasource.schema',
                    value: data['db.datasource.schema'] || ''
                },
                dialect: {
                    type: 'spring.jpa.hibernate.dialect',
                    value: data['spring.jpa.hibernate.dialect'] || ''
                }
            },
            repeatData: {
                repeat: {
                    type: 'downloader.repeat',
                    value: data['downloader.repeat'] || true
                },
                delay: {
                    type: 'donwloader.delay.milliseconds',
                    value: data['downloader.delay.milliseconds'] || 600000
                }
            },
            statusData: {
                fetchStatuses: {
                    type: 'downloader.fetchStatuses',
                    value: data['downloader.fetchStatuses'] || 'READY_FOR_DOWNLOAD'
                },
                putStatus: {
                    type: 'downloader.putStatus',
                    value: data['downloader.putStatus'] || 'DOWNLOADED'
                },
                minimumIdLength: {
                    type: 'downloader.minPhotoIdLength',
                    value: data['downloader.minPhotoIdLength'] || 0
                }
            },
            fileNameResolverData: {
                resolver: {
                    type: 'downloader.fileNameResolver',
                    value: data['downloader.fileNameResolver'] || 'SimpleFileNameResolver'
                },
                query: {
                    type: 'DatabaseFileNameResolver.baseFileName.query',
                    value: data['DatabaseFileNameResolver.baseFileName.query'] || ''
                }
            },
            scriptData: {
                preExecuteScript: {
                    type: 'ShellCommandService.preExecuteCommand',
                    value: data['ShellCommandService.preExecuteCommand'] || ''
                },
                preDownloadScript: {
                    type: 'ShellCommandService.preDownloadCommand',
                    value: data['ShellCommandService.preDownloadCommand'] || ''
                },
                postExecuteScript: {
                    type: 'ShellCommandService.postExecuteCommand',
                    value: data['ShellCommandService.postExecuteCommand'] || ''
                },
                postDownloadScript: {
                    type: 'ShellCommandService.postDownloadCommand',
                    value: data['ShellCommandService.postDownloadCommand'] || ''
                }
            },
            processorData: {
                preProcessor: {
                    type: 'downloader.preProcessor',
                    value: data['downloader.preProcessor'] || 'DoNothingPreProcessor'
                },
                bytesLink: {
                    type: 'BytesLinkPreprocessor.urlTemplate',
                    value: data['BytesLinkPreprocessor.urlTemplate'] || ''
                },
                postProcessor: {
                    type: 'downloader.postProcessor',
                    value: data['downloader.postProcessor'] || 'DoNothingPostProcessor'
                },
                photoFilePath: {
                    type: 'DatabasePostProcessor.override.photoFilePath',
                    value: data['DatabasePostProcessor.override.photoFilePath'] || ''
                },
                query: {
                    type: 'DatabasePostProcessor.query',
                    value: data['DatabasePostProcessor.query'] || ''
                },
                paramNames: {
                    type: 'DatabasePostProcessor.query.paramNames',
                    value: data['DatabasePostProcessor.query.paramNames'] || ''
                },
                paramTypes: {
                    type: 'DatabasePostProcessor.query.paramTypes',
                    value: data['DatabasePostProcessor.query.paramTypes'] || ''
                }
            },
            summaryServiceData: {
                summaryService: {
                    type: 'downloader.SummaryService',
                    value: data['downloader.SummaryService'] || 'SimpleSummaryService'
                },
                fileName: {
                    type: 'SimpleSummaryService.fileName',
                    value: data['SimpleSummaryService.fileName'] || ''
                },
                directory: {
                    type: 'SimpleSummaryService.directory',
                    value: data['SimpleSummaryService.directory'] || 'summary'
                }
            }
        }
    }

    setDefaults() {
        return {
            'cloudcard.api.url': 'https://api.onlinephotosubmission.com/api',
            'downloader.storageService': 'FileStorageService',
            'downloader.photoDirectories': 'downloaded-photos',
            'db.mapping.table': 'CLOUDCARD_PHOTOS',
            'db.mapping.column.studentId': 'STUDENT_ID',
            'db.mapping.column.photoId': 'PHOTO',
            'db.datasource.enabled': false,
            'downloader.repeat': true,
            'donwloader.delay.milliseconds': 600000,
            'downloader.fetchStatuses': 'READY_FOR_DOWNLOAD',
            'downloader.putStatus': 'DOWNLOADED',
            'downloader.minPhotoIdLength': 0,
            'downloader.fileNameResolver': 'SimpleFileNameResolver',
            'downloader.preProcessor': 'DoNothingPreProcessor',
            'downloader.postProcessor': 'DoNothingPostProcessor',
            'downloader.SummaryService': 'SimpleSummaryService',
            'SimpleSummaryService.directory': 'summary'
        }
    }
}