const initialState = {
    isLoggedIn: false,//是否登录
    tel:'',
    status:null,
    uid:''
};

export default function authUser(state = initialState, action) {
    if(action.type === 'Sign_Up'){
        /*state = action.payload;*/
        return {isLoggedIn: false,status:'signing',tel:action.tel,...state};
    }
    else if (action.type === 'Log_In'){
       /* state=action.payload;*/
        return {isLoggedIn:true,status:'done',tel:action.tel,uid:action.uid}
    }else if(action.type ==='Log_Doing'){
       /* state=action.payload;*/
        return{...state,status:'doing'}
    }
    else if(action.type === 'Log_Out'){
        return { ...state, isLoggedIn: false,status:null,tel:{}};
    } else{
        return state;
    }
}