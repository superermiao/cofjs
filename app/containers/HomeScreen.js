import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback} from 'react-native';
import Storage from 'react-native-storage';
import {height, width,newSize} from '../utils/UtilityValue'
import { NavigationActions } from 'react-navigation';
import navigationGo from '../actions/NavigationActionsMethod'
import { connect } from 'react-redux';
class HomeScreen extends Component{
    constructor(props) {
        super(props);
    }
    componentWillMount(){

    }
    componentDidMount () {

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
                    <Text>经纬物联</Text>
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
})

export default HomeScreen;