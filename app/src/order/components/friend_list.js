import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import { urlServer, colorMain } from '../../config';
import ItemFriendList from './item_friend_list';
import { AccountModel } from '../../models/account';
import Icon from 'react-native-vector-icons/AntDesign';

export default class FriendList extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        friendList: [],
                        account: null,
                        isLoading: true,
                        oldFriendListInvited: props.oldFriendListInvited
                };
                this.onChangeList = this.onChangeList.bind(this);
        }

        async componentDidMount () {
                const resultAccount = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (resultAccount.error) {
                        Alert.alert('Thông Báo Lỗi', resultAccount.message);
                        this.setState({
                                isLoading: false
                        });
                } else {
                        try {
                                const response = await fetch(`${urlServer}/friend/get-friend/idAccount/${resultAccount.data.id}`, {
                                        method: 'GET',
                                        headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                        },
                                }).then(value => value.json());
                                if (response.error) {
                                        Alert.alert('Thông Báo Lỗi', response.message);
                                        this.setState({
                                                isLoading: false
                                        });
                                } else {
                                        if (response.data.length === 0) {
                                                let list = ['1'];
                                                this.setState({
                                                        account: resultAccount.data,
                                                        friendList: list,
                                                        isLoading: false
                                                });
                                        } else {
                                                if (this.state.oldFriendListInvited.length === 0) {
                                                        this.setState({
                                                                account: resultAccount.data,
                                                                friendList: response.data,
                                                                isLoading: false
                                                        });
                                                } else {
                                                        for (friend of response.data) {
                                                                let checkExist = false;
                                                                let name = '';
                                                                for (oldFriend of this.state.oldFriendListInvited) {
                                                                        if (oldFriend.idAccount === friend.idAccountFriend) {
                                                                                checkExist = true;
                                                                                name = oldFriend.name;
                                                                        }
                                                                }
                                                                if (checkExist) {
                                                                        friend.isChecked = true;
                                                                        friend.name = name;
                                                                } else {
                                                                        friend.isChecked = false;
                                                                }
                                                        }
                                                        this.setState({
                                                                account: resultAccount.data,
                                                                friendList: response.data,
                                                                isLoading: false
                                                        });
                                                }

                                        }

                                }
                        } catch (error) {
                                Alert.alert('Thông Báo Lỗi', error.message);
                                this.setState({
                                        isLoading: false
                                });
                        }
                }
        }

        async onRefresh () {
                this.setState({
                        isLoading: true
                });
                try {
                        const response = await fetch(`${urlServer}/friend/get-friend/idAccount/${this.state.account.id}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                },
                        }).then(value => value.json());
                        if (response.error) {
                                Alert.alert('Thông Báo Lỗi', response.message);
                                this.setState({
                                        isLoading: false
                                });
                        } else {
                                if (response.data.length === 0) {
                                        let list = ['1'];
                                        this.setState({
                                                friendList: list,
                                                isLoading: false
                                        });
                                } else {
                                        if (this.state.oldFriendListInvited.length === 0) {
                                                this.setState({
                                                        friendList: response.data,
                                                        isLoading: false
                                                });
                                        } else {
                                                for (friend of response.data) {
                                                        let checkExist = false;
                                                        let name = '';
                                                        for (oldFriend of this.state.oldFriendListInvited) {
                                                                if (oldFriend.idAccount === friend.idAccountFriend) {
                                                                        checkExist = true;
                                                                        name = oldFriend.name;
                                                                }
                                                        }
                                                        if (checkExist) {
                                                                friend.isChecked = true;
                                                                friend.name = name;
                                                        } else {
                                                                friend.isChecked = false;
                                                        }
                                                }
                                                this.setState({
                                                        friendList: response.data,
                                                        isLoading: false
                                                });
                                        }
                                }
                        }
                } catch (error) {
                        Alert.alert('Thông Báo Lỗi', error.message);
                        this.setState({
                                isLoading: false
                        });
                }
        }

        onChangeList (item, index) {
                let list = this.state.friendList;
                list[index] = item;
                this.setState({
                        friendList: list
                });
        }

        onClickButtonOk () {
                let list = [];
                for (item of this.state.friendList) {
                        if (item.isChecked)
                                list.push({
                                        idAccount: item.idAccountFriend,
                                        name: item.name
                                });
                }
                this.props.onCompleteInvite(list);
                this.props.onCloseModalFriendList();
        }

        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.onCloseModalFriendList();
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>bạn bè</Text>
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.onClickButtonOk();
                                                }}
                                                style={styles.buttonOk}>
                                                <Text style={styles.textButtonOk}>Mời</Text>
                                        </TouchableOpacity>
                                </View>
                                <FlatList
                                        data={this.state.friendList}
                                        extraData={this.state}
                                        keyExtractor={(item, index) => index.toString()}
                                        showsVerticalScrollIndicator={false}
                                        refreshing={this.state.isLoading}
                                        onRefresh={() => this.onRefresh()}
                                        renderItem={(item) => {
                                                if (item.item === '1')
                                                        return (
                                                                <Text style={{
                                                                        fontFamily: 'UVN-Baisau-Regular',
                                                                        textTransform: 'capitalize',
                                                                        width: '100%',
                                                                        textAlign: 'center'
                                                                }}>không có bạn bè</Text>
                                                        );
                                                else
                                                        return (
                                                                <ItemFriendList
                                                                        item={item.item}
                                                                        index={item.index}
                                                                        onChangeList={this.onChangeList}
                                                                />
                                                        );
                                        }}
                                />
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
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
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                fontSize: 16
        },
        textButtonOk: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain,
                fontSize: 16
        },
        buttonOk: {
        }
});