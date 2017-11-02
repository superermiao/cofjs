import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableOpacity,AsyncStorage,ListView} from 'react-native';
import {fetchJSON} from '../utils/NetUtils'
import {connect} from 'react-redux'
import {height, width,newSize} from '../utils/UtilityValue'
import TabBarComponent from '../components/commonComponent/TabBarComponent'
import { SwipeListView ,SwipeRow} from 'react-native-swipe-list-view';
import {randomKey} from "../utils/randomkey";
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
        }).catch(err => {
            console.log('用户信息本地存储获取失败', err)
        });
    }

    postUNBind(){
            //随机数的生成
            let randomkey=randomKey();
            let DpToken=randomkey^UNBindData.PrivateKey;
            let DsToken=UNBindData.TempKey.match(/\d{8}/g)[4]^UNBindData.SecretKey;
            let unbindData=UNBindData.MsgSeq+"|"+DsToken+"|"+DpToken+"|"+UNBindData.UidType+"|"+this.props.lockId+"|"+UNBindData.Ver+"|"+UNBindData.Index;
            console.log("解绑需要传的数据加载："+unbindData);
            let self=this;
            fetchJSON("ubind",unbindData, function (data) {
               if(data.error=='0'){
                    alert('解绑成功');
                    self.props.dispatch(Lock_UNBindAction());
                   UNBindData.TempKey=randomkey+UNBindData.TempKey.substring(0,32);
                   delete UNBindData.lockId;
                    saveBind(UNBindData);
                   console.log('此时的Tempkey：'+UNBindData.TempKey);
                    console.log("解绑返回的数据:  "+data.payload);
                }else{
                   alert('解绑失败');
                   UNBindData.TempKey=randomkey+UNBindData.TempKey.substring(0,32);
                   console.log(UNBindData.TempKey);
                   saveBind(UNBindData);
               }
            });
}

    render(){
        return(
            <View style={styles.container}>
                <TabBarComponent title="解绑锁" navigation={this.props.navigation} />

                <View style={styles.view}>
                    <Text>解绑锁：侧滑删除LockId</Text>
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
        width:width,
        flexDirection:'row',
    },
    txtInput:{
        width:300*newSize,
        fontSize:16*newSize,
        height:56*newSize
    },
    listRow: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        height: 40,
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1,
    },
});
function select(state) {
    return{
        lockId:state.lock.lockId,
        deviceId:state.lock.deviceId,
    }
}
export default connect(select)(DeleteScreen);