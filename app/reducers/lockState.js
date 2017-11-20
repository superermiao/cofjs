const LockState = {
    lockId:'',
    deviceId:'',
    lockStatus:false,
};

export default function lock(state = LockState, action) {
    if(action.type === 'LOCK_BIND'){
        /*state = action.payload;*/
        return {lockId:action.lockId,deviceId:action.deviceId,lockStatus:true};
    }
    else if (action.type === 'LOCK_UNBIND'){
        /*  state={};*/
        return {lockId:'',deviceId:'',lockStatus:false};
    }else{
        return state;
    }
}