export const loadJs = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    document.body.appendChild(script)
    script.onload = () => {
      resolve()
    }
  }) 
}

export const loadCss = (url) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
    link.onload = () => {
      resolve()
    }
  })
}

export const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
}

import axios from 'axios'
import qs from 'qs'
let axiosIns = axios.create({});

if (process.env.NODE_ENV == 'development') { //测试环境
    // axiosIns.defaults.baseURL = 'http://192.168.1.105:8001';
} else if (process.env.NODE_ENV == 'production') { //正式环境
    axiosIns.defaults.baseURL = '***';
}

axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.responseType = 'json';
axiosIns.defaults.headers.post['Content-Type'] = "application/json";
axiosIns.defaults.timeout = 10000;
// axiosIns.defaults.transformRequest = [function(data) {
//     //数据序列化
//     return qs.s(data);
// }];
axiosIns.defaults.validateStatus = function(status) {
    return true;
};
axiosIns.interceptors.request.use(function(config) {
    //配置config
    config.headers.Accept = 'application/json';
    // config.headers.System = 'vue';
    // let token = Vue.localStorage.get('token');
    // if(token){
    //     config.headers.Token = token;
    // }
    return config;
});
axiosIns.interceptors.response.use(function(response) {
    let data = response.data;
    let status = response.status;
    if (status === 200) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response);
    }
});

let ajaxMethod = ['get', 'post', 'delete', 'put'];
let api = {};
ajaxMethod.forEach((method) => {
    //数组取值的两种方式
    api[method] = function(url, data, config) {
        if (method == 'get' || method == 'delete' || method == 'put' && data != null && Object.keys(data).length > 0) {
            url = url + '?';
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    console.log(data, key, data[key])
                    url += key + '=' + data[key] + '&';
                }
            }
            url = url.substr(0, url.length - 1);
        } else {
            data = data ? qs.parse(data) : data;
        }
        return new Promise(function(resolve, reject) {
            axiosIns[method](url, data, config).then((response) => {
                /*根据后台数据进行处理
                 *1 code===200   正常数据+错误数据     code!==200   网络异常等
                 *2 code===200   正常数据     code!==200   错误数据+网络异常等
                 * 这里使用的是第一种方式
                 * ......
                 */
                if (response.data.StatusCode) {
                    console.log(response.data.Message);
                    //toast封装：  参考ele-mint-ui
                    // Toast({
                    //     message: response.data.Message,
                    //     position: 'top',
                    //     duration: 2000
                    // });
                    // if (response.data.Message === '未登录') {
                    //     Toast({
                    //         message: response.data.Message,
                    //         position: '',
                    //         duration: 2000
                    //     });
                    //使用vue实例做出对应行为  change state or router
                    //instance.$store.commit('isLoginShow',true);
                    // }
                } else {
                    resolve(response);
                }
            }).catch((response) => {
                reject(response);
                //alert('xiuxiu，限你10分钟到我面前来,不然...');
            })
        })
    }
});

export {api};


/* 1 根据process.env.NODE_ENV 获取对应的apiDomain
 * 2 处理ajax库axios，为了以后不重复引用，挂在原型对象上
 * 3 axios是封装在main.js里面的，是为了获取vue实例操作store、router
 * 4 组件里面使用this.$axios.get or  this.$axios.post 调用  使用debugger，查看接口返回数据的走向
 */