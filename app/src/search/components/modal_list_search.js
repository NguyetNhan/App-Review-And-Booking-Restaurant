import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { background, colorMain } from '../../config';
import Icon from 'react-native-vector-icons/Feather';
import ItemListModal from './item_list_modal';

export default class ModalListSearch extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        type: props.type,
                        textSearch: props.contentSearch,
                        isLoading: true,
                        isRefresh: false,
                        isLoadMore: false,
                        listSearch: [],
                        page: 1,
                        total_page: null,
                        count_item: null
                };
                this.onClickItem = this.onClickItem.bind(this);
        }

        componentDidMount () {
                this.props.onSearchWithType(this.state.type, this.state.textSearch, 1);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.listSearch !== prevState.listSearch && nextProps.listSearch !== undefined && !prevState.isRefresh && !prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listSearch = nextProps.listSearch;
                } else if (nextProps.listSearch !== prevState.listSearch && nextProps.listSearch !== undefined && prevState.isRefresh && !prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listSearch = nextProps.listSearch;
                        prevState.isRefresh = false;
                } else if (nextProps.listSearch !== prevState.listSearch && nextProps.listSearch !== undefined && !prevState.isRefresh && prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listSearch = prevState.listSearch.concat(nextProps.listSearch);
                        prevState.isLoadMore = false;
                }
                if (nextProps.count_item !== prevState.count_item && nextProps.count_item !== undefined) {
                        prevState.count_item = nextProps.count_item;
                }
                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo Lỗi ',
                                nextProps.message,
                                [
                                        { text: 'OK', onPress: () => nextProps.onResetPropsMessageModal() },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }

        onRefresh () {
                this.setState({
                        page: 1,
                        listSearch: [],
                        isLoading: true,
                        isRefresh: true
                });
                this.props.onSearchWithType(this.state.type, this.state.textSearch, 1);
        }

        onLoadMore () {
                const page = this.state.page;
                const total_page = this.state.total_page;
                if (page < total_page) {
                        this.setState({
                                isLoading: true,
                                isLoadMore: true
                        });
                        this.props.onSearchWithType(this.state.type, this.state.textSearch, page + 1);
                }
        }

        onClickItem (idRestaurant, idAdmin) {
                this.props.onCloseModalListSearch();
                this.props._onClickItemRestaurant(idRestaurant, idAdmin);
        }


        componentWillUnmount () {
                this.props.onResetPropsModal();
        }

        render () {
                const listData = [0, ...this.state.listSearch];
                return (
                        <View style={styles.container}>
                                <View style={styles.containerHeader}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.onCloseModalListSearch();
                                        }}>
                                                <Icon name='arrow-left' size={25} color='black' />
                                        </TouchableOpacity>
                                        <TextInput
                                                style={styles.textInput}
                                                placeholder='Tìm Kiếm'
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                textSearch: text
                                                        });
                                                        this.onRefresh();
                                                }}
                                                value={this.state.textSearch}
                                        />
                                </View>
                                {
                                        this.state.type === 'restaurant' ?
                                                <View style={styles.containerNote}>
                                                        <Text style={styles.textNote}>*Chỉ Tìm Kiếm Các Địa Điểm Ăn Uống</Text>
                                                </View> :
                                                <View style={styles.containerNote}>
                                                        <Text style={styles.textNote}>*Chỉ Tìm Kiếm người dùng</Text>
                                                </View>
                                }


                                <View style={styles.containerFlatList}>
                                        <FlatList
                                                data={listData}
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
                                                        if (item.index === 0)
                                                                return (
                                                                        <View style={styles.containerItemFirst}>
                                                                                <Text style={styles.textFirst}>có {this.state.count_item} kết quả tìm kiếm</Text>
                                                                        </View>
                                                                );
                                                        else
                                                                return (
                                                                        <ItemListModal
                                                                                item={item.item}
                                                                                type={this.state.type}
                                                                                onClickItem={this.onClickItem}
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
                height: 60,
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                paddingHorizontal: 20
        },
        textInput: {
                fontFamily: 'UVN-Baisau-Regular',
                flex: 1,
                backgroundColor: background,
                borderRadius: 30,
                marginLeft: 10,
                paddingHorizontal: 10
        },
        containerFlatList: {
                flex: 1,
        },
        containerItemFirst: {
                alignItems: 'center',

        },
        textFirst: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12
        },
        containerNote: {
                alignItems: 'center',
                marginBottom: 5
        },
        textNote: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                color: 'red'
        }
});