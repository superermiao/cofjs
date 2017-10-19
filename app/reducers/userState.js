const initialState = {
    isLoggedIn: false,//是否登录
    tel:'',
    status:null,
    Ver: '',
    Index: '',
    UidType: '',
    Uid: '',
    SecretKey: '',
    PrivateKey: '',
    SToken: '',
    MsgSeq: '',
    TempKey: '',
    LoginAddr:'',
    AppAddr:'',
    masterindex:'',
    viceindex:'',
    defaultlockid :'',


};

export default function authUser(state = initialState, action) {
    if(action.type === 'Sign_Up'){
        state = action.payload;
        return { ...state, isLoggedIn: false,status:'doing',tel:action.tel};
    }
    else if (action.type === 'Log_In'){
        state=action.payload;
        return {...state, isLoggedIn:true,status:'done',user:action.user}
    }else if(action.type ==='Log_Doing'){
        state=action.payload;
        return{...state,status:'doing'}
    }
    else if(action.type === 'Log_Out'){
        return { ...state, isLoggedIn: false,status:null,user:{}};
    } else{
        return state;
    }
}