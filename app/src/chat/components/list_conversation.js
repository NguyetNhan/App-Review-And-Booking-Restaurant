import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { AccountModel } from '../../models/account';
import ItemConversation from './item_conversation';

export default class ListConversation extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        listConversation: [],
                        isLoading: true,
                        page: 1,
                        total_page: null,
                        account: null,
                        isRefresh: false,
                        isLoadMore: false
                };
                this.fetchInfoAccountFromLocal();
                this.onChangeScreenDetailChat = this.onChangeScreenDetailChat.bind(this);
        }

        async fetchInfoAccountFromLocal () {
                const result = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (result.error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                result.message,
                                [
                                        {
                                                text: 'OK',
                                        },
                                ],
                                { cancelable: false },
                        );
                } else {
                        this.setState({
                                account: result.data,
                        });
                        this.props.onFetchListConversation(result.data.id, 1);
                }

        }

        componentDidMount () {
                //       this.fetchInfoAccountFromLocal();
        }

        static getDerivedStateFromProps (nextProps, prevState) {

                if (nextProps.listConversation !== prevState.listConversation && nextProps.listConversation !== undefined && !prevState.isRefresh && !prevState.isLoadMore) {
                        if (nextProps.listConversation.length === 0) {
                                let list = ['1', ...nextProps.listConversation];
                                prevState.listConversation = list;
                        } else {
                                prevState.listConversation = nextProps.listConversation;
                        }
                } else if (nextProps.listConversation !== prevState.listConversation && nextProps.listConversation !== undefined && prevState.isRefresh && !prevState.isLoadMore && !prevState.isLoading) {
                        if (nextProps.listConversation.length === 0) {
                                let list = ['1', ...nextProps.listConversation];
                                prevState.listConversation = list;
                        } else {
                                prevState.listConversation = nextProps.listConversation;
                        }
                        prevState.isRefresh = false;
                } else if (nextProps.listConversation !== prevState.listConversation && nextProps.listConversation !== undefined && !prevState.isRefresh && prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listConversation = prevState.listConversation.concat(nextProps.listConversation);
                        prevState.isLoadMore = false;
                }

                if (nextProps.page !== prevState.page && nextProps.page !== undefined && !prevState.isLoading) {
                        prevState.page = nextProps.page;
                }
                if (nextProps.total_page !== prevState.total_page && nextProps.total_page !== undefined && !prevState.isLoading) {
                        prevState.total_page = nextProps.total_page;
                }
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.messageSucceeded !== undefined && !prevState.isLoading) {
                        Alert.alert(
                                'Thông Báo',
                                nextProps.messageSucceeded,
                                [
                                        {
                                                text: 'OK',
                                                onPress: () => nextProps.onResetPropsMessageListConversation()
                                        },
                                ],
                                { cancelable: false },
                        );
                }
                if (nextProps.messageFailed !== undefined && !prevState.isLoading) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                nextProps.messageFailed,
                                [
                                        {
                                                text: 'OK',
                                                onPress: () => nextProps.onResetPropsMessageListConversation()
                                        },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }

        onRefresh () {
                if (!this.state.isLoading) {
                        this.setState({
                                page: 1,
                                listConversation: [],
                                isLoading: true,
                                isRefresh: true
                        });
                        this.props.onFetchListConversation(this.state.account.id, 1);
                }

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
                                this.props.onFetchListConversation(this.state.account.id, page + 1);
                        }
                }
        }

        onChangeScreenDetailChat (idConversation, idAccountReceiver) {
                this.props.onChangeScreenDetailChat(idConversation, idAccountReceiver);
        }

        componentWillUnmount () {
                this.props.onResetPropsListConversation();
        }

        render () {
                return (
                        <FlatList
                                data={this.state.listConversation}
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
                                        if (item.item === '1')
                                                return (
                                                        <View>
                                                                <Text style={{
                                                                        textTransform: 'capitalize',
                                                                        marginVertical: 5,
                                                                        fontFamily: 'UVN-Baisau-Regular',
                                                                }}>không có tin nhắn</Text>
                                                        </View>
                                                );
                                        else {
                                                return (
                                                        <ItemConversation
                                                                item={item.item}
                                                                account={this.state.account}
                                                                onChangeScreenDetailChat={this.onChangeScreenDetailChat}
                                                        />
                                                );
                                        }
                                }}
                        />
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        }
});