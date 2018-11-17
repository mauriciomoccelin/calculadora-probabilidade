import Vuex from 'vuex'
import * as firebase from 'firebase'
import storage from '@/plugins/vuex-persist'

const DATABASE = {
  EVENTOS: 'eventos',
  ESTIMATIVAS: 'estimativas'
}

const store = () => {
  return new Vuex
    .Store({
      state: () => ({
        usuarioLogado: {
          uid: undefined,
          nome: undefined,
          email: undefined
        },
        estimativas: [],
        notificacao: undefined,
        temAtividade: false
      }),
      getters: {
        temUsuarioLogado: state =>(
          !!state.usuarioLogado.uid &&
          !!state.usuarioLogado.nome &&
          !!state.usuarioLogado.email),
        notificacao: state => state.notificacao,
        nomeUsuarioLogado: state => state.usuarioLogado.nome,
        temAtividade: state => state.temAtividade,
        estimativas: state =>  state.estimativas
      },
      mutations: {
        definirUsuarioLogado (state, payload) {
          state.usuarioLogado = payload
        },
        adicionarEstimativa (state, payload) {
          state.estimativas.push(payload)
        },
        adicionarNotificacao (state, menssagem) {
          state.notificacao = menssagem
        },
        temAtividade (state, payload) {
          state.temAtividade = payload
        }
      },
      actions: {
        removeNotificacao({commit}) {
          commit('adicionarNotificacao', undefined)
        },
        async autenticacao ({ commit }, payload) {
          commit('temAtividade', true)
          await firebase.auth()
            .signInWithEmailAndPassword(payload.email, payload.senha)
            .then(response => {
              commit('temAtividade', false)
              commit('definirUsuarioLogado', {
                uid: response.user.uid,
                nome: response.user.displayName,
                email: response.user.email
              })
            })
            .catch(error => {
              commit('temAtividade', false)
              commit('adicionarNotificacao', error.message)
            })
        },
        sairDoApp ({ commit },) {
          commit('temAtividade', true)
          firebase.auth().signOut()
            .then(() => {
              commit('temAtividade', false)
              commit('definirUsuarioLogado', {
                uid: undefined,
                nome: undefined,
                email: undefined
              })
            })
            .catch(error => {
              commit('temAtividade', false)
              commit('adicionarNotificacao', error.message)
            })
        },
        async registro ({ commit }, payload) {
          commit('temAtividade', true)
          await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.senha)
          .then(user => {
            user.user.updateProfile({ displayName: payload.nome + ' ' + payload.segundoNome } )
            commit('temAtividade', false)
            commit('definirUsuarioLogado', {
              uid: user.uid,
              nome: payload.nome + ' ' + payload.segundoNome,
              email: payload.email
            })
            commit('adicionarNotificacao', 'Usuário registrado com sucesso')
          })
          .catch(error => {
            commit('temAtividade', false)
            commit('adicionarNotificacao', error.message)
          })
        },
        async salvarEvento ({ commit }, evento) {
          commit('temAtividade', true)
          await firebase.database().ref(DATABASE.EVENTOS).push({
            token: evento.token,
            padrao: evento.padrao,
            probabilidadeAcontecer: parseFloat(evento.probabilidadeAcontecer),
            probabilidadeNaoAcontecer: parseFloat(100 - evento.probabilidadeAcontecer)
          })
          .then(() => {
            commit('temAtividade', false)
            commit('adicionarNotificacao', 'Evento salvo com sucesso!')
          })
          .catch(error => {
            commit('temAtividade', false)
            commit('adicionarNotificacao', error.message)
          })
        },
        async estimativa ({ commit }, estimativa) {
          commit('temAtividade', true)
          await firebase.database().ref(DATABASE.EVENTOS).once('value')
            .then(data => {
              let eventosParaFrase = []
              let eventos = Object.values(data.val())
              eventos.forEach(eventoPadrao => {
                let padraoEncontradosNaFrase = estimativa.frase.match(
                  new RegExp(eventoPadrao.padrao, 'gmi')
                )
                if (padraoEncontradosNaFrase)
                  eventosParaFrase.push(eventoPadrao)
              })

              if (!eventosParaFrase.length) {
                commit('temAtividade', false)
                commit('adicionarNotificacao', 'Não tenho conhecimento suficiente para realizar esta stimativa!')
                return
              }

              let acontece = 0
              let naoAcontece = 0
              let listaDeBayes = []

              eventosParaFrase.forEach(eventoPadrao => {
                acontece += eventoPadrao.probabilidadeAcontecer,
                  naoAcontece += eventoPadrao.probabilidadeNaoAcontecer
                listaDeBayes.push({
                  acontece: eventoPadrao.probabilidadeAcontecer,
                  naoAcontece: eventoPadrao.probabilidadeNaoAcontecer
                })
              })

              let posteriory = acontece / (acontece + naoAcontece)

              let bayes = {
                posteriory: posteriory,
                priory: acontece,
                condicional: naoAcontece,
                probabilidades: listaDeBayes
              }

              firebase.database().ref(DATABASE.ESTIMATIVAS).push(bayes)
                .then(() => {
                  commit('temAtividade', false)
                  commit('adicionarEstimativa', bayes.posteriory)
                  commit('adicionarNotificacao', 'Estimativa realizada com sucesso salvo com sucesso!')
                })
                .catch(error => {
                  commit('temAtividade', false)
                  commit('adicionarNotificacao', error.message)
                })
            })
            .catch(error => {
              commit('temAtividade', false)
              commit('adicionarNotificacao', error.message)
            })
        }
      },
      plugins: [storage.plugin]
    })
}

export default store
