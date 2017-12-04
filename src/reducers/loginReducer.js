/**
 * Created by dpcui on 30/11/2017.
 */

import ActionType from '../constants/actionType';

const initialState = {
  status: 'init',
  user: '',
  message: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        status: 'done',
        user: action.payload.user,
      });
    case ActionType.FAIL:
      return Object.assign({}, state, {
        status: 'fail',
        message: action.payload.message,
      });
    default:
      return state;
  }
};

export default loginReducer;
