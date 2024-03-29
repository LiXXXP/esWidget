// import CryptoJS from 'crypto-js'
/**
 * 设置title
 * @param title 参数
 */
function setTitle(title) {
    return (document.title = title);
}

/**
 * xss防止注入
 * @param str 字符串
 */
function transHtml(str) {
    if (!str) {
        return '';
    }
    var xssList = [
        '<input',
        '<link',
        '<meta',
        '<img',
        '<bgsound',
        '<layer',
        '<base',
        '<script',
        '<\/script',
        '<table',
        '<\/table',
        '<object',
        '<\/object',
        '<body',
        '<\/body',
        '<iframe',
        '<\/iframe',
        '<div',
        '<\/div',
        '<style',
        '<\/style',
        '<xml',
        '<\/xml',
        '<h1',
        '<\/h1',
        '<h2',
        '<\/h2',
        '<h3',
        '<\/h3',
        '<h4',
        '<\/h4',
        '<h5',
        '<\/h5',
        '<h6',
        '<\/h6',
        '<span',
        '<\/span',
        '<textarea',
        '<\/textarea',
    ];
    let tempStr = str.toLowerCase();
    for (let i = 0; i < xssList.length; i++) {
        if (tempStr.indexOf(xssList[i]) !== -1) {
            str = str.replace(/</g, '&lt;');
            str = str.replace(/>/g, '&gt;');
            break;
        }
    }
    return str;
}

/**
 * AES加密
 */
function encrypt(word, keyStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let encrypted = CryptoJS.AES.encrypt(word, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();
}

/**
 * AES解密
 */
function decrypt(word, keyStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let decrypted = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

 /**
 * 获取url参数
 * @param name   参数名字
 */
 function getUrlParam(name) {
    return (
        decodeURIComponent (
            (new RegExp ('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec (
                location.href
            ) || [, ''])[1]
                .replace (/\+/g, '%20')
        ) || null
    );
};

/**
 * 删除url参数
 * @param url
 * @param ref
 */
function delQueStr(url, ref) {
    let str = '';
    if (url.indexOf('?') != -1) {
        str = url.substr(url.indexOf('?') + 1);
    } else {
        return url;
    }
    let arr = '';
    let returnUrl = '';
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (let i in arr) {
            if (arr[i].split('=')[0] != ref) {
                returnUrl = returnUrl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
            }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnUrl.substr(0, returnUrl.length - 1);
    } else {
        arr = str.split('=');
        if (arr[0] == ref) {
            return url.substr(0, url.indexOf('?'));
        }
        else {
            return url;
        }
    }
}
/**
 * 判断终端设备
 */
function isPC() {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
/**
 * 设置移动端根元素fontsize
 */
function initFontSize() {
    if (isPC()) {
        document.documentElement.style.fontSize = "100px"
    } else {
        /*改变字体大小*/
        (function (doc, win) {
            var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                var clientWidth = docEl.clientWidth;
                var clientHeight = docEl.clientHeight;
                if (!clientWidth) return;
                if (clientWidth > clientHeight) {
                    docEl.style.fontSize = 100 * (clientHeight / 750) + 'px';
                } else {
                    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                }
                };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
    }
}
/**
 * 判断是否是移动端
 * isIncludePad 是否包括iPad
 */
function isMobile(isIncludePad) {
    let ua = navigator.userAgent;
    let flag = ua.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    if (!flag) {
        return false;
    } else {
        if (isIncludePad) {
            return true;
        } else {
            let isIpad = (ua.indexOf("iPad") != -1 || ua.indexOf("iPod") != -1 || ua.indexOf("pad") != -1);
            return (isIpad&&flag) ? false : true;
        }
    }
}

/**
 * 判断是否为微信端
 */
function isWeChat() {
    let ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger' ? 1 : 0;
}

/**
 * 判断低版本ie浏览器
 */
function checkBrowser() {
    let userAgent = navigator.userAgent
    let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1
    let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1
    let isEdge = userAgent.indexOf("Edge") > -1 && !isIE

    if(isIE) {
        let reIE = new RegExp("MSIE (\\d+\\.\\d+);")
        reIE.test(userAgent)
        let fIEVersion = parseFloat(RegExp["$1"])
        return fIEVersion
    } else if(isIE11) {
        return 11
    } else if(isEdge) {
        return 12
    }
}

/**
 * 判断是否是mac系统
 */
function isMac() {
    return /macintosh|mac os x/i.test(navigator.userAgent);
}

/**
 *  获取正确的值
 */
function getTrueData(data) {
    let value = data || null;
    if (value == 'undefined') {
        value = null;
    }
    return value;
}

/**
 *  时间戳转换
 */
function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

/**
 * 获取当前时间
 */
function getCurrentDate() {
    let timer = new Date();
    let mytime = timer.toLocaleTimeString();
    return mytime
}

/**
 * 解决数据库存在退格键的问题
 * @param str
 * @returns str
 */
function resolveDeleteKey(str) {
    let deleteKeyReg = /[\s|\S]\u0008 \u0008/;
    while(deleteKeyReg.test(str)) {
        str = str.replace(deleteKeyReg,'');
    }
    return str;
}

/**
 * 数字转中文
 * @param {*} num 
 */
function toChinesNum(num) {
    let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    let unit = ["", "十", "百", "千", "万"]
    num = parseInt(num)
    let getWan = (temp) => {
        let strArr = temp.toString().split("").reverse()
        let newNum = ""
        for (var i = 0; i < strArr.length; i++) {
            newNum = (
                i == 0 && strArr[i] == 0 ? "" : 
                (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : 
                changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))
                ) + newNum
        }
        return newNum
    }
    let overWan = Math.floor(num / 10000)
    let noWan = num % 10000
    if (noWan.toString().length < 4) {
        noWan = "0" + noWan
    }
    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num)
}

/**
 * 秒数转换时间
 * @param {*} sec 秒
 */
function formatSeconds(sec) {
    let theTime = parseInt(sec) // 秒
    let middle = 0  // 分
    let hour = 0    // 小时
    if(theTime > 60) {
        middle = parseInt( theTime / 60 )
        theTime = parseInt( theTime % 60 )
        if( middle > 60 ) {
            hour = parseInt( middle / 60 )
            middle = parseInt( middle % 60 )
        }
    }
    let result = `${parseInt(theTime)}''`
    if( middle > 0 ) {
        result = `${parseInt(middle)}'${result}`
    }
    if( hour > 0 ) {
        result = `${parseInt(hour)}h${result}`
    }
    return result
}

/**
 * 秒数转换时间
 * @param {*} sec 秒
 */
function formatSecond(sec) {
    let theTime = parseInt(sec) // 秒
    let middle = 0  // 分
    let hour = 0    // 小时
    if(theTime >= 60) {
        middle = parseInt( theTime / 60 )
        theTime = parseInt( theTime % 60 )
        if( middle >= 60 ) {
            hour = parseInt( middle / 60 )
            middle = parseInt( middle % 60 )
        }
    }
    let result = parseInt(theTime)
    if( theTime < 10) {
        result = `00:0${parseInt(theTime)}`
    }
    if(theTime >= 10 && middle < 1) {
        result = `00:${parseInt(theTime)}`
    }
    if( middle > 0 ) {
        result = parseInt(theTime)
        result = `${parseInt(middle)}:${result}`
    }
    if( hour > 0 ) {
        result = parseInt(theTime)
        result = `${parseInt(hour)}:${result}`
    }
    return result
}

/**
 * 秒数转换时间
 * @param {*} sec 秒
 */
 function formatLine(sec) {
    let theTime = parseInt(sec) // 秒
    let middle = 0  // 分
    let hour = 0    // 小时
    if(theTime >= 60) {
        middle = parseInt( theTime / 60 )
        theTime = parseInt( theTime % 60 )
        if( middle >= 60 ) {
            hour = parseInt( middle / 60 )
            middle = parseInt( middle % 60 )
        }
    }
    let result = `${parseInt(theTime)}`
    if( middle > 0 ) {
        result = `${parseInt(middle)}:${result}`
    }
    if( hour > 0 ) {
        result = `${parseInt(hour)}:${result}`
    }
    return result
}

/**
 * 将数值四舍五入后格式化.
 *
 * @param num 数值(Number或者String)
 * @return 格式的字符串,如'1,234,567.45'
 * @type String
 */
function formatNumber(num) {
    if(num>=1000) {
        return `${num.toLocaleString()}`.slice(0,-2) + 'k'
    }
    return num
}

/**
 * 日期转换
 *
 * @param date 需要格式的日期形式
 * @return 格式的字符串
 * @type String
 */
function rTime(date) {
    var json_date = new Date(date).toJSON()
    return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
}

function UTCDateToLocalDate(dateStr) {
    var date1 = new Date()
    var offsetMinute = date1.getTimezoneOffset()
    var offsetHours = offsetMinute / 60
    var date2 = new Date(dateStr)
    // date2.setHours(date2.getHours() - offsetHours)
    return date2.toLocaleString()
}

export {
    setTitle,
    transHtml,
    encrypt,
    decrypt,
    getUrlParam,
    delQueStr,
    isPC,
    initFontSize,
    isMobile,
    isWeChat,
    checkBrowser,
    isMac,
    getTrueData,
    formatDate,
    resolveDeleteKey,
    getCurrentDate,
    toChinesNum,
    formatSeconds,
    formatSecond,
    formatNumber,
    rTime,
    UTCDateToLocalDate,
    formatLine
}
