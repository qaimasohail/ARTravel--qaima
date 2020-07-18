import React, { Component } from 'react';
import { Text, View, SectionList, Image, TouchableOpacity } from 'react-native';
import MapView, {
    Marker,
    customMapStyle,
    AnimatedRegion,
    Polyline, PROVIDER_GOOGLE,
    Callout,
    MarkerAnimated
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Rating, AirbnbRating } from 'react-native-elements';
import Axios from 'axios';
import { ip } from './config';


const GOOGLE_MAPS_APIKEY = 'AIzaSyB_UY8Mg65jm8F_BHOarN0wQAf1pFlqqtM';



export default class TripDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount() {

    }

    render() {


        let tripData = this.props.route.params.tripdata
        let startingPoint = this.props.route.params.startAddress
        let endingPoint = this.props.route.params.endAddress

        console.log(tripData)
        console.log(startingPoint)
        console.log(endingPoint)


        return (<View style={{ backgroundColor: 'white', flex: 1 }}>

            <View style={{ width: "100%", height: 600 }}>

                <MapView
                    onRegionChange={this.onRegionChange}
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: tripData.startLat,
                        longitude: tripData.startLong,
                        latitudeDelta: 1.2,
                        longitudeDelta: 1.2
                    }}
                >

                    <Marker
                        coordinate={{
                            latitude: tripData.startLat,
                            longitude: tripData.startLong
                        }} title="Wonka" description="Pwincess" onCalloutPress={() => { console.log("marker is clicked") }}>
                    </Marker>



                    <Marker
                        coordinate={{
                            latitude: tripData.endLat,
                            longitude: tripData.endLong
                        }} title="Wonka" description="Pwincess" onCalloutPress={() => { console.log("marker is clicked") }}>
                    </Marker>




                    <MapViewDirections
                        mode="DRIVING"
                        precision="high"
                        origin={{
                            latitude: tripData.startLat,
                            longitude: tripData.startLong
                        }}
                        destination={{
                            latitude: tripData.endLat,
                            longitude: tripData.endLong
                        }}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="black"
                        optimizeWaypoints={true}

                      
                    />


                </MapView>

                <View style={{ width: '100%', padding: 20, marginTop: 20 }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 18, marginVertical: 10 }}>Destination Start</Text>
                        <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>{startingPoint}</Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 18, marginVertical: 10 }}>Destination End</Text>
                        <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>{endingPoint}</Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 18, marginVertical: 10 }}>Destination</Text>
                        <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>{Math.floor(tripData.distance)} kms</Text>
                    </View>


                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 18, marginVertical: 10 }}>Duration</Text>
                        <Text style={{ fontSize: 18, marginVertical: 10, fontWeight: "bold" }}>{Math.floor(tripData.duration)} hrs</Text>
                    </View>







                </View>


            </View>


        </View>)

    }


}