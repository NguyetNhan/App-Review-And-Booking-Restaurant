import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import io from 'socket.io-client';

export default class Notification extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        tabBarLabel: 'Thông báo',
                        tabBarIcon: ({ tintColor }) => (<Icon name='bell' size={25} color={tintColor} />)
                }
        }

        constructor (props) {
                super(props);
                this.onConnectServer();
        }

        onConnectServer () {
                var chat = io.connect('http://192.168.1.80:3000/chat');
                chat.on('connect', function () {
                        chat.emit('hi!');
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
                                        <Text style={styles.textHeader}>Thông Báo</Text>
                                        <TouchableOpacity>
                                                <Icon name='user' size={25} color='black' />
                                        </TouchableOpacity>
                                </View>
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
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                alignItems: 'center',
                paddingHorizontal: 10
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20
        }
})