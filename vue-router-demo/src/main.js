//引入Vue
import Vue from 'vue'
//引入App.vue
import App from './App.vue'
// 引入router
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,//引用router作为vue对象实例
}).$mount('#app')
