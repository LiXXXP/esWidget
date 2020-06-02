'use strict';

let environmentVar = '';
let sparkUrlVar = '';// 接口地址
let basePathVar = '';// history模式下的路径后缀

environmentVar = '联调';
// environmentVar = '测试';
// environmentVar = '线上';

if(environmentVar === '联调') {
    sparkUrlVar = 'http://yapi.comingtrue.cn'
    basePathVar = '/'
} else if(environmentVar === '测试') {
    sparkUrlVar = ''
    basePathVar = '/'
} else if(environmentVar === '线上') {
    sparkUrlVar = ''
    basePathVar = '/'
}

export const sparkUrl = sparkUrlVar;
export const BASE_PATH = basePathVar;


