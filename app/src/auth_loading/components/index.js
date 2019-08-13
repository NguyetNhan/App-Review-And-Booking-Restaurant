import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import Realm from 'realm';

const AccountSchema = {
        name: 'Account',
        primaryKey: 'id',
        properties: {
                authorities: 'string',
                email: 'string',
                name: 'string',
                phone: 'int',
                id: 'string'
        }
};
export default class AuthLoading extends Component {

        constructor (props) {
                super(props);
                this.state = {
                        account: null
                };
        }

        componentDidMount () {
                console.log('componentDidMount: ');
                this.getAccount();
        }

        async getAccount () {
                try {
                        var realm = await Realm.open({ schema: [AccountSchema] });
                        var account = await realm.objects('Account');
                        if (account.length === 0) {
                                realm.close();
                                this.props.navigation.navigate('Auth');
                        } else {
                                var data = {
                                        authorities: null,
                                        name: null,
                                };
                                for (let item of account) {
                                        data.name = item.name;
                                        data.authorities = item.authorities;
                                }
                                realm.close();
                                this.setState({
                                        account: data
                                });
                                setTimeout(() => {
                                        if (this.state.account.authorities === 'client') {
                                                this.props.navigation.navigate('AppAdminRestaurant');
                                        } else {
                                                this.props.navigation.navigate('AppAdmin');
                                        }
                                }, 1000);
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