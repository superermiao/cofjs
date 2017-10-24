const LockState = {
    lockId:'',
    deviceId:'',
    status:false,
};

export default function lock(state = LockState, action) {
    if(action.type === 'LOCK_BIND'){
        /*state = action.payload;*/
        return {lockId:action.lockId,deviceId:action.deviceId,status:true};
    }
    else if (action.type === 'LOCK_UNBIND'){
      /*  state={};*/
        return {lockId:'',deviceId:'',status:false};
    }else{
        return state;
    }
}