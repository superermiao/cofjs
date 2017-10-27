import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableOpacity,AsyncStorage} from 'react-native';
import  {connect} from 'react-redux';
import {fetchJSON} from '../utils/NetUtils'
import {height, width,newSize} from '../utils/UtilityValue'
import navigationGo from '../actions/NavigationActionsMethod'
import TopBarComponent from "../components/homeScreenComponent/TopBarComponent";
class ProfileScreen extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }
    toBind(){
        this.props.navigation.dispatch(navigationGo('push','BindScreen',{}));
    }
    toUnBind(){
        this.props.navigation.dispatch((navigationGo('push','DeleteScreen',{})))
    }
    toLogin(){
        this.props.navigation.dispatch((navigationGo('push','LoginScreen',{})))
    }
    render(){
        return(
            <View style={styles.container}>
                <TopBarComponent title="个人中心"/>

                <View style={{marginTop:60*newSize}}>
                    <View style={styles.divide}>
                        <Text style={styles.text}>用户:{this.props.tel}</Text>
                    </View>

                    <View style={styles.divide}>
                        <TouchableOpacity onPress={()=>this.toBind()}>
                            <Text  style={[styles.text,{borderBottomWidth:1*newSize,borderColor:'#ccc'}]}>添加门锁</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.toUnBind()} >
                            <Text style={styles.text}>删除门锁</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.divide}>
                        <TouchableOpacity onPress={()=>this.toLogin()}>
                            <Text style={styles.text}>返回登录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',
        alignItems:'center',
    },
    divide:{
        backgroundColor:"#fff",
        position:'relative',
        marginTop:10*newSize,
        width:360*newSize,
        borderRadius:10*newSize,
    },
    text:{
        padding:10*newSize,
        fontSize:16*newSize,
    }
});
function select(state) {
    return {
        tel:state.authUser.tel
    }
}
export default connect(select)(ProfileScreen);