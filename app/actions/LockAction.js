import navigationGo from '../actions/NavigationActionsMethod';
import {fetchJSON} from "../utils/NetUtils";


export const Lock_BindAction =function (lockId,deviceId) {
    return (dispatch)=>{
        dispatch({'type':'LOCK_BIND',lockId:lockId,deviceId:deviceId});
    }
};


export  const Lock_UNBindAction=function () {//
    return (dispatch)=>{
        dispatch({'type':'LOCK_UNBIND',state:{}});
    }
};