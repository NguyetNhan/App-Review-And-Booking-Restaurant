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
                        idAccountSend: props.idAccountSend
                };
        }

        onSend () {
                const textMessage = this.state.textMessage;
                if (textMessage.length > 0) {
                        socket.emit('user-send-message', {
                                content: this.state.textMessage,
                                idSender: this.state.idAccountSend
                        });
                        this.props.onSendMessage(this.state.idConversation, this.state.idAccountSend, this.state.textMessage);
                        this.setState({
                                textMessage: ''
                        });
                }
        }

        render () {
                return (
                        <View style={styles.container}>
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
                );
        }
}

const styles = StyleSheet.create({
        container: {
                height: 70,
                borderTopWidth: 1,
                borderColor: background,
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
        }
});