module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        files: [
          "**/*",
          "build/icon.*",
        ],
        extraFiles: [
          "cloudcard-photo-downloader.jar",
        ]
      }
    }
  }
}