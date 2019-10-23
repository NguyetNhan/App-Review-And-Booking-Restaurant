import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, PermissionsAndroid, TouchableOpacity, Dimensions, Alert } from 'react-native';
import MapView, {
        PROVIDER_GOOGLE,
        Marker
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import { colorMain, KEY_API_GOOGLE_MAP } from '../../../config';
import CustomMarker from '../../../map/components/custom_item_marker';
import Icon from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

export default class MapDirections extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        restaurant: props.restaurant,
                        region: null,
                        location: null,
                        isLoading: false,
                        duration: null,
                        distance: null
                };
        }


        async  requestLocationPermission () {
                try {
                        const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                        );
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                Geolocation.getCurrentPosition((position) => {
                                        var region = {
                                                latitude: position.coords.latitude,
                                                longitude: position.coords.longitude,
                                                latitudeDelta: 0.00922 * 1.5,
                                                longitudeDelta: 0.00421 * 1.5
                                        };
                                        this.setState({
                                                region: region,
                                                location: {
                                                        latitude: position.coords.latitude,
                                                        longitude: position.coords.longitude,
                                                }
                                        });
                                }, (error) => {
                                        console.log('error: ', error);
                                }, {
                                        enableHighAccuracy: true,
                                        timeout: 20000,
                                        maximumAge: 1000
                                });
                        } else {
                                alert('Chức năng này không được bạn cho phép sử dụng !');
                        }
                } catch (err) {
                        console.warn(err);
                }
        }

        componentDidMount () {
                this.requestLocationPermission();
        }

        render () {
                return (
                        <View style={styles.container}>
                                <MapView
                                        style={styles.map}
                                        region={this.state.region}
                                        provider={PROVIDER_GOOGLE}
                                        loadingEnabled={this.state.isLoading}
                                        zoomEnabled={true}
                                        scrollEnabled={true}
                                        loadingBackgroundColor='white'
                                        loadingIndicatorColor={colorMain}
                                >
                                        {
                                                this.state.location !== null ? <Marker
                                                        key='1'
                                                        coordinate={this.state.location}
                                                        title='Vị trí của bạn'
                                                /> : null
                                        }

                                        <Marker
                                                key={this.state.restaurant._id}
                                                coordinate={this.state.restaurant.position}
                                                centerOffset={{ x: 0, y: 50 }}
                                        >
                                                <CustomMarker
                                                        image={this.state.restaurant.imageRestaurant[0]}
                                                />
                                        </Marker>
                                        {
                                                this.state.location !== null ? <MapViewDirections
                                                        origin={this.state.location}
                                                        destination={this.state.restaurant.position}
                                                        apikey={KEY_API_GOOGLE_MAP}
                                                        language='vn'
                                                        strokeWidth={3}
                                                        strokeColor={colorMain}
                                                        onStart={(params) => {
                                                                //  console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                                                        }}
                                                        onReady={result => {
                                                                this.setState({
                                                                        distance: result.distance,
                                                                        duration: result.duration
                                                                });
                                                        }}
                                                        onError={(errorMessage) => {
                                                                Alert.alert('Thông Báo Lỗi', errorMessage.message)  
                                                        }}
                                                /> : null
                                        }
                                </MapView>
                                <TouchableOpacity
                                        style={styles.buttonBack}
                                        onPress={() => {
                                                this.props._onClickCloseModalMap();
                                        }}>
                                        <Icon name='arrowleft' size={25} color='black' />
                                </TouchableOpacity>
                                {
                                        this.state.duration !== null && this.state.distance !== null ? <View style={styles.containerTimeDirection}>
                                                <Text style={styles.textTime}>{this.state.duration} phút</Text>
                                                <View
                                                        style={{
                                                                width: 100,
                                                                height: 1,
                                                                backgroundColor: 'black',
                                                                marginVertical: 5
                                                        }}
                                                />
                                                <Text style={styles.textTime}>{this.state.distance} km</Text>
                                        </View> : null
                                }

                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        map: {
                flex: 1
        },
        buttonBack: {
                position: 'absolute',
                top: 20,
                left: 20,
                backgroundColor: 'white',
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center'
        },
        containerTimeDirection: {
                position: 'absolute',
                bottom: 30,
                left: width / 2 - 100,
                backgroundColor: 'white',
                width: 200,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10
        },
        textTime: {
                fontFamily: 'UVN-Baisau-Regular',

        }
});