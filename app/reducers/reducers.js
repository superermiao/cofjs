/**
 * reducers/index.js,整合Reducer
 */
// 库
import { combineReducers } from 'redux';
//文件
import nav from './navState';
import authUser from './userState'

const AppReducer=combineReducers({
    nav,
    authUser
});

export default AppReducer;