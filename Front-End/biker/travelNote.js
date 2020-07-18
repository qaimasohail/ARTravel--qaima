import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import Note from './Note';

export default class App extends React.Component {

    state = {
        noteArray: [],
        noteText: '',
    }

  render() {

      Let: notes = this.state.noteArray.map((val, key) => {
          return <Note key={key} keyval={key} val={val} deleteMethod={ ()=> this.deleteNote(key)} />
      });

      return (

        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}> Travel  Notes </Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
                {notes}
            </ScrollView>

            <View style={styles.footer}>

                <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButtom}>
                    <Text style={styles.addButtomText}>+</Text>
                </TouchableOpacity>

                <TextInput style={styles.textInput}
                  onChangeText={(noteText) => this.setState({noteText})} value={this.state.noteText}
                  placeholder='Type here..' placeholderTextColor='white' underlineColor='transparent'>
                </TextInput>

            </View>

        </View>
      );
    }
    addNote(){
        if(this.state.noteText){
          var data = new Date();
          
          if(data.getMonth() <= 9){
              var sep = "/0";
          }

          this.state.noteArray.push( {date: data.getDate() + sep + data.getMonth() + "/" + data.getFullYear(), 'note': this.state.noteText} );
          this.setState({ 'noteArray': this.state.noteArray})
          this.setState({ 'noteText': ''  });
        }
    }
    deleteNote(key){
      this.state.noteArray.splice(key, 1);
      this.setState({'noteArray': this.state.noteArray});
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText:{
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 17,
    padding: 26,
  },
  scrollContainer:{
    flex: 1,
    marginBottom: 100,
  },
  footer:{
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addButtom:{
    backgroundColor: '#fff',
    width: 90,
    height: 90,
    borderRadius: 50,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    marginBottom: -45,
    zIndex: 10,
  },
  addButtomText:{
    color: 'black',
    fontSize: 24,
  },
  textInput:{
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    paddingTop: 46,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#010b65',
  },
});
