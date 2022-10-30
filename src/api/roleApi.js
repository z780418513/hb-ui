import request from "@/utils/request";

/*查询角色列表*/
export function getRoleList() {
    return request.get('/role/list')
}
