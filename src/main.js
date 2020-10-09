import Vue from 'vue'
import App from './index.vue'
import axios from "axios"
import router from "./router"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./vuex/index"
import VueCookies from 'vue-cookies';
import $ from 'jquery'
axios.defaults.withCredentials = true; 
axios.defaults.crossDomain = true;
axios.defaults.dataType = 'json';
Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
