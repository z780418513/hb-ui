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
        redirect: "/index",
        children: [
            /*index页面*/
            {
                path: "/index",
                name: "index",
                component: () => import("@/layout/IndexView.vue"),
            },
            /*用户列表*/
            {
                path: "/user/list",
                name: "userList",
                component: () => import("@/views/user/UserListView.vue"),
            },
            /*角色列表*/
            {
                path: "/role/list",
                name: "roleList",
                component: () => import("@/views/role/RoleListView.vue"),
            },
            /*日志列表*/
            {
                path: "/log/list",
                name: "logList",
                component: () => import("@/views/log/LogListView.vue"),
            },
        ],
    },


];

// 使用历史模式 （路径中没有#）
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    }
    // 判断用户是否登录
    const token = store.state.userStore.token
    const isExpireTime = (store.state.userStore.expireTime - Date.now() <= 0);
    if (token && !isExpireTime) {
        next();
    } else {
        next('/login')
    }
})

export default router;
