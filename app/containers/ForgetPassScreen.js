import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,Dimensions,TouchableWithoutFeedback} from 'react-native';
import {fetchJSON} from '../utils/NetUtils'
import {height, width,newSize} from '../utils/UtilityValue'
import TabBarComponent from '../components/commonComponent/TabBarComponent'
import navigationGo from '../actions/NavigationActionsMethod'
import LoginButtonComponent from '../components/commonComponent/LoginButtonComponent'
class ForgetPassScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            hiddenVerify:'',
            hiddenPhone:'',
            tel:'',
            verify:'',
            errorText:'',
        }
    }

    toHomeScreen(){
        const strRegTel=  /^1[0-9]{10}$/;
        const regTel=new RegExp(strRegTel);
        if(regTel.test(this.state.tel)){
           this.props.navigation.dispatch(navigationGo('push','LoginScreen',{}))
       }else {
            this.state.errorText='手机号不正确';
            return;
        }

    }

    render(){
        return(
            <View style={styles.container}>
                <TabBarComponent navigation={this.props.navigation} title="忘记密码
"/>
                <View style={styles.textInputView}>
                    <Text style={styles.hiddenText}>{this.state.hiddenPhone}</Text>
                    <TextInput
                        placeholder={'输入电话'}
                        maxLength={11}
                        autoFocus={true}
                        value={this.state.tel}
                        onChangeText={(tel) => this.setState({tel})}
                        style={styles.txtInput}
                        keyboardType={'numeric'}
                        onFocus={()=>this.setState({
                            hiddenPhone:'手机号'
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
                </View>
                <LoginButtonComponent onPress={()=>this.toHomeScreen()} name='立即登录'/>


            </View>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#F5FCFF',
    },
    textInputView:{
        marginTop:44*newSize,
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

});


export default ForgetPassScreen;