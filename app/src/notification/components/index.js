import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { urlServer } from '../../config';
import { AccountModel } from '../../models/account';
import { socket } from '../../socket';
import ItemListNotification from './item_list_notification';

export default class Notification extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        tabBarLabel: 'Thông Báo',
                        tabBarIcon: ({ tintColor }) => (<Icon name='bell' size={25} color={tintColor} />)
                }
        }

        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        listNotification: [],
                        isLoading: false,
                        isUpdateState: false,
                        isLoadMore: false,
                        page: 1,
                        total_page: 1
                }
                socket.on('notification', (data) => {
                        alert(data);
                })
        }

        async _getAccountFromLocal () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                this.setState({
                        account: account,
                        isLoading: true,
                })
                const data = {
                        idAccount: account.id,
                        page: 1
                };
                this.props.onFetchNotification(data)
        }
        componentDidMount () {
                this._getAccountFromLocal();
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.listNotification !== prevState.listNotification && nextProps.listNotification !== undefined) {
                        if (prevState.isUpdateState) {
                                const array = (prevState.listNotification).concat(nextProps.listNotification);
                                prevState.listNotification = array;
                        } else {
                                prevState.listNotification = nextProps.listNotification
                                prevState.isUpdateState = true;
                                prevState.isLoadMore = true;
                        }
                }
                if (nextProps.isLoading !== prevState.isLoading) {
                        prevState.isLoading = nextProps.isLoading
                }
                if (nextProps.messages !== undefined) {
                        ToastAndroid(nextProps.messages, ToastAndroid.LONG)
                }
                if (nextProps.page !== prevState.page) {
                        prevState.page = nextProps.page
                }
                if (nextProps.total_page !== prevState.total_page) {
                        prevState.total_page = nextProps.total_page
                }
                return null;
        }

        _onRefresh = () => {
                const data = {
                        idAccount: this.state.account.id,
                        page: 1,
                };
                this.setState({
                        isUpdateState: false
                })
                this.props.onFetchNotification(data)
        }

        _onLoadMore = () => {
                const page = this.state.page;
                const total_page = this.state.total_page;
                if (page < total_page) {
                        const data = {
                                idAccount: this.state.account.id,
                                page: page + 1,
                        };
                        this.props.onFetchNotification(data)
                }
        }

        render () {
                return (
                        <View style={styles.container}   >
                                <StatusBar
                                        backgroundColor='white'
                                        barStyle='dark-content'
                                />
                                <View style={styles.containerHeader}>
                                        <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                                                <Icon name='menu' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>Thông Báo</Text>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('Search', {
                                                        Condition: {
                                                                type: 'restaurant',
                                                                address: 'Hồ Chí Minh'
                                                        }
                                                });
                                        }}>
                                                <Icon name='user' size={25} color='black' />
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.content}>
                                        <FlatList
                                                data={this.state.listNotification}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                refreshing={this.state.isLoading}
                                                onRefresh={this._onRefresh}
                                                onEndReached={this._onLoadMore}
                                                onEndReachedThreshold={1}
                                                renderItem={(item) => {
                                                        return (
                                                                <ItemListNotification
                                                                        title={item.item.title}
                                                                        content={item.item.content}
                                                                        image={item.item.image}
                                                                        type={item.item.type}
                                                                        time={item.item.time}
                                                                        idAccount={item.item.idAccount}
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
                alignItems: 'center'
        },
        containerHeader: {
                width: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                alignItems: 'center',
                paddingHorizontal: 20
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20
        },
        content: {
                flex: 1,
        }
})