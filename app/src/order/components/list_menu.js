import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import ItemMenu from './item_menu';
import { urlServer, colorMain, background } from '../../config';

export default class ListMenu extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        listMenu: [],
                        isLoading: false,
                        idRestaurant: props.idRestaurant,
                        page: 1,
                        total_page: null,
                        isRefresh: false,
                        isLoadMore: false,
                        changePage: null
                };
                this._onChangeAmount = this._onChangeAmount.bind(this);
                this._onChangeSelected = this._onChangeSelected.bind(this);
        }

        componentDidMount () {
                this.props.onFetchListMenu({
                        idRestaurant: this.state.idRestaurant,
                        page: 1
                });
        }
        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.listMenu !== prevState.listMenu && nextProps.listMenu !== undefined && prevState.isRefresh && !prevState.isLoadMore) {
                        prevState.isRefresh = false;
                } else if (nextProps.listMenu !== prevState.listMenu && nextProps.listMenu !== undefined && !prevState.isRefresh && !prevState.isLoadMore) {
                        prevState.listMenu = nextProps.listMenu;
                } else if (nextProps.listMenu !== prevState.listMenu && nextProps.listMenu !== undefined && !prevState.isRefresh && prevState.isLoadMore) {
                        prevState.listMenu = prevState.listMenu.concat(nextProps.listMenu);
                        prevState.isLoadMore = false;
                }
                if (nextProps.isLoading !== prevState.isLoading) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.changePage !== undefined) {
                        if (nextProps.changePage == 'settling') {
                                var listSelected = [];
                                var totalMoney = 0;
                                for (item of prevState.listMenu) {
                                        if (item.isSelected) {
                                                const money = item.price;
                                                totalMoney = totalMoney + (money * Number.parseInt(item.amount));
                                                listSelected.push({
                                                        idFood: item._id,
                                                        amount: Number.parseInt(item.amount)
                                                });
                                        }
                                }
                                nextProps._setListFoodSelected({
                                        list: listSelected,
                                        totalMoney: totalMoney
                                });
                        }
                }
                return null;
        }

        _onRefreshListMenu () {
                this.setState({
                        page: 1,
                        listMenu: [],
                        isLoading: true,
                        isRefresh: true
                });
                this.props.onFetchListMenu({
                        idRestaurant: this.state.idRestaurant,
                        page: 1
                });
        }

        _onLoadMoreListOrder () {
                const page = this.state.page;
                const total_page = this.state.total_page;
                if (page < total_page) {
                        this.props.onFetchListMenu({
                                idRestaurant: this.state.idRestaurant,
                                page: page + 1
                        });
                        this.setState({
                                isLoading: true,
                                isLoadMore: true
                        });
                }
        }

        _onChangeSelected (index) {
                this.state.listMenu[index].isSelected = !this.state.listMenu[index].isSelected;
        }

        _onChangeAmount (index, amount) {
                this.state.listMenu[index].amount = amount;
        }
        render () {
                return (
                        < View style={styles.container} >
                                <View style={styles.flatList}>
                                        <FlatList
                                                data={this.state.listMenu}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                refreshing={this.state.isLoading}
                                                onRefresh={() => this._onRefreshListMenu()}
                                                onEndReachedThreshold={0.1}
                                                onEndReached={() => this._onLoadMoreListOrder()}
                                                renderItem={(item) => {
                                                        return (
                                                                <ItemMenu
                                                                        index={item.index}
                                                                        item={item.item}
                                                                        _onChangeSelected={this._onChangeSelected}
                                                                        _onChangeAmount={this._onChangeAmount}
                                                                />
                                                        );
                                                }}
                                        />
                                </View>
                                <View style={styles.containerButtonNavigator}>
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.props._onClickButtonPrevious();
                                                }}
                                                style={styles.button}>
                                                <Text style={styles.textButton}>quay lại</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.props._onClickButtonNext();
                                                }}
                                                style={styles.button}>
                                                <Text style={styles.textButton}>tiếp</Text>
                                        </TouchableOpacity>
                                </View>
                        </View >
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        flatList: {
                flex: 1
        },
        containerButtonNavigator: {
                flexDirection: 'row',
                marginHorizontal: 20,
                marginBottom: 30,
                justifyContent: 'space-between'
        },
        button: {
                width: 70,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colorMain,
                borderRadius: 10,
        },
        textButton: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'uppercase'
        }
});