import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableOpacity,AsyncStorage} from 'react-native';
import {fetchJSON} from '../utils/NetUtils'
import {connect} from 'react-redux'
import {height, width,newSize} from '../utils/UtilityValue'
import TabBarComponent from '../components/commonComponent/TabBarComponent'
import LoginButtonComponent from '../components/commonComponent/LoginButtonComponent';
import navigationGo from '../actions/NavigationActionsMethod'
import {Lock_BindAction,Lock_UNBindAction} from '../actions/LockAction'
let UNBindData={};
const saveBind=function(data) {
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
class DeleteScreen extends Component{
    constructor(props){
        super(props);
       /* this.state={
            deviceId:'1000040',
            lockId:'1001102'||'1001048',
        };*/
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
            UNBindData=ubindres;
            // UNBindData={
            //     MsgSeq       : ubindres.MsgSeq,
            //     SecretKey : ubindres.SecretKey,
            //     TempKey   : ubindres.TempKey.slice(0,40),
            //     PrivateKey: ubindres.PrivateKey,
            //     UidType   : ubindres.UidType,
            //     Ver       : ubindres.Ver,
            //     Index     : ubindres.Index,
            // };
        }).catch(err => {
            console.log('用户信息本地存储获取失败', err)
        });
    }

    postUNBind(){
            //随机数的生成
            let randomkey=(Math.floor(Math.random()*10000) % 8+1).toString();
            for (var i = 0; i < 7; i++) {
                randomkey=randomkey+ (Math.floor(Math.random()*10000) % 10).toString();
            };
            let DpToken=randomkey^UNBindData.PrivateKey;
            let DsToken=UNBindData.TempKey.match(/\d{8}/g)[4]^UNBindData.SecretKey;
            let unbindData=UNBindData.MsgSeq+"|"+DsToken+"|"+DpToken+"|"+UNBindData.UidType+"|"+this.props.lockId+"|"+UNBindData.Ver+"|"+UNBindData.Index;
            console.log("解绑需要传的数据加载："+JSON.stringify(unbindData));
            let self=this;
            fetchJSON("ubind",unbindData, function (data) {
               if(data.error=='0'){
                    alert('解绑成功');
                    self.props.dispatch(Lock_UNBindAction());
                   UNBindData.TempKey=randomkey+UNBindData.TempKey.substring(0,32);
                   delete UNBindData.lockId;
                    saveBind(UNBindData);
                    console.log("解绑返回需要保存的数据: "+data.payload);
                }else{
                       alert('解绑失败');
               }

            });
    }
    render(){
        return(
            <View style={styles.container}>
                <TabBarComponent title="绑定锁" navigation={this.props.navigation} />
                <View style={styles.view}>

                    <Text>需要解锁的编号或者扫描锁关二维码</Text>
                    <View style={styles.rowView}>
                        <Text>DevId:</Text>
                        <Text>{this.props.deviceId}</Text>
                    </View>
                    <View style={styles.rowView}>
                        <Text>LokId:</Text>
                        <Text>{this.props.lockId}</Text>
                    </View>
                </View>
                <LoginButtonComponent name='解除绑定' onPress={()=>this.postUNBind()}/>
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
        lockStatus:state.lock.lockStatus,
    }
}
export default connect(select)(DeleteScreen);