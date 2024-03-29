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
 * 单个对局详情iframe
 * @param {*} params
 */
function getBattle(params) {
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

 /**
 * 战队产品信息
 * @param {*} params
 */
function teamProduct(params) {
    return getRequest('/iframe/team_product', params)
}

 /**
 * LOL经济差/经验差
 * @param {*} params
 */
  function lolDiff(params) {
    return getRequest('/iframe/lol_gold_and_experience_diff', params)
}

 /**
 * LOL选手对局详情
 * @param {*} params
 */
  function lolPlayer(params) {
    return getRequest('/iframe/lol_player_battle_detail', params)
}

 /**
 * LOL选手对局详情
 * @param {*} params
 */
  function lolDataRank(params) {
    return getRequest('/iframe/lol_data_ranking', params)
}

 /**
 * 赛事同屏基本信息
 * @param {*} params
 */
  function tournamentProduct(params) {
    return getRequest('/iframe/tournament_product', params)
}

 /**
 * 赛事进程
 * @param {*} params
 */
  function tournamentProcess(params) {
    return postRequest('/iframe/tournament_process', params)
}

export {
    getBattle,
    newMatch,
    newBattle,
    teamProduct,
    lolDiff,
    lolPlayer,
    lolDataRank,
    tournamentProduct,
    tournamentProcess
}

