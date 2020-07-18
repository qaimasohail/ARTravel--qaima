import * as React from 'react';
import { Text, View, SectionList, Image, Alert, StyleSheet, PermissionsAndroid, FlatList } from 'react-native';
import chat from './chat';
import FriendView from './FriendView';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import { Button } from 'react-native-elements';
import { Header, Overlay } from 'react-native-elements';
import { List, ListItem } from "react-native-elements";

import Contacts from 'react-native-contacts';
import Axios from 'axios';
import { ip } from './config'






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5F5"
  },
  map: {
    flex: 1,
    width: "100%"
  },
  panelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 500,
    left: 0,
    right: 0,
  },
  panel: {
    height: 700,
    padding: 20,
    backgroundColor: '#ffffff',

  },
  header: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 500
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  sheetHeaderText: {
    fontSize: 22,

  }
})


export default class Friends extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // contacts: [

      // {
      //   name: "Usama",
      //   number:"123",
      //   address:"Mohala"
      // },
      // {
      //   name: "Affan",
      //   number:"123",
      //   address:"Islamabad"
      // },
      // {
      //   name: "Ali",
      //   number:"123",
      //   address:"Karachi"
      // },
      // {
      //   name: "Bilal",
      //   number:"123",
      //   address:"Rawalpindi"
      // },
      // {
      //   name: "David",
      //   number:"123",
      //   address:"Amsterdam"
      // },
      // {
      //   name: "Basheer",
      //   number:"123",
      //   address:"Chungi"
      // },
      // ],
      filteredList: [],
      search: "",
      selectedUser: {
        name: '',
        address: '',
        number: '',
      },
      contactss: [],
      contactsFetched: false,
      filteredContacts: [],
      travellers: [],
    }

    this.GetSectionListItem = this.GetSectionListItem.bind(this)
    this.BottomSheetRef = React.createRef();

  }
  GetSectionListItem = item => {
    this.props.navigation.navigate("FriendView")

    // Alert.alert(item);
  };

  // componentWillMount() {
  //   this.setState({ filteredList: this.state.contacts })
  // }


  componentDidMount() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Please accept bare mortal'
      }
    ).then(() => {
      Contacts.getAll((err, contactss) => {
        if (err === 'denied') {
          // error
          console.log(err)
        }
        else {
          this.setState({ contactss })
          console.log(contactss)



          let tempArr = []

          Axios.get(ip + "traveller/viewall").then((resp) => {
            this.setState({ travellers: resp.data })
            console.log(this.state.travellers)


            for (let index = 0; index < this.state.contactss.length; index++) {

              console.log("asdsa")

                if (this.state.contactss[index].phoneNumbers[0].number != undefined) {

                  for (let j = 0; j < this.state.travellers.length; j++) {
                    console.log(this.state.contactss[index].phoneNumbers[0].number)
                    if(this.state.contactss[index].phoneNumbers[0].number == this.state.travellers[j].phoneNumber){

                    
                    tempArr.push(this.state.travellers[j])
                    // console.log(this.state.travellers[j])
                    }
                  }
                  
                }

                this.setState({ contactsFetched: true })
                this.setState({ filteredContacts: tempArr })
                // console.log(tempArr)

            }
            // this.setState({ contactsFetched: true })


            
         
            console.log(this.state.filteredContacts)
            console.log(tempArr)

          })

        }

      })
    })
  }
  // if (Platform.OS === 'android') {
  //     PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //         {
  //             title: 'Contacts',
  //             message: ' This app would like to see your contacts'
  //         }
  //     ).then(() => {
  //         this.getList();
  //     })
  // } else if(Platform.OS === 'ios') {
  //     this.getList();
  // }



  // getList = () => {
  //     Contacts.getAll((err, contactss) => {
  //         if (err === 'denied') {
  //             console.log("cannot access");
  //         } else {
  //             this.setState({ contactss });
  //             console.log(contactss);
  //         }
  //     })
  // }





  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{ height: 4, width: 330, marginLeft: 30, backgroundColor: '#F7F5F5' }} />
    );
  };

  render() {

    const { navigation } = this.props
    
    const RenderInner = ({ name, address, number }) => {
      return <View style={styles.panel}>
        <Image
          style={{ width: 60, height: 60 }}
          source={require('./res/bitmoji/f7.jpeg')}
        />
        <Text>Ayesha</Text>
        <Text>Islamabad</Text>
        <Text>{address}</Text>
        <Text></Text>
        <Text></Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("chat")}>

          <Text>Send message</Text>
        </TouchableOpacity>
      </View>
    }



    return (
      <View style={styles.container} >
        <SearchBar platform='ios'
          placeholder="Type Here.."
          onChangeText={(val) => {
            this.filterContacts()
            this.setState({ search: val })

          }}
          value={this.state.search}
        />


        {this.state.contactsFetched &&

          //   <SectionList
          //   ItemSeparatorComponent={this.FlatListItemSeparator}
          //   sections={[
          //     { title: '', data: this.state.contactss.displayName },
          //   ]}
          //   renderItem={({ item }) => <TouchableOpacity onPress={() => {
          //     this.setState({selectedUser:item})
          //     this.BottomSheetRef.current.snapTo(0)
          //   }}>
          //     <Text style={{ fontSize: 17 , height : 40, width: 330, marginLeft: 30,  backgroundColor: 'white'}} > {item.name}</Text>
          //   </TouchableOpacity>}
          //   renderSectionHeader={({ section }) => <Text style={{fontSize: 17, backgroundColor: '#F7F5F5' , height : 30, width: 330,marginTop: 10, marginLeft: 30 }}>{section.title}</Text>}
          //   keyExtractor={(item, index) => index}
          // />




          <FlatList
            data={this.state.filteredContacts}
            renderItem={({ item }) => (
              <ListItem 

                roundAvatar
                title={item.name}
                subtitle={item.phoneNumber}
                leftAvatar={{ source: { uri: ip+'images/'+item.bitmojiPath } }}
                bottomDivider
                onPress={() => this.BottomSheetRef.current.snapTo(0)}
              />
            )}
          />



        }

        <BottomSheet
          // enabledHeaderGestureInteraction={true}
          // noScroll={true}
          enabledContentGestureInteraction={true}
          snapPoints={[350, 0]}
          renderHeader={this.renderHeader}
          renderContent={() => <RenderInner name={this.state.selectedUser.name} number={this.state.selectedUser.number} address={this.state.selectedUser.address} />}
          ref={this.BottomSheetRef}
          initialSnap={1}
        />



      </View>
    );
  }



  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
          <Text style={styles.sheetHeaderText}>User Profile</Text>
        </View>
      </View>

    );
  }


  filterContacts() {

    let tempArr = this.state.contacts;
    let searchedName = this.state.search;
    let filterContact = []
    filteredContact = tempArr.filter((contact) => {
      if (contact.name === this.state.search)
        return contact
    })

    if (filteredContact.length > 0) {
      this.setState({ filteredList: filteredContact })
    }
    else {
      this.setState({ filteredList: this.state.contacts })
    }


  }






  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{ height: 0.7, width: '100%', backgroundColor: '#C8C8C8' }} />
    );
  };

}
