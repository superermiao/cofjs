import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,Dimensions,TouchableWithoutFeedback} from 'react-native';
import {fetchJSON} from '../utils/NetUtils'
import {height, width,newSize} from '../utils/UtilityValue'
import TabBarComponent from '../components/commonComponent/TabBarComponent'
import navigationGo from '../actions/NavigationActionsMethod'
class ForgetPassScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <TabBarComponent navigation={this.props.navigation} title="忘记密码
"/>
            </View>
        )
    }
};

export default ForgetPassScreen;