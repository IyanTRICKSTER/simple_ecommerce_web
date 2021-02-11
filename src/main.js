import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ZoomOnHover from "vue-zoom-on-hover";
import store from "./store"
import Vue2Filters from 'vue2-filters'
// import VueGlobalVariable from "vue-global-var"


Vue.config.productionTip = false

Vue.prototype.$api_url = "http://localhost:8000/api"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(ZoomOnHover);
Vue.use(Vue2Filters);