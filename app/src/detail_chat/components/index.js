import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, ActivityIndicator, StatusBar } from 'react-native';
import Header from '../containers/header';
import ListMessage from '../containers/list_message';
import SendMessage from '../containers/send_message';
import { colorMain } from '../../config';
import { AccountModel } from '../../models/account';
import { socket } from '../../socket';

export default class DetailChat extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        idAccountReceiver: props.navigation.getParam('idAccountReceiver', null),
                        idConversation: props.navigation.getParam('idConversation', null),
                        accountReceiver: null,
                        isLoadingIdConversation: true,
                        isLoadingAccountReceiver: true,
                        idAccountSend: null
                };
                this.onGoBack = this.onGoBack.bind(this);
                this.fetchInfoAccountFromLocal();
        }
        async fetchInfoAccountFromLocal () {
                try {
                        const result = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                        if (result.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        result.message,
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                        } else {
                                this.setState({
                                        idAccountSend: result.data.id,
                                });
                                if (this.state.idConversation === null) {
                                        this.props.onCheckConversationExist(result.data.id, this.state.idAccountReceiver);
                                } else {
                                        socket.emit('create-room', this.state.idConversation);
                                        this.setState({
                                                isLoadingIdConversation: false
                                        });
                                }
                                this.props.onFetchInfoAccountReceiver(this.state.idAccountReceiver);
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                }
        }


        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.idConversation !== prevState.idConversation && nextProps.idConversation !== undefined) {
                        prevState.idConversation = nextProps.idConversation;
                        socket.emit('create-room', nextProps.idConversation);
                }
                if (nextProps.isLoadingIdConversation !== prevState.isLoadingIdConversation && nextProps.isLoadingIdConversation !== undefined) {
                        prevState.isLoadingIdConversation = nextProps.isLoadingIdConversation;
                }
                if (nextProps.isLoadingAccountReceiver !== prevState.isLoadingAccountReceiver && nextProps.isLoadingAccountReceiver !== undefined) {
                        prevState.isLoadingAccountReceiver = nextProps.isLoadingAccountReceiver;
                }
                if (nextProps.accountReceiver !== prevState.accountReceiver && nextProps.accountReceiver !== undefined && !prevState.isLoadingAccountReceiver) {
                        prevState.accountReceiver = nextProps.accountReceiver;
                }
                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                nextProps.message,
                                [
                                        {
                                                text: 'OK',
                                                onPress: () => nextProps.onResetPropsMessageMain()
                                        },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }

        onGoBack () {
                this.props.navigation.goBack();
        }

        componentWillUnmount () {
                socket.emit('leave-room-chat', this.state.idConversation);
                this.props.onResetPropsMain();
        }
        render () {
                if (!this.state.isLoadingIdConversation && !this.state.isLoadingAccountReceiver)
                        return (
                                <View style={styles.container}>
                                        <StatusBar
                                                translucent={false}
                                                barStyle='dark-content'
                                                backgroundColor='white'
                                        />
                                        <Header
                                                accountReceiver={this.state.accountReceiver}
                                                onGoBack={this.onGoBack}
                                        />
                                        <ListMessage
                                                idAccountReceiver={this.state.idAccountReceiver}
                                                idConversation={this.state.idConversation}
                                                accountReceiver={this.state.accountReceiver}
                                                idAccountSend={this.state.idAccountSend}
                                        />
                                        <SendMessage
                                                idConversation={this.state.idConversation}
                                                idAccountSend={this.state.idAccountSend}
                                        />
                                </View>
                        );
                else
                        return (
                                <View style={{
                                        flex: 1,
                                        alignItems: 'center'
                                }}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={30}
                                                color={colorMain}
                                        />
                                </View>
                        );

        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
});