import {createRouter, createWebHistory} from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
    },
]

// 去掉地址栏中的#
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
