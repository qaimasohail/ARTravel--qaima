

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
import { Surface, Shape } from '@react-native-community/art';
import * as Progress from 'react-native-progress';
import Axios from 'axios';
import {ip} from './config';


export default class Verification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            verificationCode: '',
            verified: false,
            enteredCode: '',
            verifying: false,

        }
    }


    componentWillMount() {
        let phoneNumber = this.props.route.params.phoneNumber
        console.log(phoneNumber)
        firebase.auth().signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => this.setState({ verificationCode: confirmResult }))
            .catch(error => console.log(error));
    };







    render() {

        const { navigation } = this.props;
        let phoneNumber = this.props.route.params.number

        return (
            <View style={styles.container}>

                <Text style={styles.loginText}>Verify Phone Number</Text>
                <View style={styles.inpContainer}>
                    <Input containerStyle={styles.inp} placeholder="Enter Verification Code"
                        onChangeText={(val) => this.setState({ enteredCode: val })}
                        value={this.state.enteredCode}
                    />
                </View>

                <Button
                    title="VERIFY"
                    containerStyle={styles.loginBtn}
                    buttonStyle={{ backgroundColor: '#343847', padding: 14 }}
                    onPress={() => {
                        // this.setState({verifying:true})
                        // this.verifiyNumber(this.state.enteredCode)
                        let phoneNumber= ""
                        // if (this.state.verified)
                        phoneNumber = this.props.route.params.phoneNumber
                         

                        Axios.get(ip+'traveller/' + phoneNumber).then((resp) => {

                            let travllerExist = resp.data;

                            if (travllerExist == "No traveller Exist") {
                                navigation.push('Bitmoji', {
                                    phoneNumber: this.props.route.params.phoneNumber
                                })
                            }
                            else {
                                ToastAndroid.show("User Exist", ToastAndroid.LONG)
                                navigation.push('Main',{
                                    phoneNumber: this.props.route.params.phoneNumber,
                                    name:this.props.route.params.name,
                                    city:this.props.route.params.city,
                                    bitmojiPath: ip+this.props.route.params.bitmojiPath,
                                    profileImage: this.props.route.params.profileImage
                                    
                                })

                            }


                        })
                        // navigation.push('Bitmoji',{
                        // number:this.props.route.params.number
                        // })
                    }}
                />



            </View>

        )
    }


    verifiyNumber(phoneNumber) {

        this.state.verificationCode.confirm(phoneNumber).then((user) => {
            this.setState({ verified: true })
        })

    }



}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FDFDFF',
        padding: 40,
        paddingTop: 60
    },
    loginText: {
        marginLeft: 10,
        fontSize: 30
    },
    inpContainer: {
        marginTop: 40
    },
    inp: {
        marginBottom: 20
    },
    loginBtn: {
        marginTop: 20,
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