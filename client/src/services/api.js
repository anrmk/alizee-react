import axios from 'axios';
import { TYPE_OBJECT, TYPE_ARRAY, TYPE_JSON } from '../constants/request_types';
import { wrapHttps } from '../helpers/functions';
import { USER_TOKEN } from '../constants/user';

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

    return wrapHttps(`${process.env.REACT_APP_TESTING_DOMAIN}${query}`, true)
  }

  function _reset() {
    _type = TYPE_OBJECT
    _method = 'POST'
    _params = null
    _data = null
    _withCredentials = false
  }

  function _getToken() {
    const token = localStorage.getItem(USER_TOKEN);
    if (token) {
      return token;
    }
    return null
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
      const token = _getToken();
      if (token) {
        config.headers = { ...config.headers, 'Authorization': token }
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
          resolve(response)
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

// Example
// const url = generateUrl("getPosts")
// const { success, data } = await api
//   .setWithCredentials() not use
//   .setMethod("GET")
//   .setData({
//     token: "...",
//     userId: "...",
//     // ...
//   })
//   .query(url)

// if (success) {
//   // ... logic
// }