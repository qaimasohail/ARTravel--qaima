import React, { Component } from "react";

import styles from "./app/components/Header/styles";
import 'react-native-gesture-handler';
import Verification from "./Verification";
import maps from "./NewComp";
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import chat from "./chat";
import FriendView from './FriendView';
import Loginn from './loginn';
import TripDetail from "./TripDetail";
import Profile from './Profile';
import Picture from './Picture';
import Main from './Main';
import showProfile from './showProfile';
import editProfile from './editProfile';
import settings from './settings';
import Bitmoji from './bitmoji';
import TravelNotes from './travelNote';
import Forecast from './Forecast';
import Stories from './stories';
import Trips from './Trips';

const appId = "1047121222092614"
const Stack = createStackNavigator();

export default function SignIn() {

    return (
        <NavigationContainer >

            <Stack.Navigator  initialRouteName="Loginn"
                screenOptions={{
                    headerShown: false,
                    
                }}>
                <Stack.Screen name="Verification" component={Verification} />
                {/* <Stack.Screen name="Login" component={Login} /> */}
                <Stack.Screen name="chat" component={chat} />
                <Stack.Screen name="FriendView" component={FriendView} />
                <Stack.Screen name="Loginn" component={Loginn} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Picture" component={Picture} />
                <Stack.Screen name="TripDetail" component={TripDetail} />
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Trips" component={Trips} />
                <Stack.Screen name="showProfile" component={showProfile} />
                <Stack.Screen name="editProfile" component={editProfile} />
                <Stack.Screen name="settings" component={settings} />
                <Stack.Screen name="Travel Notes" component={TravelNotes} />
                <Stack.Screen name="Bitmoji" component={Bitmoji} />
                <Stack.Screen name="Forecast" component={Forecast} />
                <Stack.Screen name="Stories" component={Stories} options= {{gestureEnabled: true,
                    gestureDirection: "horizontal",
                    ...TransitionPresets.SlideFromRightIOS}}/>
                
                

            </Stack.Navigator>
        </NavigationContainer>
    

    
    );

    
    
}



// function Login({ navigation }) {
    
// // validateEmail = email => {
// //     var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
// //     return re.test(email);
// //     };
//     return (
//         <View style={styles.loginScreenContainer}>
//             <View style={styles.loginFormView}>
//                 <Text style={styles.logoText}>ARTravel</Text>
//                 <TextInput placeholder="Enter Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} 
//                 // onChangeText={(userName) => {    this.setState({userName},()=>{
//                 //     if (!this.validateEmail(this.state.userName)) {
//                 //     alert(‘Invalid email.’)
//                 //     }
//                     />
//                 <TextInput placeholder="Enter Number" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
//                 <Button
//                     buttonStyle={styles.loginButton}
//                     title="Login"
//                     onPress={() => navigation.navigate('Verification')}

//                 />

//             </View>
//         </View>
//     );
// }


