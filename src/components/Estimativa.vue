<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm12>
      <v-card>
        <v-card-title class="headline">Estimativa</v-card-title>
        <progresso />
        <v-card-text>
          <v-form ref="formulario" v-model="formulario.validacao.valido" lazy-validation>
            <v-textarea v-model="formulario.estimativa.frase" :rules="regraFrase" label="Frase" required />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="estimar" color="primary" flat nuxt>Fazer Estimativa</v-btn>
        </v-card-actions>
      </v-card>
        <v-data-table
          :headers="[{ text: 'Posteriory', value: 'posteriory' }]"
          :items="estimativas"
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ `${props.item.posteriory * 100}%` }}</td>
          </template>
        </v-data-table>
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
      estimativa: {
        frase: undefined,
      },
      validacao: {
        valido: false
      }
    }
  }),
  computed: {
    regraFrase: () => [v => !!v || 'Frase é obrigatório'],
    estimativas () {
      if (!this.$store.getters.estimativas) return []
      return this.$store.getters.estimativas
        .map(x => { return { posteriory: x } })
      }
  },
  methods: {
    estimar () {
      if (this.$refs.formulario.validate())
        this.$store.dispatch("estimativa", this.formulario.estimativa)
    }
  }
}
</script>