import request from "@/utils/request";

/*用户登录*/
export function login(data) {
    return request.post('/user/login', data)
}

/*用户登录*/
export function getCaptcha() {
    return request.get('/captcha')
}
