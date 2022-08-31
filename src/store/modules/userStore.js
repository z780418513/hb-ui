// 用户相关
import {login, loginOut} from '@/api/login'

export default ({
    state: {
        // 认证token
        token: localStorage.getItem(process.env.VUE_APP_TOKEN_LOCALSTORAGE_NAME) || '',
        // token过期时间
        expireTime: localStorage.getItem(process.env.VUE_APP_EXPIRETIME_NAME) || 0,
        // 刷新token
        refreshToken: ''

    },
    getters: {},
    mutations: {
        // 更新token
        updateToken(state, res) {
            state.token = res.data.token;
            state.expireTime = res.data.expireTime;
            // token存放到localStorage
            localStorage.setItem(process.env.VUE_APP_TOKEN_LOCALSTORAGE_NAME, res.data.token)
            localStorage.setItem(process.env.VUE_APP_EXPIRETIME_NAME, res.data.expireTime)
        },
        // 清空token
        initToken(state) {
            state.token = "";
            state.expireTime = 0;
            localStorage.removeItem(process.env.VUE_APP_TOKEN_LOCALSTORAGE_NAME)
            localStorage.removeItem(process.env.VUE_APP_EXPIRETIME_NAME)
        }
    },
    actions: {
        // 登录请求
        async loginAction({commit}, data) {
            try {
                const res = await login(data);
                if (res.code != process.env.VUE_APP_RESULT_SUCCESS) {
                    commit('initToken')
                }else {
                    // 执行mutations中到updateToken方法，存放数据
                    commit('updateToken', res)
                }
            } catch (error) {
                console.log(error)
            }
        },

        // 退出登录
        async loginOutAction({commit}) {
            try {
                const res = await loginOut();
                if (res.code == process.env.VUE_APP_RESULT_SUCCESS) {
                    commit('initToken')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
});
