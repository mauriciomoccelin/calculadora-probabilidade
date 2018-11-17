<template>
  <v-progress-linear v-show="temAtividade" indeterminate></v-progress-linear>
</template>

<script>
export default {
  computed: {
    temAtividade() { return Number(this.$store.getters.temAtividade) }
  }
}
</script>
