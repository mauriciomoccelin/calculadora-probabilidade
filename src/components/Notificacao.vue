<template>
  <v-dialog v-model="temNotificacao" max-width="500px">
    <v-card>
      <v-card-title>
        Notificação
      </v-card-title>
      <v-card-text>
          {{ notificacao }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click="$store.dispatch('removeNotificacao')">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    notificacao() { return this.$store.getters.notificacao },
    temNotificacao() { return this.$store.getters.notificacao !== undefined }
  }
}
</script>
