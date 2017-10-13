import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,AsyncStorage} from 'react-native';
import {fetchJSON} from '../utils/NetUtils'
import {height, width,newSize} from '../utils/UtilityValue'
import TabBarComponent from '../components/commonComponent/TabBarComponent'
import navigationGo from '../actions/NavigationActionsMethod'
import TopBarComponent from "../components/homeScreenComponent/TopBarComponent";
class iaryScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <TopBarComponent title="日志记录"/>
            </View>
        )
    }
};
const styles = StyleSheet.create({
    container:{
      flex:1
    },
});
export default iaryScreen;