import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ZoomOnHover from "vue-zoom-on-hover";


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(ZoomOnHover);