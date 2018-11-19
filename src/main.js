import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes/index.js'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify, {
  iconfont: 'fa'
 })
Vue.use(BootstrapVue)
Vue.use(VueRouter) 
const router = new VueRouter({
  routes: Routes
})

const sliceTextToWords = function(text, limit) {
  const words = text.split("\n").slice(0, limit)
  return words
}

const TurnWordsToTextWithDots = function(words, limit) {
  let slicedText = ""
  for (let i = 0; i < limit; i++) {
    slicedText += words[i] + "\n"
  }
  return slicedText + "..."
}
Vue.filter('snippet', function(text) {
  const wordsLimit = 20

  let words = sliceTextToWords(text, wordsLimit)
  return TurnWordsToTextWithDots(words, wordsLimit)
})

router.replace({ path: "textfield" })

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
