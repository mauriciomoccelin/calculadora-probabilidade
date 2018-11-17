<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm12 md12>
      <v-card>
        <v-card-title class="headline">Registro</v-card-title>
        <progresso />
        <v-card-text>
          <v-form ref="formulario" v-model="formulario.validacao.valido" lazy-validation>
            <v-text-field v-model="formulario.registro.nome" :rules="regraNome" :counter="6" label="Primeiro nome" required />
            <v-text-field v-model="formulario.registro.segundoNome" :rules="regraSegundoNome" :counter="6" label="Segundo nome" required />
            <v-text-field v-model="formulario.registro.email" :rules="regraEmail" :counter="6" label="E-mail" required />
            <v-text-field v-model="formulario.registro.senha" 
            :rules="regraSenha" :type="formulario.registro.mostrarSenha ? 'text' : 'password'"
            :append-icon="formulario.registro.mostrarSenha ? 'visibility_off' : 'visibility'"
            @click:append="formulario.registro.mostrarSenha = !formulario.registro.mostrarSenha"
            :counter="8"
            label="Senha"
            required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="registrar" color="primary" flat nuxt>Registrar</v-btn>
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
      registro: {
        nome: undefined,
        segundoNome: undefined,
        email: undefined,
        senha: undefined,
        mostrarSenha: false
      },
      validacao: {
        valido: false
      }
    }
  }),
  computed: {
    regraNome: () => [v => !!v || 'Nome é obrigatório'],
    regraSegundoNome: () => [v => !!v || 'Senha é obrigatório'],
    regraEmail: () => [
      v => !!v || 'E-mail é obrigatório',
      v => /.+@.+/.test(v) || 'E-mail inválido'
    ],
    regraSenha: () => [
      v => !!v || 'Senha é obrigatório',
      v => (v && v.length >= 6) || 'Senha deve ter no minimo 6 caracteres'
    ]
  },
  methods: {
    registrar() {
      if (this.$refs.formulario.validate()) {
        this.$store.dispatch('registro', this.formulario.registro)
      }
    }
  }
}
</script>