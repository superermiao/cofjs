import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,AsyncStorage} from 'react-native';
import  {connect} from 'react-redux';
import {fetchJSON} from '../utils/NetUtils'
import {height, width,newSize} from '../utils/UtilityValue'

import TopBarComponent from "../components/homeScreenComponent/TopBarComponent";
class ProfileScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <TopBarComponent title="个人中心"/>
                <Text>用户:{this.props.tel}</Text>
            </View>
        )
    }
};
const styles = StyleSheet.create({
    container:{
        flex:1
    },
});
function select(state) {
    return {
        tel:state.store.tel
    }
}
export default connect(select)(ProfileScreen) ;