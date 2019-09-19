import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { urlServer, background } from '../../config';
import { AccountModel } from '../../models/account';
import ItemFlatList from './item_flat_list';
export default class Deal extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        isLoading: false,
                        listOrder: [],
                        page: 1,
                        total_page: null,
                        isRefresh: true
                };
                this._onClickOrder = this._onClickOrder.bind(this);
        }


        async _getInfoAccountFromLocal () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                this.setState({
                        account: account,
                        isLoading: true,
                });
                this.props.onFetchListOrder({
                        idAdmin: account.id,
                        page: 1
                });
        }

        componentDidMount () {
                this._getInfoAccountFromLocal();
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.listOrder !== prevState.listOrder && nextProps.listOrder !== undefined) {
                        console.log('prevState.isRefresh: ', prevState.isRefresh);
                        if (prevState.isRefresh) {
                                console.log('1');
                                //   prevState.listOrder = prevState.listOrder.concat(nextProps.listOrder);
                                prevState.listOrder = nextProps.listOrder;
                                prevState.isRefresh = false;
                        }
                }
                if (nextProps.page !== prevState.page && nextProps.page !== undefined) {
                        prevState.page = nextProps.page;
                }
                if (nextProps.total_page !== prevState.total_page && nextProps.total_page !== undefined) {
                        prevState.total_page = nextProps.total_page;
                }
                if (nextProps.isLoading !== prevState.isLoading) {
                        prevState.isLoading = nextProps.isLoading;
                }
                return null;
        }

        _onClickOrder (idOrder) {
                console.log('idOrder: ', idOrder);
        }

        _onRefreshListOrder () {
                this.setState({
                        listOrder: [],
                        isLoading: true,
                        isRefresh: true
                });
                this.props.onFetchListOrder({
                        idAdmin: this.state.account.id,
                        page: 1
                });
        }

        _onLoadMoreListOrder () {

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


                                        }}>
                                                <Icon name='search1' size={25} color='black' />
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.content}>
                                        <FlatList
                                                data={this.state.listOrder}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                refreshing={this.state.isLoading}
                                                onRefresh={() => {
                                                        this._onRefreshListOrder();
                                                }}
                                                renderItem={(item) => {
                                                        return (
                                                                <ItemFlatList
                                                                        item={item.item}
                                                                        _onClickOrder={this._onClickOrder}
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
                fontSize: 20,
                textTransform: 'capitalize'
        },
        content: {
                flex: 1,
                backgroundColor: background
        }
});