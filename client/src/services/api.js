import axios from 'axios';
import { TYPE_OBJECT, TYPE_ARRAY, TYPE_JSON } from '../constants/request_types';
import { USER_TOKEN } from '../constants/user';
import { getToken, wrapHttps } from '../helpers/functions';

export default function ApiClient() {
  let _type = TYPE_OBJECT;
  let _method = 'POST';
  let _data = null;
  let _params = null;
  let _withCredentials = false;

  /**
   * Internal logic
   */
  function _getUrl(query) {
    query = query || '/'

    return wrapHttps(`${process.env.REACT_APP_DOMAIN}${query}`, true)
  }

  function _reset() {
    _type = TYPE_OBJECT
    _method = 'POST'
    _params = null
    _data = null
    _withCredentials = false
  }

  /**
   * API
   */
  this.setType = function (type) {
    if (![TYPE_OBJECT, TYPE_ARRAY, TYPE_JSON].includes(type)) {
      throw new Error('Type must be object, array or json')
    }
    _type = type
    return this
  }

  this.setMethod = function (method) {
    _method = method
    return this
  }

  this.setParams = function (params) {
    _params = params
    return this
  }

  this.setData = function (data) {
    _data = data
    return this
  }

  this.setWithCredentials = function () {
    _withCredentials = true
    return this
  }

  this.query = function (query, headers) {
    if (process.env.VUE_APP_USE_SSO_AUTH === 'no') {
      return new Promise(() => { })
    }

    if (!query) {
      throw new Error('Query is required param')
    }

    let config = {}
    if (headers) {
      config.headers = headers;
    }

    if ([TYPE_ARRAY, TYPE_OBJECT].includes(_type)) {
      const token = getToken();
      
      if (token) {
        config.headers = { ...config.headers, 'Authorization': token.access, "Refresh": token.refresh }
      }
    }

    config = {
      ...config,
      ...{
        method: _method,
        data: _data,
        params: _params,
        url: _getUrl(query),
        withCredentials: _withCredentials
      }
    }

    return new Promise((resolve, reject) => {
      axios(config)
        .then(response => {
          response.success = true;

          if (response.headers["authorization"]) {
            const refreshToken = getToken()?.refresh;
            refreshToken && localStorage.setItem(USER_TOKEN, JSON.stringify({ 
              access: response.headers["authorization"],
              refresh: refreshToken
            }));
          }

          resolve(response);
        })
        .catch(error => {
          reject(error)
        })
        .finally(() => {
          _reset()
        })
    })
  }
}
