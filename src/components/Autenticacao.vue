<template>
  <v-layout justify-center>
    <v-flex xs12 sm12>
      <v-card>
        <v-card-title class="headline">Autenticação</v-card-title>
        <progresso />
        <v-card-text>
          <v-form ref="formulario" v-model="formulario.validacao.valido" lazy-validation>
            <v-text-field v-model="formulario.autenticacao.email" :rules="regraEmail" :counter="10" type="email" label="E-mail" required />
            <v-text-field v-model="formulario.autenticacao.senha" :rules="regraSenha" label="Senha" type="password" required />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="fazerAutenticacao" color="primary" :disabled="!formulario.validacao.valido" flat nuxt>Fazer Autenticação</v-btn>
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
      autenticacao: {
        email: undefined,
        senha: undefined
      },
      validacao: {
        valido: false
      }
    }
  }),
  computed: {
    regraEmail: () => [v => /.+@.+/.test(v) || 'E-mail deve ser um email válido'],
    regraSenha: () => [v => !!v || "Senha é requerido"]
  },
  methods: {
    fazerAutenticacao() {
      if (this.$refs.formulario.validate())
        this.$store.dispatch("autenticacao", this.formulario.autenticacao)
    }
  }
}
</script>