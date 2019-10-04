import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/AntDesign';
import { urlServer, KEY_API_GOOGLE_MAP } from '../../../config';

export default class SelectPlaceOnMap extends Component {

        constructor (props) {
                super(props);
                this.state = {
                        region: props._region,
                        marker: props._marker
                };
                // this.requestLocationPermission();
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
                                                marker: {
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
        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props._onClickCloseModalMap();
                                        }} >
                                                <Icon name='down' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.titleHeader}>Bản Đồ</Text>
                                        <TouchableOpacity onPress={() => {
                                                this.props._onClickComplete(this.state.marker);
                                                this.props._onClickCloseModalMap();
                                        }}  >
                                                <Icon name='check' size={25} color='black' />
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.containerMap}>
                                        <MapView
                                                style={styles.map}
                                                region={this.state.region}
                                                provider={PROVIDER_GOOGLE}
                                                zoomEnabled={true}
                                                scrollEnabled={true}
                                        >
                                                {
                                                        this.state.marker === null ? null : <Marker
                                                                draggable
                                                                title="Nhà Hàng Của Bạn"
                                                                description='Kéo đến địa điểm đặt nhà hàng của bạn'
                                                                coordinate={this.state.marker}
                                                                onDragEnd={(e) => this.setState({ marker: e.nativeEvent.coordinate })}
                                                        />
                                                }
                                        </MapView>
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        header: {
                height: 60,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 20
        },
        titleHeader: {
                fontFamily: 'UVN-Baisau-Regular',
                color: 'black',
                fontSize: 18,
                textTransform: 'capitalize'
        },
        containerMap: {
                flex: 1
        }, map: {
                flex: 1
        }
});