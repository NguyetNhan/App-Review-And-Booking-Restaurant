import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, StatusBar, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { urlServer, background, colorMain } from '../../config';
import { AccountModel } from '../../models/account';
import ItemListOrderAdminRestaurant from './item_list_order_admin_restaurant';
import ItemListOrderClient from './item_list_order_client';
export default class Deal extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        isLoading: false,
                        listOrder: [],
                        page: 1,
                        total_page: null,
                        isRefresh: false,
                        isLoadMore: false,
                        filter: 'null',
                        visibleModalFilter: false
                };
                this._onClickOrder = this._onClickOrder.bind(this);
        }


        async _getInfoAccountFromLocal () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (account.authorities === 'admin-restaurant') {
                        this.setState({
                                account: account,
                                isLoading: true,
                        });
                        this.props.onFetchListOrder({
                                data: {
                                        idAdmin: account.id,
                                        page: 1,
                                        filter: this.state.filter
                                },
                                type: 'admin-restaurant'
                        });
                } else if (account.authorities === 'client') {
                        this.setState({
                                account: account,
                                isLoading: true,
                        });
                        this.props.onFetchListOrder({
                                data: {
                                        idClient: account.id,
                                        page: 1,
                                        filter: this.state.filter
                                },
                                type: 'client'
                        });
                }

        }

        componentDidMount () {
                this._getInfoAccountFromLocal();
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.listOrder !== prevState.listOrder && nextProps.listOrder !== undefined && !prevState.isRefresh && !prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listOrder = nextProps.listOrder;
                } else if (nextProps.listOrder !== prevState.listOrder && nextProps.listOrder !== undefined && prevState.isRefresh && !prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listOrder = nextProps.listOrder;
                        prevState.isRefresh = false;
                } else if (nextProps.listOrder !== prevState.listOrder && nextProps.listOrder !== undefined && !prevState.isRefresh && prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listOrder = prevState.listOrder.concat(nextProps.listOrder);
                        prevState.isLoadMore = false;
                }
                if (nextProps.page !== prevState.page && nextProps.page !== undefined && !prevState.isLoading) {
                        prevState.page = nextProps.page;
                }
                if (nextProps.total_page !== prevState.total_page && nextProps.total_page !== undefined && !prevState.isLoading) {
                        prevState.total_page = nextProps.total_page;
                }
                if (nextProps.isLoading !== prevState.isLoading) {
                        prevState.isLoading = nextProps.isLoading;
                }
                return null;
        }

        _onClickOrder (idOrder) {
                this.props.navigation.navigate('DetailDeal', {
                        idOrder: idOrder,
                        callback: this._onCallbackRefresh.bind(this)
                });
        }

        _onCallbackRefresh () {
                this._onRefreshListOrder('null');
        }

        _onRefreshListOrder (filter) {
                this.setState({
                        page: 1,
                        listOrder: [],
                        isLoading: true,
                        isRefresh: true,
                });
                const authorities = this.state.account.authorities;
                if (authorities === 'admin-restaurant') {
                        this.props.onFetchListOrder({
                                data: {
                                        idAdmin: this.state.account.id,
                                        page: 1,
                                        filter: filter
                                },
                                type: 'admin-restaurant'
                        });
                } else if (authorities === 'client') {
                        this.props.onFetchListOrder({
                                data: {
                                        idClient: this.state.account.id,
                                        page: 1,
                                        filter: filter
                                },
                                type: 'client'
                        });
                }
        }

        _onLoadMoreListOrder () {
                const page = this.state.page;
                const total_page = this.state.total_page;
                if (page < total_page) {
                        const authorities = this.state.account.authorities;
                        if (authorities === 'admin-restaurant') {
                                this.props.onFetchListOrder({
                                        data: {
                                                idAdmin: this.state.account.id,
                                                page: page + 1,
                                                filter: this.state.filter
                                        },
                                        type: 'admin-restaurant'
                                });
                        } else if (authorities === 'client') {
                                this.props.onFetchListOrder({
                                        data: {
                                                idClient: this.state.account.id,
                                                page: page + 1,
                                                filter: this.state.filter
                                        },
                                        type: 'client'
                                });
                        }
                        this.setState({
                                isLoading: true,
                                isLoadMore: true
                        });
                }
        }

        _onCloseModalFilter (filter) {
                this.setState({
                        visibleModalFilter: !this.state.visibleModalFilter,
                        filter: filter
                });
                this._onRefreshListOrder(filter);
        }

        _onOpenModalFilter () {
                this.setState({
                        visibleModalFilter: !this.state.visibleModalFilter,
                });
        }

        componentWillUnmount () {
                this.props.onResetProps();
        }
        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor='white'
                                        barStyle='dark-content'
                                />
                                <View style={styles.containerHeader}>
                                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>đơn hàng</Text>
                                        <TouchableOpacity onPress={() => {
                                                this._onOpenModalFilter();
                                        }}>
                                                <Icon name='filter' size={25} color='black' />
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.content}>
                                        <FlatList
                                                data={this.state.listOrder}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                refreshing={this.state.isLoading}
                                                onRefresh={() => {
                                                        this._onRefreshListOrder(this.state.filter);
                                                }}
                                                onEndReached={() => {
                                                        this._onLoadMoreListOrder();
                                                }}
                                                onEndReachedThreshold={0.1}
                                                renderItem={(item) => {
                                                        if (this.state.account.authorities === 'admin-restaurant') {
                                                                return (
                                                                        <ItemListOrderAdminRestaurant
                                                                                item={item.item}
                                                                                _onClickOrder={this._onClickOrder}
                                                                        />
                                                                );
                                                        } else if (this.state.account.authorities === 'client') {
                                                                return (
                                                                        <ItemListOrderClient
                                                                                item={item.item}
                                                                                _onClickOrder={this._onClickOrder}
                                                                        />
                                                                );
                                                        }

                                                }}
                                        />
                                </View>
                                <Modal
                                        visible={this.state.visibleModalFilter}
                                        animationType='slide'
                                        transparent
                                        onRequestClose={() => {
                                                this._onCloseModalFilter('null');
                                        }}
                                >
                                        <View style={styles.modalStatus}>
                                                <Text style={styles.textTitleStatus}>lọc</Text>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this._onCloseModalFilter('null');
                                                        }}
                                                >
                                                        <Text style={styles.textStatus}>tất cả</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this._onCloseModalFilter('waiting');
                                                        }}
                                                >
                                                        <Text style={styles.textStatus}>chưa xác nhận</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this._onCloseModalFilter('activity');
                                                        }}
                                                >
                                                        <Text style={styles.textStatus}>đang thực hiện</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this._onCloseModalFilter('complete');
                                                        }}
                                                >
                                                        <Text style={styles.textStatus}>hoàn thành</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this._onCloseModalFilter('cancel');
                                                        }}
                                                >
                                                        <Text style={styles.textStatus}>không chấp nhận</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.setState({
                                                                        visibleModalFilter: !this.state.visibleModalFilter,
                                                                });
                                                        }}
                                                >
                                                        <Text style={styles.textCancel}>quay lại</Text>
                                                </TouchableOpacity>
                                        </View>
                                </Modal>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
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
                fontSize: 18,
                textTransform: 'capitalize'
        },
        content: {
                flex: 1,
                backgroundColor: background
        },
        modalStatus: {
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.9)',
                alignItems: 'center',
                justifyContent: 'center'
        },
        textTitleStatus: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 30,
                marginVertical: 10,
                color: colorMain,
                textTransform: 'uppercase'
        },
        textStatus: {
                textTransform: 'capitalize',
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                marginVertical: 10,
                color: 'white'
        },
        textCancel: {
                textTransform: 'capitalize',
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                color: 'red',
                marginVertical: 10
        }
});