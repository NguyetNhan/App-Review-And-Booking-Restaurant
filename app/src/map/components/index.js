import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, PermissionsAndroid, StatusBar, Alert, ToastAndroid, Modal, Picker, TouchableOpacity } from 'react-native';
import MapView, {
        PROVIDER_GOOGLE,
        Marker
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoder';
import { urlServer, KEY_API_GOOGLE_MAP, colorMain } from '../../config';
import Icon from 'react-native-vector-icons/Feather';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomItemMarker from './custom_item_marker';
import DialogDetailMarker from './dialog_detail_marker';
import { AccountModel } from '../../models/account';

const { width, height } = Dimensions.get('window');

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
                        region: null,
                        marker: null,
                        markerList: [],
                        visibleDialogDetailMarker: false,
                        imageDialogMarker: null,
                        titleDialogMarker: null,
                        typeDialogMarker: null,
                        addressDialogMarker: null,
                        markerSelected: null,
                        destination: null,
                        origin: null,
                        loadingMap: true,
                        type: 'place',
                        account: null,
                        distance: null,
                        duration: null
                };
                this.mapView = null;
                this.requestLocationPermission();
                Geocoder.fallbackToGoogle(KEY_API_GOOGLE_MAP);
                this._onClickCloseDialogDetailMarker = this._onClickCloseDialogDetailMarker.bind(this);
                this._onClickDetail = this._onClickDetail.bind(this);
                this._onClickDirections = this._onClickDirections.bind(this);
                this.onClickButtonChat = this.onClickButtonChat.bind(this);
                this.onClickInfoAccount = this.onClickInfoAccount.bind(this);
        }

        async getAccountFromLocal () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (account.error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Bạn chưa đăng nhập !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.props.navigation.navigate('Auth');
                } else {
                        this.setState({
                                account: account.data,
                        })
                }
        }

        componentDidMount () {
                this.getAccountFromLocal();
        }
        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.markerList !== undefined && nextProps.markerList !== prevState.markerList) {
                        prevState.markerList = nextProps.markerList
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
                                this.setState({
                                        loadingMap: true
                                })
                                Geolocation.getCurrentPosition((position) => {
                                        const position1 = {
                                                latitude: position.coords.latitude,
                                                longitude: position.coords.longitude,
                                        }
                                        this.props.onFetchNearbyLocationRestaurant(position1);
                                }, (error) => {
                                        Alert.alert(
                                                'Thông Báo Lỗi',
                                                error.message,
                                                [
                                                        { text: 'OK' },
                                                ],
                                                { cancelable: false },
                                        );
                                }, {
                                        enableHighAccuracy: true,
                                        timeout: 20000,
                                        maximumAge: 1000
                                })
                                Geolocation.watchPosition((position) => {
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
                                                },
                                                loadingMap: false
                                        });
                                }, (error) => {
                                        Alert.alert(
                                                'Thông Báo Lỗi',
                                                error.message,
                                                [
                                                        { text: 'OK' },
                                                ],
                                                { cancelable: false },
                                        );
                                }, {
                                        enableHighAccuracy: true,
                                        timeout: 20000,
                                        maximumAge: 1000
                                });
                        } else {
                                alert('Chức năng này không được bạn cho phép sử dụng !');
                        }
                } catch (err) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                err.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                }
        }

        onRegionChange = (region) => {
                this.setState({
                        region: region
                });
        }

        _onClickButtonLocation () {
                this.setState({
                        loadingMap: true
                })
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
                                },
                                loadingMap: false
                        });
                        this.props.onFetchNearbyLocationRestaurant({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                        });
                }, (error) => {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                }, {
                        enableHighAccuracy: true,
                        timeout: 20000,
                        maximumAge: 1000
                });
        }

        _onClickDetail (idRestaurant) {
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
                        markerSelected: item
                });
        }

        _onClickDirections = (position) => {
                this.setState({
                        origin: {
                                latitude: this.state.region.latitude,
                                longitude: this.state.region.longitude
                        },
                        destination: {
                                latitude: position.latitude,
                                longitude: position.longitude
                        }
                })
        }

        onChangeType (type) {
                this.setState({
                        type: type,
                        distance: null,
                        duration: null,
                        destination: null,
                        origin: null,
                        markerList: []
                });
                this.props.onResetProps();
                if (type === 'friend') {
                        this.props.onFetchLocationFriend(this.state.account.id);
                } else if (type === 'place') {
                        this.props.onFetchNearbyLocationRestaurant({
                                latitude: this.state.region.latitude,
                                longitude: this.state.region.longitude,
                        });
                }
        }

        onClickButtonChat(idAccount){
                this.props.navigation.navigate('DetailChat', {
                        idAccountReceiver: idAccount
                })
        }

        onClickInfoAccount(idAccount){
                this.props.navigation.navigate('Person', {
                        idAccountView: idAccount
                })
        }
        

        componentWillUnmount () {
                this.props.onResetProps();
        }
        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        barStyle='dark-content'
                                        backgroundColor='white'
                                        animated={true}
                                />
                                <View style={styles.containerMap} >
                                        <MapView
                                                style={styles.map}
                                                region={this.state.region}
                                                provider={PROVIDER_GOOGLE}
                                                zoomEnabled={true}
                                                scrollEnabled={true}
                                                loadingIndicatorColor={colorMain}
                                                loadingEnabled={this.state.loadingMap}
                                        >
                                                {
                                                        this.state.marker === null ? null : <Marker
                                                                coordinate={this.state.marker}
                                                                pinColor='red'
                                                                title='Vị Trí Của Bạn'
                                                        >
                                                        </Marker>
                                                }
                                                {
                                                        this.state.origin && this.state.destination !== null ? <MapViewDirections
                                                                origin={this.state.origin}
                                                                destination={this.state.destination}
                                                                apikey={KEY_API_GOOGLE_MAP}
                                                                language='vn'
                                                                strokeWidth={3}
                                                                strokeColor={colorMain}
                                                                onStart={(params) => {
                                                                        //   console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                                                                }}
                                                                onReady={result => {
                                                                        // console.log('result: ', result);
                                                                        // console.log(`Distance: ${result.distance} km`)
                                                                        // console.log(`Duration: ${result.duration} min.`)
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
                                                {
                                                        this.state.markerList.map(item =>
                                                                <Marker
                                                                        key={item._id}
                                                                        coordinate={item.geolocation}
                                                                        centerOffset={{ x: 0, y: 50 }}
                                                                        onPress={() => {
                                                                                this._onClickOpenDialogDetailMarker(item);
                                                                        }}
                                                                >
                                                                        {
                                                                                this.state.type === 'place' ?
                                                                                        <CustomItemMarker
                                                                                                image={item.imageRestaurant[0]}
                                                                                                type={this.state.type}
                                                                                        /> :
                                                                                        <CustomItemMarker
                                                                                                image={item.avatar}
                                                                                                type={this.state.type}
                                                                                        />
                                                                        }
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
                                        <View style={styles.containerSelectType}>
                                                <View style={styles.option}>
                                                        <TouchableOpacity
                                                                onPress={() => {
                                                                        this.onChangeType('place')
                                                                }}
                                                        >
                                                                {
                                                                        this.state.type === 'place' ?
                                                                                <Text style={styles.textButtonOptionSelect}>Địa Điểm</Text> :
                                                                                <Text style={styles.textButtonOptionUnSelect}>Địa Điểm</Text>
                                                                }

                                                        </TouchableOpacity>
                                                        <View
                                                                style={{
                                                                        height: 30,
                                                                        width: 1,
                                                                        marginHorizontal: 5,
                                                                        backgroundColor: 'black'
                                                                }}
                                                        />
                                                        <TouchableOpacity
                                                                onPress={() => {
                                                                        this.onChangeType('friend')
                                                                }}
                                                        >
                                                                {
                                                                        this.state.type === 'friend' ?
                                                                                <Text style={styles.textButtonOptionSelect}>Bạn Bè</Text> :
                                                                                <Text style={styles.textButtonOptionUnSelect}>Bạn Bè</Text>
                                                                }
                                                        </TouchableOpacity>
                                                </View>
                                        </View>
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
                                                item={this.state.markerSelected}
                                                _onClickDetail={this._onClickDetail}
                                                _onClickDirections={this._onClickDirections}
                                                typeCustoms={this.state.type}
                                                onClickButtonChat={this.onClickButtonChat}
                                                onClickInfoAccount={this.onClickInfoAccount}
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
        },
        containerSelectType: {
                backgroundColor: 'rgba(0,0,0,0)',
                alignItems: 'center',
                position: 'absolute',
                width: width,
                top: 10
        },
        option: {
                flexDirection: 'row',
                backgroundColor: 'rgba(255,255,255,0.9)',
                alignItems: 'center',
                width: 200,
                justifyContent: 'center',
                borderRadius: 10,
                height: 60
        },
        textButtonOptionSelect: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16,
                textTransform: 'capitalize'
        },
        textButtonOptionUnSelect: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize'
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
