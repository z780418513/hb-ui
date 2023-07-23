import request from "@/utils/request";

const file_api_url = "http://localhost:8080/file/dispatch"

/*查询任务列表*/
export function queryDispatchTask(data) {
    return request.get('task/page', {baseURL: file_api_url, params: data})
}


/*添加obs配置*/
export function addTask(data) {
    return request.post('task/add', data,{baseURL: file_api_url})
}
