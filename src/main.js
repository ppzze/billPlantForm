import Vue from 'vue'
import App from './App.vue'
// import Main from './views/login.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from './http'

import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer) 

Vue.prototype.$http = http
Vue.config.productionTip = false
import 'lib-flexible/flexible'
Vue.use(ElementUI);
// 设置浏览器标题
Vue.directive('title', {
  inserted: function (el) {
    document.title = el.dataset.title
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


