import {createStore} from "vuex";
// 用户相关
import userStore from './modules/userStore'

export default createStore({
    // 全局状态的初始值
    state: {},
    // 计算state，获取对应的值
    getters: {},
    // 更新状态的值-更新state的唯一方法 commit mutations
    mutations: {},
    // 可以异步操作，返回promise，更改的数据最终还是传递到mutations
    actions: {},
    // 数据比较多，分模块
    modules: {userStore},
});
