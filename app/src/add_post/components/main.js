import React, { Component } from 'react';
import { ToastAndroid, ScrollView, View, Text, Image, StyleSheet, Dimensions, FlatList, StatusBar, Alert, TouchableOpacity, TextInput, ActivityIndicator, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { background, colorMain, urlServer } from '../../config';
import { AccountModel } from '../../models/account';
import PlaceList from '../containers/place_list';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
import PhotoList from './photo_list';
import Discount from './discount';
import { convertDate } from '../../functions/convert';
const { width, height } = Dimensions.get('window');

export default class AddPost extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        isLoading: true,
                        content: '',
                        visiblePlaceList: false,
                        selectedPlace: null,
                        visiblePhoto: false,
                        photoSelected: [],
                        isLoadingPost: false,
                        visibleDiscount: false,
                        discount: null
                };
                this.onClosePlaceList = this.onClosePlaceList.bind(this);
                this.onSelectedPlace = this.onSelectedPlace.bind(this);
                this.onClosePhoto = this.onClosePhoto.bind(this);
                this.onSetPhoto = this.onSetPhoto.bind(this);
                this.onCloseDiscount = this.onCloseDiscount.bind(this);

        }

        async componentDidMount () {
                const resultAccount = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (resultAccount.error) {
                        Alert.alert('Thông Báo Lỗi', resultAccount.message);
                } else {
                        this.setState({
                                account: resultAccount.data,
                                isLoading: false
                        });
                        if (resultAccount.data.authorities === 'admin-restaurant') {
                                try {
                                        const response = await fetch(`${urlServer}/restaurant/idAdminRestaurant/${resultAccount.data.id}`, {
                                                method: 'GET',
                                                headers: {
                                                        Accept: 'application/json',
                                                        'Content-Type': 'application/json',
                                                }
                                        }).then(value => value.json());
                                        if (!response.error)
                                                this.setState({
                                                        selectedPlace: response.data
                                                });
                                } catch (error) {
                                        Alert.alert('Thông Báo Lỗi', error.message);
                                }
                        }
                }
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoadingPost !== prevState.isLoadingPost && nextProps.isLoadingPost !== undefined) {
                        prevState.isLoadingPost = nextProps.isLoadingPost;
                }
                if (nextProps.messageFailed !== undefined) {
                        Alert.alert(
                                'Thông Báo',
                                nextProps.messageFailed,
                                [
                                        {
                                                text: 'OK',
                                                onPress: () => nextProps.onResetPropsMessageMain()
                                        }
                                ]
                        );
                }
                if (nextProps.messageSucceeded !== undefined) {
                        prevState.photoSelected = [];
                        //   prevState.selectedPlace = null;
                        prevState.content = '';
                        ToastAndroid.show(nextProps.messageSucceeded, ToastAndroid.LONG);
                        nextProps.onResetPropsMessageMain();
                }
                return null;
        }

        onOpenPlaceList () {
                this.setState({
                        visiblePlaceList: !this.state.visiblePlaceList
                });
        }

        onClosePlaceList () {
                this.setState({
                        visiblePlaceList: !this.state.visiblePlaceList
                });
        }

        onSelectedPlace (item) {
                this.setState({
                        selectedPlace: item
                });
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

        onCloseDiscount (discount) {
                discount.idRestaurant = this.state.selectedPlace._id;
                this.setState({
                        visibleDiscount: !this.state.visibleDiscount,
                        discount: discount
                });
        }

        onOpenDiscount () {
                this.setState({
                        visibleDiscount: !this.state.visibleDiscount
                });
        }

        onSetPhoto (list) {
                this.setState({
                        photoSelected: list
                });
        }

        onButtonPost () {
                this.setState({
                        isLoadingPost: true
                });
                const listImage = this.state.photoSelected;
                var image = [];
                if (listImage !== null) {
                        for (var item of listImage) {
                                var format = {
                                        uri: item.node.image.uri,
                                        name: item.node.image.filename,
                                        type: item.node.type
                                };
                                image.push(format);
                        }
                }
                var data = {};
                if (this.state.selectedPlace === null) {
                        if (this.state.account.authorities === 'admin-restaurant') {
                                data = {
                                        idAccount: this.state.account.id,
                                        idRestaurant: this.state.selectedPlace._id,
                                        image: image,
                                        content: this.state.content,
                                        typePost: 'restaurant',
                                        discount: this.state.discount
                                };
                        } else {
                                data = {
                                        idAccount: this.state.account.id,
                                        idRestaurant: null,
                                        image: image,
                                        content: this.state.content,
                                        typePost: 'client',
                                        discount: null
                                };
                        }
                } else {
                        if (this.state.account.authorities === 'admin-restaurant') {
                                data = {
                                        idAccount: this.state.account.id,
                                        idRestaurant: this.state.selectedPlace._id,
                                        image: image,
                                        content: this.state.content,
                                        typePost: 'restaurant',
                                        discount: this.state.discount
                                };
                        } else {
                                data = {
                                        idAccount: this.state.account.id,
                                        idRestaurant: this.state.selectedPlace._id,
                                        image: image,
                                        content: this.state.content,
                                        typePost: 'client',
                                        discount: null
                                };
                        }
                }
                this.props.onAddPost(data);
        }

        componentWillUnmount () {
                this.props.onResetPropsMain();
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
                        if (this.state.selectedPlace !== null) {
                                const score = this.state.selectedPlace.star;
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

                        return (
                                <View style={styles.container}>
                                        <StatusBar
                                                backgroundColor='white'
                                                barStyle='dark-content'
                                                translucent={false}
                                        />
                                        <View style={styles.header}>
                                                <TouchableOpacity onPress={() => {
                                                        this.props.navigation.goBack();
                                                }}>
                                                        <Icon name='arrowleft' size={25} color='black' />
                                                </TouchableOpacity>
                                                <Text style={styles.textHeader}>Tạo bài viết</Text>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.onButtonPost();
                                                        }}
                                                        style={styles.buttonPost}>
                                                        <Text style={styles.textButtonPost}>đăng</Text>
                                                </TouchableOpacity>
                                        </View>
                                        <ScrollView>
                                                <View style={styles.content}>
                                                        <View style={styles.containerInput}>
                                                                {
                                                                        this.state.account.avatar == 'null' ?
                                                                                <Image
                                                                                        source={require('../../assets/images/avatar_user.png')}
                                                                                        style={styles.image}
                                                                                /> :
                                                                                <Image
                                                                                        source={{ uri: `${urlServer}${this.state.account.avatar}` }}
                                                                                        style={styles.image}
                                                                                />
                                                                }
                                                                <TextInput
                                                                        style={styles.textInput}
                                                                        autoFocus={true}
                                                                        autoCapitalize='sentences'
                                                                        value={this.state.content}
                                                                        placeholder='Cảm nghĩ của bạn !'
                                                                        multiline={true}
                                                                        textAlignVertical='top'
                                                                        onChangeText={(text) => {
                                                                                this.setState({
                                                                                        content: text
                                                                                });
                                                                        }}
                                                                />
                                                        </View>
                                                        <View style={styles.flatListPhoto}>
                                                                <FlatList
                                                                        horizontal={true}
                                                                        data={this.state.photoSelected}
                                                                        keyExtractor={(item, index) => index.toString()}
                                                                        extraData={this.state}
                                                                        renderItem={(item) => {
                                                                                return (
                                                                                        <Image
                                                                                                source={{ uri: item.item.node.image.uri }}
                                                                                                style={{
                                                                                                        height: 120,
                                                                                                        width: 120,
                                                                                                        margin: 2
                                                                                                }}
                                                                                        />
                                                                                );
                                                                        }}
                                                                />
                                                        </View>
                                                        {
                                                                this.state.discount === null ? null :
                                                                        <View style={styles.containerDiscount}>
                                                                                <Text style={styles.textNameDiscount}>{this.state.discount.name}</Text>
                                                                                <Text style={styles.textTitleDiscount}>Số lượng mã khuyến mãi : <Text style={styles.textValueDiscount}>{this.state.discount.amount}</Text></Text>
                                                                                <Text style={styles.textTitleDiscount}>Giá trị mã khuyến mãi : <Text style={styles.textValueDiscount}>{this.state.discount.percent}%</Text></Text>
                                                                                <Text style={styles.textTitleDiscount}>Ngày kết thúc khuyến mãi : <Text style={styles.textValueDiscount}>{convertDate(this.state.discount.endDate)}</Text></Text>
                                                                        </View>
                                                        }
                                                        {
                                                                this.state.selectedPlace === null ?
                                                                        <Text style={styles.note}>* hãy chọn địa điểm bạn đã đến để review và cộng thêm điểm thưởng !</Text>
                                                                        :
                                                                        <View style={styles.containerPlace}>
                                                                                <Image
                                                                                        source={{ uri: `${urlServer}${this.state.selectedPlace.imageRestaurant[0]}` }}
                                                                                        style={styles.imagePlace}
                                                                                />
                                                                                <View style={styles.infoPlace}>
                                                                                        <Text style={styles.namePlace}>{this.state.selectedPlace.name}</Text>
                                                                                        <View
                                                                                                style={styles.star}
                                                                                        >
                                                                                                {
                                                                                                        this.state.selectedPlace.score === null ? null :
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
                                                                                        <Text style={styles.addressPlace}
                                                                                                numberOfLines={2}
                                                                                                ellipsizeMode='tail'
                                                                                        >{this.state.selectedPlace.address}</Text>
                                                                                </View>
                                                                        </View>
                                                        }
                                                        <View style={styles.containerOptions}>
                                                                {
                                                                        this.state.account.authorities === 'admin-restaurant' ? null :
                                                                                <TouchableOpacity
                                                                                        style={styles.options}
                                                                                        onPress={() => {
                                                                                                this.onOpenPlaceList();
                                                                                        }}
                                                                                >
                                                                                        <Entypo name='location-pin' size={30} color='red' />
                                                                                        <Text style={styles.textOptions}>Địa điểm</Text>
                                                                                </TouchableOpacity>
                                                                }
                                                                <View style={styles.line} />
                                                                <TouchableOpacity
                                                                        style={styles.options}
                                                                        onPress={() => {
                                                                                this.onOpenPhoto();
                                                                        }}
                                                                >
                                                                        <Entypo name='images' size={30} color={colorMain} />
                                                                        <Text style={styles.textOptions}>Hình ảnh</Text>
                                                                </TouchableOpacity>
                                                                {
                                                                        this.state.account.authorities !== 'admin-restaurant' ? null :
                                                                                <View style={{
                                                                                        flex: 1
                                                                                }}>
                                                                                        <View style={styles.line} />
                                                                                        <TouchableOpacity
                                                                                                style={styles.options}
                                                                                                onPress={() => {
                                                                                                        this.onOpenDiscount();
                                                                                                }}
                                                                                        >
                                                                                                <Entypo name='code' size={30} color='red' />
                                                                                                <Text style={styles.textOptions}>Tạo mã khuyến mãi</Text>
                                                                                        </TouchableOpacity>
                                                                                </View>
                                                                }
                                                        </View>
                                                </View>
                                        </ScrollView>
                                        <Modal
                                                visible={this.state.visiblePlaceList}
                                                animated={true}
                                                animationType='slide'
                                                onRequestClose={() => {
                                                        this.onClosePlaceList();
                                                }}
                                        >
                                                <PlaceList
                                                        onClosePlaceList={this.onClosePlaceList}
                                                        idAccount={this.state.account.id}
                                                        onSelectedPlace={this.onSelectedPlace}
                                                />
                                        </Modal>
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
                                        <Modal
                                                visible={this.state.isLoadingPost}
                                                animated={true}
                                                animationType='slide'
                                                transparent
                                        >
                                                <View
                                                        style={{
                                                                flex: 1,
                                                                backgroundColor: 'rgba(0,0,0,0.5)',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                        }}
                                                >
                                                        <ActivityIndicator
                                                                animating={true}
                                                                size={50}
                                                        />
                                                </View>
                                        </Modal>
                                        <Modal
                                                visible={this.state.visibleDiscount}
                                                animated={true}
                                                animationType='slide'
                                                onRequestClose={() => this.onCloseDiscount(null)}
                                        >
                                                <Discount
                                                        onCloseDiscount={this.onCloseDiscount}
                                                />
                                        </Modal>

                                </View>
                        );
                }
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        containerLoading: {
                flex: 1,
                alignItems: 'center'
        },
        header: {
                height: 50,
                width: '100%',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                borderBottomWidth: 1,
                borderBottomColor: background
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                fontSize: 16,
                flex: 1,
                marginLeft: 10
        },
        buttonPost: {
                backgroundColor: colorMain,
                width: 50,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
        },
        containerInput: {
                flex: 1,
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 10
        },
        image: {
                width: 40,
                height: 40,
                borderRadius: 20
        },
        textButtonPost: {
                color: 'white',
                textTransform: 'capitalize'
        },
        content: {
                flex: 1,
        },
        textInput: {
                marginLeft: 10,
                flex: 1,
                minHeight: 200
        },
        containerOptions: {
                borderTopWidth: 1,
                borderTopColor: background
        },
        options: {
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
                paddingHorizontal: 20,
        },
        textOptions: {
                marginLeft: 10,
                fontFamily: 'UVN-Baisau-Regular',
        },
        line: {
                height: 1,
                backgroundColor: background,
                marginLeft: 60
        },
        containerDiscount: {
                flex: 1,
                marginHorizontal: 20,
                marginVertical: 10,
                borderColor: 'red',
                borderWidth: 1,
                padding: 10
        },
        textNameDiscount: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 16,
                color: colorMain
        },
        textTitleDiscount: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12
        },
        textValueDiscount: {
                fontFamily: 'UVN-Baisau-Bold',
        },
        containerPlace: {
                flexDirection: 'row',
                padding: 10,
                borderWidth: 1,
                borderColor: colorMain,
                margin: 20,
        },
        imagePlace: {
                width: 70,
                height: 70
        },
        infoPlace: {
                marginHorizontal: 10,
                flex: 1
        },
        namePlace: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16,
                color: colorMain
        },
        addressPlace: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12
        },
        star: {
                flexDirection: 'row'
        },
        flatListPhoto: {
                marginTop: 10
        },
        note: {
                color: 'red',
                fontFamily: 'UVN-Baisau-Regular',
                marginHorizontal: 20,
                marginVertical: 10,
                textAlign: 'center'
        }
});