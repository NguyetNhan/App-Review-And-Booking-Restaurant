import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { AccountModel } from '../../models/account';
import { urlServer } from '../../config';
import { socket } from '../../socket';
const urlLogin = `${urlServer}/auth/login`;

export default class AuthLoading extends Component {

        constructor (props) {
                super(props);
                this.state = {
                        account: null
                };
        }

        componentDidMount () {
                this.getAccount();
        }

        async getAccount () {
                try {
                        const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                        if (account === null) {
                                this.props.navigation.navigate('Auth');
                        } else {
                                const response = await fetch(urlLogin, {
                                        method: 'POST',
                                        headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                                email: account.email,
                                                password: account.password,
                                        })
                                }).then(convertJson => convertJson.json());
                                var accountNew = {
                                        id: response.data._id,
                                        authorities: response.data.authorities,
                                        email: response.data.email,
                                        password: response.data.password,
                                        name: response.data.name,
                                        phone: response.data.phone,
                                        avatar: response.data.avatar
                                };
                                AccountModel.AddInfoAccountFromDatabaseLocal(accountNew);
                                this.setState({
                                        account: accountNew
                                });
                                socket.emit('idAccount', accountNew.id);
                                setTimeout(() => {
                                        if (accountNew.authorities === 'client') {
                                                this.props.navigation.navigate('Client');
                                        } else if (accountNew.authorities === 'admin') {
                                                this.props.navigation.navigate('AppAdmin');
                                        } else if (accountNew.authorities === 'admin-restaurant') {
                                                this.props.navigation.navigate('AppAdminRestaurant');
                                        }
                                }, 200);
                        }
                } catch (error) {
                        console.log('error: ', error);
                }
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