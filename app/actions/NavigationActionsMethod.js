import { NavigationActions } from 'react-navigation';

const navigationGo = (type,routerName,params)=>{
    if(type == 'back'){
        return NavigationActions.back();
    }
    else if(type == 'push'){

        return NavigationActions.navigate({
            routeName: routerName,
            params: params,
            action: NavigationActions.navigate({routeName: routerName})
        })
    }
    else if(type == 'reset'){
        return NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LoginScreen'})
            ]
        })
    }
}
export default navigationGo