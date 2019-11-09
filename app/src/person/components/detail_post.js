import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { urlServer, colorMain, background } from '../../config';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccountModel } from '../../models/account';


const { width, height } = Dimensions.get('window');
export default class DetailPost extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        isLiked: props.isLiked,
                        accountPost: props.accountPost,
                        restaurant: props.restaurant,
                        numberLike: props.numberLike,
                        numberComment: props.numberComment,
                        discount: props.discount,
                        isLoadingDiscount: false,
                        accountLocal: props.accountLocal
                };
        }

        onChangeScreenDetailPlace () {
                this.props.onChangeScreenDetailPlace();
                this.props.onCloseDetailPost();
        }

        onClickButtonLike () {
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
                this.props.onClickButtonLike();
        }

        async onClickDiscount () {
                this.setState({
                        isLoadingDiscount: true
                });
                try {
                        const response = await fetch(`${urlServer}/discount/add-discount-client/idDiscount/${this.state.discount._id}/idAccount/${this.state.accountLocal.id}`, {
                                method: 'PUT',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                        if (response.error) {
                                Alert.alert('Thông Báo Lỗi',
                                        response.message);
                                this.setState({
                                        isLoadingDiscount: false
                                });
                        } else {
                                Alert.alert('Thông Báo',
                                        response.message);
                                this.setState({
                                        isLoadingDiscount: false
                                });
                                //   await AccountModel.addDiscountForAccountIntoDatabaseLocal(this.state.accountLocal.id, this.state.discount._id);
                        }
                } catch (error) {
                        Alert.alert('Thông Báo Lỗi',
                                error.message);
                        this.setState({
                                isLoadingDiscount: false
                        });
                }
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
                const imageList = item.image;
                return (
                        <View style={styles.container}>
                                <View style={styles.containerBar}>
                                        <TouchableOpacity
                                                onPress={() => this.props.onCloseDetailPost()}
                                        >
                                                <Icon name='arrow-left' size={25} color='black' />
                                        </TouchableOpacity>
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
                                </View>
                                <View style={styles.content}>
                                        <ScrollView>
                                                <Text style={styles.textContentPost}>{item.content}</Text>
                                                {
                                                        this.state.isLoadingDiscount ?
                                                                <View style={{
                                                                        flex: 1,
                                                                        alignItems: 'center'
                                                                }}>
                                                                        <ActivityIndicator
                                                                                animating={true}
                                                                                size={30}
                                                                        />
                                                                </View> :
                                                                this.state.discount === null ? null :
                                                                        <TouchableOpacity
                                                                                onPress={() => this.onClickDiscount()}
                                                                                style={styles.containerDiscount}>
                                                                                <View style={styles.discountTop}>
                                                                                        <Text style={styles.textTitleDiscount}>nhận mã</Text>
                                                                                        <Text style={styles.textIdDiscount}>{this.state.discount._id}</Text>
                                                                                        <Text style={styles.textNameDiscount}>{this.state.discount.name}</Text>
                                                                                </View>
                                                                                <View style={styles.discountBottom}>
                                                                                        <Text style={styles.textTitleDiscount}>giảm <Text style={styles.textPercent}>{this.state.discount.percent}%</Text></Text>
                                                                                </View>
                                                                        </TouchableOpacity>
                                                }
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
                                                                                onPress={() => this.onChangeScreenDetailPlace()}
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
                                                                onPress={() => this.props.onOpenCommentList()}
                                                        >
                                                                <Text style={styles.textButtonComment}><Text style={styles.textNumberUnLike}>{this.state.numberComment}</Text>   Bình luận</Text>
                                                        </TouchableOpacity>
                                                </View>
                                                <View>
                                                        <FlatList
                                                                data={imageList}
                                                                extraData={this.state}
                                                                keyExtractor={(item, index) => index.toString()}
                                                                showsVerticalScrollIndicator={false}
                                                                renderItem={(item) => {
                                                                        return (
                                                                                <View style={{
                                                                                        borderTopWidth: 10,
                                                                                        borderTopColor: background
                                                                                }}>
                                                                                        <Image
                                                                                                source={{ uri: `${urlServer}${item.item}` }}
                                                                                                style={styles.image}
                                                                                                loadingIndicatorSource={require('../../assets/images/icon_loading.png')}
                                                                                                resizeMode='cover'
                                                                                        />
                                                                                </View>

                                                                        );
                                                                }}
                                                        />
                                                </View>
                                        </ScrollView>
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        header: {
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
                flex: 1,
                marginLeft: 10
        },
        content: {
                flex: 1,
        },
        containerBar: {
                flexDirection: 'row',
                marginHorizontal: 20,
                alignItems: 'center'
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16
        },
        place: {
                fontFamily: 'UVN-Baisau-Regular',
        },
        containerDiscount: {
                flex: 1,
                marginHorizontal: 30,
        },
        discountTop: {
                backgroundColor: '#f03232',
                flex: 2,
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingTop: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
        },
        textTitleDiscount: {
                textTransform: 'uppercase',
                color: 'white',
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12
        },
        textNameDiscount: {
                textTransform: 'uppercase',
                color: 'white',
                fontFamily: 'UVN-Baisau-Regular',
                textAlign: 'center',
                fontSize: 12
        },
        textIdDiscount: {
                color: 'white',
                backgroundColor: '#d12525',
                fontFamily: 'UVN-Baisau-Bold',
                padding: 5
        },
        textPercent: {
                fontFamily: 'UVN-Baisau-Bold',
                color: 'white',
                fontSize: 30
        },
        discountBottom: {
                backgroundColor: '#d12525',
                flex: 1,
                alignItems: 'center',
                padding: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
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
        containerButton: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                height: 50,
                alignItems: 'center',
                borderTopWidth: 1,
                borderTopColor: background
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
        },
        image: {
                width: width,
                minHeight: width + 100,
        }
});