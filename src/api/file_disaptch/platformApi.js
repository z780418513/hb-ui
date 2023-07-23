import request from "@/utils/request";

const file_api_url = "http://localhost:8080/file/dispatch"

/*查询平台配置列表*/
export function queryPageByChannel(data) {
    return request.get('platform/query/page', {baseURL: file_api_url, params: data})
}

/*查询平台配置列表*/
export function queryListByChannel(data) {
    return request.get('platform/query/list', {baseURL: file_api_url, params: data})
}

/*添加obs配置*/
export function addObsConfig(data) {
    return request.post('platform/add/config/obs', data,{baseURL: file_api_url})
}

/*添加oss配置*/
export function addOssConfig(data) {
    return request.post('platform/add/config/oss', data,{baseURL: file_api_url})
}

/*添加ftp配置*/
export function addFtpConfig(data) {
    return request.post('platform/add/config/ftp', data,{baseURL: file_api_url})
}

/*添加minio配置*/
export function addMinioConfig(data) {
    return request.post('platform/add/config/minio', data,{baseURL: file_api_url})
}
