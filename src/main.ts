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


createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
