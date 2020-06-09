import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import 'materialize-css/dist/js/materialize'
import './registerServiceWorker'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.component('Loader', Loader);



firebase.initializeApp({
  apiKey: "AIzaSyDDzUa6H61FZ6AIGMJN2uV1DIjQufHVNq4",
  authDomain: "vueproj1-35944.firebaseapp.com",
  databaseURL: "https://vueproj1-35944.firebaseio.com",
  projectId: "vueproj1-35944",
  storageBucket: "vueproj1-35944.appspot.com",
  messagingSenderId: "75835787745",
  appId: "1:75835787745:web:ea45c500fda7336026eaa0",
  measurementId: "G-5CK9M0RL2T"
});


let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})



