import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,Image,StatusBar,TouchableOpacity} from 'react-native';
import {fetchJSON} from '../utils/NetUtils'
import {height, width,newSize} from '../utils/UtilityValue'
import {randomKey} from "../utils/randomkey";
import { NavigationActions } from 'react-navigation';
import navigationGo from '../actions/NavigationActionsMethod'
import TopBarComponent from '../components/homeScreenComponent/TopBarComponent'
import {connect} from 'react-redux';
import {User_SignAction,User_LoginAction,User_LogoutAction} from '../actions/UserActions'

let UOpenData={};
const saveLock=function(data) {
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
class HomeScreen extends Component{
    constructor(props) {
        super(props);
        this.state={
            doorName:'暂无',
            doorNumber:'1001000',
            doorAdr:'广东省深圳市',
            battery:'无',
            connect:'无'
        }
    }
    componentWillMount(){}
    componentDidMount () {

    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextState !== this.state || nextProps !== this.props){
            return true
        }else{
            return false
        }
    }
    openLock(){
        //读取user里的数据
        storage.load({
            key:'user',
            autoSync: true,
            syncInBackground: false
        }).then(ubindres=>{
            console.log('获取数据成功：',ubindres);
            UOpenData=ubindres;
            //随机数的生成
            let randomkey=randomKey();
            let DpToken=randomkey^UOpenData.PrivateKey;
            let DsToken=UOpenData.TempKey.match(/\d{8}/g)[4]^UOpenData.SecretKey;
            let UOpenLockReq=UOpenData.MsgSeq+"|"+DsToken+"|"+DpToken+"|"+UOpenData.UidType+"|"+this.props.lockId+"|"+UOpenData.Ver+"|"+UOpenData.Index;
            console.log("开锁需要传的数据加载："+JSON.stringify(UOpenLockReq));
            let self=this;
            fetchJSON("openlock",UOpenLockReq, function (data) {
                if(data.error===0){
                    alert('开锁成功');
                    UOpenData.TempKey=randomkey+UOpenData.TempKey.substring(0,32);
                    saveLock(UOpenData);
                }else{
                    alert('开锁失败');
                    UOpenData.TempKey=randomkey+UOpenData.TempKey.substring(0,32);
                    saveLock(UOpenData);
                }
            });
        }).catch(err => {
            console.log('用户信息本地存储获取失败', err);
        });

    }

    render(){
        return(
            <View style={styles.container}>
               <TopBarComponent title="智能锁" navigation={this.props.navigation}/>
                <View style={{position:'absolute',top:0,zIndex:8}}>
                    <TouchableOpacity onPress={()=>this.openLock()}>
                        <Image source={require('../images/bg.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.door}>
                        <Image source={require('../components/homeScreenComponent/images/door.png')}/>
                </View>
                <View style={styles.doorText}>
                    <Text style={{fontSize:12*newSize,fontWeight:('bold', '700')}}>门锁名称:{this.state.doorName}</Text>
                    <Text  style={{fontSize:10*newSize}}>门锁编号:{this.state.doorNumber}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:10*newSize}}>门锁地址:</Text>
                        <Text style={{fontSize:10*newSize ,width:103*newSize}}  numberOfLines={3}>{this.state.doorAdr}</Text>
                    </View>
                </View>
                <View style={styles.key}>
                    <TouchableOpacity onPress={()=>this.openLock()}>
                        <Image source={require('../components/homeScreenComponent/images/unlock.png')}/>
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize:13*newSize,color:'#909090'}}>{this.props.lockStatus?'':'您尚未绑定锁'}</Text>
                <View style={styles.batCon}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../components/homeScreenComponent/images/battery.png')}/>
                        <Text style={{marginLeft:8*newSize}}>电池状态:{this.state.battery}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginLeft:60*newSize}}>
                        <Image source={require('../components/homeScreenComponent/images/connect.png')}/>
                        <Text style={{marginLeft:8*newSize}}>连接状态:{this.state.connect}</Text>
                    </View>
                </View>
            </View>
        )
    }


}

const styles=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
    },
    door:{
        position:'absolute',
        top:77*newSize,
        zIndex:9
    },
    doorText:{
        position:'absolute',
        top:102*newSize,
        left:147*newSize,
        zIndex:10
    },
    key:{
        marginTop:213*newSize
    },
    batCon:{
        marginTop:25*newSize,
        flexDirection:'row'
    }
});
function select(state) {
    return{
        uid:state.authUser.uid,
        tel:state.authUser.tel,
        lockId:state.lock.lockId,
        lockStatus:state.lock.lockStatus,
    }
}
export default connect(select)(HomeScreen);