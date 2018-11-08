import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes/index.js'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
 
Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(VueRouter) 
const router = new VueRouter({
  routes: Routes
})
router.replace({ path: "textfield" })

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
