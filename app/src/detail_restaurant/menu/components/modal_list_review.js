import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { urlServer, colorMain, background } from '../../../config';
import { API } from '../../review/sagas/API';
import ItemReview from './item_list_review_modal';

export default class ModalListReview extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        itemFood: props.itemFood,
                        listReview: [],
                        isLoading: true,
                        page: 1,
                        total_page: 1
                };
        }
        async fetchListReview () {
                try {
                        const result = await API.fetchListReview({
                                idRestaurant: this.state.itemFood._id,
                                page: 1
                        });
                        if (result.error) {
                                this.setState({
                                        isLoading: false
                                });
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        result.message,
                                        [
                                                { text: 'OK', },
                                        ],
                                        { cancelable: false },
                                );
                        } else {
                                this.setState({
                                        listReview: result.data,
                                        page: result.page,
                                        total_page: result.total_page,
                                        isLoading: false
                                });
                        }
                } catch (error) {
                        this.setState({
                                isLoading: false
                        });
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message,
                                [
                                        { text: 'OK', },
                                ],
                                { cancelable: false },
                        );
                }
        }
        componentDidMount () {
                this.fetchListReview();
        }

        async  onRefresh () {
                this.setState({
                        isLoading: true,
                });
                try {
                        const result = await API.fetchListReview({
                                idRestaurant: this.state.itemFood._id,
                                page: 1
                        });
                        if (result.error) {
                                this.setState({
                                        isLoading: false
                                });
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        result.message,
                                        [
                                                { text: 'OK', },
                                        ],
                                        { cancelable: false },
                                );
                        } else {
                                this.setState({
                                        listReview: result.data,
                                        page: result.page,
                                        total_page: result.total_page,
                                        isLoading: false
                                });
                        }
                } catch (error) {
                        this.setState({
                                isLoading: false
                        });
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message,
                                [
                                        { text: 'OK', },
                                ],
                                { cancelable: false },
                        );
                }

        }

        async   onLoadMore () {
                const page = this.state.page;
                const total_page = this.state.total_page;
                if (page < total_page) {
                        this.setState({
                                isLoading: true,
                        });
                        try {
                                const result = await API.fetchListReview({
                                        idRestaurant: this.state.itemFood._id,
                                        page: page + 1
                                });
                                if (result.error) {
                                        this.setState({
                                                isLoading: false
                                        });
                                        Alert.alert(
                                                'Thông Báo Lỗi',
                                                result.message,
                                                [
                                                        { text: 'OK', },
                                                ],
                                                { cancelable: false },
                                        );
                                } else {
                                        var preListReview = this.state.listReview;
                                        const nextListReview = result.data;
                                        var list = preListReview.concat(nextListReview);
                                        this.setState({
                                                listReview: list,
                                                page: result.page,
                                                total_page: result.total_page,
                                                isLoading: false
                                        });
                                }
                        } catch (error) {
                                this.setState({
                                        isLoading: false
                                });
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        error.message,
                                        [
                                                { text: 'OK', },
                                        ],
                                        { cancelable: false },
                                );
                        }
                }
        }


        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>đánh giá</Text>
                                        <View style={{
                                                width: 25
                                        }} />
                                </View>
                                <View style={styles.containerFlatList}>
                                        <FlatList
                                                data={this.state.listReview}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                showsVerticalScrollIndicator={false}
                                                refreshing={this.state.isLoading}
                                                onRefresh={() => {
                                                        this.onRefresh();
                                                }}
                                                onEndReached={() => {
                                                        this.onLoadMore();
                                                }}
                                                onEndReachedThreshold={0.1}
                                                renderItem={(item) => {
                                                        return (
                                                                <ItemReview
                                                                        item={item.item}
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
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 18,
                textTransform: 'capitalize'
        },
        containerFlatList: {

        }
});