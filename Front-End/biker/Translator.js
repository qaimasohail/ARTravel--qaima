import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight, Text, Picker, Image, StatusBar } from 'react-native';
import Languages from './languages.json';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import Icon from "react-native-vector-icons/Ionicons";
import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';



export default class Translator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languageFrom: "",
            languageTo: "",
            languageCode: 'en',
            inputText: "",
            outputText: "",
            submit: false,
            micOn: false, //added
        };
        this._buttonClick = this._buttonClick.bind(this); 

    }

    handleTranslate = () => {
        this.setState({ submit: true })
        const translator = TranslatorFactory.createTranslator();
        translator.translate(this.state.inputText).then(translated => {
            // alert(translated)
            Tts.getInitStatus().then(() => {
                Tts.speak(translated);
            });
            Tts.stop();
        });
    }

    async _buttonClick(){
        try{
            //More Locales will be available upon release.
            var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.ENGLISH);
            const translator = TranslatorFactory.createTranslator();
          
            await this.setState({inputText: spokenText});
            await translator.translate(this.state.inputText,'ur').then(translated=>{
                 Tts.speak(translated)
            })
            // await this.setState({submit: true});
            await ToastAndroid.show(this.state.inputText , ToastAndroid.LONG);
           
            
        }catch(error){
            switch(error){
                case SpeechAndroid.E_VOICE_CANCELLED:
                    ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
                    break;
                case SpeechAndroid.E_NO_MATCH:
                    ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
                    break;
                case SpeechAndroid.E_SERVER_ERROR:
                    ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
                    break;
                /*And more errors that will be documented on Docs upon release*/
            }
        }
    }

    render() {
        TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyB_UY8Mg65jm8F_BHOarN0wQAf1pFlqqtM', this.state.languageCode);
    
        return (
            <View style={styles.container}>
                <View style={styles.input}>
                    <TextInput
                        style={{ flex: 1, height: 80}}
                        placeholder="Enter Text"
                        underlineColorAndroid="transparent"
                        onChangeText={inputText => this.setState({ inputText })}
                        value={this.state.inputText}
                    />
                    <TouchableOpacity onPress={this._buttonClick}>
                        {this.state.micOn ? <Icon size={30} name="md-mic" style={styles.micStyle} /> : <Icon size={30} name="md-mic-off" style={styles.micStyle} />}
                    </TouchableOpacity>
                </View>

                <Picker
                    selectedValue={this.state.languageTo}
                    onValueChange={lang => this.setState({ languageTo: lang, languageCode: lang })}
                >
                    {Object.keys(Languages).map(key => (
                        <Picker.Item label={Languages[key]} value={key} />
                    ))}
                </Picker>

                <View style={styles.output}>

                    {this.state.submit && <PowerTranslator text={this.state.inputText} />}
                </View>
                <TouchableOpacity
                    style={styles.submitButton} 
                    onPress={() => {
                        this.setState({ submit: true })
                      
                    }}
                >
                    <Text style={styles.submitButtonText}> Translate </Text>
                </TouchableOpacity>

                <Image source={require('./res/trann.jpg')} 
                style={{ width: 420, height: 460}}/>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 53
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#000',
        // height: 40,
        borderRadius: 5,
        margin: 10
    },
    output: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#000',
        borderRadius: 5,
        margin: 10,
        height: 80,
    },
    submitButton: {
        marginTop: 30,
        backgroundColor: '#0D0101',
        padding: 10,
        margin: 15,
        borderRadius: 5,
        height: 50,
    },
    submitButtonText: {
        marginLeft: 120,
        fontSize: 22,
        color: 'white'
    },
    micStyle: {
        padding: 10,
        margin: 5,
        alignItems: 'center'
    }
})