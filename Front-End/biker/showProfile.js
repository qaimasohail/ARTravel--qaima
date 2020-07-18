import React, { Component } from 'react';
import {
  StyleSheet,

  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';

import { Block, Text, theme } from 'galio-framework';

import { Input, Button } from 'react-native-elements';

import Axios from 'axios';
import {ip} from './config';

export default class Profile extends Component {


  constructor() {
    super()
    this.state = {
      phoneNumber: '',
      userImage: '',

      user: {
        name: '',
        city: '',
        age: '',
        address: '',
        profileImage: '',

      }
    }
  }


async  componentWillMount() {
  await  this.setState({ phoneNumber: this.props.route.params.phoneNumber })
    console.log("dasdas")
    console.log(this.state.phoneNumber)

    Axios.get(ip+'traveller/'+this.state.phoneNumber  ).then((resp) => {


      this.setState({ user: resp.data })
      // this.setState({userImage: require(this.state.user.profileImage)})
      console.log(this.state.user.profileImage)
      console.log(resp.data)


    })

console.log(this.props)
 

this.props.navigation.addListener('focus', () => {
  // do something
  ToastAndroid.show("Screen changed ",ToastAndroid.LONG)
  
  Axios.get(ip+'traveller/'+this.state.phoneNumber  ).then((resp) => {


    this.setState({ user: resp.data })
    console.log(resp.data)


  })


});


  }


  



  render() {
      // console.log(this.state.phoneNumber)
      // console.log("jdbdsaajbdajk")
  
  


    const { navigation } = this.props;
    console.log("aaass")
    // console.log(this.props.route.params.profileImage)
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: ip+'uploads/'+this.state.user.profileImage}}/> 
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.state.user.name}</Text>
            <Text style={styles.info}>{this.state.user.city}</Text>

            <Block flex style={styles.options}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
                  <Block middle>
                    <Text bold size={12} style={{ marginBottom: 8 }}>36    </Text>
                    <Text muted size={16} onPress={() => this.props.navigation.navigate('Trips')}>Trips     </Text>
                  </Block>
                  <Block middle>
                    <Text bold size={12} style={{ marginBottom: 8 }}>    0    </Text>
                    <Text muted size={16} onPress={() => this.props.navigation.navigate('Trips')}>    Invitations    </Text>
                  </Block>
                  <Block middle>
                    <Text bold size={12} style={{ marginBottom: 8 }}>    2</Text>
                    <Text muted size={16} onPress={() => this.props.navigation.navigate('chat')}>    Messages</Text>
                  </Block>
                </Block>
                <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
                  <Text size={16}>Stories</Text>
                  <Text size={12} color={theme.COLORS.PRIMARY} onPress={() => this.props.navigation.navigate('Stories')}>View All</Text>
                </Block>
              </ScrollView>
            </Block>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
              navigation.push('editProfile', {
                phoneNumber: this.props.route.params.phoneNumber
              })
            }}>
              <Text style={styles.submitButtonText}>Edit Profile</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsButtonContainer} onPress={() => { navigation.push('settings') }}>
              <Text style={styles.submitButtonText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 30,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 20,
    color: "black",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    color: 'white',
    marginTop: 250,
    height: 45,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 5,
    backgroundColor: "#0D0101",
  },
  settingsButtonContainer: {
    color: 'white',
    marginTop: 20,
    height: 45,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 5,
    backgroundColor: "#0D0101",
  },
  submitButtonText: {
    fontSize: 16,
    alignItems: 'center',
    color: 'white'
  },
  options: {
    position: 'absolute',
    padding: 20,
    justifyContent: 'center',
    // marginHorizontal: theme.SIZES.BASE,
    marginTop: 100,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    // backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
});
