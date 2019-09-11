import axios from 'axios'
import { message } from 'antd'
// 创建一个拥有通用配置的axios实例,实例中的配置内容根据实际开发需求而定
export const service = axios.create({
    //baseURL: 'http://192.168.2.204:9001/', // 测试环境
    baseURL: 'http://192.168.1.51:9001/', // 测试环境
    timeout: 1000 * 10, // 请求超时的毫秒数,如果请求花费超过timeout的时间,请求将被中断
    withCredentials: true, // 表示跨域请求时是否需要使用凭证,默认false
    headers: { 'Cache-Control': 'no-cache', 'token':sessionStorage.getItem("token")?sessionStorage.getItem("token"):""} // 不允许缓存，需要重新获取请求
})

// 添加请求拦截器
service.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
    switch(response.data.code) {
        case 404:
            message.error("登录超时，请重时登录！");
            location.href="/#/login";
            break;
        default:
            return true;
    }
}, error => {
    // 对响应错误做点什么
    return Promise.reject(error)
})