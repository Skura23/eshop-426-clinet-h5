/**
 * Created by PanJiaChen on 16/11/18.
 */
import {
  Toast
} from 'vant';
import _ from "lodash";

import router from '../router'



/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

// timestamp to 2018-05-26 14:22:05
function getFormattedDate(value, onlydate) {
  var date
  if (value) {
    date = new Date(value * 1000);
  } else {
    date = new Date()
  }
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  month = (month < 10 ? '0' : '') + month;
  day = (day < 10 ? '0' : '') + day;
  hour = (hour < 10 ? '0' : '') + hour;
  min = (min < 10 ? '0' : '') + min;
  // sec = (sec < 10 ? '0' : '') + sec;
  var str = date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + min
  //  + ':' + sec;
  if (onlydate) {
    str = date.getFullYear() + '-' + month + '-' + day
  }
  /* alert(str); */
  // 格式: 2018-05-26_14:22:05
  return str;
}

/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/\+/g, ' ') +
    '"}'
  )
}

let serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}



function editCb(res, cb) {
  if (res.code == 9999) {
    Toast({
      message: res.info,
      onClose() {
        cb && cb()
      },
    })
  } else {
    Toast({
      message: res.info,
    })
  }
}
/**
 * @param  {} obj
 * @param  {string, array} oldName
 * @param  {string, array} newName
 */
function renameKeyName(obj, oldName, newName) {
  const clone = _.cloneDeep(obj);

  if (typeof oldName == 'string') {
    const keyVal = clone[oldName];

    delete clone[oldName];
    clone[newName] = keyVal;
  } else {
    for (let i = 0; i < oldName.length; i++) {
      let elem = oldName[i];
      const keyVal = clone[elem];
      delete clone[elem];
      clone[newName[i]] = keyVal;
    }
  }


  return clone;
}

function jsonClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function jumpTo(url) {
  router.push(url)
}

// 微信支付相关
/**
 * @param  {} obj 支付数据
 * @param  {} cb 支付成功回调
 * @param  {} falicb 支付失败回调
 */

function onBridgeReady(obj, cb, falicb) {
  WeixinJSBridge.invoke('getBrandWCPayRequest', obj,
    function (res) {
      if (res.err_msg == "get_brand_wcpay_request:ok") {
        // 使用以上方式判断前端返回,微信团队郑重提示：
        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        cb && cb()
      } else {
        falicb && falicb()
      }
    });
}



let utils = {
  parseTime,
  formatTime,
  getFormattedDate,
  param2Obj,
  serialize,
  editCb,
  renameKeyName,
  jumpTo,
  jsonClone,
  onBridgeReady
}

export default utils;