import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, PermissionsAndroid, StatusBar, Alert, ToastAndroid, Modal } from 'react-native';
import MapView, {
        PROVIDER_GOOGLE, Marker, Polyline, UrlTile,
        Callout,
        CalloutSubview,
        ProviderPropType,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoder';
import { urlServer, KEY_API_GOOGLE_MAP, colorMain } from '../../config';
import Icon from 'react-native-vector-icons/Feather';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomItemMarker from './custom_item_marker';
import DialogDetailMarker from './dialog_detail_marker';

export default class Map extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        tabBarLabel: 'Vị Trí',
                        tabBarIcon: ({ tintColor }) => (<Icon name='map-pin' size={25} color={tintColor} />)
                }
        }
        constructor (props) {
                super(props);
                this.state = {
                        region: {
                                latitude: 21.0242225,
                                longitude: 105.8207913,
                                latitudeDelta: 0.00922 * 1.5,
                                longitudeDelta: 0.00421 * 1.5
                        },
                        marker: null,
                        listRestaurant: [],
                        visibleDialogDetailMarker: false,
                        imageDialogMarker: null,
                        titleDialogMarker: null,
                        typeDialogMarker: null,
                        addressDialogMarker: null,

                };
                this.requestLocationPermission();
                Geocoder.fallbackToGoogle(KEY_API_GOOGLE_MAP);
                this._onClickCloseDialogDetailMarker = this._onClickCloseDialogDetailMarker.bind(this);
        }


        componentDidMount () {

        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.listRestaurant !== undefined && nextProps.listRestaurant !== prevState.listRestaurant) {
                        prevState.listRestaurant = nextProps.listRestaurant
                }
                if (nextProps.messages !== undefined) {
                        ToastAndroid.show(nextProps.messages, ToastAndroid.SHORT);
                }
                return null
        }


        async  requestLocationPermission () {
                try {
                        const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                        );
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                Geolocation.getCurrentPosition((position) => {
                                        const position1 = {
                                                latitude: position.coords.latitude,
                                                longitude: position.coords.longitude,
                                        }
                                        this.props.onFetchNearbyLocationRestaurant(position1);
                                }, (error) => {
                                        console.log('error: ', error);
                                }, {
                                        enableHighAccuracy: true,
                                        timeout: 20000,
                                        maximumAge: 1000
                                })
                                Geolocation.watchPosition((position) => {
                                        //   const res = await Geocoder.geocodeAddress('số 28 đường 25, phường linh đông, quận thủ đức, thành phố hồ chí minh');
                                        var region = {
                                                latitude: position.coords.latitude,
                                                longitude: position.coords.longitude,
                                                latitudeDelta: 0.00922 * 1.5,
                                                longitudeDelta: 0.00421 * 1.5
                                        };
                                        this.setState({
                                                region: region,
                                                marker: {
                                                        // latitude: res[0].position.lat,
                                                        // longitude: res[0].position.lng
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

        onRegionChange = (region) => {
                this.setState({
                        region: region
                });
        }

        _onClickButtonLocation () {
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
                        this.props.onFetchNearbyLocationRestaurant({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                        });
                }, (error) => {
                        console.log('error: ', error);
                }, {
                        enableHighAccuracy: true,
                        timeout: 20000,
                        maximumAge: 1000
                });
        }

        _onClickMarker (idRestaurant) {
                var data = {
                        idRestaurant: idRestaurant,
                        idAdmin: null
                }
                this.props.navigation.navigate('DetailRestaurant', {
                        IdConfigDetailRestaurant: data,
                        GoBack: 'Map'
                });
        }

        _onClickCloseDialogDetailMarker () {
                this.setState({
                        visibleDialogDetailMarker: !this.state.visibleDialogDetailMarker
                });
        }
        _onClickOpenDialogDetailMarker (item) {
                this.setState({
                        visibleDialogDetailMarker: !this.state.visibleDialogDetailMarker,
                        titleDialogMarker: item.name,
                        typeDialogMarker: item.type,
                        addressDialogMarker: item.address,
                        imageDialogMarker: item.imageRestaurant[0]
                });
        }

        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor='white'
                                        barStyle='dark-content'
                                />
                                <View style={styles.containerHeader}>
                                        <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                                                <Icon name='menu' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>bản đồ</Text>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('Search', {
                                                        Condition: {
                                                                type: 'restaurant',
                                                                address: 'Hồ Chí Minh'
                                                        }
                                                });
                                        }}>
                                                <Icon name='user' size={25} color='black' />
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.containerMap} >
                                        <MapView
                                                style={styles.map}
                                                region={this.state.region}
                                                provider={PROVIDER_GOOGLE}
                                                loadingEnabled={true}
                                                zoomEnabled={true}
                                                scrollEnabled={true}
                                        >
                                                {
                                                        this.state.marker === null ? null : <Marker
                                                                //  image={require('../../assets/images/map.jpg')}
                                                                coordinate={this.state.marker}
                                                                pinColor={colorMain}
                                                                title='Vị Trí Của Bạn'
                                                        //    centerOffset={{ x: 0, y: 0 }}
                                                        >
                                                        </Marker>
                                                }
                                                {/* <MapViewDirections
                                                        origin='số 28 đường 22, phường linh đông, quận thủ đức, thành phố hồ chí minh'
                                                        destination='số 100 đường 25, phường linh đông, quận thủ đức, thành phố hồ chí minh'
                                                        apikey={GOOGLE_MAPS_API_KEY}
                                                /> */}
                                                {
                                                        this.state.listRestaurant.map(item =>
                                                                <Marker
                                                                        key={item._id}
                                                                        coordinate={item.position}
                                                                        centerOffset={{ x: 0, y: 50 }}
                                                                        onPress={() => {
                                                                                //  this._onClickMarker(item._id);
                                                                                this._onClickOpenDialogDetailMarker(item);
                                                                        }}
                                                                >
                                                                        <CustomItemMarker
                                                                                image={item.imageRestaurant[0]}
                                                                        />
                                                                </Marker>
                                                        )
                                                }
                                        </MapView>
                                        <View style={styles.containerButtonLocation}>
                                                <TouchableOpacity style={styles.buttonLocation}
                                                        onPress={() => {
                                                                this._onClickButtonLocation();
                                                        }}>
                                                        <IconMaterialIcons name='my-location' size={30} color='black' />
                                                </TouchableOpacity>
                                        </View>
                                </View>
                                <Modal
                                        visible={this.state.visibleDialogDetailMarker}
                                        transparent={true}
                                        animationType='slide'
                                        onRequestClose={() => {
                                                this._onClickCloseDialogDetailMarker();
                                        }}
                                >
                                        <DialogDetailMarker
                                                _onClickCloseDialogDetailMarker={this._onClickCloseDialogDetailMarker}
                                                image={this.state.imageDialogMarker}
                                                title={this.state.titleDialogMarker}
                                                type={this.state.typeDialogMarker}
                                                address={this.state.addressDialogMarker}
                                        />
                                </Modal>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        containerHeader: {
                width: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                alignItems: 'center',
                paddingHorizontal: 20
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                textTransform: 'capitalize'
        },
        containerMap: {
                flex: 1
        },
        map: {
                flex: 1
        },
        buttonLocation: {
                backgroundColor: 'rgba(255,255,255,0.9)',
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center'
        },
        containerButtonLocation: {
                position: 'absolute',
                bottom: 30,
                right: 30,
        }
});
