/* eslint-disable */
/**
 * Common function ,
 * add by eds 2019/7/6
 */

/**
 * arcgis portal token获取 支持包服务
 * @param {*} ajax $ajax对象
 * @param {*} url  arcgis portal url
 */
export default {
  nameFixed(name) {
    return name.length > 2 ? name.replace(/[街镇|街道|镇|乡|市]/g, "") : name
  },
  fetchQuerys() {
    const querys = window.location.search.substring(1).split("&");
    const obj = {};
    querys.map(item => {
      const arr = item.split("=");
      if (arr.length == 2) {
        obj[arr[0]] = arr[1];
      }
    });
    return obj;
  },
  /**
   * token获取
   * @param
   */
  getGenerateToken: (ajax, GET_ARCGIS_TOKEN, fn) => {
    const tokenDeferred = ajax({
      type: "POST",
      url: GET_ARCGIS_TOKEN,
      data: {
        username: "portaladmin",
        password: "wzkcy123",
        client: "requestip",
        ip: "",
        referer: "",
        expiration: 60,
        f: "json"
      },
      dataType: "json"
    });
    tokenDeferred &&
      tokenDeferred.then(response => {
        if (response.code && response.code == 400) {
          fn(response.code);
        } else {
          fn(response);
        }
      });
  },
  /**
   * 获取cookie属性
   * @param {*} name
   */
  getCookie(name) {
    const teamStr = "MaX9493sw5w=";
    const sName = name + teamStr;
    var aCookie = document.cookie.replace(/\ /g, "").split(";");
    for (var i = 0; i < aCookie.length; i++) {
      var aCrumb = aCookie[i].split("=");
      if (sName == unescape(aCrumb[0])) return unescape(decodeURI(aCrumb[1]));
    }
    return "";
  },
  /**
   * 深拷贝
   * @param {*} obj
   */
  clone(data) {
    return deepClone(data);
  },
  /**
   * 按数组元素的属性
   * @param {*} propertyName
   */
  compare(propertyName) {
    return function (object1, object2) {
      var value1 = object1[propertyName];
      var value2 = object2[propertyName];
      if (value2 < value1) {
        return 1;
      } else if (value2 > value1) {
        return -1;
      } else {
        return 0;
      }
    };
  },
  /**
   * 设置本地存储
   * @param {*} key
   * @param {*} val
   * @param {*} isJson
   */
  setStorage(key, val, isJson = true) {
    window.localStorage.setItem(key, isJson ? JSON.stringify(val) : val);
  },
  /**
   * 获取本地存储
   * @param {*} val
   * @param {*} isJson
   */
  getStorage(val, isJson = true) {
    const localVal = window.localStorage.getItem(val);
    return isJson ? JSON.parse(localVal) : localVal;
  },

  /**
 * 
 * @param {*} val 
 * @param {*} isJson 
 */
  removeStorage(key, ) {
    window.localStorage.removeItem(key);
  },
  /**
   * 获取昨日时间
   */
  getTime() {
    var date = new Date(+new Date() - 1000 * 3600 * 24);
    var seperator1 = "-";
    var seperator2 = ":";
    //以下代码依次是获取当前时间的年月日时分秒
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var minute = date.getMinutes();
    var hour = date.getHours();
    var second = date.getSeconds();
    //固定时间格式
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
    }
    if (minute >= 0 && minute <= 9) {
      minute = "0" + minute;
    }
    if (second >= 0 && second <= 9) {
      second = "0" + second;
    }
    return year +
      seperator1 +
      month +
      seperator1 +
      strDate;
  }
};


function deepClone(data) {
  if (!data || !(data instanceof Object) || typeof data == "function") {
    return data || undefined;
  }
  var constructor = data.constructor;
  var result = new constructor();
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      result[key] = deepClone(data[key]);
    }
  }
  return result;
}
