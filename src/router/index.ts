import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import store from '@/store/index'

const routes: Array<RouteRecordRaw> = [
    {
        // 路由路径
        path: "/login",
        // 路由名
        name: "login",
        // 路由对应的组件
        component: () => import("@/views/LoginView.vue"),
    },
    {
        path: "/",
        name: "home",
        component: () => import("@/layout/LayoutOut.vue"),
    },
];

// 使用历史模式 （路径中没有#）
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    // 判断用户是否登录
    const token = store.state.userStore.token
    if (token || to.path === '/login') {
        next();
    } else {
        next('/login')
    }
})

export default router;
