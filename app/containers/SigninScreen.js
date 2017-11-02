import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,Dimensions,TouchableWithoutFeedback,ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {fetchJSON} from '../utils/NetUtils'
import {height, width,newSize} from '../utils/UtilityValue'
import navigationGo from '../actions/NavigationActionsMethod'
import LoginButtonComponent from '../components/commonComponent/LoginButtonComponent'
import {User_SignAction,User_LoginAction,User_LogoutAction} from '../actions/UserActions'
import  {connect} from 'react-redux'
//处理注册返回之后的数据
const saveUregRes=function (res){
    let loginArry = res.split('|');
    console.log(loginArry);
    let uregResData={
        Uid:loginArry[0],
        TempKey:loginArry[1].slice(0,40),
        MsgSeq:loginArry[2],
        UidType:loginArry[3],
        SecretKey:loginArry[4],
        PrivateKey:loginArry[5],
        Ver:loginArry[1].substr(81,3),
        Index:loginArry[1].substr(84,1)
    };
    storage.save({
        key:'user',
        data:uregResData,
        expires:null,
    }).then(()=>{
        console.log("数据存储成功："+JSON.stringify(uregResData));
    }).catch((err)=>{
        console.log("存储失败"+err);
    });
};
class SigninScreen extends  Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            cardId:'',
            tel:'',
            password:'',
            hiddenPhone:'',
            hiddenPass:'',
            hiddenName:'',
            hiddenID:'',
            verify:'',
            errorText:'',
        }
    }

 /*   checkUtiles(){
        const regData={
            cardId:/^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$/,
            tel:/^1[0-9]{10}$/,
            password:/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/,
        }
            if(!regData.cardId.test(this.state.cardId)){
                this.state.errorText="身份证号码不正确";
                return false;
            }else if(!regData.tel.test(this.state.tel)){
                this.state.errorText="电话号码不正确";
                return false;
            }else if(!regData.password.test(this.state.password)){
                this.state.errorText="请输入长度为6-12之间大小写字母和数字的组合，不能使用特殊字符";
                return false;
            }else {
                this.state.errorText="";
                return true;
            }
    }*/

 //提交的数据
    postReg() {
    let user=this.state.name + "|" + this.state.cardId + "|" + this.state.tel + "|" + this.state.password + "|" + '100';
      let self=this;
        fetchJSON("reg",user, function (data) {
            console.log("注册返回需要保存的数据: "+data);
            saveUregRes(data.payload);
            self.props.dispatch(User_SignAction(self.state.tel));
            self.props.navigation.dispatch(navigationGo('push','LoginScreen',{tel:self.state.tel}));
        });
    };
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={{color:'#FFFFFF',fontSize:20*newSize}}>注册</Text>
                </View>

                <ScrollView style={styles.textInputView}>
                    <Text style={styles.hiddenText}>{this.state.hiddenName}</Text>
                    <TextInput
                        style={styles.txtInput}
                        placeholder={'请输入用户名'}
                        value={this.state.name}
                        onChangeText={(name) => this.setState({name})}
                        onFocus={()=>this.setState({
                            hiddenName:'姓名'
                        })}
                    />

                    <Text style={styles.hiddenText}>{this.state.hiddenID}</Text>
                    <TextInput
                        placeholder={'输入身份证'}
                        value={this.state.cardId}
                        onChangeText={(cardId) => this.setState({cardId})}
                        style={styles.txtInput}
                        onFocus={()=>this.setState({
                            hiddenID:'身份证'
                        })}
                    />

                    <Text style={styles.hiddenText}>{this.state.hiddenPhone}</Text>
                    <TextInput
                        placeholder={'输入手机号'}
                        value={this.state.tel}
                        onChangeText={(tel) => this.setState({tel})}
                        style={styles.txtInput}
                        onFocus={()=>this.setState({
                            hiddenPhone:'手机号'
                        })}
                        keyboardType={'numeric'}
                    />

                    <Text style={styles.hiddenText}>{this.state.hiddenPass}</Text>
                    <TextInput
                        placeholder={'输入密码'}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password})}
                        style={styles.txtInput}
                        onFocus={()=>this.setState({
                            hiddenPass:'密码'
                        })}
                    />
                    <Text style={styles.errorText}>{this.state.errorText}</Text>
                    <LoginButtonComponent onPress={()=>this.postReg()}  name="立即注册"/>
                </ScrollView>
             {/*     //验证码
                    <Text style={styles.hiddenText}>{this.state.hiddenVerify}</Text>
                    <View style={{width:300*newSize,flexDirection:'row'}}>
                        <TextInput
                            placeholder={'验证码'}
                            value={this.state.verify}
                            onChangeText={(verify) => this.setState({verify})}
                            style={{width:173*newSize}}
                            onFocus={()=>this.setState({
                                hiddenVerify:'验证码'
                            })}
                        />
                        <View style={{marginLeft:12*newSize,justifyContent:'center'}}>
                            <Text style={{color:'#6CD6FF'}}>发送验证码</Text>
                        </View>
                    </View>*/}
                <Text style={styles.reg} onPress={()=>this.props.navigation.dispatch(navigationGo('push','LoginScreen',{}))}>已有帐号,现在登录</Text>
            </View>
        )
    }
}

/*样式*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        position:'relative'
    },
    topBar:{
        height:60*newSize,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:"#6CD6FF",
        width:width,
        marginTop:0*newSize,
    },
    textInputView:{
        marginTop:44*newSize,
        marginLeft:30*newSize
    },
    hiddenText:{
        marginLeft:0,
        fontSize:12*newSize,
        color:"#6CD6FF",
    },
    txtInput:{
        width:300*newSize,
        fontSize:16*newSize,
        height:56*newSize
    },
    errorText:{
        color:'#FF8283',
        fontSize:newSize*12
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
    console.log('当前的user store:'+state.authUser.tel);
    return {
        tel:state.authUser.tel,
        uid:state.authUser.uid,
    }
}
export default connect(select)(SigninScreen);