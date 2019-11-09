import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, PermissionsAndroid, Alert, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { AccountModel } from '../../models/account';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/AntDesign';
import { background, colorMain } from '../../config';
import Geolocation from '@react-native-community/geolocation';
import ItemFlatList from './item_flat_list';

export default class Stranger extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        strangerList: [],
                        isLoading: true,
                        geolocation: null
                };
                this.fetchInfoAccountFromLocal();
                this.onClickItem = this.onClickItem.bind(this);
        }

        async fetchInfoAccountFromLocal () {
                const result = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (result.error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                result.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.props.navigation.navigate('Auth');
                } else {
                        this.setState({
                                account: result.data,
                        });
                        this.fetchGeolocation();
                }
        }

        async  fetchGeolocation () {
                try {
                        const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                        );
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                Geolocation.getCurrentPosition((position) => {
                                        const geolocation = {
                                                latitude: position.coords.latitude,
                                                longitude: position.coords.longitude,
                                        };
                                        this.setState({
                                                geolocation
                                        });
                                        this.props.onFetchStrangerList(this.state.account.id, geolocation);
                                }, (error) => {
                                        Alert.alert(
                                                'Thông Báo Lỗi',
                                                error.message,
                                                [
                                                        { text: 'OK' },
                                                ],
                                                { cancelable: false },
                                        );
                                        this.setState({
                                                isLoading: false
                                        });
                                }, {
                                        enableHighAccuracy: true,
                                        timeout: 20000,
                                        maximumAge: 1000
                                });
                        } else {
                                Alert.alert('Thông Báo Lỗi', 'Chức năng này không được bạn cho phép sử dụng !');
                                this.props.navigation.goBack();
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

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.strangerList !== prevState.strangerList && nextProps.strangerList !== undefined && !prevState.isLoading) {
                        if (nextProps.strangerList.length === 0) {
                                let list = ['1', ...nextProps.strangerList];
                                prevState.strangerList = list;
                        } else {
                                prevState.strangerList = nextProps.strangerList;
                        }
                }
                if (nextProps.message !== undefined && !prevState.isLoading) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                nextProps.message,
                                [
                                        {
                                                text: 'OK',
                                                onPress: () => nextProps.onResetMessageProps()
                                        },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }

        onClickItem (idAccount) {
                this.props.navigation.navigate('Person', {
                        idAccountView: idAccount
                });
        }

        componentWillUnmount () {
                this.props.onResetProps();
        }

        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor='white'
                                        barStyle='dark-content'
                                        translucent={false}
                                />
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.goBack();
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>người lạ quanh đây</Text>
                                </View>
                                <View style={styles.flatList}>
                                        <FlatList
                                                data={this.state.strangerList}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                showsVerticalScrollIndicator={false}
                                                refreshing={this.state.isLoading}
                                                onRefresh={() => {
                                                        this.setState({
                                                                strangerList: []
                                                        });
                                                        this.fetchGeolocation();
                                                }}
                                                renderItem={(item) => {
                                                        if (item.item === '1')
                                                                return (
                                                                        <View style={{
                                                                                alignItems: 'center'
                                                                        }}>
                                                                                <Text style={{
                                                                                        textTransform: 'capitalize',
                                                                                        marginVertical: 5,
                                                                                        fontFamily: 'UVN-Baisau-Regular',
                                                                                }}>không có ai gần đây</Text>
                                                                        </View>
                                                                );
                                                        else
                                                                return (
                                                                        <ItemFlatList
                                                                                item={item.item}
                                                                                onClickItem={this.onClickItem}
                                                                        />
                                                                );
                                                }}
                                        />
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
                height: 50,
                width: '100%',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white'
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                fontSize: 16,
                marginLeft: 10,
                color: 'black'
        },
        flatList: {
                flex: 1
        }
});