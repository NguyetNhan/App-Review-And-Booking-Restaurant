import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { urlServer, colorMain } from '../../config';
const { width, height } = Dimensions.get('window');
import { socket } from '../../socket';
export default class Header extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        accountReceiver: props.accountReceiver,
                        isCheckOnline: false
                };
                this.checkAccountOnline();
        }

        checkAccountOnline () {
                this.intervalId = setInterval(() => {
                        socket.emit('idClientOnline', (listId) => {
                                var checked = false;
                                for (item of listId) {
                                        if (this.state.accountReceiver._id === item.idAccount) {
                                                checked = true;
                                                break;
                                        }
                                }
                                if (checked) {
                                        this.setState({
                                                isCheckOnline: true
                                        });
                                } else {
                                        this.setState({
                                                isCheckOnline: false
                                        });
                                }
                        });
                }, 1000);
        }

        componentWillUnmount () {
                clearInterval(this.intervalId);
        }

        render () {
                return (
                        <View style={styles.container}>
                                <TouchableOpacity
                                        onPress={() => {
                                                this.props.onGoBack();
                                        }}
                                >
                                        <Icon name='arrow-left' size={25} color='black' />
                                </TouchableOpacity>
                                {
                                        <View style={styles.containerValue}>
                                                {
                                                        this.state.accountReceiver.avatar === null ?
                                                                <Image
                                                                        source={require('../../assets/images/avatar_user.png')}
                                                                        style={styles.image}
                                                                /> :
                                                                <Image
                                                                        source={{ uri: `${urlServer}${this.state.accountReceiver.avatar}` }}
                                                                        style={styles.image}
                                                                />
                                                }
                                                <View style={styles.containerName}>
                                                        <Text style={styles.name}>{this.state.accountReceiver.name}</Text>
                                                        {
                                                                this.state.isCheckOnline ?
                                                                        <View style={styles.containerStatus}>
                                                                                <View
                                                                                        style={{
                                                                                                width: 8,
                                                                                                height: 8,
                                                                                                backgroundColor: colorMain,
                                                                                                borderRadius: 4
                                                                                        }}
                                                                                />

                                                                                <Text style={styles.status}>Đang hoạt động</Text>
                                                                        </View> : null
                                                        }
                                                </View>
                                        </View>
                                }
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                width: width,
                height: 60,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center'
        },
        containerValue: {
                flexDirection: 'row',
                marginLeft: 10
        },
        image: {
                width: 40,
                height: 40,
                borderRadius: 20
        },
        containerName: {
                marginLeft: 10,
                justifyContent: 'center'
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 18
        },
        containerStatus: {
                flexDirection: 'row',
                alignItems: 'center',
        },
        status: {
                color: colorMain,
                fontFamily: 'UVN-Baisau-Regular',
                marginLeft: 5
        }
});