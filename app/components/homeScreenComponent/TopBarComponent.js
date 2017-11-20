import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,TouchableWithoutFeedback} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {height,width,newSize} from '../../utils/UtilityValue';
import navigationGo from '../../actions/NavigationActionsMethod';

class TopBarComponent extends Component{
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextState !== this.state || nextProps !== this.props){
            return true
        }else{
            return false
        }
    }

    render(){
        {
            var title=this.props.title;
            if(title==="智能锁") {
                return (
                    <View style={[styles.container,styles.borderNone]}>
                        <Text style={[styles.titleText,{color:'#fff'}]}>{title}</Text>
                        <TouchableWithoutFeedback onPress={()=>this.props.navigation.dispatch(navigationGo('push','BindScreen',{}))}>
                            <View style={styles.backView}>
                                <Image source={require('./images/add.png')} style={styles.back}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                )
            }else{
                return (
                    <View style={styles.container}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                )
            }
        }

    }
}

const styles = StyleSheet.create({
    container:{
        top:0*newSize,
        height:60*newSize,
        width:width,
        position:'absolute',
        zIndex:999,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:1,
        borderBottomColor:'#F2F2F2'
    },
    borderNone:{
        borderBottomWidth:0,
    },
    backView:{
        position:'absolute',
        right:0,
        width:42*newSize,
        height:40*newSize,
        alignItems:'center',
        justifyContent:'center',
    },
    back:{
       /* width:12*newSize,
        height:17*newSize,*/
    },
    titleText:{
        fontSize:18*newSize,
        color:'#000'
    },
    saveView:{
        marginRight:21*newSize
    },
    saveText:{
        fontSize:14*newSize,
        color:'#484848'
    }
});

export default TopBarComponent;