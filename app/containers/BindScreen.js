import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,AsyncStorage} from 'react-native';
import {fetchJSON} from '../utils/NetUtils'
import {height, width,newSize} from '../utils/UtilityValue'
import TabBarComponent from '../components/commonComponent/TabBarComponent'
import LoginButtonComponent from '../components/commonComponent/LoginButtonComponent';
import navigationGo from '../actions/NavigationActionsMethod'
class BindScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            deviceId:'1000040'
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

    }

    postBind(){
        //读取user里的数据
       storage.load({
            key:'user',
            autoSync: true,
            syncInBackground: false
        }).then(ubindres=>{
            UBindData={
                MsgSeq       : ubindres.MsgSeq,
                SecretKey : ubindres.SecretKey,
                TempKey   : ubindres.TempKey.slice(0,40),
                PrivateKey: ubindres.PrivateKey,
                UidType   : ubindres.UidType,
                LockId    :ubindres.defaultlockid,
                Ver       : ubindres.Ver,
                Index     : ubindres.Index,
            };
         //随机数的生成
         let randomkey=(Math.floor(Math.random()*10000) % 8+1).toString();
         for (var i = 0; i < 7; i++) {
             randomkey=randomkey+ (Math.floor(Math.random()*10000) % 10).toString();
         };
         let DpToken=randomkey^UBindData.PrivateKey;
         let DsToken=UBindData.TempKey.match(/\d{8}/g)[4]^UBindData.SecretKey;
         let bindData=UBindData.MsgSeq+"|"+DsToken+"|"+DpToken+"|"+UBindData.UidType+"|"+this.state.deviceId+"|"+UBindData.LockId+"|"+UBindData.Ver+"|"+UBindData.Index;
            console.log("绑定需要传的数据加载："+JSON.stringify(UBindData));
            console.log("绑定需要发送的数据："+bindData);
            fetchJSON("bind",bindData, function (data) {
                console.log("绑定返回需要保存的数据: "+data.payload);
            });
        }).catch(err => {
            console.log('用户信息本地存储获取失败', err)
        });

    }
    render(){
        return(
            <View style={styles.container}>
                <TabBarComponent title="绑定锁" navigation={this.props.navigation} />
                <View style={styles.view}>

                    <Text>输入锁的编号或者扫描锁关二维码</Text>
                    <TextInput
                        style={styles.txtInput}
                        placeholder={'锁的编号'}
                        value={this.state.deviceId}
                        onChangeText={(deviceId) => this.setState({deviceId})}
                    />
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
    txtInput:{
        width:300*newSize,
        fontSize:16*newSize,
        height:56*newSize
    },
});
export default BindScreen;