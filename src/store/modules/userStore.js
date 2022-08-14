// 用户相关
import {login} from '@/api/login'

export default ({
    state: {
        token: localStorage.getItem(process.env.VUE_APP_TOKEN_PREFIX) || ''
    },
    getters: {},
    mutations: {
        updateToken(state, token) {
            state.token = token;
            // token存放到localStorage
            localStorage.setItem(process.env.VUE_APP_TOKEN_PREFIX, token)
        }
    },
    actions: {
        // 登录请求
        async loginAction({commit}, data) {
            try {
                const res = await login(data);
                // 执行mutations中到updateToken方法，存放数据
                commit('updateToken',res.data.token)
            } catch (error) {
                console.log(error)
            }
        }
    }
});
