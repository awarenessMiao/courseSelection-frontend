import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.$axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-fromurlencodeed'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
