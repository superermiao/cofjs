import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,Dimensions,TouchableWithoutFeedback,ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {fetchJSON} from '../utils/NetUtils'
import {height, width,newSize} from '../utils/UtilityValue'
import navigationGo from '../actions/NavigationActionsMethod'
import userfn from  '../actions/UserActions'
import InputBoard from '../components/keyboardSpacer/KeyboardComponent'
import InputScrollView from 'react-native-input-scroll-view';
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
        }
    }

    saveUregRes(res){
        var loginArry=res.split('|');
        console.log(loginArry);
        var uregResData={
            Uid:loginArry[0],
            TempKey:loginArry[1].slice(0,40),
            MsgSeq:loginArry[2],
            UidType:loginArry[3],
            SecretKey:loginArry[4],
            PrivateKey:loginArry[5],
            Ver:loginArry[1].substr(81,3),
            Index:loginArry[1].substr(84,1)
        };

        console.log("数据存储成功："+JSON.stringify(uregResData));
        /*this.props.dispatch(userfn('SignUp',uregResData));*/
        this.props.navigation.dispatch(navigationGo('reset'));
    }

    postReg() {
       var user=this.state.name + "|" + this.state.cardId + "|" + this.state.tel + "|" + this.state.password + "|" + this.state.tel;
        fetchJSON("reg",user, function (data) {
            console.log(data);
            this.saveUregRes(json.payload);
        });
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={{color:'#FFFFFF',fontSize:20*newSize}}>注册</Text>
                </View>

                <View style={styles.textInputView}>
                    <Text style={styles.hiddenText}>{this.state.hiddenName}</Text>
                    <TextInput
                        style={styles.txtInput}
                        placeholder={'输入姓名'}
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
                    </View>



                    <Text style={styles.errorText}>{this.state.errorText}</Text>
                    <TouchableWithoutFeedback onPress={()=>this.postReg()}>
                        <View style={styles.loginButton}>
                            <Text style={styles.loginText}>立即注册</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

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
    loginButton:{
        width:300*newSize,
        borderRadius:60*newSize,
        height:40*newSize,
        backgroundColor:'#6CD6FF',
        marginTop:28*newSize,
        alignItems:'center',
        justifyContent:'center',
        //以下是阴影属性：
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000000',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 1,
    },
    loginText:{
        color:"#FFFFFF",
        fontSize:16*newSize,
    },
    reg:{
        position:'absolute',
        color:"#494E6F",
        fontSize:12*newSize,
        top:602*newSize,
        left:125*newSize,
    },

});

export default SigninScreen;