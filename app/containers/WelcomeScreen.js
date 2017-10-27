import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
import {height, width,newSize} from '../utils/UtilityValue'
import { NavigationActions } from 'react-navigation';
import navigationGo from '../actions/NavigationActionsMethod'
import {User_SignAction,User_LoginAction,User_LogoutAction} from '../actions/UserActions'
import {Lock_BindAction,Lock_UNBindAction} from '../actions/LockAction'
import { connect } from 'react-redux';

//初始化react-native-storage
let storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,
    // 存储引擎：对于RN使用AsyncStorage
    storageBackend: AsyncStorage,
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires:null,  //100天
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
})
class WelcomeScreen extends Component{
    constructor(props) {
        super(props);
    }

    componentWillMount(){

    }
    goLogin(){
        this.props.navigation.dispatch(navigationGo('reset'));
    }
    goHome(){
        this.props.navigation.dispatch(navigationGo('push','Tab',{}));
    }
    componentDidMount () {
       global.storage = storage;
        storage.load({
            key: 'user',
            autoSync: true,
            syncInBackground: false,
        }).then(result => {
            if (result) {
                alert('用户信息本地存储获取成功：',result);
                console.log('用户信息本地存储获取成功：',result);
                if(result.Uid&&result.tel){
                    this.props.dispatch(User_LoginAction(result.tel,result.Uid));
                    if(result.lockId&&result.deviceId){
                        this.props.dispatch(Lock_BindAction(result.lockId,result.deviceId))
                    }
                    this.goHome();
                }else {
                    this.props.dispatch(User_LoginAction(result.tel,result.Uid));
                    this.goLogin();
                }
            }
        }).catch(err => {
            console.log('用户信息本地存储获取失败', err);
            this.goLogin();
        })
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
                <View>
                    <Text style={styles.titleText}>Welcome to 经纬物联平台</Text>
                </View>
            </View>
        )
    }


}

const styles=StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    titleText:{
        color:'#FF5A5F',
        fontSize:30*newSize
    }
})
const mapStateToProps = state => ({
    nav: state.nav,
    tel:state.authUser.tel,
    uid:state.authUser.uid
});
export default connect(mapStateToProps)(WelcomeScreen);