<template>
  <div class="text-center">
    <v-container fluid>
      <img alt="CloudCard Photo Manager" src="../assets/logo-only-300x300.png">
      <Welcome msg="Welcome to Cloudcard Photo Manager"/>
    </v-container>
  </div>
</template>

<script>
import Welcome from '@/components/Welcome.vue'

const fs = require('fs')

export default {
  name: 'Home',

  components: {
    Welcome
  },

  created: function() {
    let jsonFile = 'application-properties.json'
    if (fs.existsSync(jsonFile)) {
      let rawFileData = fs.readFileSync(jsonFile)
      let fileData = JSON.parse(rawFileData)
      console.log(fileData)
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
