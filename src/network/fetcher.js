/**
 * Copyright 2016-08-29 pdms
 * @author gyli<gyli@amarsoft.com>
 */

import Qs from 'qs';
import { NetInfo } from 'react-native';
import MxFetch from './mxFetch';
import DataUtil from '../utilities/dataUtil';

let netState = false;
let cookie = '';

/* eslint-disable */
const initNetworkState = () => {
  NetInfo.isConnected.addEventListener(
    'connectionChange',
    _handleConnectivityChange
  );
  NetInfo.isConnected.fetch().then(
    (isConnected) => {
      netState = isConnected;
    }
  );
};

const removeNetworkStateListener = () => {
  NetInfo.isConnected.removeEventListener(
    'connectionChange',
    _handleConnectivityChange
  );
};

const _handleConnectivityChange = (isConnected) => {
  netState = isConnected;
};

const _cookieHandler = (res) => {
  const sessionHeader = res.headers;
  const set_cookie = DataUtil.stringSplitHandler(sessionHeader.map['set-cookie'] + '',
    'JSESSIONID');
  const x_session_token = DataUtil.stringSplitHandler(sessionHeader.map['set-cookie'] + '',
    'X-SESSION-TOKEN');
  if (set_cookie && x_session_token) {
    cookie = set_cookie + '; ' + x_session_token.split('HttpOnly, ').pop();
  }
};

const process = (_promise, option) => {
  return new Promise((resolve, reject) => {
    _promise.then((response) => {
      if (response.headers.map['set-cookie']) {
        _cookieHandler(response)
      }

      const status = response.status;
      switch (parseInt(status / 100)) {
        case 2:
          return response.text();
        case 3:
          break;
        case 4:
          if (status === 401) {
            throw new Error('401');
          } else {
            throw new Error('40X');
          }
          break;
        case 5:
          throw new Error('5XX');
          break;
        default:
          throw new Error('Unknown Error');
          break;
      }
    })
      .then((response) => {
        const json = JSON.parse(response);
        if (response === '') {
          resolve({});
        } else if(json.body){
          resolve(json.body);
        } else {
          resolve(json);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
/* eslint-disable */

const rawFetch = (url, param, option) => {
  // console.log('以下打印一次传出去的param:');
  // console.log(param);
  // console.log('请求地址:' + url);

  if (netState) {
    const _promise = Promise.race([MxFetch.fetch(url, param, 6180), new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('链接超时')), 60000);
    })]);

    return process(_promise, option);
  } else {
    return Promise.reject(new Error('无网络连接,请检查网络设置'));
  }
};

const _getHeader = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': cookie
  };
};

const getFetch = (url, param, header, option) => {
  const headers = {
    ..._getHeader(),
    ...header
  };

  const urlTemp = url + '?' + Qs.stringify(param);
  return rawFetch(urlTemp, {
    method: 'GET',
    headers,
  }, option);
};

const postQsBodyFetch = (url, param, header, option) => {
  const headers = {
    ..._getHeader(),
    ...header
  };

  return rawFetch(url, {
    method: 'POST',
    headers,
    body: Qs.stringify(param)
  }, option);
};

const postStrBodyFetch = (url, param, header, option) => {
  const headers = {
    ..._getHeader(),
    ...header
  };

  return rawFetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(param),
  }, option);
};

const uploadFileFetch = (url, param, header, option) => {
  const headers = {
    ..._getHeader(),
    'Content-Type': 'multipart/form-data',
    ...header
  };

  const formData = new FormData();
  formData.append('file', param);
  formData.append('fileSize',param.size);

  return rawFetch(url, {
    method: 'POST',
    headers,
    body: formData,
  }, option);
};

export default {
  getFetch,
  postQsBodyFetch,
  postStrBodyFetch,
  uploadFileFetch,
  initNetworkState,
  removeNetworkStateListener,
};
