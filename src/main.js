import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes/index.js'

Vue.use(VueRouter) 
<<<<<<< HEAD
=======

>>>>>>> 17972f614f2cc18186587bb8865dcb312c71a942
const router = new VueRouter({
  routes: Routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
