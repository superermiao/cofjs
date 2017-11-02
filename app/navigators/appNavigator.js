/**
 * appNavigator.js 配置路由
 */
// 库
import React from 'react';
import {Image} from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator , addNavigationHelpers,TabBarBottom,TabNavigator } from 'react-navigation';

// 文件
import SigninScreen from '../containers/SigninScreen'
import WelcomeScreen from "../containers/WelcomeScreen"
import LoginScreen from "../containers/LoginScreen"
import ForgetPassScreen from "../containers/ForgetPassScreen"
import BindScreen from "../containers/BindScreen"
import HomeScreen from "../containers/HomeScreen";
import ProfileScreen from '../containers/ProfileScreen'
import DiaryScreen from '../containers/DiaryScreen'
import DeleteScreen from '../containers/DeleteScreen'

/*TabBar的图标设置*/
const Unlock_hover=require('../components/homeScreenComponent/images/unlock_hover.png');
const Unlock=require('../components/homeScreenComponent/images/lock.png');
const Diary_hover=require('../components/homeScreenComponent/images/diary_hover.png');
const Diary=require('../components/homeScreenComponent/images/diary.png');
const Mine_hover=require('../components/homeScreenComponent/images/mine_hover.png');
const Mine=require('../components/homeScreenComponent/images/mine.png');
/*配置TabBar选项封装*/
const TabOptions = (tabBarTitle,normalImage,selectedImage) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused})=> {
        return(
            <Image
                source={!focused ? normalImage : selectedImage}
            />
        )
    });
    return {tabBarLabel,tabBarIcon,};
};
const navigationOptions = {
    HomeScreen:{
        screen:HomeScreen,
        navigationOptions:()=>TabOptions('开锁',Unlock,Unlock_hover),
    },
    DiaryScreen:{
        screen:DiaryScreen,
        navigationOptions: () => TabOptions('日志',Diary,Diary_hover),
    },
    ProfileScreen:{
        screen:ProfileScreen,
        navigationOptions: () => TabOptions('我的',Mine,Mine_hover),
    },


};
const Tab=TabNavigator({
    ...navigationOptions
},{
    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    lazy:true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#6CD6FF', // 文字和图片选中颜色
        inactiveTintColor: '#909090', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了。
        style: {
            backgroundColor: '#fff', // TabBar 背景色
            paddingBottom: 0,
            borderTopWidth: 0.5,
            borderTopColor: '#ccc',
        },
        labelStyle: {
            fontSize: 12, // 文字大小
            margin: 1,
        },
        indicatorStyle: { height: 0 }, //android 中TabBar下面会显示一条线，高度设为 0 后
    },
});
const AppScreen={

    WelcomeScreen:{
        screen:WelcomeScreen
    },
    Tab:{screen:Tab,},
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
    HomeScreen:{
        screen:HomeScreen
    },
    DiaryScreen:{
        screen:DiaryScreen,
    },
    ProfileScreen:{
        screen:ProfileScreen
    },
    DeleteScreen:{
        screen:DeleteScreen
    }
};

export const AppNavigator = StackNavigator(
    {
        ...AppScreen
    },
    {
        headerMode:'none',
    }
);

const AppWithNavigationState = ({ dispatch, nav }) => {
    return (
        <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })}/>
    )
}

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);