import * as React from 'react';
import { Text, View, SectionList, Image, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from "./app/components/Header/styles";
import Axios from 'axios';
import { ip } from './config';

import Geocoder from 'react-native-geocoding';

const GOOGLE_MAPS_APIKEY = 'AIzaSyB_UY8Mg65jm8F_BHOarN0wQAf1pFlqqtM';



function ScheduledTrips() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./res/schedule.png')}
        style={{ width: 100, height: 100 }} />
      <Text style={{ fontSize: 20 }}>You don't have any trips planned.</Text>
    </View>
  );
}

function History({ navigation }) {

  Geocoder.init(GOOGLE_MAPS_APIKEY);



  const [trips, setTrip] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);
  const [endAddresses, setendAddresses] = React.useState([]);
  const [fetched, setFetched] = React.useState(false);
  const data = [];
  let tempArray = []
  let endArray = []


  React.useEffect(() => {
    if (!fetched) {
      Axios.get(ip + 'Trips/viewall').then(async (val) => {
        setTrip(val.data)



        for (let index = 0; index < trips.length; index++) {

          await Geocoder.from(trips[index].startLat, trips[index].startLong)
            .then(json => {
              var addressComponent = json.results[0].address_components[0];
              // console.log(addressComponent);
              tempArray.push(addressComponent)
            })
            .catch(error => console.warn(error));

          await Geocoder.from(trips[index].endLat, trips[index].endLong)
            .then(json => {
              var addressComponent = json.results[0].address_components[0];
              endArray.push(addressComponent)
            })
            .catch(error => console.warn(error));





        }

        setAddresses(tempArray)
        setendAddresses(endArray)
        setFetched(true)



      })
    }

    else {
      console.log(fetched)
      console.log(addresses)
      console.log(addresses.length)
      console.log(endAddresses)
      console.log(endAddresses.length)

    }

  })







  if (fetched && addresses.length > 0  && endAddresses.length > 0) {

    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={this.FlatListItemSeparator}
          data={trips}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => {
              navigation.push('TripDetail', {
                tripdata: item,
                startAddress : addresses[index].long_name,
                endAddress : endAddresses[index].long_name
              })
            }}>
              <View style={{ padding: 20 }}>


                <Text style={{ fontSize: 20, color: "gray", marginTop: 10 }}>{addresses[index].long_name} </Text>
                {/* <Text style={{ fontSize: 16, color: "gray", marginTop: 10 }}>{Math.floor(item.duration)} hrs </Text>
                <Text style={{ fontSize: 16, color: "gray", marginTop: 10 }}>{Math.floor(item.distance)} kms</Text> */}
                <Text style={{ fontSize: 16, color: "gray", marginTop: 10 }}>{endAddresses[index].long_name} </Text>

              </View>
            </TouchableOpacity>
          }

        />

        {/* <Text>{trips[0].location}</Text> */}


      </View>
    );
  }
  else {
    return <View><Text style={{ fontSize: 30 }}>Fetching Data</Text></View>
  }
}

FlatListItemSeparator = () => {
  return (
    //Item Separator
    <View style={{ height: 0.7, width: '100%', backgroundColor: '#C8C8C8' }} />
  );
};

const Tab = createMaterialTopTabNavigator();

export default function Trips() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Scheduled Trips" component={ScheduledTrips} />
      <Tab.Screen name="Trips History" component={History} />
    </Tab.Navigator>
  );
}