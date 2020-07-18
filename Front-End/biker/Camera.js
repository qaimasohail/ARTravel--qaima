//
import React from 'react';
import { View, Text, StyleSheet, Dimensions, ToastAndroid, Alert } from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';


export default class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };

  }





  render() {
    return (
      
      <View style={{ flex: 1 }}>
          <RNCamera
          style={{flex:1,justifyContent:"flex-end",alignItems:"center"}}
          
          />


      </View>
    )
};



}
