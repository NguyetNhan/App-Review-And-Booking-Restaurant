import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { urlServer, colorMain } from '../../config';
const { width, height } = Dimensions.get('window');
import { socket } from '../../socket';

export default class ItemConversation extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        accountSend: props.account,
                        accountReceiver: null,
                        isLoading: true,
                        isCheckOnline: false,
                        tinNhanMoiNhat: null
                };
                this.checkAccountReceiverOnline();
        }

        async checkAccountReceiverOnline () {
                this.intervalId = setInterval(() => {
                        if (this.state.accountReceiver !== null) {
                                socket.emit('idClientOnline', (listId) => {
                                        var checked = false;
                                        for (item of listId) {
                                                if (this.state.accountReceiver._id === item.idAccount) {
                                                        checked = true;
                                                        break;
                                                }
                                        }
                                        if (checked) {
                                                this.setState({
                                                        isCheckOnline: true
                                                });
                                        } else {
                                                this.setState({
                                                        isCheckOnline: false
                                                });
                                        }
                                });
                        }
                }, 1000);
        }

        async  componentDidMount () {
                for (item of this.state.item.participant) {
                        if (item !== this.state.accountSend.id) {
                                try {
                                        const response = await fetch(`${urlServer}/auth/id/${item}`, {
                                                method: 'GET',
                                                headers: {
                                                        Accept: 'application/json',
                                                        'Content-Type': 'application/json',
                                                },
                                        }).then(value => value.json());
                                        if (response.error) {
                                                Alert.alert('Thông Báo Lỗi', response.message);
                                                this.setState({
                                                        isLoading: false
                                                });
                                        } else {
                                                this.setState({
                                                        accountReceiver: response.data,
                                                        isLoading: false
                                                });
                                        }
                                } catch (error) {
                                        Alert.alert('Thông Báo Lỗi', error.message);
                                        this.setState({
                                                isLoading: false
                                        });
                                }
                                break;
                        }
                }

                try {
                        const response = await fetch(`${urlServer}/message/get-new-message/idConversation/${this.state.item._id}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                },
                        }).then(value => value.json());
                        if (response.error) {
                                Alert.alert('Thông Báo Lỗi', response.message);
                        } else {
                                this.setState({
                                        tinNhanMoiNhat: response.data,
                                });
                        }
                } catch (error) {
                        Alert.alert('Thông Báo Lỗi', error.message);
                }
        }

        componentWillUnmount () {
                clearInterval(this.intervalId);
        }

        render () {
                if (this.state.isLoading)
                        return (
                                <View style={styles.containerLoading}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={30}
                                                color={colorMain}
                                        />
                                </View>
                        );
                else
                        return (
                                <TouchableOpacity
                                        onPress={() => {
                                                this.props.onChangeScreenDetailChat(this.state.item._id, this.state.accountReceiver._id);
                                        }}
                                        style={styles.container}>
                                        {
                                                this.state.accountReceiver === null ? null :
                                                        this.state.accountReceiver.avatar === null ?
                                                                this.state.isCheckOnline ?
                                                                        <Image
                                                                                source={require('../../assets/images/avatar_user.png')}
                                                                                style={styles.imageOnline}
                                                                        /> :
                                                                        <Image
                                                                                source={require('../../assets/images/avatar_user.png')}
                                                                                style={styles.image}
                                                                        />
                                                                :
                                                                this.state.isCheckOnline ?
                                                                        <Image
                                                                                source={{ uri: `${urlServer}${this.state.accountReceiver.avatar}` }}
                                                                                style={styles.imageOnline}
                                                                        /> :
                                                                        <Image
                                                                                source={{ uri: `${urlServer}${this.state.accountReceiver.avatar}` }}
                                                                                style={styles.image}
                                                                        />
                                        }
                                        <View style={styles.contentValue}>
                                                {
                                                        this.state.accountReceiver === null ? null :
                                                                <Text style={styles.name}>{this.state.accountReceiver.name}</Text>
                                                }

                                                {
                                                        this.state.tinNhanMoiNhat === null ? null :
                                                                this.state.accountSend.id === this.state.tinNhanMoiNhat.idSender ?
                                                                        <Text
                                                                                numberOfLines={1}
                                                                                ellipsizeMode='tail'
                                                                                style={styles.textMessage}>Bạn: {this.state.tinNhanMoiNhat.content}
                                                                        </Text> :
                                                                        <Text
                                                                                numberOfLines={1}
                                                                                ellipsizeMode='tail'
                                                                                style={styles.textMessage}>{this.state.tinNhanMoiNhat.content}
                                                                        </Text>
                                                }
                                        </View>
                                </TouchableOpacity>
                        );
        }
}

const styles = StyleSheet.create({
        container: {
                height: 60,
                width: width,
                flexDirection: 'row',
                paddingHorizontal: 20,
                marginVertical: 10
        },
        containerLoading: {
                alignItems: 'center',
                justifyContent: 'center',
                height: 60
        },
        image: {
                width: 50,
                height: 50,
                borderRadius: 25
        },
        imageOnline: {
                width: 50,
                height: 50,
                borderRadius: 25,
                borderWidth: 5,
                borderColor: colorMain
        },
        contentValue: {
                marginLeft: 10,
                flex: 1,
                justifyContent: 'center'
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20
        },
        textMessage: {
                color: 'gray',
                fontFamily: 'UVN-Baisau-Regular',
        }
});