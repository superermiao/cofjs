/**
 * appNavigator.js 配置路由
 */
// 库
import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator , addNavigationHelpers } from 'react-navigation';

// 文件
import SigninScreen from '../containers/SigninScreen'
import WelcomeScreen from "../containers/WelcomeScreen"
import LoginScreen from "../containers/LoginScreen"
import ForgetPassScreen from "../containers/ForgetPassScreen"
import BindScreen from "../containers/BindScreen"
const AppScreen={
    WelcomeScreen:{
        screen:WelcomeScreen
    },
    LoginScreen:{
        screen:LoginScreen
    },
    SigninScreen:{
        screen:SigninScreen
    },
    ForgetPassScreen:{
        screen:ForgetPassScreen
    },
    BindScreen:{
        screen:BindScreen
    },
}

export const AppNavigator = StackNavigator(
    {
        ...AppScreen
    },
    {
        headerMode:'none',
    }
)

const AppWithNavigationState = ({ dispatch, nav }) => {
    return (
        <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })}/>
    )
}

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);