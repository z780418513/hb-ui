import {createApp} from 'vue'
import App from './App.vue'

// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// router
import router from './router'
// 清除浏览器默认样式
import '@/assets/style/reset.css'


const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
