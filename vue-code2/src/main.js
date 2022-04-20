import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import drag from "./drag";


const app = createApp(App); // 创建 app
app.use(store).use(router).mount('#app')
app.directive("drag", drag); // 注册全局指令
