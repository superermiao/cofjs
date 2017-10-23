/**
 * reducers/index.js,整合Reducer
 */
// 库
import { combineReducers } from 'redux';
//文件
import nav from './navState';
import authUser from './userState'
import lock from './lockState'

const AppReducer=combineReducers({
    nav,
    authUser,
    lock,
});

export default AppReducer;