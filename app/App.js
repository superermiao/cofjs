/**
 * app.js 入口文件
 */
// 库
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger'
import {BackHandler,ToastAndroid} from 'react-native'
import thunk from 'redux-thunk'

//文件
import AppReducer from './reducers/reducers'
import AppWithNavigationState from './navigators/appNavigator'
const enhancer = applyMiddleware(thunk, createLogger());
const store = createStore(AppReducer, enhancer);

class Cofjs extends  React.Component{
    render()
        {
            return(
                <Provider store = {store}>
                    <AppWithNavigationState />
                </Provider>
            );
        }
}

export default Cofjs;