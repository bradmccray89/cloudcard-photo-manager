<template>
  <div class="text-center">
    <v-container fluid>
      <img alt="CloudCard Photo Manager" src="../assets/logo-only-300x300.png">
      <Welcome v-bind:showRedownloadButton="showRedownloadButton"/>
    </v-container>
  </div>
</template>

<script>
import Welcome from '@/components/Welcome.vue'

const fs = require('fs')
const app = require('electron').remote.app

export default {
  name: 'Home',

  components: {
    Welcome
  },

  data: () => {
    return {
      savedDownloadSettings: [],
      showRedownloadButton: false
    }
  },

  created: function() {
    console.log('path', app.getAppPath())
    let jsonFile = 'application-properties.json'
    if (fs.existsSync(jsonFile)) {
      this.showRedownloadButton = true
      this.savedDownloadSettings = JSON.parse(fs.readFileSync(jsonFile))
    }
  },

  methods: {

  }
}
</script>

<style scoped>
    .main {
        text-align: center;
    }
</style>
