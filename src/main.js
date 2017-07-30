// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "./assets/css/bootstrap.min.css";
import "./assets/js/bootstrap.min";
import store from "./vuex/store.js";
// import 'element-ui/lib/theme-default/index.css'
// import axios from 'axios'
// import VueResource from 'vue-resource'
// import ElementUI from 'element-ui'
// Vue.use(VueResource)
// import api from './config/api'
// Vue.prototype.$ajax = axios
// Vue.prototype.$api = api
// Vue.use(ElementUI);
Vue.config.productionTip = false


/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App></App>',
  components: {
    App
  }
})
