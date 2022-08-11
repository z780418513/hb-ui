import axios from 'axios'
import {useMessage} from '@/hook/useMessage'

const ElMessage = useMessage();

// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_URL + '/api', // 所有的请求地址前缀部分
    timeout: 1000 * 60 * 5, // 请求超时时间毫秒
    withCredentials: true, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        'Content-Type': 'application/json',
        // 'token': 'your token',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        return config
    },
    (error) => {
        // 对请求错误做些什么
        console.log(error)
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        console.log(response)
        // 接口响应不为200，就弹窗错误提示
        if (response.data.code !== 200){
            ElMessage.error(response.data.msg)
        }
        return response.data
    },
    function (error) {
        ElMessage.error(error)
        return Promise.reject(error)
    }
)

export default service

