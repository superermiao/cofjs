import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity} from 'react-native';
import {height, width,newSize} from '../../utils/UtilityValue'
class LoginButtonComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={styles.loginButton}>
                        <Text style={styles.loginText}>{this.props.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    loginButton:{
        width:300*newSize,
        borderRadius:60*newSize,
        height:40*newSize,
        backgroundColor:'#6CD6FF',
        marginTop:40*newSize,
        alignItems:'center',
        justifyContent:'center',
        //以下是阴影属性：
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000000',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 1,

    },
    loginText:{
        color:"#FFFFFF",
        fontSize:16*newSize,
    },

});


export default LoginButtonComponent;