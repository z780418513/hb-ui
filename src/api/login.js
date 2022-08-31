import request from "@/utils/request";

/*用户登录*/
export function login(data) {
    return request.post('/user/login', data)
}

/*获取图片验证码*/
export function getCaptcha() {
    return request.get('/captcha')
}

/*用户退出*/
export function loginOut() {
    return request.post('/login/out')
}
