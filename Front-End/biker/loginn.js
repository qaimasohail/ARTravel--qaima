import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    StyleSheet,
    Platform,
    ToastAndroid
} from 'react-native';

import { TextInput } from 'react-native-paper';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';



export default class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            phoneNumberInp: ''
        }
        this.checkInput = this.checkInput.bind(this)
    }


    render() {

        const { navigation } = this.props;

        return (
            <View style={styles.container}>

                
                <Image source={require('./res/logo.png')} 
                style={{ width: 300, height: 200}}/>
                <View style={styles.inpContainer}>
                    <Input style={styles.inp} placeholder="Phone Number" leftIcon={{ type: 'material', name: 'person', color: '#BDBDBD' }}
                        onChangeText={val => this.setState({phoneNumberInp:val})}
                        
                    />
                </View>
                <Button
                    title="LOGIN"
                    containerStyle={styles.loginBtn}
                    buttonStyle={{ backgroundColor: '#343847', padding: 14 }}
                    onPress={() => {
                        if (this.checkInput(this.state.phoneNumberInp))

                     
                            navigation.push('Verification',{
                                phoneNumber:this.state.phoneNumberInp
                            })
                        else
                            ToastAndroid.show("Invalid Phone Number", ToastAndroid.SHORT)
                    }}
                />
                <View style={styles.linkContainer}>
                    <TouchableOpacity
                        onPress={() => { navigation.push('Profile') }}
                    >
                        {/* <Text style={styles.link}>Create an Account</Text> */}
                    </TouchableOpacity>
                </View>


            </View>

        )
    }

    checkInput(val) {
        if (val === '' && val.length < 13)
            return false
        else
            return true
    }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FDFDFF',
        justifyContent: 'center',
        padding: 40,
    },
    loginText: {
        marginLeft: 10,
        fontSize: 40
    },
    inpContainer: {
        marginTop: 40
    },
    inp: {
        marginTop: 20
    },
    loginBtn: {
        justifyContent: 'center',
        marginTop: 40,
    },
    linkContainer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "center",
        color: "#69718F",
    },
    link: {
        fontSize: 16,
        textAlign: "center"
    }

});