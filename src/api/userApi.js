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
