import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { urlServer, colorMain, background } from '../../config';

export default class ItemMessage extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        content: props.content,
                        idSender: props.idSender,
                        idAccountSend: props.idAccountSend,
                        accountReceiver: props.accountReceiver
                };
        }

        render () {
                if (this.props.idSender === this.state.accountReceiver._id)
                        return (
                                <View style={styles.containerReceiver}>
                                        {
                                                this.state.accountReceiver.avatar === null ?
                                                        <Image
                                                                source={require('../../assets/images/avatar_user.png')}
                                                                style={styles.image}
                                                        /> :
                                                        <Image
                                                                source={{ uri: `${urlServer}${this.state.accountReceiver.avatar}` }}
                                                                style={styles.image}
                                                        />
                                        }
                                        <Text style={styles.textMessageReceiver}>{this.props.content}</Text>
                                </View>
                        );
                else
                        return (
                                <View style={styles.containerSend}>
                                        <View style={{
                                                flexDirection: 'row',
                                                width: width * 3 / 4,
                                                justifyContent: 'flex-end'
                                        }}>
                                                <View />
                                                <Text style={styles.textMessageSend}>{this.props.content}</Text>
                                        </View>
                                </View>
                        );
        }
}

const styles = StyleSheet.create({
        containerReceiver: {
                flexDirection: 'row',
                width: width * 3 / 4,
                marginVertical: 5,
        },
        containerSend: {
                flex: 1,
                marginVertical: 5,
                alignItems: 'flex-end'
        },
        image: {
                width: 40,
                height: 40,
                borderRadius: 20
        },
        textMessageReceiver: {
                backgroundColor: background,
                marginLeft: 10,
                borderRadius: 10,
                padding: 10,
                fontFamily: 'OpenSans-Regular',
                textAlign: 'left'
        },
        textMessageSend: {
                backgroundColor: '#5578e1',
                borderRadius: 10,
                padding: 10,
                fontFamily: 'OpenSans-Regular',
                textAlign: 'right'
        }
});