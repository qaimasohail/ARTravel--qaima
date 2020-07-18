//
import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, Dimensions, ToastAndroid, Alert, Button, TouchableOpacity, Image, Linking } from 'react-native';
import MapView, {
  Marker,
  customMapStyle,
  AnimatedRegion,
  Polyline, PROVIDER_GOOGLE,
  Callout,
  MarkerAnimated
} from 'react-native-maps';

import RNGooglePlaces from 'react-native-google-places';
// import RNGooglePlacePicker from 'react-native-google-place-picker';
import MapViewDirections from 'react-native-maps-directions';
import { NavigationContainer } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import { TextInput } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from "react-native-vector-icons/Ionicons";
// import Ionicons from 'react-native-vector-icons'
import haversine from "haversine";
import mapStyle from './app/mapss.json';
import Axios from 'axios';
import { ip } from './config';

import { OpenMapDirections } from 'react-native-navigation-directions';

import Geocoder from 'react-native-geocoding';
import Trips from './Trips';


const homePlace = { description: 'Home', geometry: { location: { lat: 31.520370, lng: 74.358749 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 33.720000, lng: 73.060000 } } };



// const origin = { latitude: 37.3318456, longitude: -122.0296002 };
// const destination = { latitude: 33.550855, longitude: 73.062877 };
const { width, height } = Dimensions.get('window');
const GOOGLE_MAPS_APIKEY = 'AIzaSyB_UY8Mg65jm8F_BHOarN0wQAf1pFlqqtM';
const ASPECT_RATIO = width / height;
// const LATITUDE = 37.771707;
// const LONGITUDE = -122.4053769;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const hasLocationPermission = true;





class NewComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      showButton: "flex",
      endButton: false,
      tripEnded:true,

      // bitmojiPath: '',
      flex: 1,
      currentPositionFetched: false,
      // currentPosition: {
      //   latitude: 0,
      //   longitude: 0,
      // },
      coordinates: [



      ],
      duration: 0,
      distance: 0,
      travellers: [],
      user: {},
      searchLat: 31.520370,
      searchLong: 74.358749,
    };

    this.mapView = null;
  }

  _callShowDirections = () => {
    const user = {
    }

    const endPoint = {
      longitude: this.state.searchLong,
      latitude: this.state.searchLat
    }

    const transportPlan = 'w';

    OpenMapDirections(user, endPoint, transportPlan).then(res => {
      console.log("hell")
      console.log(res)
    });
  }




  componentWillMount() {
    console.log("showing maps")
    console.log("showing maps")
    console.log("showinAAAAAAAAg mzxzxzaps")

    Geocoder.init(GOOGLE_MAPS_APIKEY);



    // Axios.get(ip + 'traveller/' + this.props.route.params.phoneNumber).then((resp) => {


    //   this.setState({ user: resp.data })
    //   // this.setState({userImage: require(this.state.user.profileImage)})
    //   console.log(this.state.user.profileImage)
    //   console.log(resp.data)


    // })


    Axios.get(ip + 'traveller/viewall').then((resp) => {
      this.setState({ travellers: resp.data })
    })





    console.log(this.props.route.params.phoneNumber)

  }




  componentDidMount() {
    console.log("showing maps")

    setTimeout(() => this.forceUpdate(), 500);
    setTimeout(() => {


      if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            let pos = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
            this.setState({ currentPositionFetched: true, currentPosition: pos })




            Axios.put(ip + 'traveller/update/' + this.props.route.params.phoneNumber, {
              currentLat: pos.latitude,
              currentLong: pos.longitude,
            }).then((resp) => {
              console.log("Record Updated ")
              ToastAndroid.show("Profile Updated", ToastAndroid.LONG);
            })





            let tempArr = this.state.coordinates;
            tempArr[0] = pos;
            // tempArr[1]={longitude:73.1564063,latitude:33.1569433};
            this.setState({ coordinates: tempArr })
            this.mapView.animateToRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0059397161733585335,
              longitudeDelta: 0.005845874547958374
            }, 1000)
          },


          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    }, 1000)
  }

  updateSize = (height) => {
    this.setState({
      height
    });
  }

  // openSearchModal() {
  //   RNGooglePlaces.openAutocompleteModal()
  //     .then((place) => {
  //       console.log("this place")
  //       console.log(place);
  //       // place represents user's selection from the
  //       // suggestions and it is a simplified Google Place object.
  //     })
  //     .catch(error => console.log(error.message));  // error is a Javascript Error object
  // }





  render() {

    const { navigation } = this.props;


    const GooglePlacesInput = () => {
      return (
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={1}
          autoFocus={false}
          returnKeyType={'default'}
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description}   // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data, details);
            console.log("affan")
            this.setState({tripEnded:true})
            this.setState({ searchLat: details.geometry.location.lat })
            this.setState({ searchLong: details.geometry.location.lng })
            this.setState({tripEnded:false})



            let tempArr = this.state.coordinates;
            tempArr[1] = { latitude: this.state.searchLat, longitude: this.state.searchLong }
            this.setState({ coordinates: tempArr })

          }}

          getDefaultValue={() => ''}

          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_MAPS_APIKEY,
            language: 'en', // language of the results
            types: '(cities)', // default: 'geocode'
            
          }}

          styles={{
            textInputContainer: {
              marginTop: 60,
              width: '100%',
              backgroundColor: 'black',
              height: 57
            },
            textInput: {
              height: 40,
              fontSize: 17,

            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: 'black'
            }

          }}
          nearbyPlacesAPI='GooglePlacesSearch'  // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
          }}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
            types: 'address',
          }}

          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
          predefinedPlaces={[homePlace, workPlace]}


        />
      );
    }
    let Markers = []

    if (this.state.travellers.length > 0) {
      Markers = this.state.travellers.map((traveller) => {


        return <Marker
          coordinate={{ latitude: traveller.currentLat, longitude: traveller.currentLong }} title={traveller.name} description="Traveller" onCalloutPress={() => { console.log("marker is clicked") }}>

          <Image source={{ uri: ip + "images/" + traveller.bitmojiPath }} style={{ height: 45, width: 35 }} />

        </Marker>
      })
    }


    console.log(Markers)


    return (

      <View style={styles.container} >
        {this.state.travellers.length > 0 &&

          <MapView
            showsUserLocation={false}
            showsCompass={false}
            // mapType = "hybrid"
            showsPointsOfInterest={true}
            // showsTraffic = {true}
            showsIndoors={true}
            onRegionChange={this.onRegionChange}
            style={styles.map}
            // provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            style={{ flex: 1 }}
            ref={c => this.mapView = c}
            loadingEnabled={true}
          >


            {Markers}





            {(this.state.currentPositionFetched   && !this.state.tripEnded) && 
              <Marker coordinate={{ latitude: this.state.searchLat, longitude: this.state.searchLong }} />

            }


            {/* <MapView.Marker  coordinate={this.state.currentPosition} /> */}
            {(this.state.coordinates.length >= 2 && !this.state.tripEnded) && (
              <MapViewDirections
                mode="DRIVING"
                precision="high"
                origin={this.state.coordinates[0]}
                waypoints={(this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1) : null}
                destination={this.state.coordinates[this.state.coordinates.length - 1]}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="black"
                optimizeWaypoints={true}

                onStart={(params) => {
                  console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                }}
                onReady={result => {
                  console.log('Distance: ${result.distance} km');
                  this.setState({ distance: result.distance })
                  console.log('Duration: ${result.duration} min.');
                  this.setState({ duration: result.duration })
                  console.log(result);

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: (width / 20),
                      bottom: (height / 20),
                      left: (width / 20),
                      top: (height / 20),
                    }
                  });
                }}
                onError={(errorMessage) => {
                  // console.log('GOT AN ERROR');
                }}
              />
            )}




          </MapView>



        }






        <View style={styles.weatherContainer}>
          <TouchableOpacity onPress={() => { navigation.push('Forecast', { transition: 'vertical' }) }}>
            <Icon size={60} name="md-thermometer" style={styles.weather} />
          </TouchableOpacity>
        </View>

        <View style={styles.inbox}>
          <TouchableOpacity onPress={() => { navigation.push('Stories') }}>
            <Icon size={60} name="md-chatboxes" style={styles.weather} />
          </TouchableOpacity>
        </View>

        <View style={styles.drawer}>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('DrawerOpen'); }}>
            <Icon size={50} name="md-menu" style={styles.weather} />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Select Your Destination</Text>
        </View>


        <View style={styles.inputView}>
          {/* <TextInput style={styles.input}/> */}
          <GooglePlacesInput />
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>

            {/* <TouchableOpacity onPress={() => this.openSearchModal()}>
              <Image source={require('./res/pointer.png')} style={{ height: 55, width: 55, justifyContent: 'center', marginTop: 280 }} />

            </TouchableOpacity> */}

          </View>
        </View>
        <View style={styles.mapDrawerOverlay} />

        {this.state.endButton &&
          <TouchableOpacity
            style={styles.endTripButton}

            // onPress={() => this.openSearchModal()}
            onPress={() => {
              // this.setState({ endButton: false }); ToastAndroid.show("Trip Ended", ToastAndroid.LONG);
              Alert.alert(
                'Are you sure you want to end this trip?',
                '',
                [
               
                  {
                    text: 'NO',
                    onPress: () => {this.setState({endButton:true})},
                    style: 'cancel'
                  },
                  { text: 'YES', onPress: () => {this.setState({endButton:false})
                  this.setState({tripEnded:true})
                  // this._callShowDirections();
                
                }}
                ],
                { cancelable: false }
              )
              // { navigation.push('Trips') }



              Geocoder.from(33.9069576, 73.3943017)
                .then(json => {
                  var addressComponent = json.results[0].address_components[0];
                  console.log(addressComponent);
                })
                .catch(error => console.warn(error));

              let trip = {
                duration: this.state.duration,
                distance: this.state.distance,
                endLat: this.state.searchLat,
                endLong: this.state.searchLong,
                startLat: this.state.currentPosition.latitude,
                startLong: this.state.currentPosition.longitude,
              }

              Axios.post(ip + 'Trips/addTrips', trip).then((resp) => {
                console.log("Record   Added ")

              })

            }
            }>

            <Text style={styles.travelButtonText}> End Trip </Text>
          </TouchableOpacity>
        }

        {!this.state.endButton &&
          <TouchableOpacity
            style={[styles.travelButton, { display: this.state.showButton }]}
            // onPress={() => this.openSearchModal()}
            onPress={() => {
              // this.setState({ endButton: true }); this._callShowDirections();
              ToastAndroid.show("Trip Started", ToastAndroid.LONG);
              Alert.alert(
                'Are you sure you want to start the trip?',
                '',
                [
               
                  {
                    text: 'NO',
                    onPress: () => {this.setState({endButton:false})},
                    style: 'cancel'
                  },
                  { text: 'YES', onPress: () => {this.setState({endButton:true})
                  this._callShowDirections();
                  this.setState({tripEnded:false})
                }}
                ],
                { cancelable: false }
              )
            }}
          >
            <Text style={styles.travelButtonText}> Travel Now </Text>
          </TouchableOpacity>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
  },
  inputView: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    top: 0,
    left: 5,
    right: 5
  },
  input: {
    height: 48,
    padding: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#48BBEC',
    backgroundColor: 'white',
  },
  mapDrawerOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.0,
    height: Dimensions.get('window').height,
    width: 30,
  },
  travelButton: {
    // display: 'none',
    backgroundColor: '#0D0101',
    padding: 10,
    borderRadius: 5,
    height: 50,
    margin: 4,
    marginTop: 1,
  },
  endTripButton: {
    // display: 'none',
    backgroundColor: '#0D0101',
    padding: 10,
    borderRadius: 5,
    height: 50,
    margin: 4,
    marginTop: 1,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch'
  },
  travelButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  weatherContainer: {
    position: 'absolute',
    zIndex: 99999,
    top: 650,
    right: 10

  },
  inbox: {
    position: 'absolute',
    zIndex: 99999,
    top: 5,
    right: 10

  },
  drawer: {
    position: 'absolute',
    zIndex: 99999,
    top: 5,
    left: 10

  },
  HeaderText: {
    marginLeft: 50,
    marginTop: -40,
    fontSize: 22

  }


});

export default NewComp;
