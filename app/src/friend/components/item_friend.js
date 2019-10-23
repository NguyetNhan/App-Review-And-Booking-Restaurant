import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { urlServer, colorMain } from '../../config';
import { socket } from '../../socket';

export default class ItemFriend extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        account: null,
                        isLoading: true,
                        isCheckOnline: false,
                };
                this.checkAccountReceiverOnline();
        }
        async checkAccountReceiverOnline () {
                this.intervalId = setInterval(() => {
                        if (this.state.accountReceiver !== null) {
                                socket.emit('idClientOnline', (listId) => {
                                        let checked = false;
                                        for (item of listId) {
                                                if (this.state.item.idAccountFriend === item.idAccount) {
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
                        }
                }, 1000);
        }
        async fetchInfoAccount () {
                try {
                        const result = await fetch(`${urlServer}/auth/id/${this.state.item.idAccountFriend}`, {
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
                                this.setState({
                                        account: result.data,
                                        isLoading: false
                                });
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

        componentDidMount () {
                this.fetchInfoAccount();
        }

        componentWillUnmount () {
                clearInterval(this.intervalId);
        }

        render () {
                if (this.state.isLoading)
                        return (
                                <View style={{
                                        flex: 1,
                                        alignItems: 'center'
                                }}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={30}
                                                color={colorMain}
                                        />
                                </View>
                        );
                else
                        return (
                                <TouchableOpacity
                                        onPress={() => {
                                                this.props.onClickItem(this.state.item.idAccountFriend);
                                        }}
                                        style={styles.container}>
                                        {
                                                this.state.account.avatar === null ?
                                                        this.state.isCheckOnline ?
                                                                <Image
                                                                        source={require('../../assets/images/avatar_user.png')}
                                                                        style={styles.imageOnline}
                                                                /> :
                                                                <Image
                                                                        source={require('../../assets/images/avatar_user.png')}
                                                                        style={styles.image}
                                                                />
                                                        :
                                                        this.state.isCheckOnline ?
                                                                <Image
                                                                        source={{ uri: `${urlServer}${this.state.account.avatar}` }}
                                                                        style={styles.imageOnline}
                                                                /> :
                                                                <Image
                                                                        source={{ uri: `${urlServer}${this.state.account.avatar}` }}
                                                                        style={styles.image}
                                                                />
                                        }
                                        <Text style={styles.name}>{this.state.account.name}</Text>
                                </TouchableOpacity>
                        );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                flexDirection: 'row',
                paddingHorizontal: 20,
                alignItems: 'center',
                marginVertical: 5
        },
        image: {
                width: 40,
                height: 40,
                borderRadius: 20
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                marginLeft: 10,
                fontSize: 18
        },
        imageOnline: {
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 3,
                borderColor: colorMain
        }
});