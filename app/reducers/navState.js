import { AppNavigator } from '../navigators/appNavigator';
let lastRoute = '';//路由判断变量；

//导航reducer
export default function nav( state, action ) {
    let nextState;

    if(action.type === 'Navigation/NAVIGATE'){
        if(lastRoute === action.routeName){
            //上一个跳转路由和现在的跳转路由相同
            action.type = 'Navigation/SETPARAMS';
            action.action.type = 'Navigation/SETPARAMS';
        }
        lastRoute = action.routeName;
    }
    if(action.type === 'Navigation/RESET'){
        lastRoute = '';
    }
    if(action.type === 'Navigation/BACK'){
        lastRoute = '';
    }
    switch (action.type) {
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }
    return nextState || state;
}