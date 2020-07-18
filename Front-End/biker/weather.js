import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Icon from "react-native-vector-icons/Ionicons";


import PropTypes from 'prop-types';

import { weatherConditions } from './WeatherConditions';



export default Weather = ({ weather, temperature }) => {
    if (weather != null) {
        return (
          <View
            style={[
              styles.weatherContainer,
              { backgroundColor: weatherConditions[weather].color }
            ]}
          >
            <View style={styles.headerContainer}>
            <Icon size={72} name={weatherConditions[weather].icon} />
              {/* <MaterialCommunityIcons
                size={72}
                
                color={'#fff'}
              /> */}
              <Text style={styles.tempText}>{temperature}˚</Text>
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.title}>{weatherConditions[weather].title}</Text>
              <Text style={styles.subtitle}>
                {weatherConditions[weather].subtitle}
              </Text>
            </View>
          </View>
        );
      } else {
        return (
          <View>
            <Text>Oh no, something went wrong</Text>
          </View>
        )
      };
    };

    Weather.propTypes = {
        temperature: PropTypes.number.isRequired,
        weather: PropTypes.string
      };

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#f7b733'
  },
  headerContainer: {
    flex: 1,
    color: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempText: {
    fontSize: 100,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 48,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});
