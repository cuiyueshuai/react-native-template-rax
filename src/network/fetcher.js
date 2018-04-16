/**
 * Copyright 2016-08-29 pdms
 * @author gyli<gyli@amarsoft.com>
 */

import Qs from 'qs';
import axios from 'axios';
import { NetInfo } from 'react-native';
import { Host } from './netConfig';

axios.defaults.baseURL = Host;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.xsrfHeaderName = 'X-SESSION-TOKEN';
axios.defaults.timeout = 30000;

let netState = false;
let token;

const _handleConnectivityChange = (isConnected) => {
  netState = isConnected;
};

const initNetworkState = () => {
  NetInfo.isConnected.addEventListener(
    'connectionChange',
    _handleConnectivityChange
  );
  NetInfo.isConnected.fetch().then((isConnected) => { netState = isConnected; });
};

const removeNetworkStateListener = () => {
  NetInfo.isConnected.removeEventListener(
    'connectionChange',
    _handleConnectivityChange
  );
};

const process = (_promise) => {
  return new Promise((resolve, reject) => {
    _promise.then((response) => {
      return response.data;
    }).then((json) => {
      if (json['X-SESSION-TOKEN']) token = json['X-SESSION-TOKEN'];
      resolve(json || {});
    }).catch((error) => {
      const responseX = error.response;
      if (responseX && responseX.status === 401) return reject(new Error('会话已过期'));
      else if (error.code && error.code === 'ECONNABORTED') return reject(new Error('请求超时'));
      return reject(error);
    });
  });
};

const rawFetch = (url, param) => {
  // if (!netState) return Promise.reject(new Error('无网络连接,请检查网络设置'));
  const axiosFetcher = axios.create(param);
  return process(axiosFetcher(url, param));
};

const getFetch = (url, param, header, option) => {
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-SESSION-TOKEN': token,
    ...header,
  };
  const timestamp = new Date().getTime();
  const paramX = { ...param, _: timestamp };
  const urlTemp = url + '?' + Qs.stringify(paramX);

  return rawFetch(urlTemp, {
    method: 'get',
    headers,
  }, option);
};

const postQsFetch = (url, param, header, option) => {
  const headers = {
    'X-SESSION-TOKEN': token,
    ...header,
  };
  const timestamp = new Date().getTime();
  const paramX = { _: timestamp };
  const urlTemp = url + '?' + Qs.stringify(paramX);

  return rawFetch(urlTemp, {
    method: 'post',
    headers,
    data: param,
    transformRequest: [(data) => Qs.stringify(data)]
  }, option);
};

const postJsonFetch = (url, param, header, option) => {
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-SESSION-TOKEN': token,
    ...header,
  };
  const timestamp = new Date().getTime();
  const paramX = { _: timestamp };
  const urlTemp = url + '?' + Qs.stringify(paramX);

  return rawFetch(urlTemp, {
    method: 'post',
    headers,
    data: JSON.stringify(param),
  }, option);
};

const uploadFileFetch = (url, param, header, option) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
    'X-SESSION-TOKEN': token,
    ...header
  };
  const timestamp = new Date().getTime();
  const paramX = { _: timestamp };
  const urlTemp = url + '?' + Qs.stringify(paramX);

  return rawFetch(urlTemp, {
    method: 'post',
    headers,
    data: param,
    transformRequest: [(data) => {
      const formData = new FormData();
      formData.append('file', data);
      formData.append('fileSize', data.size);
      return formData;
    }]
  }, option);
};

const postURLBodyFetch = (url, urlParam, bodyParam, header, option) => {
  const headers = header;
  const timestamp = new Date().getTime();
  const paramX = { ...urlParam, _: timestamp };
  const urlTemp = url + '?' + Qs.stringify(paramX);

  return rawFetch(urlTemp, {
    method: 'post',
    headers,
    data: bodyParam,
    transformRequest: [(data) => Qs.stringify(data)]
  }, option);
};

export default {
  getFetch,
  postQsFetch,
  postJsonFetch,
  uploadFileFetch,
  postURLBodyFetch,
  initNetworkState,
  removeNetworkStateListener,
};
