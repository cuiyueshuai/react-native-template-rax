/**
 * Created by dpcui on 30/11/2017.
 */

import { combineReducers } from 'redux';
import NavReducer from './navReducer';

const rootReducer = combineReducers({
  navReducer: NavReducer,
});

export default rootReducer;
