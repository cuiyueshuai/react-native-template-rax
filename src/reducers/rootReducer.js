/**
 * Created by dpcui on 30/11/2017.
 */

import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
import NavReducer from './navReducer';

const rootReducer = combineReducers({
  loginReducer: LoginReducer,
  navReducer: NavReducer,
});

export default rootReducer;
