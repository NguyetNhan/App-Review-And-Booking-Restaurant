import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { urlServer, colorMain } from '../../config';
const { width, height } = Dimensions.get('window');

export default class ItemConversation extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        accountSend: props.account,
                        accountReceiver: null,
                        isLoading: true
                };
        }

        componentDidMount () {
                for (item of this.state.item.participant) {
                        if (item !== this.state.accountSend.id) {
                                this.props.onFetchInfoAccountReceiver(item);
                        }
                }
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.accountReceiver !== prevState.accountReceiver && nextProps.accountReceiver !== undefined && !prevState.isLoading) {
                        prevState.accountReceiver = nextProps.accountReceiver;
                }

                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                nextProps.message,
                                [
                                        {
                                                text: 'OK',
                                                onPress: () => nextProps.onResetPropsMessageItemConversation()
                                        },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }

        componentWillUnmount () {
                this.props.onResetPropsItemConversation();
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
                                                this.state.accountReceiver.avatar === null ?
                                                        <Image
                                                                source={require('../../assets/images/avatar_user.png')}
                                                                style={styles.image}
                                                        />
                                                        :
                                                        <Image
                                                                source={{ uri: `${urlServer}${this.state.accountReceiver.avatar}` }}
                                                                style={styles.image}
                                                        />
                                        }
                                        <View style={styles.contentValue}>
                                                <Text style={styles.name}>{this.state.accountReceiver.name}</Text>
                                                <Text>tin nhan moi nhat</Text>
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
        contentValue: {
                marginLeft: 10
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16
        }
});