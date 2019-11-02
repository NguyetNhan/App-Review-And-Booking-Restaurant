import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Alert, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { urlServer, colorMain } from '../../config';
const { width, height } = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccountModel } from '../../models/account';
import CommentList from '../../person/components/comment_list';
import DetailPost from '../../person/components/detail_post';

export default class ItemPostList extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        accountPost: null,
                        item: props.item,
                        restaurant: null,
                        isLoadingRestaurant: false,
                        isLoading: true,
                        isLiked: false,
                        accountLocal: null,
                        visibleComment: false,
                        visibleDetailPost: false,
                        numberLike: props.item.like.length,
                        numberComment: props.item.comment.length,
                        typePost: 'client'
                };
                this.onCloseCommentList = this.onCloseCommentList.bind(this);
                this.onClickButtonLike = this.onClickButtonLike.bind(this);
                this.onCloseDetailPost = this.onCloseDetailPost.bind(this);
                this.onChangeScreenDetailPlace = this.onChangeScreenDetailPlace.bind(this);
                this.onOpenCommentList = this.onOpenCommentList.bind(this);
        }

        async fetchInfoRestaurant () {
                try {
                        const response = await fetch(`${urlServer}/restaurant/id/${this.state.item.idRestaurant}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                        if (response.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        response.message,
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                this.setState({
                                        isLoadingRestaurant: false
                                });
                        } else {
                                this.setState({
                                        restaurant: response.data,
                                        isLoadingRestaurant: false
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
                                isLoadingRestaurant: false
                        });
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
                                        accountPost: result.data,
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

        async fetchInfoAccountFromLocal () {
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
                                accountLocal: result.data,
                        });
                        try {
                                const response = await fetch(`${urlServer}/post/check-has-liked/idPost/${this.state.item._id}/idAccount/${result.data.id}`, {
                                        method: 'GET',
                                        headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                        }
                                }).then(value => value.json());
                                if (!response.error)
                                        this.setState({
                                                isLiked: response.data.isLiked
                                        });
                        } catch (error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        error.message
                                );
                        }
                }
        }

        componentDidMount () {
                this.fetchInfoAccount();
                this.fetchInfoAccountFromLocal();
                if (this.state.item.idRestaurant !== 'null')
                        this.fetchInfoRestaurant();
        }


        async   onClickButtonLike () {
                if (this.state.isLiked) {
                        this.setState({
                                numberLike: this.state.numberLike - 1,
                                isLiked: !this.state.isLiked
                        });
                } else {
                        this.setState({
                                numberLike: this.state.numberLike + 1,
                                isLiked: !this.state.isLiked
                        });
                }
                try {
                        await fetch(`${urlServer}/post/like-post/idPost/${this.state.item._id}/idAccount/${this.state.accountLocal.id}`, {
                                method: 'PUT',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message
                        );
                }
        }

        onOpenCommentList () {
                this.setState({
                        visibleComment: !this.state.visibleComment
                });
        }
        onCloseCommentList () {
                this.props.onRefreshMain();
                this.setState({
                        visibleComment: !this.state.visibleComment
                });
                if (this.state.visibleDetailPost) {
                        this.setState({
                                visibleDetailPost: !this.state.visibleDetailPost
                        });
                }
        }

        onOpenDetailPost () {
                this.setState({
                        visibleDetailPost: !this.state.visibleDetailPost
                });
        }
        onCloseDetailPost () {
                this.setState({
                        visibleDetailPost: !this.state.visibleDetailPost
                });
        }

        async   onChangeScreenDetailPlace () {
                try {
                        await fetch(`${urlServer}/post/update-view-restaurant/idPost/${this.state.item._id}/idAccountView/${this.state.accountLocal.id}`, {
                                method: 'PUT',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                } catch (error) {
                        Alert.alert('Thông Báo Lỗi',
                                error.message);
                }
                this.props.onChangeScreenDetailPlace(this.state.restaurant._id, this.state.restaurant.idAdmin);
        }

        render () {
                const item = this.state.item;
                const date = new Date(this.state.item.createDate);
                const formatDate = `${date.getHours()}h${date.getMinutes()}   ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                if (this.state.restaurant !== null) {
                        const score = this.state.restaurant.star;
                        var listStar = [];
                        for (let i = 1; i < 6; i++) {
                                var j = i + 1;
                                if (i < score && score < j) {
                                        listStar.push({
                                                index: i,
                                                value: 1
                                        });
                                        listStar.push({
                                                index: i + 1,
                                                value: 0
                                        });
                                        i++;
                                }
                                else if (i <= score)
                                        listStar.push({
                                                index: i,
                                                value: 1
                                        });
                                else if (i > score)
                                        listStar.push({
                                                index: i,
                                                value: -1
                                        });
                        }
                }
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
                        return (
                                <View style={styles.container}>
                                        {
                                                this.state.accountPost.authorities === 'admin-restaurant' ?
                                                        this.state.restaurant === null ? null :
                                                                <View style={styles.header}>
                                                                        <Image
                                                                                source={{ uri: `${urlServer}${this.state.restaurant.imageRestaurant[0]}` }}
                                                                                style={styles.imageAvatar}
                                                                        />
                                                                        <View style={styles.contentHeader}>
                                                                                <Text style={styles.place}>Nhà Hàng <Text style={styles.name}>{this.state.restaurant.name}</Text></Text>
                                                                                <Text style={styles.time}>{formatDate}</Text>
                                                                        </View>
                                                                </View>
                                                        :
                                                        <View style={styles.header}>
                                                                {
                                                                        this.state.accountPost.avatar == null ?
                                                                                <Image
                                                                                        source={require('../../assets/images/avatar_user.png')}
                                                                                        style={styles.imageAvatar}
                                                                                /> :
                                                                                <Image
                                                                                        source={{ uri: `${urlServer}${this.state.accountPost.avatar}` }}
                                                                                        style={styles.imageAvatar}
                                                                                />
                                                                }
                                                                <View style={styles.contentHeader}>
                                                                        {
                                                                                this.state.restaurant === null ?
                                                                                        <Text style={styles.name}>{this.state.accountPost.name}</Text> :
                                                                                        this.state.restaurant.type === 'restaurant' ?
                                                                                                <Text style={styles.place}><Text style={styles.name}>{this.state.accountPost.name}</Text> - tại nhà hàng <Text style={styles.name}>{this.state.restaurant.name}</Text></Text> :
                                                                                                <Text style={styles.place}><Text style={styles.name}>{this.state.accountPost.name}</Text> - tại quán Coffee <Text style={styles.name}>{this.state.restaurant.name}</Text></Text>
                                                                        }
                                                                        <Text style={styles.time}>{formatDate}</Text>
                                                                </View>
                                                        </View>
                                        }

                                        <View style={styles.contentPost}>
                                                <TouchableOpacity onPress={() => this.onOpenDetailPost()}>
                                                        <Text style={styles.textContentPost}>{item.content}</Text>
                                                        {
                                                                this.state.isLoadingRestaurant ?
                                                                        <View style={styles.containerLoadingRestaurant}>
                                                                                <ActivityIndicator
                                                                                        animating={true}
                                                                                        size={30}
                                                                                        color={colorMain}
                                                                                />
                                                                        </View> :
                                                                        this.state.restaurant === null ? null :
                                                                                <TouchableOpacity
                                                                                        onPress={() => this.onClickItemRestaurant()}
                                                                                        style={styles.containerRestaurant}>
                                                                                        <Image
                                                                                                source={{ uri: `${urlServer}${this.state.restaurant.imageRestaurant[0]}` }}
                                                                                                style={styles.imageRestaurant}
                                                                                        />
                                                                                        <View style={styles.contentRestaurant}>
                                                                                                <Text style={styles.name}>{this.state.restaurant.name}</Text>
                                                                                                <View
                                                                                                        style={styles.star}
                                                                                                >
                                                                                                        {
                                                                                                                this.state.score === null ? null :
                                                                                                                        listStar.map(item => {
                                                                                                                                if (item.value === 1)
                                                                                                                                        return (<Star key={item.index.toString()} name='star' size={15} color={colorMain} />);
                                                                                                                                else if (item.value === 0)
                                                                                                                                        return (<Star key={item.index.toString()} name='star-half' size={15} color={colorMain} />);
                                                                                                                                else if (item.value === -1)
                                                                                                                                        return (<Star key={item.index.toString()} name='star-outline' size={15} color={colorMain} />);
                                                                                                                        })
                                                                                                        }
                                                                                                </View>
                                                                                                <Text style={styles.address}>{this.state.restaurant.address}</Text>
                                                                                        </View>
                                                                                </TouchableOpacity>
                                                        }
                                                        {
                                                                item.image.length === 0 ? null :
                                                                        item.image.length === 1 ?
                                                                                <Image
                                                                                        source={{ uri: `${urlServer}${item.image[0]}` }}
                                                                                        style={styles.image1}
                                                                                /> :
                                                                                item.image.length === 2 ?
                                                                                        <View style={styles.containerImage2}>
                                                                                                <Image
                                                                                                        source={{ uri: `${urlServer}${item.image[0]}` }}
                                                                                                        style={styles.image2}
                                                                                                />
                                                                                                <Image
                                                                                                        source={{ uri: `${urlServer}${item.image[1]}` }}
                                                                                                        style={styles.image2}
                                                                                                />
                                                                                        </View> :
                                                                                        item.image.length === 3 ?
                                                                                                <View style={styles.containerImage3}>
                                                                                                        <Image
                                                                                                                source={{ uri: `${urlServer}${item.image[0]}` }}
                                                                                                                style={styles.image3Row1}
                                                                                                        />
                                                                                                        <View style={styles.containerImage3Row2}>
                                                                                                                <Image
                                                                                                                        source={{ uri: `${urlServer}${item.image[1]}` }}
                                                                                                                        style={styles.image3Row2}
                                                                                                                />
                                                                                                                <Image
                                                                                                                        source={{ uri: `${urlServer}${item.image[2]}` }}
                                                                                                                        style={styles.image3Row2}
                                                                                                                />
                                                                                                        </View>
                                                                                                </View> :
                                                                                                item.image.length === 4 ?
                                                                                                        <View style={styles.containerImage4}>
                                                                                                                <View style={styles.containerImage4Row}>
                                                                                                                        <Image
                                                                                                                                source={{ uri: `${urlServer}${item.image[0]}` }}
                                                                                                                                style={styles.image4Row}
                                                                                                                        />
                                                                                                                        <Image
                                                                                                                                source={{ uri: `${urlServer}${item.image[1]}` }}
                                                                                                                                style={styles.image4Row}
                                                                                                                        />
                                                                                                                </View>
                                                                                                                <View style={styles.containerImage4Row}>
                                                                                                                        <Image
                                                                                                                                source={{ uri: `${urlServer}${item.image[2]}` }}
                                                                                                                                style={styles.image4Row}
                                                                                                                        />
                                                                                                                        <Image
                                                                                                                                source={{ uri: `${urlServer}${item.image[3]}` }}
                                                                                                                                style={styles.image4Row}
                                                                                                                        />
                                                                                                                </View>
                                                                                                        </View> :
                                                                                                        item.image.length === 5 ?
                                                                                                                <View style={styles.containerImage5}>
                                                                                                                        <View style={styles.containerImage5Row}>
                                                                                                                                <Image
                                                                                                                                        source={{ uri: `${urlServer}${item.image[0]}` }}
                                                                                                                                        style={styles.containerImage5Row1}
                                                                                                                                />
                                                                                                                                <Image
                                                                                                                                        source={{ uri: `${urlServer}${item.image[1]}` }}
                                                                                                                                        style={styles.containerImage5Row1}
                                                                                                                                />
                                                                                                                        </View>
                                                                                                                        <View style={styles.containerImage5Row}>
                                                                                                                                <Image
                                                                                                                                        source={{ uri: `${urlServer}${item.image[2]}` }}
                                                                                                                                        style={styles.containerImage5Row2}
                                                                                                                                />
                                                                                                                                <Image
                                                                                                                                        source={{ uri: `${urlServer}${item.image[3]}` }}
                                                                                                                                        style={styles.containerImage5Row2}
                                                                                                                                />
                                                                                                                                <Image
                                                                                                                                        source={{ uri: `${urlServer}${item.image[4]}` }}
                                                                                                                                        style={styles.containerImage5Row2}
                                                                                                                                />
                                                                                                                        </View>
                                                                                                                </View> :
                                                                                                                <View style={styles.containerImage5}>
                                                                                                                        <View style={styles.containerImage5Row}>
                                                                                                                                <Image
                                                                                                                                        source={{ uri: `${urlServer}${item.image[0]}` }}
                                                                                                                                        style={styles.containerImage5Row1}
                                                                                                                                />
                                                                                                                                <Image
                                                                                                                                        source={{ uri: `${urlServer}${item.image[1]}` }}
                                                                                                                                        style={styles.containerImage5Row1}
                                                                                                                                />
                                                                                                                        </View>
                                                                                                                        <View style={styles.containerImage5Row}>
                                                                                                                                <Image
                                                                                                                                        source={{ uri: `${urlServer}${item.image[2]}` }}
                                                                                                                                        style={styles.containerImage5Row2}
                                                                                                                                />
                                                                                                                                <Image
                                                                                                                                        source={{ uri: `${urlServer}${item.image[3]}` }}
                                                                                                                                        style={styles.containerImage5Row2}
                                                                                                                                />
                                                                                                                                <View style={{
                                                                                                                                        flex: 1
                                                                                                                                }}>
                                                                                                                                        <Image
                                                                                                                                                source={{ uri: `${urlServer}${item.image[4]}` }}
                                                                                                                                                style={styles.containerImage5Row2}
                                                                                                                                        />
                                                                                                                                        <View style={styles.containerImagePlus}>
                                                                                                                                                <Text style={styles.textImagePlus}>{item.image.length - 5}</Text>
                                                                                                                                                <Entypo name='plus' size={20} color={colorMain} />
                                                                                                                                        </View>
                                                                                                                                </View>
                                                                                                                        </View>
                                                                                                                </View>
                                                        }
                                                </TouchableOpacity>
                                                <View style={styles.containerButton}>
                                                        <TouchableOpacity
                                                                onPress={() => this.onClickButtonLike()}
                                                        >
                                                                {
                                                                        this.state.isLiked ?
                                                                                <Text style={styles.textButtonLike}><Text style={styles.textNumberLike}>{this.state.numberLike}</Text>   Đã thích</Text>
                                                                                :
                                                                                <Text style={styles.textButtonUnLike}><Text style={styles.textNumberUnLike}>{this.state.numberLike}</Text>  Thích</Text>
                                                                }
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                                onPress={() => this.onOpenCommentList()}
                                                        >
                                                                <Text style={styles.textButtonComment}><Text style={styles.textNumberUnLike}>{this.state.numberComment}</Text>   Bình luận</Text>
                                                        </TouchableOpacity>
                                                </View>
                                        </View>
                                        <Modal
                                                visible={this.state.visibleComment}
                                                animated={true}
                                                animationType='slide'
                                                onRequestClose={() => {
                                                        this.onCloseCommentList();
                                                }}
                                        >
                                                <CommentList
                                                        post={this.state.item}
                                                        onCloseCommentList={this.onCloseCommentList}
                                                        isLiked={this.state.isLiked}
                                                        numberLike={this.state.numberLike}
                                                        onClickButtonLike={this.onClickButtonLike}
                                                        accountLocal={this.state.accountLocal}
                                                />
                                        </Modal>
                                        <Modal
                                                visible={this.state.visibleDetailPost}
                                                animated={true}
                                                animationType='slide'
                                                onRequestClose={() => {
                                                        this.onCloseDetailPost();
                                                }}
                                        >
                                                <DetailPost
                                                        onCloseDetailPost={this.onCloseDetailPost}
                                                        item={this.state.item}
                                                        isLiked={this.state.isLiked}
                                                        accountPost={this.state.accountPost}
                                                        restaurant={this.state.restaurant}
                                                        numberComment={this.state.numberComment}
                                                        numberLike={this.state.numberLike}
                                                        onChangeScreenDetailPlace={this.onChangeScreenDetailPlace}
                                                        onClickButtonLike={this.onClickButtonLike}
                                                        onOpenCommentList={this.onOpenCommentList}
                                                />
                                        </Modal>
                                </View >
                        );
                }
        }
}

const styles = StyleSheet.create({
        containerLoading: {
                flex: 1,
                alignItems: 'center'
        },
        container: {
                flex: 1,
                backgroundColor: 'white',
                marginVertical: 5
        },
        header: {
                flexDirection: 'row',
                marginHorizontal: 20,
                marginTop: 10,
                alignItems: 'center'
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16
        },
        place: {
                fontFamily: 'UVN-Baisau-Regular',
        },
        time: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 10,
                color: 'gray'
        },
        imageAvatar: {
                width: 30,
                height: 30,
                borderRadius: 15
        },
        contentHeader: {
                flex: 1,
                marginLeft: 10
        },
        contentPost: {
                flex: 1
        },
        containerLoadingRestaurant: {
                flex: 1,
                marginVertical: 5,
                alignItems: 'center'
        },
        textContentPost: {
                marginHorizontal: 20,
                marginVertical: 5,
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 20
        },
        containerRestaurant: {
                flex: 1,
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 20,
                borderColor: colorMain,
                borderWidth: 1,
                padding: 10,
                alignItems: 'center'
        },
        imageRestaurant: {
                width: 50,
                height: 50,
                borderRadius: 25,
                borderWidth: 3,
                borderColor: colorMain
        },
        contentRestaurant: {
                flex: 1,
                marginLeft: 10
        },
        star: {
                flexDirection: 'row'
        },
        address: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12,
                color: 'gray'
        },
        image1: {
                width: width,
                height: width
        },
        containerImage2: {
                flexDirection: 'row'
        },
        image2: {
                width: width / 2,
                height: width,
                borderWidth: 1,
                borderColor: 'white'
        },
        containerImage3: {
                flex: 1
        },
        image3Row1: {
                width: width,
                height: width / 2,
                borderWidth: 1,
                borderColor: 'white'
        },
        containerImage3Row2: {
                flexDirection: 'row'
        },
        image3Row2: {
                width: width / 2,
                height: width / 2,
                borderWidth: 1,
                borderColor: 'white'
        },
        containerImage4: {
                flex: 1
        },
        containerImage4Row: {
                flexDirection: 'row'
        },
        image4Row: {
                width: width / 2,
                height: width / 2,
                borderWidth: 1,
                borderColor: 'white'
        },
        containerImage5: {
                flex: 1
        },
        containerImage5Row: {
                flexDirection: 'row'
        },
        containerImage5Row1: {
                width: width / 2,
                height: width / 2,
                borderWidth: 1,
                borderColor: 'white'
        },
        containerImage5Row2: {
                width: width / 3,
                height: width / 3,
                borderWidth: 1,
                borderColor: 'white'
        },
        containerImagePlus: {
                width: width / 3,
                height: width / 3,
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
        },
        textImagePlus: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain,
                fontSize: 40
        },
        containerButton: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                height: 50,
                alignItems: 'center'
        },
        textButtonLike: {
                fontFamily: 'UVN-Baisau-Regular',
                color: colorMain,

        },
        textButtonUnLike: {
                fontFamily: 'UVN-Baisau-Regular',
        },
        textButtonComment: {
                fontFamily: 'UVN-Baisau-Regular',
        },
        textNumberUnLike: {
                fontFamily: 'UVN-Baisau-Bold',
        },
        textNumberLike: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain
        }
});