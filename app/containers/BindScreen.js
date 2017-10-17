import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,AsyncStorage} from 'react-native';
import {fetchJSON} from '../utils/NetUtils'
import {height, width,newSize} from '../utils/UtilityValue'
import TabBarComponent from '../components/commonComponent/TabBarComponent'
import navigationGo from '../actions/NavigationActionsMethod'
class BindScreen extends Component{
    constructor(props){
        super(props);
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
                PrivateKey: ubindres.PrivateKey,
                UidType   : ubindres.UidType,
                DeviceId  :ubindres.DeviceId,
                LockId    :ubindres.LockId,
                Ver       : ubindres.Ver,
                Index     : ubindres.Index,
            }
            console.log("绑定需要传的数据加载："+JSON.stringify(UBindData));
            fetchJSON("bind",UBindData, function (data) {
                console.log("绑定返回需要保存的数据: "+data);
            });
        }).catch(err => {
            console.log('用户信息本地存储获取失败', err)
        });
    }
    render(){
        return(
            <View>
                <Text onPress={()=>{this.postBind()}}>绑定一把锁</Text>
            </View>
        )
    }
};

export default BindScreen;