/**
 * Created by dpcui on 29/11/2017.
 */

/**
 * Created by dpcui on 29/11/2017.
 */

import { StackNavigator } from 'react-navigation';
import ActionType from '../constants/actionType';
import { stackConfig } from '../routerConfig';

const AppNavigator = StackNavigator(stackConfig); // eslint-disable-line

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

const navigatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SHOW_LOADING:
      return { ...state, screenProps: { showLoading: true } };
    case ActionType.DISMISS_LOADING:
      return { ...state, screenProps: { showLoading: false } };
    default:
      return { ...AppNavigator.router.getStateForAction(action, state), screenProps: { showLoading: false } };
  }
};

export default navigatorReducer;
