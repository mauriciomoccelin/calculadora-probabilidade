<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm12 md12>
      <v-card>
        <v-card-title class="headline">Evento</v-card-title>
        <progresso />
        <v-card-text>
          <v-form ref="formulario" v-model="formulario.validacao.valido" lazy-validation>
            <v-text-field v-model="formulario.evento.token" :rules="regraToken" counter label="Token" required />
            <v-text-field v-model="formulario.evento.padrao" :rules="regraPadrao" counter label="Expressão regular padrão para o token" required />
            <v-text-field v-model="formulario.evento.probabilidadeAcontecer" :rules="regraProbabilidade" type="number" counter label="probabilidade do Evento Acontecer" required />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="salvarEvento" color="primary" flat nuxt>Salvar Evento</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <notificacao />
  </v-layout>
</template>

<script>
import Notificacao from '@/components/Notificacao'
import Progresso from '@/components/Progresso'

export default {
  components: {
    Notificacao,
    Progresso
  },
  data: () => ({
    formulario: {
      evento: {
        token: undefined,
        padrao: undefined,
        probabilidadeAcontecer: undefined
      },
      validacao: {
        valido: false
      }
    }
  }),
  computed: {
    regraToken: () => [v => !!v || 'Token é obrigatório'],
    regraPadrao: () => [v => !!v || 'Padrão é obrigatório'],
    regraProbabilidade: () => [v => !!v || 'Probabilidade é obrigatório']
  },
  methods: {
    salvarEvento () {
      if (this.$refs.formulario.validate()){
        this.$store.dispatch("salvarEvento", this.formulario.evento)
        this.$refs.formulario.resetValidation()
      }
    }
  }
}
</script>