import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { urlServer, KEY_API_GOOGLE_MAP } from '../../config';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = KEY_API_GOOGLE_MAP;
export default class Map extends Component {
        constructor (props) {
                super(props);

                // AirBnB's Office, and Apple Park
                this.state = {
                        coordinates: [
                                {
                                        latitude: 37.3317876,
                                        longitude: -122.0054812,
                                },
                                {
                                        latitude: 37.771707,
                                        longitude: -122.4053769,
                                },
                        ],
                };

                this.mapView = null;
        }

        onMapPress = (e) => {
                this.setState({
                        coordinates: [
                                ...this.state.coordinates,
                                e.nativeEvent.coordinate,
                        ],
                });
        }

        render () {
                return (
                        <View style={{
                                flex: 1
                        }}>
                                <MapView
                                        initialRegion={{
                                                latitude: 37.78825,
                                                longitude: -122.4324,
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421,
                                        }}
                                />
                        </View>
                );
        }
}