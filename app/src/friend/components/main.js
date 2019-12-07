import React, { Component } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Dimensions, TouchableOpacity, Alert, FlatList, ScrollView, RefreshControl, Modal, StatusBar } from 'react-native';
import Contacts from 'react-native-contacts';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/AntDesign';
import { background, colorMain } from '../../config';
import { AccountModel } from '../../models/account';
import { convertPhoneNumber } from '../../functions/convert';
import ItemFriend from './item_friend';
import FriendRequest from './friend_request';

export default class Friend extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        isLoading: true,
                        friendList: [],
                        visibleModalInvitation: false
                };
                this.fetchInfoAccountFromLocal();
                this.onClickItem = this.onClickItem.bind(this);
                this.onCloseModalInvitation = this.onCloseModalInvitation.bind(this);
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
                                                        //     if (Number.isInteger(convert))
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

        onOpenModalInvitation () {
                this.setState({
                        visibleModalInvitation: !this.state.visibleModalInvitation
                });
        }
        onCloseModalInvitation () {
                this.setState({
                        visibleModalInvitation: !this.state.visibleModalInvitation
                });
        }


        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor='white'
                                        barStyle='dark-content'
                                        translucent={false}
                                />
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.goBack();
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>bạn bè</Text>
                                        <View style={{ width: 25 }} />
                                </View>
                                <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        refreshControl={
                                                <RefreshControl
                                                        refreshing={this.state.isLoading}
                                                        onRefresh={() => {
                                                                this.onRefresh();
                                                        }}
                                                />
                                        }
                                >
                                        <View style={styles.containerButtonInvitation}>
                                                <TouchableOpacity
                                                        style={styles.buttonContacts}
                                                        onPress={() => {
                                                                this.onOpenModalInvitation();
                                                        }}
                                                >
                                                        <TouchableOpacity style={styles.containerAddFriend}>
                                                                <Icon
                                                                        name='adduser'
                                                                        size={25}
                                                                        color='white'
                                                                />
                                                        </TouchableOpacity>
                                                        <Text style={styles.textButtonUpdateContacts}>lời mời kết bạn</Text>
                                                </TouchableOpacity>
                                        </View>
                                        <View style={styles.containerButtonUpdateContacts}>
                                                <TouchableOpacity
                                                        style={styles.buttonContacts}
                                                        onPress={() => {
                                                                this.onClickButtonUpdateContacts();
                                                        }}
                                                >
                                                        <TouchableOpacity style={styles.containerContacts}>
                                                                <Icon
                                                                        name='contacts'
                                                                        size={25}
                                                                        color='white'
                                                                />
                                                        </TouchableOpacity>
                                                        <Text style={styles.textButtonUpdateContacts}>cập nhật danh bạ</Text>
                                                </TouchableOpacity>
                                        </View>
                                        <Text style={styles.title}>danh sách bạn bè</Text>
                                        <View style={styles.flatList}>
                                                <FlatList
                                                        data={this.state.friendList}
                                                        extraData={this.state}
                                                        keyExtractor={(item, index) => index.toString()}
                                                        showsVerticalScrollIndicator={false}
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
                                </ScrollView>
                                <Modal
                                        visible={this.state.visibleModalInvitation}
                                        animationType='slide'
                                        animated={true}
                                        onRequestClose={() => {
                                                this.onCloseModalInvitation();
                                        }}
                                >
                                        <FriendRequest
                                                onCloseModalInvitation={this.onCloseModalInvitation}
                                                account={this.state.account}
                                        />
                                </Modal>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: 'white'
        },
        header: {
                height: 50,
                width: '100%',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white'
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                fontSize: 16
        },
        containerButtonUpdateContacts: {
                paddingHorizontal: 20,
        },
        textButtonUpdateContacts: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                fontSize: 16,
                marginLeft: 10
        },
        flatList: {
                flex: 1
        },
        buttonContacts: {
                flexDirection: 'row',
                alignItems: 'center'
        },
        containerContacts: {
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#4c8dd8',
                borderRadius: 20
        },
        containerAddFriend: {
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ee5a31',
                borderRadius: 20
        },
        containerButtonInvitation: {
                paddingHorizontal: 20,
                marginVertical: 5
        },
        title: {
                fontFamily: 'UVN-Baisau-Regular',
                marginTop: 10,
                textTransform: 'capitalize',
                marginHorizontal: 20,
                fontSize: 12
        }
});