<template>
  <v-app dark>
    <v-navigation-drawer temporary :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
      <v-list>
        <v-list-tile value="true" v-for="item in items" :to="{ path: item.path }" :key="item.name">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ nomeUsuarioLogado }}</v-toolbar-title>
      <v-btn icon @click="singOut">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed"  app>
      <span>&copy; {{ getDate }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: "vpn_key", title: "Autenticação", path: "/" },
        { icon: "account_circle", title: "Registro", path: "/registros" },
        { icon: "device_hub", title: "Evento", path: "/eventos" },
        { icon: "bubble_chart", title: "Estimativas", path: "/estimativas" }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "M|M Calculadora de Probabilidade"
    };
  },
  computed: {
    getDate() {
      return new Date().getFullYear();
    },
    nomeUsuarioLogado () { return this.$store.getters.nomeUsuarioLogado }
  },
  methods: {
    singOut () {
      this.$store.dispatch("sairDoApp")
    }
  }
};
</script>
