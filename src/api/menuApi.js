import request from "@/utils/request";

/*查询用户列表*/
export function getMenusByUserId(id) {
    return request.get(`/menu/${id}`)
}
