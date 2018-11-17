import VuexPersistence from 'vuex-persist'

export default new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    usuarioLogado: state.usuarioLogado,
    estimativas: state.estimativas
  })
})