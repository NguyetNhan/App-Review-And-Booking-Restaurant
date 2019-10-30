import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { urlServer, colorMain } from '../../config';
import Icon from 'react-native-vector-icons/AntDesign';
import ItemFriendRequest from './item_friend_request';

export default class FriendRequest extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        friendRequestList: [],
                        isLoading: true,
                        account: props.account
                };
                this.onRemoveList = this.onRemoveList.bind(this);
        }

        componentDidMount () {
                this.fetchFriendRequestListFromAPI();
        }

        async fetchFriendRequestListFromAPI () {
                try {
                        const result = await fetch(`${urlServer}/friend/get-friend-request/idAccount/${this.state.account.id}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                },
                        }).then(value => value.json());
                        if (result.error) {
                                Alert.alert('Thông Báo Lỗi', result.message);
                        } else {
                                this.setState({
                                        friendRequestList: result.data,
                                        isLoading: false
                                });
                        }
                } catch (error) {
                        Alert.alert('Thông Báo Lỗi', error.message);
                }
        }

        onRefresh () {
                this.fetchFriendRequestListFromAPI();
        }

        onRemoveList (index) {
                var list = this.state.friendRequestList;
                list.splice(index, 1);
                this.setState({
                        friendRequestList: list
                });
        }

        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.onCloseModalInvitation();
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>lời mời kết bạn</Text>
                                        <View style={{ width: 25 }} />
                                </View>
                                <View style={styles.flatList}>
                                        <FlatList
                                                data={this.state.friendRequestList}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                showsVerticalScrollIndicator={false}
                                                refreshing={this.state.isLoading}
                                                onRefresh={() => {
                                                        this.onRefresh();
                                                }}
                                                renderItem={(item) => {
                                                        return (
                                                                <ItemFriendRequest
                                                                        item={item.item}
                                                                        index={item.index}
                                                                        onRemoveList={this.onRemoveList}
                                                                />
                                                        );
                                                }}
                                        />
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        header: {
                height: 50,
                width: '100%',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                fontSize: 16
        },
        flatList: {
                flex: 1
        }
});