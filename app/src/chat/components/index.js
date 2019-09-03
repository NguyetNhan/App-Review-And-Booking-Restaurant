import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { urlServer } from '../../config';
import { AccountModel } from '../../models/account';
import { chat } from '../../socket';

export default class Chat extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        tabBarLabel: 'Nhắn Tin',
                        tabBarIcon: ({ tintColor }) => (<Icon name='message-circle' size={25} color={tintColor} />)
                }
        }

        constructor (props) {
                super(props);
                this.state = {
                }
                this._onConnectServer();
        }

        async _onConnectServer () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                chat.emit('id', account.id);
        }

        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor='white'
                                        barStyle='dark-content'
                                />
                                <View style={styles.containerHeader}>
                                        <Text style={styles.textHeader}>Chat</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                        chat.emit('test', ' con cac')
                                }}>
                                        <Text>Test Server</Text>
                                </TouchableOpacity>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center'
        },
        containerHeader: {
                width: '100%',
                height: 50,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center'
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20
        }
})