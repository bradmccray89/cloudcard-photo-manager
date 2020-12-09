<template>
    <v-card
        class="mx-auto text-center"
        width="300px">
        <v-card-text large>
            {{ msg }}
        </v-card-text>
        <v-btn
            class="mb-3 mt-5"
            to="/Downloader">
                Download Photos
        </v-btn>
    </v-card>
</template>

<script>
export default {
  name: 'Welcome',

  props: [ 'msg' ]
}
</script>
