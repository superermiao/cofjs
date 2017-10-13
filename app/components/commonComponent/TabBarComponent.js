import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,TouchableWithoutFeedback} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {height,width,newSize} from '../../utils/UtilityValue';
import navigationGo from '../../actions/NavigationActionsMethod';

class TabBarComponent extends Component{
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
        return(
            <View style={{width:width}}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={()=>this.props.navigation.dispatch(navigationGo('back'))}>
                        <View style={styles.backView}>
                            <Image source={require('./images/Back2.png')} style={styles.back}/>
                        </View>
                    </TouchableWithoutFeedback>

                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop:0*newSize,
        height:60*newSize,
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
        left:0,
        width:42*newSize,
        height:40*newSize,
        alignItems:'center',
        justifyContent:'center'
    },
    back:{
        width:12*newSize,
        height:17*newSize,
    },
    titleText:{
        fontSize:18*newSize,
        color:'#4B4B4B'
    },
    saveView:{
        marginRight:21*newSize
    },
    saveText:{
        fontSize:14*newSize,
        color:'#484848'
    }
});

export default TabBarComponent;