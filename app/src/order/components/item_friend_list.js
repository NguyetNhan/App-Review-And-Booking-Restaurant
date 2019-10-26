import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { urlServer, colorMain } from '../../config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class ItemFriendList extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        accountFriend: null,
                        isLoading: true,
                        index: props.index
                };
        }

        async componentDidMount () {
                try {
                        const result = await fetch(`${urlServer}/auth/id/${this.state.item.idAccountFriend}`, {
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
                                        accountFriend: result.data,
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

        onChangeCheck () {
                let item = this.state.item;
                if (item.isChecked)
                        item.isChecked = false;
                else
                        item.isChecked = true;
                item.name = this.state.accountFriend.name;
                this.setState({
                        item: item
                });
                this.props.onChangeList(item, this.state.index);
        }
        render () {
                if (this.state.isLoading)
                        return (
                                <View style={styles.containerLoading}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={30}
                                                color='gray'
                                        />
                                </View>
                        );
                else
                        return (
                                <View style={styles.container}>
                                        {
                                                this.state.accountFriend.avatar === null ?
                                                        <Image
                                                                source={require('../../assets/images/avatar_user.png')}
                                                                style={styles.image}
                                                        /> :
                                                        <Image
                                                                source={{ uri: `${urlServer}${this.state.accountFriend.avatar}` }}
                                                                style={styles.image}
                                                        />
                                        }
                                        <Text style={styles.name}>{this.state.accountFriend.name}</Text>
                                        {
                                                this.state.item.isChecked ?
                                                        <TouchableOpacity
                                                                onPress={() => {
                                                                        this.onChangeCheck();
                                                                }}
                                                        >
                                                                <MaterialIcons
                                                                        name='radio-button-checked'
                                                                        size={30}
                                                                        color={colorMain}
                                                                />
                                                        </TouchableOpacity> :
                                                        <TouchableOpacity
                                                                onPress={() => {
                                                                        this.onChangeCheck();
                                                                }}
                                                        >
                                                                <MaterialIcons
                                                                        name='radio-button-unchecked'
                                                                        size={30}
                                                                        color='black'
                                                                />
                                                        </TouchableOpacity>
                                        }
                                </View>
                        );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                marginVertical: 5,
                marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center'
        },
        containerLoading: {
                flex: 1,
                alignItems: 'center'
        },
        image: {
                width: 40,
                height: 40,
                borderRadius: 20
        },
        name: {
                fontFamily: 'UVN-Baisau-Regular',
                marginHorizontal: 10,
                fontSize: 20,
                flex: 1
        }
});