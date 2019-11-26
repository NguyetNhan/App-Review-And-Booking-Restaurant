import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colorMain, urlServer } from '../../config';

export default class AddPost extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        idAccountPost: props.account._id,
                        account: null,
                        isLoading: true
                };
        }

        async fetchInfoAccountPost () {
                try {
                        const result = await fetch(`${urlServer}/auth/id/${this.state.idAccountPost}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                        if (result.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        result.message,
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                this.setState({
                                        isLoading: false
                                });
                        } else {
                                this.setState({
                                        account: result.data,
                                        isLoading: false
                                });
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
                        this.setState({
                                isLoading: false
                        });
                }
        }

        componentDidMount () {
                this.fetchInfoAccountPost();
        }

        render () {
                if (this.state.isLoading)
                        return (
                                <View style={{
                                        flex: 1,
                                        alignItems: 'center'
                                }}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={30}
                                        />
                                </View>
                        );
                else
                        return (
                                <View style={styles.container}>
                                        <View style={styles.contentPost}>
                                                {
                                                        this.state.account.avatar === null ?
                                                                <View
                                                                        style={styles.image}
                                                                /> :
                                                                <Image
                                                                        source={{ uri: `${urlServer}${this.state.account.avatar}` }}
                                                                        style={styles.image}
                                                                />
                                                }

                                                <TouchableOpacity
                                                        style={styles.buttonInput}
                                                        onPress={() => {
                                                                this.props.onClickAddPost();
                                                        }}
                                                >
                                                        <Text
                                                                style={styles.textInput}
                                                        >Chia sẽ cảm nhận của bạn về các địa điểm đã đến !</Text>
                                                </TouchableOpacity>
                                        </View>
                                </View>
                        );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                padding: 20
        },
        contentPost: {
                backgroundColor: 'white',
                flex: 1,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                justifyContent: 'center'
        },
        image: {
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: colorMain
        },
        textInput: {
                color: 'gray'
        },
        buttonInput: {
                flex: 1,
                marginLeft: 5,
        }
});