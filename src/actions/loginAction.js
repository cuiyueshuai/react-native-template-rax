/**
 * Copyright 2016-08-29 pdms
 * loginAction
 * @author gyli<gyli@amarsoft.com>
 */

import ActionTypes from '../constants/actionType';
import CommonAction from './commonAction';
import Fetcher from '../network/fetcher';
import NetLink from '../network/netLink';

const _loginSuccess = (data) => {//eslint-disable-line
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: {
      user: data.uid
    }
  };
};

const _loginFailed = (error) => {
  return {
    type: ActionTypes.FAIL,
    payload: {
      message: error.message
    }
  };
};

const _doLogin = (url, param) => dispatch => {
  dispatch(CommonAction.showLoading());
  return Fetcher.postQsBodyFetch(url, param)
      .then((response) => {
        dispatch(CommonAction.dismissLoading());
        dispatch(_loginSuccess(param, response));
      }).catch((error) => {
        dispatch(CommonAction.dismissLoading());
        dispatch(_loginFailed(error));
      });
};

const LoginAction = {
  doLogin: (param) => _doLogin(NetLink.login, param),
};

export default LoginAction;
