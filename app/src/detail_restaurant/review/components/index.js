import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Modal, FlatList, ScrollView, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { AccountModel } from '../../../models/account';
import { background, urlServer, colorMain } from '../../../config';
import ItemReview from './item_review';
export default class Review extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        title: 'đánh giá',
                }
        }
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        idRestaurant: null,
                        showButtonReview: false,
                        listReview: [],
                        refreshing: false,
                        isRefresh: false,
                        page: 1,
                        total_page: 1,
                        isLoadMore: false,
                }
        }

        async  getInfoAccountFormLocal () {
                const id = this.props.navigation.getParam('IdConfigDetailRestaurant');
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                this.setState({
                        account: account,
                        idRestaurant: id.idRestaurant,
                        refreshing: true,
                });
                this.props.onFetchListReview({
                        page: 1,
                        idRestaurant: id.idRestaurant
                });
        }

        componentDidMount () {
                this.getInfoAccountFormLocal();
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.refreshing !== prevState.refreshing && nextProps.refreshing !== undefined) {
                        prevState.refreshing = nextProps.refreshing
                }
                if (nextProps.listReview !== prevState.listReview && nextProps.listReview !== undefined && !prevState.isRefresh && !prevState.isLoadMore && !prevState.refreshing) {
                        prevState.listReview = nextProps.listReview;
                } else if (nextProps.listReview !== prevState.listReview && nextProps.listReview !== undefined && prevState.isRefresh && !prevState.isLoadMore && !prevState.refreshing) {
                        prevState.listReview = nextProps.listReview;
                        prevState.isRefresh = false;
                } else if (nextProps.listReview !== prevState.listReview && nextProps.listReview !== undefined && !prevState.isRefresh && prevState.isLoadMore && !prevState.refreshing) {
                        prevState.listReview = prevState.listReview.concat(nextProps.listReview);
                        prevState.isLoadMore = false;
                }
                if (nextProps.page !== prevState.page && nextProps.page !== undefined && !prevState.refreshing && nextProps.page !== undefined) {
                        prevState.page = nextProps.page
                }
                if (nextProps.total_page !== prevState.total_page && nextProps.total_page !== undefined && !prevState.refreshing && nextProps.total_page !== undefined) {
                        prevState.total_page = nextProps.total_page
                }
                if (nextProps.messageFailed !== undefined && !prevState.isLoading && !prevState.refreshing) {
                        Alert.alert(
                                'Thông Báo',
                                nextProps.messageFailed,
                                [
                                        { text: 'OK', onPress: () => nextProps.onResetPropsMessage() },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }

        _onRefresh () {
                this.setState({
                        page: 1,
                        listReview: [],
                        refreshing: true,
                        isRefresh: true
                })
                this.props.onFetchListReview({
                        page: 1,
                        idRestaurant: this.state.idRestaurant
                });
        }

        _onLoadMore = () => {
                const page = this.state.page;
                const total_page = this.state.total_page;
                if (page < total_page) {
                        const data = {
                                page: page + 1,
                                idRestaurant: this.state.idRestaurant
                        };
                        this.setState({
                                refreshing: true,
                                isLoadMore: true
                        })
                        this.props.onFetchListReview(data);
                }
        }

        componentWillUnmount () {
                this.props.onResetProps();
        }

        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor={background}
                                        barStyle='dark-content'
                                />
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('Home');
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>đánh giá</Text>
                                        <View style={{
                                                width: 25
                                        }} />
                                </View>
                                <View style={styles.content}>
                                        <View style={styles.containerFlatList}>
                                                <FlatList
                                                        data={this.state.listReview}
                                                        extraData={this.state}
                                                        keyExtractor={(item, index) => index.toString()}
                                                        showsVerticalScrollIndicator={false}
                                                        refreshing={this.state.refreshing}
                                                        onRefresh={() => {
                                                                this._onRefresh()
                                                        }}
                                                        onEndReached={() => {
                                                                this._onLoadMore();
                                                        }}
                                                        onEndReachedThreshold={0.1}
                                                        renderItem={(item) => {
                                                                const score = item.item.score;
                                                                var listStar = [];
                                                                for (let i = 0; i < 5; i++) {
                                                                        if (i <= score - 1)
                                                                                listStar.push({
                                                                                        index: i,
                                                                                        isChecked: true
                                                                                });
                                                                        else
                                                                                listStar.push({
                                                                                        index: i,
                                                                                        isChecked: false
                                                                                });
                                                                }
                                                                return (
                                                                        <ItemReview
                                                                                item={item.item}
                                                                                star={listStar}
                                                                        />
                                                                )
                                                        }}
                                                />
                                        </View>
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
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center'
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 18,
                textTransform: 'capitalize'
        },
        content: {
                flex: 1,
                paddingHorizontal: 20,
        },
        containerFlatList: {
                flex: 1
        },

        containerLoading: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.9)'
        }
});