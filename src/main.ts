import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 清除浏览器默认样式
import '@/assets/style/reset.css'

createApp(App)
    .use(store)
    .use(router)
    .mount("#app");
