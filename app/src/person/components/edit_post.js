import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, FlatList, Dimensions, Alert, Modal } from 'react-native';
import { urlServer, colorMain, background } from '../../config';
import Icon from 'react-native-vector-icons/AntDesign';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import PhotoList from '../../add_post/components/photo_list';

const { width, height } = Dimensions.get('window');
export default class EditPost extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        post: props.post,
                        account: props.account,
                        content: props.post.content,
                        image: props.post.image,
                        restaurant: null,
                        isLoadingRestaurant: false,
                        imageReview: props.post.image,
                        visiblePhoto: false,
                        photoSelected: [],
                        isLoading: false
                };
                this.onClosePhoto = this.onClosePhoto.bind(this);
                this.onSetPhoto = this.onSetPhoto.bind(this);
        }

        componentDidMount () {
                this.fetchInfoRestaurant();
        }
        async fetchInfoRestaurant () {
                if (this.state.post.idRestaurant != 'null') {
                        try {
                                const response = await fetch(`${urlServer}/restaurant/id/${this.state.post.idRestaurant}`, {
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
        }

        onClosePhoto () {
                this.setState({
                        visiblePhoto: !this.state.visiblePhoto
                });
        }

        onOpenPhoto () {
                this.setState({
                        visiblePhoto: !this.state.visiblePhoto
                });
        }

        onSetPhoto (list) {
                this.setState({
                        photoSelected: list
                });
        }

        async onClickButtonSave () {
                this.setState({
                        isLoading: true
                });
                try {
                        const formData = new FormData();
                        formData.append('content', this.state.content);
                        if (this.state.photoSelected.length > 0) {
                                const listImage = this.state.photoSelected;
                                let image = [];
                                if (listImage !== null) {
                                        for (let item of listImage) {
                                                var format = {
                                                        uri: item.node.image.uri,
                                                        name: item.node.image.filename,
                                                        type: item.node.type
                                                };
                                                image.push(format);
                                        }
                                }
                                for (let item of image) {
                                        formData.append('post', item);
                                }
                        }
                        const response = await fetch(`${urlServer}/post/update-post/idPost/${this.state.post._id}`, {
                                method: 'PUT',
                                headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'multipart/form-data',
                                },
                                body: formData,
                        }).then(value => value.json());
                        if (response.error) {
                                this.setState({
                                        isLoading: false
                                });
                                Alert.alert('Thông Báo Lỗi', response.message);
                        } else {
                                this.setState({
                                        isLoading: false
                                });
                                Alert.alert('Thông Báo', response.message);
                                this.props.onRefreshMain();
                                this.props.onCloseEditPost();
                        }
                } catch (error) {
                        this.setState({
                                isLoading: false
                        });
                        Alert.alert('Thông Báo Lỗi', 'Cập nhật thất bại ! ' + error.message);
                }
        }

        render () {
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
                                <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                }}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={30}
                                                color={colorMain}
                                        />
                                </View>
                        );
                else
                        return (
                                <View style={styles.container}>
                                        <View style={styles.header}>
                                                <TouchableOpacity onPress={() => this.props.onCloseEditPost()}>
                                                        <Icon name='arrowleft' size={25} color='black' />
                                                </TouchableOpacity>
                                                <Text style={styles.textHeader}>Chỉnh Sửa Bài Viết</Text>
                                                <TouchableOpacity onPress={() => {
                                                        this.onClickButtonSave();
                                                }}>
                                                        <Text style={styles.textButtonOk}>Lưu</Text>
                                                </TouchableOpacity>
                                        </View>
                                        <View style={styles.content}>
                                                <ScrollView>
                                                        <View style={styles.containerInput}>
                                                                {
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
                                                                <TextInput
                                                                        style={styles.textInput}
                                                                        value={this.state.content}
                                                                        onChangeText={(text) => this.setState({ content: text })}
                                                                        multiline
                                                                        textAlignVertical='top'
                                                                />
                                                        </View>
                                                        <View style={styles.restaurant}>
                                                                {
                                                                        this.state.isLoadingRestaurant ?
                                                                                <ActivityIndicator
                                                                                        animating={true}
                                                                                        size={30}
                                                                                        color={colorMain}
                                                                                /> :
                                                                                this.state.restaurant !== null ?
                                                                                        <View
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
                                                                                        </View> : null
                                                                }
                                                        </View>
                                                        <View style={styles.containerImageReview}>
                                                                {
                                                                        this.state.photoSelected.length === 0 ?
                                                                                <FlatList
                                                                                        data={this.state.imageReview}
                                                                                        extraData={this.state}
                                                                                        keyExtractor={(item, index) => index.toString()}
                                                                                        horizontal={true}
                                                                                        renderItem={(item) => {
                                                                                                return (
                                                                                                        <Image
                                                                                                                source={{ uri: `${urlServer}${item.item}` }}
                                                                                                                style={styles.imageReview}
                                                                                                        />
                                                                                                );
                                                                                        }}
                                                                                /> :
                                                                                <FlatList
                                                                                        horizontal={true}
                                                                                        data={this.state.photoSelected}
                                                                                        keyExtractor={(item, index) => index.toString()}
                                                                                        extraData={this.state}
                                                                                        renderItem={(item) => {
                                                                                                return (
                                                                                                        <Image
                                                                                                                source={{ uri: item.item.node.image.uri }}
                                                                                                                style={styles.imageReview}
                                                                                                        />
                                                                                                );
                                                                                        }}
                                                                                />
                                                                }

                                                        </View>
                                                </ScrollView>
                                                <View style={styles.options}>
                                                        <TouchableOpacity style={styles.buttonOptions}
                                                                onPress={() => this.onOpenPhoto()}
                                                        >
                                                                <Entypo
                                                                        name='camera'
                                                                        size={25}
                                                                        color={colorMain}
                                                                />
                                                                <Text style={styles.textButtonOption}>Hình ảnh</Text>
                                                        </TouchableOpacity>
                                                </View>
                                        </View>
                                        <Modal
                                                visible={this.state.visiblePhoto}
                                                animated={true}
                                                animationType='slide'
                                                onRequestClose={() => {
                                                        this.onClosePhoto();
                                                }}
                                        >
                                                <PhotoList
                                                        onClosePhoto={this.onClosePhoto}
                                                        onSetPhoto={this.onSetPhoto}
                                                />
                                        </Modal>
                                </View>
                        );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        header: {
                height: 50,
                width: '100%',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 16,
                textTransform: 'capitalize'
        },
        textButtonOk: {
                color: colorMain,
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16,
        },
        content: {
                flex: 1,

        },
        containerInput: {
                flexDirection: 'row',
                padding: 20,
        },
        avatar: {
                width: 40,
                height: 40,
                borderRadius: 20
        },
        textInput: {
                flex: 1,
                marginLeft: 10,
                borderWidth: 1,
                borderRadius: 10
        },
        restaurant: {
                flex: 1
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
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16
        },
        star: {
                flexDirection: 'row'
        },
        address: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12,
                color: 'gray'
        },
        containerImageReview: {

        },
        imageReview: {
                width: 150,
                height: 150,
                margin: 2
        },
        options: {
                height: 50,
                borderTopWidth: 1,
                borderTopColor: background,
                marginTop: 5
        },
        buttonOptions: {
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                paddingHorizontal: 20
        },
        textButtonOption: {
                fontFamily: 'UVN-Baisau-Regular',
                marginLeft: 10,
                fontSize: 16
        }
});