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


export default class editProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
                phoneNumber:'',
                name:'',
                city:'',
                age:'',
                address:'',
                profileImage:'',
              
        
        
        }
    }

  async  componentWillMount(){
   
       await this.setState({phoneNumber:this.props.route.params.phoneNumber})
        Axios.get(ip+'traveller/'+this.state.phoneNumber).then((resp) => {
      
        this.setState({name:resp.data.name})
        this.setState({city:resp.data.city})
        this.setState({address:resp.data.address})
        this.setState({age:resp.data.age})
        this.setState({profileImage:resp.data.profileImage})

      
      
      })
    }
      
      
    render() {

        const { navigation } = this.props;

        return (
            <View style={styles.container}>

                <Text style={styles.loginText}>Edit Profile</Text>
                <View style={styles.inpContainer}>
                    <Input containerStyle={styles.inp} placeholder="Name" leftIcon={{ type: 'material', name: 'person', color: '#BDBDBD' }}
                        onChangeText={(val) => this.setState({ name: val })}
                        value={this.state.name}
                    />
                    <Input containerStyle={styles.inp} placeholder="Address" leftIcon={{ type: 'material', name: 'person', color: '#BDBDBD' }}
                        onChangeText={(val) => this.setState({ address: val })}
                        value={this.state.address}
                    />
                    <Input containerStyle={styles.inp} placeholder="Age" leftIcon={{ type: 'material', name: 'person', color: '#BDBDBD' }}
                        onChangeText={(val) => this.setState({ age: val })}
                        value={this.state.age}
                    />

                    <Input containerStyle={styles.inp} placeholder="City" leftIcon={{ type: 'material', name: 'person', color: '#BDBDBD' }}
                        onChangeText={(val) => this.setState({ city: val })}
                        value={this.state.city}
                    />

                 


                </View>
                <Button
                    title="Update Profile"
                    containerStyle={styles.loginBtn}
                    buttonStyle={{ backgroundColor: '#343847', padding: 14 }}
                    onPress={() => {
                        this.update();  
                    }}
                />

                <Button
                    title="Delete User"
                    containerStyle={styles.loginBtn}
                    buttonStyle={{ backgroundColor: '#343847', padding: 14 }}
                    onPress={() => {
                        if (this.verifiyInputs()) {
                            navigation.push('Picture')
                        }
                        else {
                            ToastAndroid.show("Invalid  Check your Inputs", ToastAndroid.LONG);
                        }
                    }}
                />
                <View style={styles.linkContainer}>
                    <TouchableOpacity
                        onPress={() => { navigation.push('Profile') }}
                    >
                        {/* <Text style={styles.link}>Already Have an Account ?</Text> */}
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
            this.state.lisenceNumber == '' &&
            this.state.phoneNumber == '') { return false }
        else if ((this.state.phoneNumber.length < 13)) {
            return false
        }
        else {
            return true
        }

    }



    update(){
    
        let traveller = {
            name:this.state.name,
            age: this.state.age,
            address: this.state.address,
            city: this.state.city,  
        }
        




        Axios.put(ip+'traveller/update/'+this.state.phoneNumber, traveller).then((resp)=>{
            console.log("Record Updated ")
            ToastAndroid.show("Profile Updated", ToastAndroid.LONG);
          

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