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

/*TabBar的图标设置*/
const Unlock_hover=require('../components/homeScreenComponent/images/unlock_hover.png');
const Unlock=require('../components/homeScreenComponent/images/unlock.png');
/*配置选项封装*/
const TabOptions = (tabBarTitle,normalImage,selectedImage,navTitle) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused})=> {
        return(
            <Image
                source={!focused ? normalImage : selectedImage}
                style={[{height:35,width:35 }, {tintColor: tintColor}]}
            />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize:22,color:'white',alignSelf:'center'};
    // header的style
    const headerStyle = {backgroundColor:'#4ECBFC'};
    const tabBarVisible = true;
    // const header = null;
    return {tabBarLabel,tabBarIcon,headerTitle,headerTitleStyle,headerStyle,tabBarVisible};
};
const navigationOptions = {
    HomeScreen:{
        screen:HomeScreen,
        navigationOptions:()=>TabOptions('开锁',Unlock,Unlock_hover,'开锁'),
    },
    DiaryScreen:{
        screen:DiaryScreen,
        navigationOptions: ({navigation,screenProps}) => ({
            tabBarLabel: '日志',
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={focused?require('../components/homeScreenComponent/images/diary_hover.png')
                        :require('../components/homeScreenComponent/images/diary.png')}
                />
            ),
        }),
    },
    ProfileScreen:{
        screen:ProfileScreen,
        navigationOptions: ({navigation,screenProps}) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={focused?require('../components/homeScreenComponent/images/mine_hover.png')
                        :require('../components/homeScreenComponent/images/mine.png')}
                />
            ),
        }),
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