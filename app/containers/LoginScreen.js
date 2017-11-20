import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,Image} from 'react-native';
import {height, width,newSize} from '../utils/UtilityValue'
import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import navigationGo from '../actions/NavigationActionsMethod'
import {fetchJSON} from '../utils/NetUtils'
import LoginButtonComponent from '../components/commonComponent/LoginButtonComponent';
import {User_SignAction,User_LoginAction,User_LogoutAction} from '../actions/UserActions'
import {getCode} from '../utils/PassWord';

let saveLoginRes=function (res,tel) {
    //处理登录返回的数据
    let loginArray=res.split('|');
    console.log(loginArray);
    let uLoginResData={
        PrivateKey    : getCode(loginArray[0]),
        SToken        : loginArray[1],
        LoginAddr     : loginArray[3],
        bakAddr       : loginArray[4],
        masterindex   : loginArray[5],
        viceindex     : loginArray[6],
        defaultlockid : loginArray[7],
        tel:tel,
    };
    alert('登录返回的存储的数据：'+JSON.stringify(uLoginResData));
    console.log('登录返回的存储的数据：'+JSON.stringify(uLoginResData));
    storage.save({
        key:'user',
        data:uLoginResData,
        expires:null,
    });
    return uLoginResData;
};
class LoginScreen extends  Component{
    constructor(props){
        super(props);
        let that=this;
        this.state={
            tel:that.props.tel||'',
            password:'',
            hiddenPhone:'',
            hiddenPass:'',
            errorText:'',
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextState !== this.state || nextProps !== this.props){
            return true
        }else{
            return false
        }
    }

    componentDidMount(){
       /* //读取user里之前的数据
        storage.load({
            key:'user',
            autoSync: true,
            syncInBackground: false
        }).then(uregres=>{
            oldUregData={
                Uid       : uregres.Uid,
                SecretKey : uregres.SecretKey,
                PrivateKey: uregres.PrivateKey,
                UidType   : uregres.UidType,
                Ver       : uregres.Ver,
                Index     : uregres.Index,
            };
           alert("注册返回需要加载保存的数据："+JSON.stringify(oldUregData));
        }).catch(err => {
            console.log('用户信息本地存储获取失败', err)
        });*/
    }

    //登录函数
    postLogin(){
        alert('密码：'+this.state.password);
        let pwsd=getCode(this.state.password);
       /* let pwsd=getCode('123456);*/
        let user = this.state.tel+"|"+pwsd;
        console.log('传递的数据: '+user);
        let self=this;
        fetchJSON("login",user, function (data) {
            console.log(data);
            if(data.error==='30'){
                alert('密码错误');
            }else if(data.error==='256'){
                alert('手机号未注册');
            }else if(data.error==='33'){
                alert('该账号请重新登陆');
            }else if(data.error==='34'){
                alert('电话用户匹配错误');
            }
            else if(data.error==='0'){
                saveLoginRes(data.payload,self.state.tel);
              /*  self.props.dispatch(User_LoginAction(self.state.tel,user.slice(0,7)));*/
                self.props.navigation.dispatch(navigationGo('push','Tab',{tel:self.state.tel}));
            }
        });

    };

    //跳转到注册界面
    toUreg(){
        this.props.navigation.dispatch(navigationGo('push','SigninScreen',{}));
    };
    render(){
        return(
            <View style={styles.container}>

                <View style={styles.logo}>
                    <Image source={require('../images/logo.png')}/>
                </View>

                <View style={styles.textInputView}>
                    <Text style={styles.hiddenText}>{this.state.hiddenPhone}</Text>
                    <TextInput
                    placeholder={'输入电话'}
                    maxLength={11}
                    value={this.state.tel}
                    onChangeText={(tel) => this.setState({tel})}
                    style={styles.txtInput}
                    keyboardType={'numeric'}
                    onFocus={()=>this.setState({
                        hiddenPhone:'手机号'
                    })}
                     />
                    <Text style={styles.hiddenText}>{this.state.hiddenPass}</Text>
                    <TextInput
                        placeholder={'输入密码'}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password})}
                        style={styles.txtInput}
                        secureTextEntry={true}
                        onFocus={()=>this.setState({
                            hiddenPass:'密码',

                        })}
                        /*onBlur={()=>{

                            console.log('密码：'+getCode(this.state.password))
                        }}*/
                    />
                    <Text style={styles.errorText}>{this.state.errorText}</Text>
                    <LoginButtonComponent onPress={()=>this.postLogin()} name="登录"/>
                </View>

                    <Text style={styles.forgetPass} onPress={()=>this.props.navigation.dispatch(navigationGo('push','ForgetPassScreen',{}))}>忘记密码?</Text>
                    <Text style={styles.reg} onPress={()=>this.toUreg()}>未有帐号？现在注册</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    logo:{
       top:newSize*96,
        position:'absolute'
    },
    textInputView:{
      top:newSize*233,
        position:'absolute',
    },
    hiddenText:{
        marginLeft:0,
        fontSize:12*newSize,
        color:"#6CD6FF",
    },
    txtInput:{
        width:300*newSize,
    },
    errorText:{
        color:'#FF8283',
        fontSize:newSize*12
    },
    forgetPass:{
        position:'absolute',
        color:"#494E6F",
        fontSize:12*newSize,
        top:473*newSize,
        left:276*newSize,
    },
    reg:{
        position:'absolute',
        color:"#494E6F",
        fontSize:12*newSize,
        top:602*newSize,
        left:125*newSize,
    },

});
function select(state) {
    console.log('当前的store:'+state.authUser.tel);
    return {
        tel:state.authUser.tel,
        uid:state.authUser.uid,
    }
}
export default  connect(select)(LoginScreen);