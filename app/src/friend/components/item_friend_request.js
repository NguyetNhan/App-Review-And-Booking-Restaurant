import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, ToastAndroid } from 'react-native';
import { urlServer, colorMain } from '../../config';

export default class ItemFriendRequest extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        index: props.index,
                        isLoading: true,
                        account: null,
                        showButton: true
                };
        }
        async componentDidMount () {
                try {
                        const result = await fetch(`${urlServer}/auth/id/${this.state.item.idAccountClient}`, {
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

        async  onClickAgree () {
                const result = await fetch(`${urlServer}/friend/confirm-friend/idFriendRequest/${this.state.item._id}/status/agree`, {
                        method: 'PUT',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                }).then(value => value.json());
                if (result.error) {
                        ToastAndroid.show(result.message, ToastAndroid.SHORT);
                } else {
                        this.setState({
                                showButton: false
                        });
                }
        }

        async  onClickCancel () {
                const result = await fetch(`${urlServer}/friend/confirm-friend/idFriendRequest/${this.state.item._id}/status/remove`, {
                        method: 'PUT',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                }).then(value => value.json());
                if (result.error) {
                        ToastAndroid.show(result.message, ToastAndroid.SHORT);
                } else {
                        this.props.onRemoveList(this.state.index);
                }
        }

        render () {
                if (this.state.isLoading)
                        return (
                                <View style={styles.containerLoading}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={30}
                                                color={colorMain}
                                        />
                                </View>
                        );
                else
                        return (
                                <View style={styles.container}>
                                        {
                                                this.state.account.avatar === null ?
                                                        <Image
                                                                source={require('../../assets/images/avatar_user.png')}
                                                                style={styles.image}
                                                        /> :
                                                        <Image
                                                                source={{ uri: `${urlServer}${this.state.account.avatar}` }}
                                                                style={styles.image}
                                                        />
                                        }
                                        <View style={styles.value}>
                                                <Text style={styles.name}>{this.state.account.name}</Text>
                                                {
                                                        this.state.showButton ?
                                                                <View style={styles.containerButton}>
                                                                        <TouchableOpacity
                                                                                onPress={() => {
                                                                                        this.onClickAgree();
                                                                                }}
                                                                                style={styles.buttonAgree}>
                                                                                <Text style={styles.textButtonAgree}>chấp nhận</Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity
                                                                                onPress={() => {
                                                                                        this.onClickCancel();
                                                                                }}
                                                                                style={styles.buttonCancel}>
                                                                                <Text style={styles.textButtonCancel}>hủy</Text>
                                                                        </TouchableOpacity>
                                                                </View> :
                                                                <View >
                                                                        <Text style={styles.textConfirm}>đã trở thành bạn bè !</Text>
                                                                </View>
                                                }
                                        </View>
                                </View>
                        );
        }
}

const styles = StyleSheet.create({
        containerLoading: {
                flex: 1,
                alignItems: 'center'
        },
        container: {
                flex: 1,
                flexDirection: 'row',
                marginVertical: 5,
                marginHorizontal: 20,
                alignItems: 'center'
        },
        image: {
                height: 80,
                width: 80,
                borderRadius: 40
        },
        value: {
                marginLeft: 10,
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                marginBottom: 5
        },
        containerButton: {
                flexDirection: 'row'
        },
        buttonAgree: {
                backgroundColor: '#2a67e2',
                width: 100,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
        },
        textButtonAgree: {
                color: 'white',
                textTransform: 'capitalize'
        },
        buttonCancel: {
                backgroundColor: '#d3d3d3',
                width: 100,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 5,
                borderRadius: 10
        },
        textButtonCancel: {
                color: 'black',
                textTransform: 'capitalize'
        },
        textConfirm: {
                fontFamily: 'UVN-Baisau-Regular',
        }
});