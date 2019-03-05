import axios from 'axios';
import queryString from 'query-string';
import {AuthRepository} from "../data/AuthRepository";
export class Api {
  /**
   * Api instance
   * @type {Api}
   */
  static _instance;

  /**
   * Max retry attempts
   * @type {number}
   * @private
   */
  _maxRetryAttempts;

  /**
   * Custom axios instance
   * @type {AxiosInstance}
   */
  _axios;

  constructor(maxRetryAttempts) {
    this._axios = axios.create();
    this._maxRetryAttempts = maxRetryAttempts;

    // Add error response interceptor
    this._axios.interceptors.response.use(undefined, undefined);
  }

  /**
   * Get instance of Api (singleton)
   * @return {Api}
   */
  static getInstance() {
    if (Api._instance === undefined) {
      Api._instance = new Api(3);
    }

    return Api._instance;
  }

  async request(config) {
    const newConfig = { ...config };
    const accessToken = Api.getAccessToken();
    if (typeof accessToken === 'string') {
      newConfig.headers = {
        ...newConfig.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    try {
      return await this._axios(newConfig);
    } catch (e) {
      console.log(e.response)
      if (e.response && typeof e.response.status !== typeof undefined && e.response.status === 401) {
          window.location.href = '/login';
      }

      if (e.response && e.response.data) {
      } else {
        throw e;
      }
    }
  }

  async requestNoAuth(config) {
    const newConfig = { ...config };
    try {
      return await this._axios(newConfig);
    } catch (e) {
      if (e.response.data) {
      } else {
        throw e;
      }
    }
  }

  /**
   * Get access token
   * @return {string}
   */
  static getAccessToken() {
    return AuthRepository.readToken();
  }

  static obtainAccessToken(username, password) {
    const api = this.getInstance();

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`my-trusted-client:secret`)}`,
    };
    return api._axios({
      url: 'https://localhost:8080/oauth/token',
      method: 'post',
      headers,
      data: queryString.stringify({
        grant_type: 'password',
        username,
        password,
      }),
    });
  }

  static putWithoutToken(url, data) {
    return Api.getInstance()
      .requestNoAuth({
        url,
        method: 'put',
        data,
      });
  }

  static postWithoutToken(url, data) {
    return Api.getInstance()
      .requestNoAuth({
        url,
        method: 'post',
        data,
      });
  }

  static getWithoutToken(url, params) {
    return Api.getInstance()
      .requestNoAuth({
        url,
        method: 'get',
        params,
      });
  }

  /**
   * Alias for request with method GET
   * @public
   * @param {string} url
   * @param {object} data
   * @param {object} headers
   * @return {Promise<object>}
   */
  static get(url, data = {}, headers = {}) {
    return Api.getInstance().request({
      method: 'GET',
      url,
      data,
      headers,
    });
  }

  /**
   * Alias for request with method POST
   * @public
   * @param {string} url
   * @param {object} data
   * @param {object} headers
   * @return {Promise<object>}
   */
  static post(url, data = {}, headers = {}) {
    return Api.getInstance().request({
      method: 'POST',
      url,
      data,
      headers,
    });
  }

  /**
   * Alias for request with method PUT
   * @public
   * @param {string} url
   * @param {object} data
   * @param {object} headers
   * @return {Promise<object>}
   */
  static put(url, data = {}, headers = {}) {
    return Api.getInstance().request({
      method: 'PUT',
      url,
      data,
      headers,
    });
  }

  /**
   * Alias for request with method PATCH
   * @public
   * @param {string} url
   * @param {object} data
   * @param {object} headers
   * @return {Promise<object>}
   */
  static patch(url, data = {}, headers = {}) {
    return Api.getInstance().request({
      method: 'PATCH',
      url,
      data,
      headers,
    });
  }

  /**
   * Alias for request with method DELETE
   * @public
   * @param {string} url
   * @param {object} data
   * @param {object} headers
   * @return {Promise<object>}
   */
  static delete(url, data = {}, headers = {}) {
    return Api.getInstance().request({
      method: 'DELETE',
      url,
      data,
      headers,
    });
  }
}

const api = Api.getInstance();
