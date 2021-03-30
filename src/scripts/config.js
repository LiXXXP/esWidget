'use strict';

let environmentVar = '';
let sparkUrlVar = '';// 接口地址
let basePathVar = '';// history模式下的路径后缀

environmentVar = '新加坡';

if(environmentVar === '新加坡') {
    sparkUrlVar = 'https://elapi.elements-data.com/api'
    basePathVar = '/'
} else if(environmentVar === '正式') {
    sparkUrlVar = 'https://api.esport.beer/api'
    basePathVar = '/'
}

export const sparkUrl = sparkUrlVar;
export const BASE_PATH = basePathVar;


