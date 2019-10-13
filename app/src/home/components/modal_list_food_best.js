import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { background } from '../../config';
import ItemListModalFoodBest from './item_list_modal_food_best';
import Icon from 'react-native-vector-icons/AntDesign';

export default class ModalListFood extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        listFood: [],
                        isLoading: false,
                        page: 1,
                        total_page: null,
                        isRefresh: false,
                        isLoadMore: false
                };
                this.onChangeScreenDetailPlace = this.onChangeScreenDetailPlace.bind(this);
                this.onCloseModalListFoodBest = this.onCloseModalListFoodBest.bind(this);
        }

        componentDidMount () {
                this.props.onFetchFoodTheBestForModal(1);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.listFood !== prevState.listFood && nextProps.listFood !== undefined && !prevState.isRefresh && !prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listFood = nextProps.listFood;
                } else if (nextProps.listFood !== prevState.listFood && nextProps.listFood !== undefined && prevState.isRefresh && !prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listFood = nextProps.listFood;
                        prevState.isRefresh = false;
                } else if (nextProps.listFood !== prevState.listFood && nextProps.listFood !== undefined && !prevState.isRefresh && prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listFood = prevState.listFood.concat(nextProps.listFood);
                        prevState.isLoadMore = false;
                }
                if (nextProps.messages !== undefined) {
                        Alert.alert(
                                'Thông Báo',
                                nextProps.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                }
                if (nextProps.page !== prevState.page && nextProps.page !== undefined && !prevState.isLoading) {
                        prevState.page = nextProps.page;
                }
                if (nextProps.total_page !== prevState.total_page && nextProps.total_page !== undefined && !prevState.isLoading) {
                        prevState.total_page = nextProps.total_page;
                }
                return null;
        }
        onRefresh () {
                this.setState({
                        page: 1,
                        listFood: [],
                        isLoading: true,
                        isRefresh: true
                });
                this.props.onFetchFoodTheBestForModal(1);
        }

        onLoadMore () {
                const page = this.state.page;
                const total_page = this.state.total_page;
                if (page < total_page) {
                        this.setState({
                                isLoading: true,
                                isLoadMore: true
                        });
                        this.props.onFetchFoodTheBestForModal(page + 1);
                }
        }

        onChangeScreenDetailPlace (idRestaurant, idAdmin) {
                this.props.onChangeScreenDetailPlace(idRestaurant, idAdmin);
        }

        onCloseModalListFoodBest () {
                this.props.onCloseModalListFoodBest();
        }

        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.onCloseModalListFoodBest();
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.flatList}>
                                        <FlatList
                                                data={this.state.listFood}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                refreshing={this.state.isLoading}
                                                showsVerticalScrollIndicator={false}
                                                onRefresh={() => {
                                                        this.onRefresh();
                                                }}
                                                onEndReached={() => {
                                                        this.onLoadMore();
                                                }}
                                                onEndReachedThreshold={0.1}
                                                renderItem={(item) => {
                                                        return (
                                                                <ItemListModalFoodBest
                                                                        item={item.item}
                                                                        onChangeScreenDetailPlace={this.onChangeScreenDetailPlace}
                                                                        onCloseModalListFoodBest={this.onCloseModalListFoodBest}
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
                alignItems: 'center'
        },
        flatList: {
                flex: 1,
                paddingHorizontal: 20
        }
});