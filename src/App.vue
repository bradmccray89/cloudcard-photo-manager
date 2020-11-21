<template>
  <v-app>
    <v-main>
        <Installer />
    </v-main>
  </v-app>
</template>

<script>
import Installer from './components/Installer';

export default {
  name: 'App',

  components: {
    Installer,
  },

  data: () => ({
    //
  }),
};
</script>
