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

    render(){
        return(
            <View></View>
        )
    }
};

export default BindScreen;