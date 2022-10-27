import request from "@/utils/request";

/*查询用户列表*/
export function getUserList(data) {
    return request.get('/user/list', {params: data})
}

/*新增用户*/
export function addUser(data) {
    return request.post('/user/add', data)
}

/*修改用户*/
export function updateUser(id, data) {
    return request.put(`/user/modify/${id}`, data)
}

/*删除用户*/
export function deleteUser(id) {
    return request.delete(`/user/delete/${id}`)
}


/*查询用户菜单*/
export function getUserMenus() {
    return request.get('/user/menus')
}

/*上传头像*/
export function uploadAvatar(data) {
    return request.post(`/user/uploadAvatar`, data, {
        headers: {
            // 修改Content-type类型
            'Content-type': 'multipart/form-data',
        }
    })
}

/*查询用户信息*/
export function getUserInfo(data) {
    return request.get('/user/getUserInfo/name', {params: data})
}

/*查询登录用户名*/
export function getLoginUser() {
// 解析jwt token变量传需要解析的jwt值
    let tokenPayload = localStorage.getItem(process.env.VUE_APP_TOKEN_LOCALSTORAGE_NAME).split("."); //截取token，获取载体
    const userinfo = JSON.parse(decodeURIComponent(escape(window.atob(tokenPayload[1].replace(/-/g, "+").replace(/_/g, "/")))));
    return userinfo;
}
