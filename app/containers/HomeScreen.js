import React,{Component} from 'react';
import {StyleSheet, Text, View,TextInput,TouchableWithoutFeedback,Image} from 'react-native';
import Storage from 'react-native-storage';
import {height, width,newSize} from '../utils/UtilityValue'
import { NavigationActions } from 'react-navigation';
import navigationGo from '../actions/NavigationActionsMethod'
import TopBarComponent from '../components/homeScreenComponent/TopBarComponent'
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
               <TopBarComponent title="智能锁"/>
                <View style={{position:'absolute',top:0,zIndex:8}}>
                    <Image source={require('../images/bg.png')}/>
                </View>
            </View>
        )
    }


}

const styles=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
})

export default HomeScreen;