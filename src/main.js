import {createApp} from 'vue'
import App from './App.vue'

// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from './router'


const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
