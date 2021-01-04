<template>
  <div class="text-center">
    <v-container fluid>
      <img alt="Vue logo" src="../assets/logo.png">
      <Welcome msg="Welcome to Cloudcard Photo Manager"/>
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
