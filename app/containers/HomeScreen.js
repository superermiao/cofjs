import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,Image,StatusBar} from 'react-native';
import Storage from 'react-native-storage';
import {height, width,newSize} from '../utils/UtilityValue'
import { NavigationActions } from 'react-navigation';
import navigationGo from '../actions/NavigationActionsMethod'
import TopBarComponent from '../components/homeScreenComponent/TopBarComponent'
import {connect} from 'react-redux';
import {User_SignAction,User_LoginAction,User_LogoutAction} from '../actions/UserActions'

class HomeScreen extends Component{


    constructor(props) {
        super(props);
        let that=this;
        this.state={
            doorName:'暂无',
            doorNumber:'1001000',
            doorAdr:'广东省深圳市',
            bindLock:that.props.status?'':'您尚未绑定锁!',
            battery:'无',
            connect:'无'
        }
    }
    componentWillMount(){

    }
    componentDidMount () {
        /*storage.load({
            key: 'user',
            autoSync: true,
            syncInBackground: false,
        }).then(result => {
            if (result) {
                alert('用户信息本地存储获取成功：',result);
                this.props.dispatch(User_LoginAction(result.tel,result.Uid));
            }
        }).catch(err => {
            console.log('用户信息本地存储获取失败', err);
            this.goLogin();
        })*/
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextState !== this.state || nextProps !== this.props){
            return true
        }else{
            return false
        }
    }

    render(){
        return(
            <View style={styles.container}>
               <TopBarComponent title="智能锁" navigation={this.props.navigation}/>
                <View style={{position:'absolute',top:0,zIndex:8}}>
                    <Image source={require('../images/bg.png')}/>
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
                    <Image source={require('../components/homeScreenComponent/images/unlock.png')}/>
                </View>
                <Text style={{fontSize:13*newSize,color:'#909090'}}>{this.state.bindLock}</Text>
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
    }
}
export default connect(select)(HomeScreen);