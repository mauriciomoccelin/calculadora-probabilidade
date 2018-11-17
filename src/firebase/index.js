import { initializeApp } from 'firebase'

export default {
  config: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  },
  initializeAppFirebase () {
    initializeApp(this.config);
  }
}