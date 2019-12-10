import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { urlServer, colorMain, background } from '../../config';
import ItemMenu from '../../order/components/item_menu';

export default class SelectFood extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        idRestaurant: props.idRestaurant,
                        page: 1,
                        total_page: null,
                        foodList: [],
                        isLoading: true,
                        isLoadMore: false,
                        changePage: null,
                        oldFoodList: props.oldFoodList
                };
                this.onChangeAmount = this.onChangeAmount.bind(this);
                this.onChangeSelected = this.onChangeSelected.bind(this);
        }

        componentDidMount () {
                this.fetchListFood(1);
        }

        fetchListFood = async (page) => {
                try {
                        const response = await fetch(`${urlServer}/menu/idRestaurant/${this.state.idRestaurant}/page/${page}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(data => data.json());
                        if (response.error) {
                                this.setState({
                                        isLoading: false
                                })
                                Alert.alert('Thông Báo Lỗi', 'Lấy dữ liệu món ăn thất bại! ' + response.message);
                        } else {
                                for (food of response.data) {
                                        food.isSelected = false;
                                        food.amount = '1';
                                        for (item of this.state.oldFoodList) {
                                                if (item.idFood === food._id) {
                                                        food.isSelected = true;
                                                        food.amount = item.amount.toString();
                                                }
                                        }
                                }
                                //   console.log(this.state.oldFoodList);


                                if (this.state.isLoadMore) {
                                        this.setState({
                                                foodList: [...this.state.foodList, ...response.data],
                                                page: response.page,
                                                total_page: response.total_page,
                                                isLoading: false,
                                                isLoadMore: false
                                        })
                                } else {
                                        this.setState({
                                                foodList: response.data,
                                                page: response.page,
                                                total_page: response.total_page,
                                                isLoading: false
                                        })
                                }

                        }
                } catch (error) {
                        this.setState({
                                isLoading: false
                        })
                        Alert.alert('Thông Báo Lỗi', 'Lấy dữ liệu món ăn thất bại! ' + error.message);
                }
        }

        onRefreshFoodList = () => {
                if (!this.state.isLoading) {
                        this.setState({
                                page: 1,
                                total_page: null,
                                foodList: [],
                                isLoading: true,
                        });
                        this.fetchListFood(1)
                }
        }

        onLoadMoreFoodList = () => {
                if (!this.state.isLoading) {
                        const page = this.state.page;
                        const totalPage = this.state.total_page;
                        if (page < totalPage) {
                                this.setState({
                                        page: 1,
                                        total_page: null,
                                        foodList: [],
                                        isLoading: true,
                                        isLoadMore: true
                                });
                                this.fetchListFood(page + 1)
                        }
                }
        }

        onChangeAmount = (index, amount) => {
                this.state.foodList[index].amount = amount;
        }

        onChangeSelected = (index) => {
                this.state.foodList[index].isSelected = !this.state.foodList[index].isSelected;
        }

        onClickButtonSave = () => {
                let listSelected = [];
                let totalMoneyFood = 0;
                for (item of this.state.foodList) {
                        if (item.isSelected) {
                                const money = item.price;
                                totalMoneyFood = totalMoneyFood + (money * Number.parseInt(item.amount));
                                listSelected.push({
                                        idFood: item._id,
                                        amount: Number.parseInt(item.amount)
                                });
                        }
                }
                this.props.onSetFoodList(listSelected, totalMoneyFood);
                this.props.onCloseModalSelectFood(listSelected);
        }

        onClickCloseModal = () => {
                this.props.onCloseModalSelectFood(this.state.oldFoodList);
        }

        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={this.onClickCloseModal}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>chọn món ăn</Text>
                                        <TouchableOpacity onPress={this.onClickButtonSave}>
                                                <Text style={styles.textButtonSave}>Lưu</Text>
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.content}>
                                        <FlatList
                                                data={this.state.foodList}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                refreshing={this.state.isLoading}
                                                onRefresh={this.onRefreshFoodList}
                                                onEndReachedThreshold={0.1}
                                                onEndReached={this.onLoadMoreFoodList}
                                                renderItem={(item) => {
                                                        return (
                                                                <ItemMenu
                                                                        index={item.index}
                                                                        item={item.item}
                                                                        _onChangeSelected={this.onChangeSelected}
                                                                        _onChangeAmount={this.onChangeAmount}
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
        header: {
                height: 50,
                width: '100%',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                textTransform: 'capitalize'
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 16,
                textTransform: 'capitalize'
        },
        textButtonSave: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain, fontSize: 16
        },
        content: {
                flex: 1
        }
});