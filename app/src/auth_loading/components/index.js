import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ActivityIndicator, Alert, ToastAndroid } from 'react-native';
import { AccountModel } from '../../models/account';
import { urlServer } from '../../config';
const urlLogin = `${urlServer}/auth/login`;

export default class AuthLoading extends Component {

        constructor (props) {
                super(props);
                this.state = {
                        account: null
                };
        }

        async getAccount () {
                try {
                        const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                        if (account.error) {
                                ToastAndroid.show('Bạn chưa đăng nhập !', ToastAndroid.SHORT);
                                this.props.navigation.navigate('Auth');
                        } else {
                                const response = await fetch(urlLogin, {
                                        method: 'POST',
                                        headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                                email: account.data.email,
                                                password: account.data.password,
                                        })
                                }).then(convertJson => convertJson.json());
                                if (response.error) {
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
                                        var accountNew = {
                                                _id: response.data._id,
                                                authorities: response.data.authorities,
                                                email: response.data.email,
                                                password: response.data.password,
                                                name: response.data.name,
                                                phone: response.data.phone,
                                                score: response.data.score,
                                                avatar: response.data.avatar,
                                                discount: response.data.discount,
                                        };
                                        await AccountModel.DeleteAccountInfoFromDatabaseLocal();
                                        await AccountModel.AddInfoAccountFromDatabaseLocal(accountNew);
                                        this.setState({
                                                account: accountNew
                                        });
                                        setTimeout(() => {
                                                if (accountNew.authorities === 'client') {
                                                        this.props.navigation.navigate('Client');
                                                } else if (accountNew.authorities === 'admin') {
                                                        this.props.navigation.navigate('AppAdmin');
                                                } else if (accountNew.authorities === 'admin-restaurant') {
                                                        this.props.navigation.navigate('AppAdminRestaurant');
                                                }
                                        }, 100);
                                }
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Bạn chưa đăng nhập !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.props.navigation.navigate('Auth');
                }
        }
        componentDidMount () {
                this.getAccount();
        }
        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        translucent={true}
                                />
                                <Text style={{
                                        fontSize: 50,
                                        fontFamily: 'UVN-Baisau-Regular',
                                        marginBottom: 20,
                                        color: '#22D499'
                                }}>Xin chào !</Text>
                                {
                                        this.state.account === null ? <ActivityIndicator animating={true} size={50} color="#22D499" /> :
                                                <Text style={{
                                                        fontSize: 20,
                                                        fontFamily: 'UVN-Baisau-Regular',

                                                }}>{this.state.account.name}</Text>
                                }
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
        },
});