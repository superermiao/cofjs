import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,AsyncStorage} from 'react-native';
import {fetchJSON} from '../utils/NetUtils'
import {connect} from 'react-redux'
import {height, width,newSize} from '../utils/UtilityValue'
import {randomKey} from "../utils/randomkey";
import TabBarComponent from '../components/commonComponent/TabBarComponent'
import LoginButtonComponent from '../components/commonComponent/LoginButtonComponent';
import navigationGo from '../actions/NavigationActionsMethod'
import {Lock_BindAction,Lock_UNBindAction} from '../actions/LockAction'

let UBindData={};
const saveBind=function(data) {
    console.log('绑定需要存的数据：'+data);
    storage.save({
        key:'user',
        data:data,
        expires:null,
    }).then(()=>{
        console.log("数据存储成功："+JSON.stringify(data));
    }).catch((err)=>{
        console.log("存储失败"+err);
    });
};
class BindScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            deviceId:'1000040',
            lockId:'',
        };
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextState !== this.state || nextProps !== this.props){
            return true
        }else{
            return false
        }
    }

    componentDidMount(){
        //读取user里的数据
        storage.load({
            key:'user',
            autoSync: true,
            syncInBackground: false
        }).then(ubindres=>{
            console.log('获取数据成功：',ubindres);
            UBindData=ubindres;
        }).catch(err => {
            console.log('用户信息本地存储获取失败', err);
        });

    }


    postBind(){
         //随机数的生成
         let randomkey=randomKey();
         let DpToken=randomkey^UBindData.PrivateKey;
         console.log('randomkey:'+randomkey);
         let DsToken=UBindData.TempKey.match(/\d{8}/g)[4]^UBindData.SecretKey;
         let bindData=UBindData.MsgSeq+"|"+DsToken+"|"+DpToken+"|"+UBindData.UidType+"|"+this.state.deviceId+"|"+this.state.lockId+"|"+UBindData.Ver+"|"+UBindData.Index;
        console.log("绑定需要传的数据加载："+bindData);
        let self=this;
        fetchJSON("bind",bindData, function (data) {
                if(data.error=='251'){
                    alert('用户没登陆');
                    UBindData.TempKey=randomkey+UBindData.TempKey.substring(0,32);
                    console.log('tempkey: '+UBindData.TempKey);
                    /*self.props.navigation.dispatch(navigationGo('push','LoginScreen',{}));*/
                    saveBind(UBindData);
                }else if(data.error=='255'){
                    alert('绑定出错了');
                    UBindData.TempKey=randomkey+UBindData.TempKey.substring(0,32);
                    console.log('tempkey: '+UBindData.TempKey);
                    saveBind(UBindData);
                } else if(data.error=='42'){
                    alert('网关不在线');
                    UBindData.TempKey=randomkey+UBindData.TempKey.substring(0,32);
                    console.log('tempkey: '+UBindData.TempKey);
                    saveBind(UBindData);
                }else if(data.error=='43'){
                    alert('锁已经被绑定');
                    self.props.dispatch(Lock_BindAction(self.state.lockId,self.state.deviceId));
                    saveBind(UBindData);
                }else if(data.error=='45'){
                    UBindData.TempKey=randomkey+UBindData.TempKey.substring(0,32);
                    console.log('tempkey: '+UBindData.TempKey);
                    self.props.dispatch(Lock_BindAction(self.state.lockId,self.state.deviceId));
                    saveBind(UBindData);
                }else if(data.error=='0'){
                    alert('绑定成功');
                    self.props.dispatch(Lock_BindAction(self.state.lockId,self.state.deviceId));
                    UBindData.TempKey=randomkey+UBindData.TempKey.substring(0,32);
                    console.log('tempkey: '+UBindData.TempKey);
                    UBindData.lockId=self.state.lockId;
                    UBindData.deviceId=self.state.deviceId;
                    saveBind(UBindData);
                    console.log("绑定返回的数据: "+data.payload);
                }
            });
    }

    render(){
        return(
            <View style={styles.container}>
                <TabBarComponent title="绑定锁" navigation={this.props.navigation} />
                <View style={styles.view}>

                    <Text>输入锁的编号或者扫描锁关二维码</Text>
                    <View style={styles.rowView}>
                        <Text>DevId:</Text>
                    <TextInput
                        style={styles.txtInput}
                        placeholder={'设备的编号'}
                        value={this.state.deviceId}
                        onChangeText={(deviceId) => this.setState({deviceId})}
                    />
                    </View>
                    <View style={styles.rowView}>
                        <Text>LokId:</Text>
                        <TextInput
                            style={styles.txtInput}
                            placeholder={'锁的编号'}
                            value={this.state.lockId}
                            onChangeText={(lockId) => this.setState({lockId})}
                        />
                    </View>
                </View>
                <LoginButtonComponent name='点击绑定' onPress={()=>this.postBind()}/>


            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    view:{
        marginTop:30*newSize,
    },
    rowView:{
        flexDirection:'row',
    },
    txtInput:{
        width:300*newSize,
        fontSize:16*newSize,
        height:56*newSize
    },
});
function select(state) {
    return{
        lockId:state.lock.lockId,
        deviceId:state.lock.deviceId,
}
}
export default connect(select)(BindScreen);