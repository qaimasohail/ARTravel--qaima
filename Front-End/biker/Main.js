import  React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Switch,
  Button,
  Image, Icon, TouchableOpacity
} from 'react-native';
import Axios from 'axios'
import SafeAreaView from 'react-native-safe-area-view';
import NewComp from './NewComp';
import Translator from './Translator';
import CameraComp from './Camera';
import Trips from './Trips';
import chat from './chat';
import Friends from './Friends';
import Profile from './showProfile';
import settings from './settings';
import Loginn from './loginn';
import TravelNotes from './travelNote';
import Forecast from './Forecast'
import Stories from './stories';
// import weather from './weather';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { NavigationContainer, NavigationAction} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Send } from 'react-native-gifted-chat';
import {ip} from './config';





// function Chat({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Home')}
//         title="This is Chatbox"
//       />
//     </View>
//   );
// }


function CustomDrawerContent(props) {



  console.log("asdsadsa")



  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1, margin: 20, flexDirection: 'row' }}>
        <Image
          source={require('./res/aa.jpeg')}
          style={{ width: 60, height: 60, borderRadius: 28 }}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Affan Arshad</Text>
          <Text style={{ fontSize: 12 }}>Traveller</Text>
        </View>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}



// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Main({ route }) {
  

  const [name, setName] = useState('');


  useEffect(() => {
    // Update the document title using the browser API



  });



  Axios.get(ip+'traveller/' + route.params.name).then((resp) => {
    setName(resp.data.name)
})

  // console.log(this.props.route.params.profileImage)




  return (

    

    
    // <NavigationContainer>
    <Drawer.Navigator initialRouteName="NewComp" 
    

    

    drawerStyle={{
      backgroundColor: '#F7F5F5',
      activeBackgroundColor: 'black',
      width: 300
    }} 
    
    sceneContainerStyle= {{
      backgroundColor: 'F7F5F5',
    }}

    

    

    
    
      drawerContent={props => < CustomDrawerContent {...props} name={name} />}
    >

      
      <Drawer.Screen name="Home" component={NewComp}  initialParams={{ bitmojiPath: route.params.bitmojiPath ,phoneNumber: route.params.phoneNumber}} />
      <Drawer.Screen name="Profile" component={Profile} initialParams={{ name: route.params.name, city: route.params.city, phoneNumber: route.params.phoneNumber, profileImage: route.params.profileImage }} />
      <Drawer.Screen name="Travel Notes" component={TravelNotes} />
      <Drawer.Screen name="Trips" component={Trips} />
      <Drawer.Screen name="Translator" component={Translator} />
      <Drawer.Screen name="ARView" component={CameraComp} />
      <Drawer.Screen name="Friends" component={Friends} />
      <Drawer.Screen name="Settings" component={settings} />
      <Drawer.Screen name="Sign Out" component={Loginn} />
      

    </Drawer.Navigator>

    // </NavigationContainer>
  );
}



