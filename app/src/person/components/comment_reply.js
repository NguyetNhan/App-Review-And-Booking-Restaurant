import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { urlServer, background, colorMain } from '../../config';

export default class CommentReply extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        isLoading: true,
                        account: null,
                        isLiked: false,
                        accountLocal: props.accountLocal,
                        idPost: props.idPost,
                        idComment: props.idComment
                };
        }

        componentDidMount () {
                this.fetchInfoAccount();
                let isLiked = false;
                for (like of this.state.item.like) {
                        if (like.idAccount === this.state.accountLocal.id) {
                                isLiked = true;
                                break;
                        }
                }
                this.setState({
                        isLiked: isLiked
                });
        }

        async  onClickButtonLike () {
                this.setState({
                        isLiked: !this.state.isLiked
                });
                try {
                        const response = await fetch(`${urlServer}/post/like-comment/idPost/${this.state.idPost}/idAccount/${this.state.accountLocal.id}/idComment/${this.state.idComment}`, {
                                method: 'PUT',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                        idCommentReply: this.state.item._id,
                                })
                        }).then(value => value.json());
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
        async fetchInfoAccount () {
                try {
                        const result = await fetch(`${urlServer}/auth/id/${this.state.item.idAccount}`, {
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

        render () {
                if (this.state.isLoading)
                        return (
                                <View style={styles.containerLoading}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={30}
                                        />
                                </View>
                        );
                else {
                        const date = new Date(this.state.item.createDate);
                        const formatDate = `${date.getHours()}h${date.getMinutes()}   ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                        return (
                                <View style={styles.container}>
                                        {
                                                this.state.account === null ? null :
                                                        this.state.account.avatar === null ?
                                                                <Image
                                                                        source={require('../../assets/images/avatar_user.png')}
                                                                        style={styles.avatar}
                                                                /> :
                                                                <Image
                                                                        source={{ uri: `${urlServer}${this.state.account.avatar}` }}
                                                                        style={styles.avatar}
                                                                />
                                        }
                                        <View style={styles.content}>
                                                <View style={styles.contentComment}>
                                                        {this.state.account === null ? null :
                                                                <Text style={styles.name}>{this.state.account.name}</Text>
                                                        }
                                                        <Text style={styles.textComment}>{this.state.item.content}</Text>
                                                        <Text style={styles.time}>{formatDate}</Text>
                                                </View>
                                                <View style={styles.containerButton}>
                                                        <TouchableOpacity
                                                                onPress={() => this.onClickButtonLike()}
                                                        >
                                                                {
                                                                        this.state.isLiked ?
                                                                                <Text style={styles.textButtonLike}>Đã thích</Text> :
                                                                                <Text style={styles.textButton}>Thích</Text>
                                                                }

                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                                onPress={() => this.props.onClickButtonReply(this.state.account.name)}
                                                                style={styles.buttonReply}>
                                                                <Text style={styles.textButton}>Trả lời</Text>
                                                        </TouchableOpacity>
                                                </View>
                                        </View>
                                </View>
                        );
                }
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                flexDirection: 'row',
                marginVertical: 5
        },
        containerLoading: {
                flex: 1,
                alignItems: 'center'
        },
        avatar: {
                width: 30,
                height: 30,
                borderRadius: 15
        },
        content: {
                marginLeft: 10,
                flex: 1,
        },
        contentComment: {
                flex: 1,
                backgroundColor: background,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingBottom: 5
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
        },
        textComment: {
                fontFamily: 'UVN-Baisau-Regular',
                flex: 1,
                color: 'black',
                fontSize: 16
        },
        containerButton: {
                flex: 1,
                flexDirection: 'row',
        },
        buttonReply: {
                marginLeft: 10
        },
        textButton: {
                fontFamily: 'UVN-Baisau-Regular',
        },
        textButtonLike: {
                fontFamily: 'UVN-Baisau-Regular',
                color: colorMain
        },
        time: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 10,
                textAlign: 'right'
        }
});