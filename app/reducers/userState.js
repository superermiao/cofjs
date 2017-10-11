const initialState = {
    isLoggedIn: false,//是否登录
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
    defaultlockid :''
};

export default function authUser(state = initialState, action) {
    if(action.type === 'SignUp'){
        state = action.payload;
        return { ...state, isLoggedIn: false };
    }
    else if (action.type === 'Login'){
        state=action.payload;
        return {...state, isLoggedIn:true}
    }else if(action.type === 'Logout'){
        return { ...state, isLoggedIn: false };
    } else{
        return state;
    }
}