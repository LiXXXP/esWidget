import axios from 'axios'
import Qs from 'qs'
import { sparkUrl } from './config'
import { Message } from 'element-ui'

const TIMEOUT = 30000 // 设置请求超时时间

// 创建axios实例
const service = axios.create({
    baseURL: sparkUrl, // api 的 base_url
    timeout: TIMEOUT, // request timeout  
    responseType: "json",
    withCredentials: true, // 是否允许带cookie
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'accept': 'application/json',
    }
});

/**
 * 请求拦截器 
 */
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        Message.error('数据请求失败，请刷新页面')
        return Promise.reject(err)
    }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功
        if(response.status === 200 && response.data) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(error)
        }
    },
    // http请求状态出错提示,直接返回错误data
    error => {
        Message.error('数据请求失败，请刷新页面')
        return Promise.reject(error)
    }
);

/**
 * get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
function getRequest(url,params={}){
    let fullUrl = sparkUrl + url;
    return new Promise((resolve,reject) => {
        axios.get(fullUrl,{
            params:params
        }).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        });
    });
}

/**
 * post请求
 * @param url
 * @param params
 * @returns {Promise}
 */
function postRequest(url,params={}) {
    let fullUrl = sparkUrl + url
    return new Promise((resolve, reject) => {
        axios.post(fullUrl, Qs.stringify(params))
        .then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        });
    });
}

/**
 * put请求
 * @param url
 * @param params
 * @returns {Promise}
 */
function putRequest(url,params = {}){
    let fullUrl = sparkUrl + url
    return new Promise((resolve,reject) => {
        axios.put(fullUrl,params)
        .then(response => {
             resolve(response.data)
        },err => {
             reject(err)
        });
    });
}

/**
 * 单个对局详情
 * @param {*} params
 */
function getBattle(params) {
    return getRequest('/iframe/list', params)
}

/**
 * 单个对局详情 t = 1 时使用
 * @param {*} params
 */
function getBattleT(params) {
    return getRequest('/iframevip/list', params)
}

/**
 * 新的 match接口
 * @param {*} params
 */
function newMatch(params) {
    return getRequest('/iframe/new_list', params)
}

 /**
 * 新的 battle接口
 * @param {*} params battle_id
 */
function newBattle(params) {
    return getRequest('/iframe/battle_detail', params)
}

export {
    getRequest,
    postRequest,
    putRequest,
    getBattle,
    getBattleT,
    newMatch,
    newBattle
}

