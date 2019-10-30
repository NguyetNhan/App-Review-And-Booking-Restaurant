import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { urlServer, colorMain, background } from '../../config';
import Comment from './comment';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default class CommentList extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        post: props.post,
                        isLoading: false,
                        isLiked: props.isLiked,
                        numberLike: props.numberLike,
                        textComment: '',
                        idReply: null,
                        accountLocal: props.accountLocal
                };
                this.onClickButtonReply = this.onClickButtonReply.bind(this);
        }

        onClickButtonLike () {
                if (this.state.isLiked) {
                        this.setState({
                                isLiked: !this.state.isLiked,
                                numberLike: this.state.numberLike - 1
                        });
                } else {
                        this.setState({
                                isLiked: !this.state.isLiked,
                                numberLike: this.state.numberLike + 1
                        });
                }
                this.props.onClickButtonLike();
        }

        onClickButtonReply (idReply, nameAccountReply) {
                this.setState({
                        idReply: idReply,
                        textComment: this.state.textComment + nameAccountReply + ' '
                });
        }

        async onClickButtonSend () {
                try {
                        this.setState({
                                isLoading: true
                        });
                        const response = await fetch(`${urlServer}/post/comment-post/idPost/${this.state.post._id}/idAccount/${this.state.accountLocal.id}`, {
                                method: 'PUT',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                        content: this.state.textComment,
                                        idReply: this.state.idReply,
                                })
                        }).then(value => value.json());
                        this.setState({
                                textComment: '',
                                idReply: null
                        });
                        if (!response.error) {
                                const post = await fetch(`${urlServer}/post/get-post/idPost/${this.state.post._id}`, {
                                        method: 'GET',
                                        headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                        },
                                }).then(value => value.json());
                                if (!post.error) {
                                        this.setState({
                                                post: post.data,
                                                numberLike: post.data.like.length,
                                                isLoading: false
                                        });
                                } else {
                                        this.setState({
                                                isLoading: false
                                        });
                                }
                        } else {
                                this.setState({
                                        isLoading: false
                                });
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message
                        );
                        this.setState({
                                isLoading: false
                        });
                }
        }

        async  onRefresh () {
                this.setState({
                        isLoading: true
                });
                const post = await fetch(`${urlServer}/post/get-post/idPost/${this.state.post._id}`, {
                        method: 'GET',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                }).then(value => value.json());
                if (!post.error) {
                        this.setState({
                                post: post.data,
                                numberLike: post.data.like.length,
                                isLoading: false
                        });
                } else {
                        this.setState({
                                isLoading: false
                        });
                }
        }

        render () {
                let commentList = [];
                if (this.state.post.comment.length === 0) {
                        commentList = ['1', ...commentList];
                } else {
                        commentList = this.state.post.comment;
                }
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <View style={styles.containerButtonBack}>
                                                <TouchableOpacity
                                                        style={styles.buttonBack}
                                                        onPress={() => {
                                                                this.props.onCloseCommentList();
                                                        }}
                                                >
                                                        <Icon name='arrow-left' size={25} color='black' />
                                                </TouchableOpacity>
                                                <Text style={styles.viewLike}><Text style={styles.numberLike}>{this.state.numberLike}</Text> lượt thích</Text>
                                        </View>
                                        <TouchableOpacity
                                                onPress={() => this.onClickButtonLike()}
                                        >
                                                {
                                                        this.state.isLiked ?
                                                                <AntDesign
                                                                        name='heart'
                                                                        size={25}
                                                                        color={colorMain}
                                                                /> :
                                                                <AntDesign
                                                                        name='hearto'
                                                                        size={25}
                                                                        color='black'
                                                                />
                                                }
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.flatList}>
                                        <FlatList
                                                data={commentList}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                refreshing={this.state.isLoading}
                                                onRefresh={() => this.onRefresh()}
                                                renderItem={(item) => {
                                                        if (item.item === '1')
                                                                return (
                                                                        <Text style={styles.textNote}>hãy trở thành người bình luận đầu tiên nào !</Text>
                                                                );
                                                        else
                                                                return (
                                                                        <Comment
                                                                                item={item.item}
                                                                                onClickButtonReply={this.onClickButtonReply}
                                                                        />
                                                                );
                                                }}
                                        />
                                </View>
                                <View style={styles.containerInputComment}>
                                        <TextInput
                                                style={styles.textInput}
                                                autoFocus={true}
                                                placeholder='nhập nội dung bình luận !'
                                                value={this.state.textComment}
                                                onChangeText={(text) => this.setState({
                                                        textComment: text
                                                })}
                                        />
                                        <TouchableOpacity
                                                style={styles.buttonSend}
                                                onPress={() => this.onClickButtonSend()}
                                        >
                                                <MaterialIcons
                                                        name='send'
                                                        size={30}
                                                        color={colorMain}
                                                />
                                        </TouchableOpacity>
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        header: {
                flexDirection: 'row',
                height: 50,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20
        },
        containerButtonBack: {
                flexDirection: 'row',
                alignItems: 'center',
        },
        buttonBack: {

        },
        numberLike: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16,
                color: colorMain
        },
        viewLike: {
                fontFamily: 'UVN-Baisau-Regular',
                marginLeft: 10
        },
        flatList: {
                flex: 1
        },
        textNote: {
                flex: 1,
                fontFamily: 'UVN-Baisau-Bold',
                textAlign: 'center',
                textTransform: 'capitalize'
        },
        containerInputComment: {
                paddingHorizontal: 20,
                flexDirection: 'row',
                height: 70,
                alignItems: 'center',
                borderTopWidth: 1,
                borderTopColor: background
        },
        textInput: {
                backgroundColor: background,
                flex: 1,
                height: 50,
                borderRadius: 10,
                paddingHorizontal: 10
        },
        buttonSend: {
                marginLeft: 10
        }
});