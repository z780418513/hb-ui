import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

// 清除浏览器默认样式
import '@/assets/css/reset.css'
// 阿里图标
import '@/assets/inconfont/iconfont.css'
import '@/assets/inconfont/iconfont.js'
import '@/assets/css/iconfont.css'
// el图标
import * as Icons from '@element-plus/icons-vue'


const app = createApp(App);

app.use(store)
    .use(router)
    .mount("#app");

// 注册全局组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons])
})
