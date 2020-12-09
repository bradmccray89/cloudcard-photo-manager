<template>
    <v-card
        class="mx-auto"
    >
        {{ msg }}
    </v-card>
</template>

<script>
export default {
  name: 'Welcome',

  props: [ 'msg' ]
}
</script>
