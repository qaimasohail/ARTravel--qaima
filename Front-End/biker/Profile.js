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
import Axios from 'axios';
import {ip} from './config';


export default class SignupScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            age: "",
            email: "",
            phoneNumber: "",
            city: "",
            address: "",
            selectedImage: false
        }
    }

    
    componentWillMount(){
        this.setState({selectedImage: this.props.route.params.selectedImage})

        if(this.props.route.params.name != undefined || this.props.route.params.city != undefined    ||    this.props.route.params.address != undefined || this.props.route.params.email != undefined ||this.props.route.params.age != undefined)
        {
            this.setState({name:this.props.route.params.name})
            this.setState({age:this.props.route.params.age})
            this.setState({address:this.props.route.params.address})
            this.setState({city:this.props.route.params.city})
            this.setState({email:this.props.route.params.email})
        }




    }



    render() {

        console.log(this.props)
        const { navigation } = this.props;

        return (
            <View style={styles.container}>

                <Text style={styles.loginText}>Profile</Text>
                <View style={styles.inpContainer}>
                    <Input containerStyle={styles.inp} placeholder="Name" leftIcon={{ type: 'material', name: 'person', color: '#BDBDBD' }}
                        onChangeText={(val) => this.setState({ name: val })}
                        value={this.state.name}
                    />
                    <Input containerStyle={styles.inp} placeholder="Email" leftIcon={{ type: 'material', name: 'person', color: '#BDBDBD' }}
                        onChangeText={(val) => this.setState({ email: val })}
                        value={this.state.email}
                    />
                    <Input containerStyle={styles.inp} placeholder="Age" leftIcon={{ type: 'material', name: 'person', color: '#BDBDBD' }}
                        onChangeText={(val) => this.setState({ age: val })}
                        value={this.state.age}
                    />

                    <Input containerStyle={styles.inp} placeholder="City" leftIcon={{ type: 'material', name: 'person', color: '#BDBDBD' }}
                        onChangeText={(val) => this.setState({ city: val })}
                        value={this.state.city}
                    />

                    <Input containerStyle={styles.inp} placeholder="Address" leftIcon={{ type: 'material', name: 'person', color: '#BDBDBD' }}
                        onChangeText={(val) => this.setState({ address: val })}
                        value={this.state.address}
                    />


                 


                </View>
                <Button
                    
                    title="Upload Picture"
                    containerStyle={styles.loginBtn}
                    buttonStyle={{ backgroundColor: '#343847', padding: 14 }}
                    onPress={() => {
                            let ip =  ip+"images/"
                            navigation.push('Picture',{
                                profileImage: this.props.route.params.profileImage,
                                phoneNumber:this.props.route.params.phoneNumber,
                                bitmojiPath: this.props.route.params.bitmojiPath,
                                name: this.state.name,
                                age: this.state.age,
                                email: this.state.email,
                                address: this.state.address,
                                city: this.state.city,

                            
                            
                        })
                        
                    }}
                />

                    {this.state.selectedImage && 
                        <Button
                        title="Create Profile"
                        containerStyle={styles.loginBtn}
                        buttonStyle={{ backgroundColor: '#343847', padding: 14 }}
                        onPress={() => {
    
    
    
    
    
    
                            // if (this.verifiyInputs()) {
                                // let ip =  ip+"images/"
    
                                let traveller = {
                                    name: this.props.route.params.name,
                                    age: this.props.route.params.age,
                                    email: this.props.route.params.email,
                                    address: this.props.route.params.address,
                                    city: this.props.route.params.city,
                                    phoneNumber:this.props.route.params.phoneNumber,
                                    bitmojiPath: this.props.route.params.bitmojiPath,
                                    profileImage: this.props.route.params.profileImage    
                                }
                                console.log(traveller)
    
                            
                            Axios.post(ip+'traveller/addtraveller', traveller).then((resp)=>{
                                console.log("Record   Added ")
                                ToastAndroid.show("Profile Created", ToastAndroid.LONG);
                                navigation.push('Main',{
                                    name:this.props.route.params.name,
                                    city:this.props.route.params.city,
                                    phoneNumber:this.props.route.params.phoneNumber,
                                    bitmojiPath: this.props.route.params.bitmojiName
                                    // bitmojiPath: ip+ this.props.route.params.bitmojiName
                                    
                                })
        
                            })
                     
    
                            // }
                            // else {
                            //     ToastAndroid.show("Invalid  Check your Inputs", ToastAndroid.LONG);
                            // }
                        }}
                    />
                    }
            

                <View style={styles.linkContainer}>
                    <TouchableOpacity
                        onPress={() => { navigation.push('Login') }}
                    >
                        <Text style={styles.link}>Already Have an Account ?</Text>
                    </TouchableOpacity>
                </View>



            </View>

        )
    }

    verifiyInputs() {

        if (
            this.state.name == '' &&
            this.state.address == '' &&
            this.state.city == '' &&
            this.state.phoneNumber == '') { return false}
        else if ((this.props.route.params.number.length < 13)) {
            console.log(this.props.route.params.number)
            return false
        }
        else {
            return true
        }

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
        fontSize: 40
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