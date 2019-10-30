import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { urlServer, colorMain, backgroundStatusBar } from '../../config';
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
                        isLoading: true,
                        isRefresh: false,
                        page: 1,
                        total_page: 1,
                        isLoadMore: false
                }

                socket.on('notification', (data) => {
                        alert(data);
                })
                this._onClickItem = this._onClickItem.bind(this);
        }

        async _getAccountFromLocal () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                try {
                        if (account.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        'Bạn chưa đăng nhập !',
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                this.props.navigation.navigate('Auth');
                        } else {
                                this.setState({
                                        account: account.data,
                                        isLoading: true,
                                })
                                const data = {
                                        idAccount: account.data.id,
                                        page: 1
                                };
                                this.props.onFetchNotification(data)
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Bạn chưa đăng nhập !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.props.navigation.navigate('Auth');
                }
        }
        componentDidMount () {
                this._getAccountFromLocal();
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.listNotification !== prevState.listNotification && nextProps.listNotification !== undefined && !prevState.isRefresh && !prevState.isLoadMore) {
                        if (nextProps.listNotification.length === 0) {
                                let list = ['1', ...nextProps.listNotification];
                                prevState.listNotification = list;
                        } else {
                                prevState.listNotification = nextProps.listNotification;
                        }
                } else if (nextProps.listNotification !== prevState.listNotification && nextProps.listNotification !== undefined && prevState.isRefresh && !prevState.isLoadMore && !prevState.isLoading) {
                        if (nextProps.listNotification.length === 0) {
                                let list = ['1', ...nextProps.listNotification];
                                prevState.listNotification = list;
                        } else {
                                prevState.listNotification = nextProps.listNotification;
                        }
                        prevState.isRefresh = false;
                } else if (nextProps.listNotification !== prevState.listNotification && nextProps.listNotification !== undefined && !prevState.isRefresh && prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listNotification = prevState.listNotification.concat(nextProps.listNotification);
                        prevState.isLoadMore = false;
                }
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading
                }
                if (nextProps.messages !== undefined && !prevState.isLoading) {
                        ToastAndroid(nextProps.messages, ToastAndroid.LONG)
                }
                if (nextProps.page !== prevState.page && nextProps.page !== undefined && !prevState.isLoading) {
                        prevState.page = nextProps.page
                }
                if (nextProps.total_page !== prevState.total_page && nextProps.total_page !== undefined && !prevState.isLoading) {
                        prevState.total_page = nextProps.total_page
                }
                return null;
        }

        _onRefresh () {
                const data = {
                        idAccount: this.state.account.id,
                        page: 1,
                };
                this.setState({
                        page: 1,
                        listNotification: [],
                        isLoading: true,
                        isRefresh: true
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
                        this.setState({
                                isLoading: true,
                                isLoadMore: true
                        })
                        this.props.onFetchNotification(data);
                }
        }

        _onClickItem (item) {
                if (item.item.type === 'order') {
                        this.props.navigation.navigate('DetailDeal', {
                                idOrder: item.item.idDetail,
                                navigationFrom: 'notification'
                        })
                } else if (item.item.type === 'review') {
                        var data = {
                                idRestaurant: item.item.idDetail,
                                idAdmin: this.state.account.id
                        }
                        this.props.navigation.navigate('DetailRestaurant', {
                                IdConfigDetailRestaurant: data,
                                GoBack: 'Notification'
                        });
                } else if (item.item.type === 'friend') {
                        this.props.navigation.navigate('Friend');
                } else if (item.item.type === 'restaurant') {
                        var data = {
                                idRestaurant: item.item.idDetail,
                                idAdmin: this.state.account.id
                        }
                        this.props.navigation.navigate('DetailRestaurant', {
                                IdConfigDetailRestaurant: data,
                                GoBack: 'Notification'
                        });
                }
        }

        componentWillUnmount () {
                this.props.onResetProps();
        }

        render () {
                return (
                        <View style={styles.container}   >
                                <StatusBar
                                        backgroundColor={backgroundStatusBar}
                                        barStyle='light-content'
                                        translucent={false}
                                />
                                <View
                                        onTouchStart={() => this.props.navigation.navigate('Search')}
                                        style={styles.containerSearch}>
                                        <Icon name='search' size={25} color='white' />
                                        <Text style={styles.textTitleSearch}>tìm kiếm nhà hàng, bạn bè...</Text>
                                </View>
                                <View style={styles.content}>
                                        <FlatList
                                                data={this.state.listNotification}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                refreshing={this.state.isLoading}
                                                onRefresh={() => {
                                                        this._onRefresh();
                                                }}
                                                onEndReached={() => {
                                                        this._onLoadMore();
                                                }}
                                                onEndReachedThreshold={0.1}
                                                renderItem={(item) => {
                                                        if (item.item === '1')
                                                                return (
                                                                        <View>
                                                                                <Text style={{
                                                                                        textTransform: 'capitalize',
                                                                                        marginVertical: 5,
                                                                                        fontFamily: 'UVN-Baisau-Regular',
                                                                                }}>không có thông báo</Text>
                                                                        </View>
                                                                );
                                                        else
                                                                return (
                                                                        <ItemListNotification
                                                                                item={item.item}
                                                                                title={item.item.title}
                                                                                content={item.item.content}
                                                                                image={item.item.image}
                                                                                type={item.item.type}
                                                                                createDate={item.item.createDate}
                                                                                idAccount={item.item.idAccount}
                                                                                _onClickItem={this._onClickItem}
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
        containerSearch: {
                flexDirection: 'row',
                height: 55,
                backgroundColor: colorMain,
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center'
        },
        textTitleSearch: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                color: 'white',
                flex: 1,
                marginLeft: 10,
                fontSize: 16
        },
        content: {
                flex: 1,
        }
})