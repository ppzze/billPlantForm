// axios文档地址 https://www.axios-http.cn/docs/interceptors
//引用封装axios,设置请求、相应拦截器
import axios from 'axios'
import Vue from 'vue'
import router from './router'


// axios封装地址
const http = axios.create({
    baseURL: 'https://api-hmugo-web.itheima.net/', //地址在这里修改
})
// 添加请求拦截器，设置token
http.interceptors.request.use(function(config) {
    // 如果要用token,登录时存到localStorage里，在这里统一获取
    let token = localStorage.token
    if (token) {
        config.headers.Authorization = token
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});
// 添加相应拦截器，根据实际需要进行更改
http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message||'请求失败'
        }
        )
        if (err.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http
