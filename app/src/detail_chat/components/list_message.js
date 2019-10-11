import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, FlatList } from 'react-native';
import ItemMessage from '../containers/item_message';
import { socket } from '../../socket';

export default class ListMessage extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        idAccountSend: props.idAccountSend,
                        idAccountReceiver: props.idAccountReceiver,
                        idConversation: props.idConversation,
                        accountReceiver: props.accountReceiver,
                        isLoading: false,
                        listMessage: [],
                        isRefresh: false,
                        isLoadMore: false,
                        page: 1,
                        total_page: null,
                        socket_send: false
                };
                this.receiverMessageFromServer();
        }

        async receiverMessageFromServer () {
                await socket.on('server-send-message-chat', (data) => {
                        const list = [data, ...this.state.listMessage];
                        this.setState({
                                listMessage: list,
                                isLoading: true,
                        });
                        this.props.onResetPropsMessageListMessage();
                });
        }


        componentDidMount () {
                this.props.onFetchListMessage(this.state.idConversation, 1);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.page !== prevState.page && nextProps.page !== undefined && !prevState.isLoading) {
                        prevState.page = nextProps.page;
                }
                if (nextProps.total_page !== prevState.total_page && nextProps.total_page !== undefined && !prevState.isLoading) {
                        prevState.total_page = nextProps.total_page;
                }
                if (nextProps.listMessage !== prevState.listMessage && nextProps.listMessage !== undefined && !prevState.isRefresh && !prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listMessage = nextProps.listMessage;
                } else if (nextProps.listMessage !== prevState.listMessage && nextProps.listMessage !== undefined && prevState.isRefresh && !prevState.isLoadMore && prevState.isLoading) {
                        prevState.listMessage = nextProps.listMessage;
                        prevState.isLoading = false;
                } else if (nextProps.listMessage !== prevState.listMessage && nextProps.listMessage !== undefined && !prevState.isRefresh && prevState.isLoadMore && !prevState.isLoading) {
                        prevState.listMessage = prevState.listMessage.concat(nextProps.listMessage);
                        prevState.isLoadMore = false;
                }
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                nextProps.message,
                                [
                                        {
                                                text: 'OK',
                                                onPress: () => nextProps.onResetPropsMessageListMessage()
                                        },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }

        onRefresh () {
                this.setState({
                        page: 1,
                        isLoading: true,
                        isRefresh: true
                });
                this.props.onFetchListMessage(this.state.idConversation, 1);
        }

        onLoadMore () {
                const page = this.state.page;
                const total_page = this.state.total_page;
                if (page < total_page) {
                        this.setState({
                                isLoading: true,
                                isLoadMore: true
                        });
                        this.props.onFetchListMessage(this.state.idConversation, page + 1);
                }
        }

        componentWillUnmount () {
                this.props.onResetPropsListMessage();
        }
        render () {
                return (
                        <View style={styles.container}>
                                <FlatList
                                        data={this.state.listMessage}

                                        extraData={this.state}
                                        keyExtractor={(item, index) => index.toString()}
                                        showsVerticalScrollIndicator={false}
                                        refreshing={this.state.isLoading}
                                        // onRefresh={() => {
                                        //         this.onRefresh();
                                        // }}
                                        onEndReached={() => {
                                                this.onLoadMore();
                                        }}
                                        inverted={true}
                                        onEndReachedThreshold={0.1}
                                        renderItem={(item) => {
                                                console.log('item: ', item.item.content);
                                                return (
                                                        <ItemMessage
                                                                item={item.item}
                                                                idAccountSend={this.state.idAccountSend}
                                                                accountReceiver={this.state.accountReceiver}
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
                flex: 1,
                paddingHorizontal: 20
        }
});