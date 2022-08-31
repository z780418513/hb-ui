const {defineConfig} = require("@vue/cli-service");

const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const {ElementPlusResolver} = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, //关闭eslint
    configureWebpack: {
        // element-ui-plus按需引用
        plugins: [
            // ...
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    },
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: process.env.VUE_APP_PROXY_URL,   // 服务器请求的真实地址
    //             ws: true,    //是否启用websockets
    //             changOrigin: true, //允许跨域 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //             secure: false,  // 如果是https接口，需要配置这个参数
    //             pathRewrite: {    //重写路径
    //                 '^/api': ''  //如果你访问的是'http://192.168.1.1:8080/api/admin/user' ,则变为 'http://192.168.1.1:8080/admin/user'
    //             }
    //         }
    //     },
    //     https:true
    // }
});
