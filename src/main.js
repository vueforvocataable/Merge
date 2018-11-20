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

const textWithDots = function(text, limit) {
  let words = text.split("\n")

  let isOverLimit = false
  if (words.length > limit) {
    isOverLimit = true
  } 

  words = words.slice(0, limit)
  
  let slicedText = ""
  for (let i = 0; i < limit; i++) {
    if (words[i] === undefined) {
      continue
    }

    slicedText += words[i] + "\n"
  }

  if (isOverLimit) {
    return slicedText + "..."
  }

  return slicedText
}
Vue.filter('snippet', function(text) {
  const wordsLimit = 20

  return textWithDots(text, wordsLimit)
})

router.replace({ path: "textfield" })

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
