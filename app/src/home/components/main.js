import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, TouchableOpacity, PermissionsAndroid, Alert, ToastAndroid, ActivityIndicator } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import Icon from 'react-native-vector-icons/Feather';
import { colorMain, urlServer, backgroundStatusBar } from '../../config';
import Posts from './posts';
import Suggestions from '../containers/suggestions';
const { width, height } = Dimensions.get('window');
import { AccountModel } from '../../models/account';
import { socket } from '../../socket';
import Geolocation from '@react-native-community/geolocation';
export default class Home extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        currentPage: 0,
                        account: null,
                        geolocation: null,
                        isLoading: true
                };
                socket.connect();
                this.fetchInfoAccountFromLocal();
                this.onChangeScreenMap = this.onChangeScreenMap.bind(this);
                this.onChangeScreenDetailPlace = this.onChangeScreenDetailPlace.bind(this);
        }

        static navigationOptions = ({ navigation }) => {
                return {
                        tabBarLabel: 'Khám Phá',
                        tabBarIcon: ({ tintColor }) => (<Icon name='search' size={25} color={tintColor} />)
                }
        }

        async fetchInfoAccountFromLocal () {
                const result = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (result.error) {
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
                                account: result.data
                        });
                        try {
                                const granted = await PermissionsAndroid.request(
                                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                                );
                                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                        Geolocation.getCurrentPosition((position) => {
                                                const geolocation = {
                                                        latitude: position.coords.latitude,
                                                        longitude: position.coords.longitude,
                                                }
                                                this.setState({
                                                        geolocation: geolocation,
                                                        isLoading: false
                                                });
                                                socket.emit('infoAccount', { idAccount: result.data.id, geolocation: geolocation })
                                        }, (error) => {
                                                ToastAndroid.show(error.message, ToastAndroid.LONG);
                                                this.setState({
                                                        isLoading: false
                                                });
                                        }, {
                                                enableHighAccuracy: true,
                                                timeout: 20000,
                                                maximumAge: 1000
                                        })
                                } else {
                                        Alert.alert(
                                                'Thông Báo',
                                                'Bạn không đồng ý cung cấp vị trí nên không thể định vị các địa điểm gần bạn !',
                                                [
                                                        { text: 'OK' },
                                                ],
                                                { cancelable: false },
                                        );
                                        socket.emit('infoAccount', { idAccount: result.data.id, location: null });
                                        this.setState({
                                                isLoading: false
                                        });
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
                                this.setState({
                                        isLoading: false
                                });
                        }
                }
        }

        onChangePage (position) {
                this.setState({ currentPage: position });
                this.viewPager.setPage(position);
        }
        onChangeScreenMap () {
                this.props.navigation.navigate('Map');
        }

        onChangeScreenDetailPlace (idRestaurant, idAdmin) {
                var data = {
                        idRestaurant: idRestaurant,
                        idAdmin: idAdmin
                }
                this.props.navigation.navigate('DetailRestaurant', {
                        IdConfigDetailRestaurant: data,
                        GoBack: 'Home'
                });
        }
        render () {
                if (this.state.isLoading)
                        return (
                                <View style={styles.containerLoading}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={40}
                                                color={colorMain}
                                        />
                                </View>
                        )
                else
                        return (
                                <View style={styles.container}>
                                        <StatusBar
                                                backgroundColor={backgroundStatusBar}
                                                barStyle='light-content'
                                        />
                                        <View
                                                onTouchStart={() => this.props.navigation.navigate('Search')}
                                                style={styles.containerSearch}>
                                                <Icon name='search' size={25} color='white' />
                                                <Text style={styles.textTitleSearch}>tìm kiếm nhà hàng, bạn bè...</Text>
                                        </View>
                                        <View style={styles.containerSelectPage}>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.onChangePage(0)
                                                        }}
                                                >
                                                        {
                                                                this.state.currentPage === 0 ?
                                                                        <Text style={styles.textNavigatorPageSelect}>Khám Phá</Text> :
                                                                        <Text style={styles.textNavigatorPageUnSelect}>Khám Phá</Text>
                                                        }

                                                </TouchableOpacity>
                                                <View
                                                        style={{
                                                                height: 20,
                                                                width: 1,
                                                                backgroundColor: 'black',
                                                                marginHorizontal: 5
                                                        }}
                                                />
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.onChangePage(1)
                                                        }}
                                                >
                                                        {
                                                                this.state.currentPage === 1 ?
                                                                        <Text style={styles.textNavigatorPageSelect}>Bài Viết</Text> :
                                                                        <Text style={styles.textNavigatorPageUnSelect}>Bài Viết</Text>
                                                        }
                                                </TouchableOpacity>
                                        </View>
                                        <View style={styles.containerViewPager}>
                                                <ViewPager
                                                        style={styles.viewPager}
                                                        initialPage={this.state.currentPage}
                                                        ref={viewPager => {
                                                                this.viewPager = viewPager
                                                        }}
                                                        onPageSelected={(event) => {
                                                                this.setState({ currentPage: event.nativeEvent.position });
                                                        }}
                                                >
                                                        <View key='1'>
                                                                <Suggestions
                                                                        account={this.state.account}
                                                                        geolocation={this.state.geolocation}
                                                                        onChangeScreenMap={this.onChangeScreenMap}
                                                                        onChangeScreenDetailPlace={this.onChangeScreenDetailPlace}
                                                                />
                                                        </View>
                                                        <View key='2'>
                                                                <Posts />
                                                        </View>
                                                </ViewPager>
                                        </View>
                                </View>
                        );
        }
}

const styles = StyleSheet.create({
        containerLoading: {
                flex: 1,
                alignItems: 'center',
                paddingVertical: 20
        },
        container: {
                flex: 1
        },
        containerSearch: {
                flexDirection: 'row',
                height: 55,
                backgroundColor: colorMain,
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center'
        },
        textTitleSearch: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                color: 'white',
                flex: 1,
                marginLeft: 10,
                fontSize: 16
        },
        containerViewPager: {
                flex: 1
        },
        viewPager: {
                flex: 1
        },
        containerSelectPage: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
                marginTop: 10
        },
        textNavigatorPageSelect: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16
        },
        textNavigatorPageUnSelect: {
                fontFamily: 'UVN-Baisau-Regular',
        }
})