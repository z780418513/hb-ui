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
                path: "/user/index",
                name: "userList",
                component: () => import("@/views/user/UserListView.vue"),
            },
            /*角色列表*/
            {
                path: "/role/index",
                name: "roleList",
                component: () => import("@/views/role/RoleListView.vue"),
            },
            /*分配用户*/
            {
                path: "/role/2",
                name: "distributionUser",
                component: () => import("@/views/role/DistributionUserView.vue"),
            },
            /*日志列表*/
            {
                path: "/log/index",
                name: "logList",
                component: () => import("@/views/log/LogListView.vue"),
            },
            /*菜单管理*/
            {
                path: "/menu/index",
                name: "menuIndex",
                component: () => import("@/views/menu/MenuIndex.vue"),
            },


            /*渠道管理*/
            {
                path: "/file/channel",
                name: "fileChannel",
                component: () => import("@/views/file/channel/index.vue"),
            },
            /*平台管理*/
            {
                path: "/file/platform",
                name: "filePlatform",
                component: () => import("@/views/file/platform/index.vue"),
            },
            /*任务管理*/
            {
                path: "/file/task",
                name: "fileTask",
                component: () => import("@/views/file/task/index.vue"),
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
