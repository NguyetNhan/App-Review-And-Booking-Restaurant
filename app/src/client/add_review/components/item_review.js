import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, FlatList, Dimensions, Modal, Alert } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
import { API } from '../sagas/API';
import { colorMain, urlServer } from '../../../config';
const { height, width } = Dimensions.get('window');
import ModalSelectImage from './modal_select_image';

export default class ItemReview extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        idRestaurant: props.idRestaurant,
                        idFood: props.idFood,
                        type: props.type,
                        account: props.account,
                        listImageSelect: [],
                        isLoading: true,
                        star: [
                                {
                                        index: 0,
                                        isChecked: true,
                                        title: 'rất tệ'
                                },
                                {
                                        index: 1,
                                        isChecked: true,
                                        title: 'không hài lòng'
                                },
                                {
                                        index: 2,
                                        isChecked: true,
                                        title: 'bình thường'
                                },
                                {
                                        index: 3,
                                        isChecked: false,
                                        title: 'hài  lòng'
                                },
                                {
                                        index: 4,
                                        isChecked: false,
                                        title: 'tuyệt vời'
                                },
                        ],
                        textTitleStar: 'bình thường',
                        textReview: '',
                        restaurant: null,
                        food: null,
                        isReviewed: false,
                        resultReview: null,
                        visibleModalSelectImage: false,
                        reviewSucceeded: false
                };
                this._onCloseModalSelectImage = this._onCloseModalSelectImage.bind(this);
                this._onOpenModalSelectImage = this._onOpenModalSelectImage.bind(this);
                this._onSelectImageComplete = this._onSelectImageComplete.bind(this);
        }

        async fetchData () {
                if (this.state.type === 'restaurant') {
                        const result = await API.fetchRestaurant(this.state.idRestaurant);
                        const check = await API.checkOrderHasReview(this.state.idRestaurant, this.state.account.id);
                        if (check.review) {
                                let listStar = this.state.star;
                                for (let i = 1; i < 6; i++) {
                                        if (i <= check.data.score) {
                                                listStar[i - 1].isChecked = true;
                                        } else {
                                                listStar[i - 1].isChecked = false;
                                        }
                                }
                                this.setState({
                                        restaurant: result.data,
                                        isReviewed: check.review,
                                        resultReview: check.data,
                                        textReview: check.data.content,
                                        isLoading: false,
                                        star: listStar,
                                        textTitleStar: listStar[check.data.score - 1].title
                                });
                        } else {
                                this.setState({
                                        restaurant: result.data,
                                        isReviewed: check.review,
                                        resultReview: check.data,
                                        isLoading: false,
                                });
                        }

                } else {
                        const result = await API.fetchFood(this.state.idFood);
                        const check = await API.checkOrderHasReview(this.state.idFood, this.state.account.id);
                        if (check.review) {
                                let listStar = this.state.star;
                                for (let i = 1; i < 6; i++) {
                                        if (i <= check.data.score) {
                                                listStar[i - 1].isChecked = true;
                                        } else {
                                                listStar[i - 1].isChecked = false;
                                        }
                                }
                                this.setState({
                                        food: result.data,
                                        isReviewed: check.review,
                                        resultReview: check.data,
                                        isLoading: false,
                                        textReview: check.data.content,
                                        star: listStar,
                                        textTitleStar: listStar[check.data.score - 1].title
                                });
                        } else {
                                this.setState({
                                        food: result.data,
                                        isReviewed: check.review,
                                        resultReview: check.data,
                                        isLoading: false,
                                });
                        }
                }

        }

        componentDidMount () {
                this.fetchData();
        }

        async  onClickAddReview () {
                if (this.state.textReview.length === 0) {
                        Alert.alert(
                                'Thông Báo',
                                'Bạn chưa nhập nhận xét của bạn !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                } else {

                        const listImage = this.state.listImageSelect;
                        var image = [];
                        if (listImage.length !== 0) {
                                for (var item of listImage) {
                                        var format = {
                                                uri: item.node.image.uri,
                                                name: item.node.image.filename,
                                                type: item.node.type
                                        };
                                        image.push(format);
                                }
                        }
                        var count = 0;
                        for (item of this.state.star) {
                                if (item.isChecked) {
                                        count = count + 1;
                                }
                        }
                        var data = {};
                        if (this.state.type === 'restaurant') {
                                data = {
                                        type: this.state.type,
                                        idReviewAccount: this.state.account.id,
                                        idReviewReceiver: this.state.idRestaurant,
                                        imageReview: image,
                                        content: this.state.textReview,
                                        score: count,
                                };
                        } else {
                                data = {
                                        type: this.state.type,
                                        idReviewAccount: this.state.account.id,
                                        idReviewReceiver: this.state.idFood,
                                        imageReview: image,
                                        content: this.state.textReview,
                                        score: count,
                                };
                        }
                        this.setState({
                                isLoading: !this.state.isLoading
                        });
                        if (this.state.isReviewed) {
                                data.idReview = this.state.resultReview._id;
                                try {
                                        const result = await API.updateReview(data);
                                        if (result.error) {
                                                Alert.alert(
                                                        'Thông Báo',
                                                        result.message,
                                                        [
                                                                { text: 'OK' },
                                                        ],
                                                        { cancelable: false },
                                                );
                                                this.setState({
                                                        isLoading: !this.state.isLoading
                                                });
                                        } else {
                                                this.setState({
                                                        reviewSucceeded: true,
                                                        isLoading: !this.state.isLoading
                                                });
                                        }
                                } catch (error) {
                                        this.setState({
                                                isLoading: !this.state.isLoading
                                        });
                                        Alert.alert(
                                                'Thông Báo',
                                                error.message,
                                                [
                                                        { text: 'OK' },
                                                ],
                                                { cancelable: false },
                                        );
                                }
                        } else {
                                try {
                                        const result = await API.addReviewRestaurant(data);
                                        if (result.error) {
                                                this.setState({
                                                        isLoading: !this.state.isLoading
                                                });
                                                Alert.alert(
                                                        'Thông Báo',
                                                        result.message,
                                                        [
                                                                { text: 'OK' },
                                                        ],
                                                        { cancelable: false },
                                                );
                                        } else {
                                                this.setState({
                                                        reviewSucceeded: true,
                                                        isLoading: !this.state.isLoading
                                                });

                                        }
                                } catch (error) {
                                        this.setState({
                                                isLoading: !this.state.isLoading
                                        });
                                        Alert.alert(
                                                'Thông Báo',
                                                error.message,
                                                [
                                                        { text: 'OK' },
                                                ],
                                                { cancelable: false },
                                        );
                                }
                        }
                }
        }

        onChangeStar (index) {
                var list = this.state.star;
                for (let i = 0; i < list.length; i++) {
                        if (i <= index) {
                                list[i].isChecked = true;
                        } else {
                                list[i].isChecked = false;
                        }
                }
                this.setState({
                        star: list,
                        textTitleStar: list[index].title
                });
        }

        onClickButtonPicture () {
                this._onOpenModalSelectImage();
        }


        _onOpenModalSelectImage () {
                this.setState({
                        visibleModalSelectImage: !this.state.visibleModalSelectImage
                });
        }

        _onCloseModalSelectImage () {
                this.setState({
                        visibleModalSelectImage: !this.state.visibleModalSelectImage
                });
        }

        _onSelectImageComplete (listImage) {
                this.setState({
                        listImageSelect: listImage
                });
        }


        render () {
                if (this.state.isLoading)
                        return (
                                <View style={styles.containerLoading}>
                                        <ActivityIndicator animating={true} size={30} color={colorMain} />
                                </View>
                        );
                else
                        return (
                                <View style={styles.container}>
                                        {
                                                this.state.type === 'restaurant' ?
                                                        <View style={styles.header}>
                                                                <Image
                                                                        source={{ uri: `${urlServer}${this.state.restaurant.imageRestaurant[0]}` }}
                                                                        style={styles.imageAvatar}
                                                                />
                                                                <View style={styles.containerName}>
                                                                        <Text style={styles.name}>{this.state.restaurant.name}</Text>
                                                                        <Text style={styles.introduce}
                                                                                numberOfLines={2}
                                                                                ellipsizeMode='tail'
                                                                        >{this.state.restaurant.introduce}</Text>
                                                                </View>
                                                        </View> :
                                                        <View style={styles.header}>
                                                                <Image
                                                                        source={{ uri: `${urlServer}${this.state.food.image}` }}
                                                                        style={styles.imageAvatar}
                                                                />
                                                                <View style={styles.containerName}>
                                                                        <Text style={styles.name}>{this.state.food.name}</Text>
                                                                        <Text style={styles.introduce}>{this.state.food.introduce}</Text>
                                                                </View>
                                                        </View>
                                        }
                                        {
                                                this.state.reviewSucceeded ?
                                                        <View style={styles.containerThank} >
                                                                <Text style={styles.textThank}>cảm ơn bạn đã nhận xét !</Text>
                                                        </View>
                                                        :
                                                        <View>
                                                                <View style={styles.containerStar}>
                                                                        {
                                                                                this.state.star.map(item => {
                                                                                        if (item.isChecked) {
                                                                                                return (
                                                                                                        <TouchableOpacity
                                                                                                                key={item.index.toString()}
                                                                                                                onPress={() => {
                                                                                                                        this.onChangeStar(item.index);
                                                                                                                }}
                                                                                                        >
                                                                                                                <Star name='star' size={30} color={colorMain} />
                                                                                                        </TouchableOpacity>
                                                                                                );
                                                                                        } else {
                                                                                                return (
                                                                                                        <TouchableOpacity
                                                                                                                key={item.index.toString()}
                                                                                                                onPress={() => {
                                                                                                                        this.onChangeStar(item.index);
                                                                                                                }}
                                                                                                        >
                                                                                                                <Star name='star-outline' size={30} color={colorMain} />
                                                                                                        </TouchableOpacity>
                                                                                                );
                                                                                        }
                                                                                })
                                                                        }
                                                                </View>
                                                                <View style={styles.containerTitleStar}>
                                                                        <Text style={styles.textTitleStar}>{this.state.textTitleStar}</Text>
                                                                </View>
                                                                {
                                                                        this.state.isReviewed ?
                                                                                <TextInput
                                                                                        style={styles.textInput}
                                                                                        onChangeText={(text) => {
                                                                                                this.setState({
                                                                                                        textReview: text
                                                                                                });
                                                                                        }}
                                                                                        multiline={true}
                                                                                        value={this.state.textReview}
                                                                                        placeholder='Đừng ngần ngại, hãy cho chúng tôi biết ý kiến của bạn để có thể cải thiện tốt hơn ! Tối đa 3 dòng.'

                                                                                /> :
                                                                                <TextInput
                                                                                        style={styles.textInput}
                                                                                        onChangeText={(text) => {
                                                                                                this.setState({
                                                                                                        textReview: text
                                                                                                });
                                                                                        }}
                                                                                        multiline={true}
                                                                                        value={this.state.textReview}
                                                                                        placeholder='Đừng ngần ngại, hãy cho chúng tôi biết ý kiến của bạn để có thể cải thiện tốt hơn ! Tối đa 3 dòng.'
                                                                                />
                                                                }

                                                                {
                                                                        this.state.isReviewed ?
                                                                                this.state.type === 'food' ? null :
                                                                                        <View>
                                                                                                <Text style={styles.textTitle}>chọn ảnh</Text>
                                                                                                <View style={styles.containerImage}>
                                                                                                        <TouchableOpacity
                                                                                                                onPress={() => {
                                                                                                                        this.onClickButtonPicture();
                                                                                                                }}
                                                                                                        >
                                                                                                                <EvilIcons name='camera' size={50} color={colorMain} />
                                                                                                        </TouchableOpacity>
                                                                                                        {
                                                                                                                this.state.listImageSelect.length !== 0 ?
                                                                                                                        <FlatList
                                                                                                                                data={this.state.listImageSelect}
                                                                                                                                extraData={this.state}
                                                                                                                                keyExtractor={(item, index) => index.toString()}
                                                                                                                                numColumns={3}
                                                                                                                                horizontal={false}
                                                                                                                                renderItem={(item) => {
                                                                                                                                        return (
                                                                                                                                                <Image source={{ uri: item.item.node.image.uri }}
                                                                                                                                                        style={{
                                                                                                                                                                height: width / 3,
                                                                                                                                                                width: width / 3,
                                                                                                                                                                borderWidth: 1,
                                                                                                                                                                borderColor: 'white'
                                                                                                                                                        }} />
                                                                                                                                        );
                                                                                                                                }}
                                                                                                                        />
                                                                                                                        :
                                                                                                                        this.state.resultReview.imageReview.length === 0 ?
                                                                                                                                null :
                                                                                                                                <FlatList
                                                                                                                                        data={this.state.resultReview.imageReview}
                                                                                                                                        extraData={this.state}
                                                                                                                                        keyExtractor={(item, index) => index.toString()}
                                                                                                                                        numColumns={3}
                                                                                                                                        horizontal={false}
                                                                                                                                        renderItem={(item) => {
                                                                                                                                                console.log('item: ', item);
                                                                                                                                                return (
                                                                                                                                                        <Image source={{ uri: `${urlServer}${item.item}` }}
                                                                                                                                                                style={{
                                                                                                                                                                        height: width / 3,
                                                                                                                                                                        width: width / 3,
                                                                                                                                                                        borderWidth: 1,
                                                                                                                                                                        borderColor: 'white'
                                                                                                                                                                }} />
                                                                                                                                                );
                                                                                                                                        }}
                                                                                                                                />
                                                                                                        }

                                                                                                </View>
                                                                                        </View>
                                                                                :
                                                                                this.state.type === 'food' ? null :
                                                                                        <View>
                                                                                                <Text style={styles.textTitle}>chọn ảnh</Text>
                                                                                                <View style={styles.containerImage}>
                                                                                                        <TouchableOpacity
                                                                                                                onPress={() => {
                                                                                                                        this.onClickButtonPicture();
                                                                                                                }}
                                                                                                        >
                                                                                                                <EvilIcons name='camera' size={50} color={colorMain} />
                                                                                                        </TouchableOpacity>
                                                                                                </View>
                                                                                        </View>
                                                                }
                                                                <View style={styles.containerButton}>
                                                                        <TouchableOpacity
                                                                                style={styles.buttonOK}
                                                                                onPress={() => {
                                                                                        this.onClickAddReview();
                                                                                }}
                                                                        >
                                                                                <Text style={styles.textButton}>gửi</Text>
                                                                        </TouchableOpacity>
                                                                </View>
                                                        </View>
                                        }

                                        <Modal
                                                visible={this.state.visibleModalSelectImage}
                                                animationType='slide'
                                                onRequestClose={() => {
                                                        this._onCloseModalSelectImage();
                                                }}
                                        >
                                                <ModalSelectImage
                                                        _onCloseModalSelectImage={this._onCloseModalSelectImage}
                                                        _onSelectImageComplete={this._onSelectImageComplete}
                                                />
                                        </Modal>
                                </View>
                        );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: 'white',
                marginVertical: 5,
                padding: 20
        },
        containerLoading: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
        },
        content: {
                flex: 1,
        },

        header: {
                flexDirection: 'row',

        },
        imageAvatar: {
                width: 40,
                height: 40,
                borderRadius: 20
        },
        containerName: {
                marginLeft: 10
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize'
        },
        introduce: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                fontSize: 10
        },
        textTitle: {
                width: '100%',
                textAlign: 'center',
                marginVertical: 10,
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                fontSize: 12
        },
        containerStar: {
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginHorizontal: 20,
                marginTop: 10,
                paddingHorizontal: 50
        },
        containerTitleStar: {
                alignItems: 'center',
                marginBottom: 10
        },
        textTitleStar: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
        },
        textInput: {
                borderWidth: 1,
                borderRadius: 10,
                fontFamily: 'UVN-Baisau-Regular',
        },
        containerImage: {
                alignItems: 'center'
        },
        containerButton: {
                alignItems: 'center',
                marginTop: 20
        },
        buttonOK: {
                width: 80,
                height: 40,
                borderRadius: 10,
                backgroundColor: colorMain,
                alignItems: 'center',
                justifyContent: 'center'
        },
        textButton: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize'
        },
        containerThank: {
                alignItems: 'center',
                marginVertical: 10
        },
        textThank: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize'
        }

});