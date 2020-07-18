import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    StyleSheet,
    Platform,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';

// const arr = [require('./res/bitmoji/m1.png'), require('./res/bitmoji/f1.jpg'),require('./res/bitmoji/f2.png')];


export default class Bitmoji extends Component{

    constructor(props) {
        super(props);
     
        this.state = {
            // bitmoji : require('./res/bitmoji/m1.png'),
            image : [require('./res/bitmoji/f1.jpeg'),require('./res/bitmoji/m1.jpeg'),require('./res/bitmoji/f2.jpeg'),require('./res/bitmoji/m2.jpeg'),require('./res/bitmoji/f3.jpeg')
            ,require('./res/bitmoji/m3.jpeg'),require('./res/bitmoji/f4.jpeg'),require('./res/bitmoji/m4.jpeg'),require('./res/bitmoji/f5.jpeg')
            ,require('./res/bitmoji/m5.jpeg'),require('./res/bitmoji/f6.jpeg'),require('./res/bitmoji/m6.jpeg'),require('./res/bitmoji/f7.jpeg'),require('./res/bitmoji/m7.jpeg'),require('./res/bitmoji/f8.jpeg'),require('./res/bitmoji/m8.jpeg'),require('./res/bitmoji/f9.jpeg'),require('./res/bitmoji/m9.jpeg')
            ,require('./res/bitmoji/f10.jpeg'),require('./res/bitmoji/m10.jpeg'),require('./res/bitmoji/f11.jpeg'),require('./res/bitmoji/f12.jpeg')],


            names_images : ['f1.jpeg','m1.jpeg','f2.jpeg','m2.jpeg','f3.jpeg'
            ,'m3.jpeg','f4.jpeg','m4.jpeg','f5.jpeg'
            ,'m5.jpeg','f6.jpeg','m6.jpeg','f7.jpeg','m7.jpeg','f8.jpeg','m8.jpeg','f9.jpeg','m9.jpeg'
            ,'m10.jpeg','f10.jpeg','f11.jpeg','f12.jpeg'],


            selectedIndex: 0
        }
    }

    _ToggleNext = () => {
        if(this.state.selectedIndex == this.state.image.length - 1)
            return;

        this.setState(prevState => ({
            selectedIndex: prevState.selectedIndex + 1
        }))
    }

    _TogglePrev = () => {
        if(this.state.selectedIndex == 0)
         return;

        this.setState(prevState => ({
            selectedIndex: prevState.selectedIndex - 1
        }))
    }
    // ComponentWillMount(){
    //     let path = require(this.state.image[2])
    //     this.setState({bitmoji : path})
    // }

    
    render() {

        const { navigation } = this.props;
        console.log(this.state.names_images[this.state.selectedIndex])
    
    return  <View style= {styles.container}>
         <Text style={styles.name}>Select Your Avatar</Text>
         <View style = {styles.buttons}>
         <TouchableOpacity style={styles.BackButton} onPress={this._TogglePrev}>
                <Text style={styles.ButtonText}>Previous</Text>
         </TouchableOpacity>
         <TouchableOpacity  style={styles.NextButton} onPress={this._ToggleNext}>
                <Text style={styles.ButtonText}>Next</Text>
         </TouchableOpacity>
         </View>
         <Image style= {styles.pic} source={this.state.image[this.state.selectedIndex]}/>

        <View style = {styles.selectButton}>
         <TouchableOpacity style={styles.buttonContainer} onPress={() => { navigation.push('Profile',{
           bitmojiPath: this.state.names_images[this.state.selectedIndex],
           phoneNumber:this.props.route.params.phoneNumber
           
         }) }}>
          <Text style={styles.ButtonText}>Select</Text>
                
          </TouchableOpacity> 
        </View>
         
         
     </View>
    
    }
}


       
    

const styles = StyleSheet.create({
    header:{
        backgroundColor: "black",
        height:200,
      },
    container: {
        backgroundColor: "#F7F5F5",
        paddingTop: 1,
        height: 1500
      
    },
    pic: {
        marginTop: 1,
        justifyContent: 'center',
        height:530,
        width: 400,
    },
    name:{
        fontSize:35,
        color: 'black',
        fontWeight:'600',
        textAlign: "center"
      },
      BackButton: {
        // marginTop: 30,
        backgroundColor: '#0D0101',
        padding: 10,
        margin: 20,
        marginLeft: 10,
        borderRadius: 5,
        height: 50,
        width: 110,
    },
    NextButton: {
        // marginTop: 30,
        backgroundColor: '#0D0101',
        padding: 10,
        margin: 20,
        marginLeft: 130,
        borderRadius: 5,
        height: 50,
        width: 110,
    },
    ButtonText: {
        // marginLeft: 120,
        fontSize: 22,
        textAlign: 'center',
        color: 'white'
    },
    buttonContainer: {
        color: 'white',
        marginTop:40,
        height:45,
        justifyContent: 'center',
        flexDirection: 'row',   
        alignItems: 'center',
        width:150,
        borderRadius:5,
        backgroundColor: "#0D0101",
      },
    buttons: {
        flexDirection: 'row'
    },
    selectButton: {
        justifyContent: 'center',
        flexDirection: 'row'
    }
});