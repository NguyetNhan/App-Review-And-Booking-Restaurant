import React, { Component } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Dimensions, TouchableOpacity, Alert, FlatList } from 'react-native';
import Contacts from 'react-native-contacts';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/AntDesign';
import { background, colorMain } from '../../config';
import { AccountModel } from '../../models/account';
import { convertPhoneNumber } from '../../functions/convert';
import ItemFriend from './item_friend';
export default class Friend extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        isLoading: true,
                        friendList: [],
                };
                this.fetchInfoAccountFromLocal();
                this.onClickItem = this.onClickItem.bind(this);
        }

        async fetchInfoAccountFromLocal () {
                const result = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (result.error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                result.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.props.navigation.navigate('Auth');
                } else {
                        this.setState({
                                account: result.data,
                        });
                        this.props.onFetchFriendList(result.data.id);
                }
        }



        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.friendList !== prevState.friendList && nextProps.friendList !== undefined && !prevState.isLoading) {
                        prevState.friendList = nextProps.friendList;
                }
                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                nextProps.message,
                                [
                                        {
                                                text: 'OK',
                                                onPress: () => nextProps.onResetPropsMessage()
                                        },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }

        onClickItem (idAccount) {
                this.props.navigation.navigate('Person', {
                        idAccountView: idAccount
                });
                /*   this.props.navigation.navigate('DetailChat', {
                          idAccountReceiver: idAccount
                  }); */
        }

        onClickButtonUpdateContacts () {
                this.setState({
                        isLoading: true
                });
                PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                        {
                                'title': 'Contacts',
                                'message': 'This app would like to view your contacts.'
                        }
                ).then(() => {
                        Contacts.getAll((err, contacts) => {
                                if (err === 'denied') {
                                        Alert.alert(
                                                'Thông Báo Lỗi',
                                                err.message,
                                                [
                                                        { text: 'OK' },
                                                ],
                                                { cancelable: false },
                                        );
                                } else {
                                        let phoneList = [];
                                        for (item of contacts) {
                                                if (item.phoneNumbers[0] !== undefined) {
                                                        let convert = convertPhoneNumber(item.phoneNumbers[0].number);
                                                        if (Number.isInteger(convert))
                                                                phoneList.push(convert);
                                                }
                                        }
                                        this.props.onUpdateFriendList(this.state.account.id, phoneList);
                                }
                        });
                });
        }

        componentWillUnmount () {
                this.props.onResetProps();
        }

        onRefresh () {
                this.props.onFetchFriendList(this.state.account.id);
        }




        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.goBack();
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>danh sách bạn bè</Text>
                                        <View style={{ width: 25 }} />
                                </View>
                                <View style={styles.containerButtonUpdateContacts}>
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.onClickButtonUpdateContacts();
                                                }}
                                        >
                                                <Text style={styles.textButtonUpdateContacts}>cập nhật danh bạ</Text>
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.flatList}>
                                        <FlatList
                                                data={this.state.friendList}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                showsVerticalScrollIndicator={false}
                                                refreshing={this.state.isLoading}
                                                onRefresh={() => {
                                                        this.onRefresh();
                                                }}
                                                renderItem={(item) => {
                                                        return (
                                                                <ItemFriend
                                                                        item={item.item}
                                                                        onClickItem={this.onClickItem}
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
                flex: 1,
                backgroundColor: background
        },
        header: {
                height: 50,
                width: width,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center'
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                fontSize: 16
        },
        containerButtonUpdateContacts: {
                alignItems: 'flex-end',
                paddingHorizontal: 20
        },
        textButtonUpdateContacts: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                color: 'blue',
                fontSize: 12
        },
        flatList: {
                flex: 1
        }
});