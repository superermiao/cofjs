import navigationGo from '../actions/NavigationActionsMethod';
import {fetchJSON} from "../utils/NetUtils";

export const User_SignAction =function (tel) {
  return (dispatch)=>{
      dispatch({'type':'Sign_Up',tel:tel});
  }
};


export  const User_LoginAction=function (tel,uid) {//登录
    return (dispatch)=>{
        dispatch({'type':'Log_Doing'});
        dispatch({'type':'Log_In',tel:tel,uid:uid});
    }
};

export const  User_LogoutAction = function(dispatch,params) { //注销
    dispatch({type:'Log_Out'});//dispatch退出登录
    storage.remove({//清除本地存储
        key: 'user',
    });
};