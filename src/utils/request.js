import axios from 'axios'
import {useMessage} from '@/hook/useMessage'
import store from '@/store'

const ElMessage = useMessage();

// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_URL + '/api', // 所有的请求地址前缀部分
    timeout: 1000 * 60 * 5, // 请求超时时间毫秒
    withCredentials: true, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        // 拦截请求中的 authorization属性为token
        const token = store.state.userStore.token;
        config.headers[process.env.VUE_APP_TOKEN_AUTH_NAME] = token;

        return config
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        // 接口响应不为200，就弹窗错误提示
        if (response.data.code !== 200) {
            ElMessage.error(response.data.msg)
        }
        return response.data
    },
    function (error) {
        ElMessage.error(error)
        return Promise.reject(error)
    }
)
// 添加前置守卫

export default service

