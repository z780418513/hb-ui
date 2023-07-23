import request from "@/utils/request";

const file_api_url = "http://localhost:8080/file/dispatch"

/*查询渠道列表*/
export function getAllChannelList(data) {
    return request.get('/channel/getAll', {baseURL: file_api_url, params: data})
}

/*查询渠道列表*/
export function getChannelList(data) {
    return request.get('/channel/get/list', {baseURL: file_api_url, params: data})
}

/*启用或禁用渠道*/
export function enableChannel(data) {
    return request.post('/channel/enable', data,{baseURL: file_api_url})
}

/*删除渠道*/
export function delChannel(data) {
    return request.post('/channel/del', data,{baseURL: file_api_url})
}

/*初始化渠道*/
export function initChannel(data) {
    return request.post('/channel/init', data,{baseURL: file_api_url})
}
