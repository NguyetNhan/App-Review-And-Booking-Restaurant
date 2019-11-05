import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { background, colorMain } from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { socket } from '../../socket';
export default class SendMessage extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        textMessage: '',
                        idConversation: props.idConversation,
                        idAccountSend: props.idAccountSend,
                        isTyping: false
                };
                this.sendStatusTyping();
                socket.on('server-send-status-typing', (data) => {
                        if (data.idAccountSend !== this.state.idAccountSend) {
                                this.setState({
                                        isTyping: true
                                });
                        } else {
                                this.setState({
                                        isTyping: false
                                });
                        }

                });
                socket.on('server-send-status-stop-typing', (data) => {
                        this.setState({
                                isTyping: false
                        });
                });
        }

        async sendStatusTyping () {
                this.intervalIdSend = setInterval(() => {
                        if (this.state.textMessage.length === 0) {
                                socket.emit('user-stop-typing', {
                                        isTyping: false,
                                        idAccountSend: this.state.idAccountSend
                                });
                        } else {
                                socket.emit('user-typing', {
                                        isTyping: true,
                                        idAccountSend: this.state.idAccountSend
                                });
                        }
                }, 1500);
        }

        onSend () {
                const textMessage = this.state.textMessage;
                if (textMessage.length > 0) {
                        socket.emit('user-send-message', {
                                content: this.state.textMessage,
                                idSender: this.state.idAccountSend,
                                createDate: new Date(),
                                idConversation: this.state.idConversation
                        });
                        this.props.onSendMessage(this.state.idConversation, this.state.idAccountSend, this.state.textMessage);
                        this.setState({
                                textMessage: ''
                        });
                }
        }

        componentWillUnmount () {
                clearInterval(this.intervalIdSend);
        }
        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.contentInput}>
                                        <TextInput
                                                style={styles.textInput}
                                                placeholder='Nhập nội dung tin nhắn'
                                                multiline={true}
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                textMessage: text
                                                        });
                                                }}
                                                value={this.state.textMessage}
                                        />
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.onSend();
                                                }}
                                        >
                                                <Icon
                                                        name='send' size={30} color={colorMain}
                                                />
                                        </TouchableOpacity>
                                </View>
                                {
                                        this.state.isTyping ?
                                                <View style={styles.status}>
                                                        <Text style={styles.textStatus}>Đang nhập tin nhắn...</Text>
                                                </View> :
                                                null
                                }
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                height: 70,
                borderTopWidth: 1,
                borderColor: background,
        },
        contentInput: {
                flex: 1,
                flexDirection: 'row',
                paddingHorizontal: 20,
                justifyContent: 'center',
                alignItems: 'center'
        },
        textInput: {
                flex: 1,
                backgroundColor: background,
                marginRight: 10,
                borderRadius: 10,
                paddingHorizontal: 10
        },
        status: {
                position: 'absolute',
                top: -20,
                paddingHorizontal: 20
        },
        textStatus: {
                fontFamily: 'OpenSans-Regular',
                fontSize: 12,
                color: 'gray'
        }
});