<template>
  <div class="text-center">
    <v-container fluid>
      <img alt="Vue logo" src="../assets/logo.png">
      <Welcome msg="Welcome to Cloudcar Photo Manager"/>
      <v-btn
          class="float-right mb-3 mt-5"
          to="/Downloader">
              Download Photos
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import Welcome from '@/components/Welcome.vue'

export default {
  name: 'Home',

  components: {
    Welcome
  }
}
</script>

<style scoped>
    .main {
        text-align: center;
    }
</style>
