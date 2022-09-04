import request from "@/utils/request";

/*查询日志列表*/
export function getLogList(data) {
    return request.get('/log/list', {params: data})
}
