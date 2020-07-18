import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import SignIn from './SignIn'
import Main from './Main'

import Bitmoji from './bitmoji'
import TravelNote from './travelNote'

import NewComp from './NewComp'

import Forecast from './Forecast'

import { NavigationContainer } from '@react-navigation/native';


// import SplashScreen from './SplashScreen'
// import SplashScreen from 'react-native-splash-screen'

export default class App extends React.Component {
  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    return (
      <SignIn/>

      // <Forecast/>
        // <Main />
    );
  }

  constructor(props) {
    super(props);

    this.state = { isLoading: true }
  }

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        4000
      )
    );
  }

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }
}

class SplashScreen extends React.Component {
  render() {
    const viewStyles = [
      styles.container,
      { backgroundColor: 'black' }
    ];
    const textStyles = {
      color: 'white',
      fontSize: 50,
      fontWeight: 'bold'
    };

    return (
      <View style={viewStyles}>
        <Image source={require('./res/tr.png')} style={{ width: 200, height: 200 }} />
        <Text style={textStyles}>
          ARTravel
        </Text>
      </View>
    );
  }
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
