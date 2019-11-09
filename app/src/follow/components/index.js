import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { urlServer, colorMain, background } from '../../config';
import { AccountModel } from '../../models/account';
import Icon from 'react-native-vector-icons/AntDesign';
import ItemRestaurant from './item_restaurant';

export default class Follow extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        isLoading: true,
                        followList: []
                };
                this.onChangeScreenDetailPlace = this.onChangeScreenDetailPlace.bind(this);
        }

        componentDidMount () {
                this.fetchInfoAccount();
        }

        async fetchInfoAccount () {
                const result = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (result.error) {
                        Alert.alert('Thông Báo Lỗi', result.message);
                } else {
                        this.setState({
                                account: result.data,
                        });
                        this.fetchFollowList(result.data.id);
                }
        }

        async fetchFollowList (idAccount) {
                try {
                        const result = await fetch(`${urlServer}/follows/follow-list/idAccount/${idAccount}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                        if (result.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        result.message,
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                this.setState({
                                        isLoading: false
                                });
                        } else {
                                if (result.data.length === 0) {
                                        this.setState({
                                                isLoading: false,
                                                followList: ['1']
                                        });
                                } else {
                                        this.setState({
                                                isLoading: false,
                                                followList: result.data
                                        });
                                }
                        }
                } catch (error) {
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
                }
        }
        onChangeScreenDetailPlace (idRestaurant, idAdmin) {
                var data = {
                        idRestaurant: idRestaurant,
                        idAdmin: idAdmin
                };
                this.props.navigation.navigate('DetailRestaurant', {
                        IdConfigDetailRestaurant: data,
                        GoBack: 'Follow'
                });
        }

        onRefresh () {
                this.setState({
                        isLoading: true,
                        followList: []
                });
                this.fetchFollowList(this.state.account.id);
        }
        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        translucent={false}
                                        barStyle='dark-content'
                                        backgroundColor='white'
                                />
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.goBack();
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>Nhà Hàng Theo Dõi</Text>
                                        <View style={{ width: 25 }} />
                                </View>
                                <View style={styles.flatList}>
                                        <FlatList
                                                data={this.state.followList}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                refreshing={this.state.isLoading}
                                                onRefresh={() => this.onRefresh()}
                                                renderItem={(item) => {
                                                        if (item.item === '1')
                                                                return (
                                                                        <Text>Bạn chưa theo dõi nhà hàng nào !</Text>
                                                                );
                                                        else
                                                                return (
                                                                        <ItemRestaurant
                                                                                item={item.item}
                                                                                onChangeScreenDetailPlace={this.onChangeScreenDetailPlace}
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
                flex: 1,
                backgroundColor: background
        },
        header: {
                height: 50,
                width: '100%',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                fontSize: 16
        },
        flatList: {
                flex: 1
        }
});