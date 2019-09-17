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
                        listOrder: []
                };
        }


        async _getInfoAccountFromLocal () {
                this.setState({
                        isLoading: true
                });
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                this.setState({
                        account: account
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
                if (nextProps.listOrder !== prevState.listOrder && nextProps !== undefined) {
                        prevState.listOrder = nextProps.listOrder;
                }
                return null;
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
                                                keyExtractor={(item, index) => item._id}
                                                refreshing={this.state.isLoading}
                                                renderItem={() => {
                                                        return (
                                                                <ItemFlatList

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