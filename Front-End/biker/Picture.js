import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    StyleSheet,
    Platform
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { ToastAndroid } from 'react-native';
import Axios from 'axios';
import {ip} from './config';



export default class Picture extends Component {


    constructor(props) {
        super(props)
        this.state = {
            selectedImageUri: "./assets/Images/blank-profile-picture.png",
            hasSelectedImage: false,
            imageName: "blank-profile-picture.png",
            selectedImageData: {},
        }
    }



    componentWillMount() {
        console.log(this.props)
    }


    chooseImage = () => {
        let options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                alert("Image Selection Cancelled")
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({ selectedImageUri: response.data })
                this.setState({ selectedImageData: response })
                this.setState({ hasSelectedImage: true })
                console.log(this.state.selectedImageData)

                ToastAndroid.show(response.type, ToastAndroid.LONG)

            }








        });
    }



    render() {

        const { navigation } = this.props;

        return (
            <View style={styles.container}>

                {this.state.hasSelectedImage &&

                    <View style={styles.profilePicContainer}>
                        <Image
                            style={styles.profilePic}
                            source={{ uri: 'data:image/jpeg;base64,' + this.state.selectedImageUri }}
                        />
                    </View>

                }

                {!this.state.hasSelectedImage &&

                    <View style={styles.profilePicContainer}>
                        <Image
                            style={styles.profilePic}
                            source={require('./assets/Images/blank-profile-picture.png')}
                        />
                    </View>

                }


                {!this.state.hasSelectedImage &&
                    <Button
                        title="SELECT PHOTO"
                        containerStyle={styles.loginBtn}
                        buttonStyle={{ backgroundColor: '#343847', padding: 14, }}
                        onPress={() => {
                            this.chooseImage()
                        }}
                    />
                }

                {this.state.hasSelectedImage &&
                    <Button
                        // let ip="http://192.168.1.10:3000/images/"
                        title="CONFIRM PICTURE"
                        containerStyle={styles.loginBtn}
                        buttonStyle={{ backgroundColor: '#343847', padding: 14, }}
                        onPress={() => {
                            ToastAndroid.show('Picture Updated', ToastAndroid.SHORT);

                            console.log(this.state.selectedImageData)


                            const data = new FormData();
                            data.append('name', 'avatar');
                            data.append('fileData', {
                                uri: this.state.selectedImageData.uri,
                                type: this.state.selectedImageData.type,
                                name: this.state.selectedImageData.fileName
                            });
                            const config = {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'multipart/form-data',
                                },
                                body: data,
                            };
                            fetch(ip+"traveller/upload", config)
                                .then((checkStatusAndGetJSONResponse) => {
                                    console.log(checkStatusAndGetJSONResponse);

                                    console.log(this.props.route.params.phoneNumber)

                                    navigation.push('Profile', {
                                        name: this.props.route.params.name,
                                        city: this.props.route.params.city,
                                        age: this.props.route.params.age,
                                        email: this.props.route.params.email,
                                        address: this.props.route.params.address,
                                        profileImage: this.state.selectedImageData.fileName,
                                        selectedImage: this.state.hasSelectedImage,
                                        phoneNumber: this.props.route.params.phoneNumber,
                                        bitmojiPath: this.props.route.params.bitmojiPath




                                        // bitmojiPath: ip+ this.props.route.params.bitmojiName

                                    })

                                })
                                .catch((err) => {
                                    console.log(err)

                                }




                                );




                        }}
                    />
                }





            </View>

        )
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
        fontSize: 30,
        textAlign: "center"

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
    },
    profilePic: {
        width: 250,
        height: 250,
        borderRadius: 125,

    },
    profilePicContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        marginTop: 30,
        flex: 1
    }

});