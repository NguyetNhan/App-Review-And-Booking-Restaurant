import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { AccountModel } from '../../models/account';
import { urlServer, colorMain } from '../../config';

export default class Person extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        isLoading: false
                };
        }

        async fetchInfoAccountFromLocal () {
                const result = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                try {
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
                                        account: result.data,
                                        isLoading: true
                                });
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

        render () {
                return (
                        <View style={styles.container}>
                                <Text>ccc</Text>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        }
});