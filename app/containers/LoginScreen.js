import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,Image} from 'react-native';
import {height, width,newSize} from '../utils/UtilityValue'
import { NavigationActions } from 'react-navigation';
import navigationGo from '../actions/NavigationActionsMethod'
import {fetchJSON} from '../utils/NetUtils'
import LoginButtonComponent from '../components/commonComponent/LoginButtonComponent'

let oldUregData={};
var saveLoginRes=function (res) {
    //处理登录返回的数据
    var loginArray=res.split('|');
    console.log(loginArray);
    var uLoginResData={
        MsgSeq         : loginArray[0],
        SToken        : loginArray[1],
        TempKey      : loginArray[2].slice(0,40),
        LoginAddr        : loginArray[3],
        AppAddr         : loginArray[4],
        masterindex    : loginArray[5],
        viceindex      : loginArray[6],
        defaultlockid  : loginArray[7],
    };
    console.log('登录返回的存储的数据：'+JSON.stringify(uLoginResData));
    //综合存储的数据
    var userData=Object.assign(oldUregData,uLoginResData);
    console.log('存储的数据为：'+JSON.stringify(userData));
    storage.save({
        key:'user',
        data:userData,
        expires:null,
    });
    return userData;
};
class LoginScreen extends  Component{
    constructor(props){
        super(props);
        this.state={
            tel:'',
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
        //读取user里之前的数据
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
            }
            console.log("注册返回需要加载保存的数据："+JSON.stringify(oldUregData));
        }).catch(err => {
            console.log('用户信息本地存储获取失败', err)
        });
    }

    //登录
    postLogin(){
       storage.load({
            key:'user',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            syncInBackground: false
        }).then(res=>{
            console.log(res);
            var uidtype,msgseq,passwd,ver,index,tempkey,mstep;
            mstep=100;
            tempkey=res.TempKey.match(/\d{8}/g);
            msgseq= res.Uid.toString()+mstep.toString();
            /*
            //随机数的生成
            randomkey=(Math.floor(Math.random()*10000) % 8+1).toString();
            for (var i = 0; i < 7; i++) {
                randomkey=randomkey+ (Math.floor(Math.random()*10000) % 10).toString();
            }
            */
            uidtype=res.UidType;
            passwd=this.state.password^tempkey[4];
            ver=res.Ver;
            index=res.Index;
            var user=msgseq+"|"+this.state.tel+"|"+uidtype+"|"+passwd+"|"+ver+"|"+index;
            console.log(user);
            return user;
        }).then(user=>{
                console.log("你好，你登录传输的数据是："+user);
                fetchJSON("login",user, function (data) {
                    console.log(data);
                    if(data.error==='30'){
                        alert('密码错误');
                    }else if(data.error==='31'){
                        alert('手机号未注册');
                    }else if(data.error==='0'){
                        saveLoginRes(data.payload);
                    }
                });
               this.props.navigation.dispatch(navigationGo('push','Tab',{}));
            }
        ).catch((err)=>{
            console.log(err);
        })
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
                            hiddenPass:'密码'
                        })}
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
export default  LoginScreen;