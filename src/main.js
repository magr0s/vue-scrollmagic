import Vue from 'vue'
import VueScrollmagic from './plugin'
import App from './App.vue'

Vue.use(VueScrollmagic)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
