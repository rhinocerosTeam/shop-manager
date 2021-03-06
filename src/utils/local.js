/**
 * Created by Cray on 2017/2/7.
 */

import Cookie from './cookie';
import Utils from './utils';

const localStorage = Utils.isLocalStorageSupported() ? window.localStorage : Cookie;

class Local {
  static setItem(key, data) {
    if (Object.prototype.toString.apply(data) == "[object Object]") {
      data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
  }

  static getItem(key) {
    let res = null;
    try {
      res = JSON.parse(localStorage.getItem(key))
    } catch (err) {

    }
    return res;
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }

  static getJSON(key) {
    let jsonRst;
    try {
      if (localStorage.hasOwnProperty('getJSON')) {
        jsonRst = localStorage.getJSON(key);
      } else {
        jsonRst = JSON.parse(localStorage.getItem(key));
      }

    } catch (e) {
      jsonRst = null;
    }
    return jsonRst;
  }
}

export default Local;