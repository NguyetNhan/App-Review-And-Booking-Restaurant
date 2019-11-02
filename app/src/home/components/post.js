import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import ItemPostList from './item_post_list';
export default class Posts extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        postList: [],
                        page: 1,
                        total_page: null,
                        isLoading: true,
                        isRefresh: false,
                        isLoadMore: false,
                };
                this.onChangeScreenDetailPlace = this.onChangeScreenDetailPlace.bind(this);
                this.onRefreshMain = this.onRefreshMain.bind(this);
        }

        componentDidMount () {
                this.props.onFetchPostList(1);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.postList !== prevState.postList && nextProps.postList !== undefined && !prevState.isRefresh && !prevState.isLoadMore) {
                        if (nextProps.postList.length === 0) {
                                let list = ['1', ...nextProps.postList];
                                prevState.postList = list;
                        } else {
                                prevState.postList = nextProps.postList;
                        }
                } else if (nextProps.postList !== prevState.postList && nextProps.postList !== undefined && prevState.isRefresh && !prevState.isLoadMore && !prevState.isLoading) {
                        if (nextProps.postList.length === 0) {
                                let list = ['1', ...nextProps.postList];
                                prevState.postList = list;
                        } else {
                                prevState.postList = nextProps.postList;
                        }
                        prevState.isRefresh = false;
                } else if (nextProps.postList !== prevState.postList && nextProps.postList !== undefined && !prevState.isRefresh && prevState.isLoadMore && !prevState.isLoading) {
                        prevState.postList = prevState.postList.concat(nextProps.postList);
                        prevState.isLoadMore = false;
                }

                if (nextProps.messages !== undefined) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                nextProps.messages,
                                [
                                        {
                                                text: 'OK',
                                                onPress: () => nextProps.onResetPropsMessagePost()
                                        },
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
                this.props.onResetPropsPost();
                if (!this.state.isLoading) {
                        this.setState({
                                page: 1,
                                postList: [],
                                isLoading: true,
                                isRefresh: true
                        });
                        this.props.onFetchPostList(1);
                }
        }

        onChangeScreenDetailPlace (idRestaurant, idAdmin) {
                this.props.onChangeScreenDetailPlace(idRestaurant, idAdmin);
        }

        onLoadMore () {
                if (!this.state.isLoading) {
                        const page = this.state.page;
                        const total_page = this.state.total_page;
                        if (page < total_page) {
                                this.setState({
                                        isLoading: true,
                                        isLoadMore: true
                                });
                                this.props.onFetchPostList(page + 1);
                        }
                }
        }

        onRefreshMain () {
                this.onRefresh();
        }


        componentWillUnmount () {
                this.props.onResetPropsPost();
        }

        render () {
                return (
                        <View style={styles.container}>
                                <FlatList
                                        data={this.state.postList}
                                        extraData={this.state}
                                        keyExtractor={(item, index) => index.toString()}
                                        refreshing={this.state.isLoading}
                                        onRefresh={() => {
                                                this.onRefresh();
                                        }}
                                        onEndReachedThreshold={0.2}
                                        onEndReached={() => {
                                                this.onLoadMore();
                                        }}
                                        renderItem={(item) => {
                                                if (item.item === '1') {
                                                        return (
                                                                <Text style={styles.textNote}>chưa có bài viết nào !</Text>
                                                        );
                                                }
                                                else
                                                        return (
                                                                <ItemPostList
                                                                        item={item.item}
                                                                        onChangeScreenDetailPlace={this.onChangeScreenDetailPlace}
                                                                        onRefreshMain={this.onRefreshMain}
                                                                />
                                                        );
                                        }}
                                />
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        textNote: {
                flex: 1,
                alignItems: 'center',
                marginTop: 10,
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 20,
                textAlign: 'center',
                marginHorizontal: 20,
                textTransform: 'capitalize',
        }
});