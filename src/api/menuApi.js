import request from "@/utils/request";

/*根据用户id查询树形菜单*/
export function getMenusByUserId(id) {
    return request.get(`/menu/tree/user/${id}`)
}

/*新增菜单*/
export function addMenu(data) {
    return request.post('/menu/add', data)
}

/*修改菜单*/
export function updateMenu(data) {
    return request.put('/menu/update', data)
}

/*开启禁用菜单*/
export function switchMenu(data) {
    return request.put('/menu/switch', data)
}


/*删除菜单*/
export function deleteMenu(id) {
    return request.delete(`/menu/del/${id}`)
}

/*查询是否有子菜单*/
export function hasChildren(data) {
    return request.get(`/menu/hasChildren`, {params: data})
}


/*根据菜单id查询菜单信息*/
export function getById(data) {
    return request.get(`/menu/getById`, {params: data})
}
