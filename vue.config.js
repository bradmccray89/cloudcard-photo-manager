module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        files: [
          "**/*"
        ],
        extraFiles: [
          {
            "from": "cloudcard-photo-downloader.jar",
            "to": "cloudcard-photo-downloader.jar",
            "filter": ["**/*"]
          }
        ]
      }
    }
  }
}