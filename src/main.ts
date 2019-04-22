import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./assets/css/lolku.less";
import pxAdaptation from './utils/pxAdaptation.js';
Vue.use(pxAdaptation)
import lolku from './utils/index'

Vue.prototype.lolku = new lolku();
// require('amfe-flexible')
// import ds from './utils/index.js';
// 
// new ds();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
