import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput, Alert, ScrollView, PermissionsAndroid, Modal, FlatList } from 'react-native';
import { colorMain, urlServer } from '../../../config';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CameraRoll from '@react-native-community/cameraroll';
import FormData from 'FormData';
const { height, width } = Dimensions.get('window');
export default class EditMenu extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        food: props.food,
                        nameFood: props.food.name,
                        moTa: props.food.introduce,
                        price: props.food.price,
                        imageSelect: null,
                        photos: [],
                        visibleModalSelectImage: false,
                        isLoading: false,
                        amount: 30,
                };
        }


        async  _onClickComplete () {
                try {
                        const formData = new FormData();
                        formData.append('name', this.state.nameFood);
                        formData.append('introduce', this.state.moTa);
                        formData.append('price', Number.parseInt(this.state.price));
                        if (this.state.imageSelect !== null) {
                                formData.append('menu', {
                                        uri: this.state.imageSelect.node.image.uri,
                                        name: this.state.imageSelect.node.image.filename,
                                        type: this.state.imageSelect.node.type
                                });
                        }
                        const response = await fetch(`${urlServer}/menu/update/idFood/${this.state.food._id}`, {
                                method: 'PUT',
                                headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'multipart/form-data',
                                },
                                body: formData,
                        }).then(value => value.json());
                        if (response.error) {
                                Alert.alert('Thông Báo Lỗi', response.message);
                        } else {
                                Alert.alert('Thông Báo', response.message);
                        }
                } catch (error) {
                        Alert.alert('Thông Báo Lỗi', 'Cập nhật thất bại ! ' + error.message);
                }
        }

        onClickButtonImage () {
                this.setState({
                        visibleModalSelectImage: !this.state.visibleModalSelectImage
                });
                this.requestCameraPermission();
        }

        async  requestCameraPermission () {
                try {
                        const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                        );
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                this._handleButtonPress();
                        } else {
                                Alert.alert(
                                        'Thông Báo',
                                        'Bạn không thể sử dụng chức năng này !',
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                        }
                } catch (err) {
                        Alert.alert('Thông Báo Lỗi', 'Không thể truy cập hình ảnh !');
                }
        }

        async  _handleButtonPress () {
                var result = await CameraRoll.getPhotos({
                        first: this.state.amount,
                        assetType: 'Photos',
                });
                var listPhotos = result.edges;
                for (var item of listPhotos) {
                        item.node.image.selected = false;
                }
                this.setState({
                        photos: listPhotos,
                        has_next_page: result.page_info.has_next_page
                });
        }
        async  onLoadMoreImage () {
                if (this.state.has_next_page) {
                        var result = await CameraRoll.getPhotos({
                                first: this.state.amount + 30,
                                assetType: 'Photos',
                        });
                        var listPhotos = result.edges;
                        for (var item of listPhotos) {
                                item.node.image.selected = false;
                        }
                        this.setState({
                                photos: listPhotos,
                                has_next_page: result.page_info.has_next_page,
                                amount: this.state.amount + 30,
                        });
                }
        }

        onSelectImage (index) {
                let listPhotos = this.state.photos;
                this.setState({
                        imageSelect: listPhotos[index],
                        visibleModalSelectImage: !this.state.visibleModalSelectImage
                });
        }



        render () {
                const screenWidth = Dimensions.get('window').width;
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.onCloseEditMenu();
                                        }}>
                                                <Icon name='down' size={30} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.titleHeaderEdit}>cập nhật món ăn</Text>
                                        <TouchableOpacity onPress={() => {
                                                this._onClickComplete();
                                        }}>
                                                <Text style={styles.textButtonUpdate}>OK</Text>
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.content}>
                                        <ScrollView>
                                                <Text style={styles.textHint}>Tên món ăn</Text>
                                                <TextInput style={styles.textInput}
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        nameFood: text
                                                                });
                                                        }}
                                                        value={this.state.nameFood}
                                                />
                                                <Text style={styles.textHint}>Mô tả</Text>
                                                <TextInput style={styles.textInput}
                                                        multiline={true}
                                                        textAlignVertical='top'
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        moTa: text
                                                                });
                                                        }}
                                                        value={this.state.moTa}
                                                />
                                                <Text style={styles.textHint}>Giá</Text>
                                                <TextInput style={styles.textInput}
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        price: text
                                                                });
                                                        }}
                                                        value={this.state.price.toString()}
                                                        keyboardType='number-pad'
                                                />
                                                <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        marginVertical: 10
                                                }}>
                                                        <Text style={{
                                                                fontFamily: 'UVN-Baisau-Regular',
                                                        }}>Hình ảnh</Text>
                                                        <TouchableOpacity onPress={() => this.onClickButtonImage()}>
                                                                <EvilIcons name='camera' size={50} color={colorMain} />
                                                        </TouchableOpacity>
                                                </View>
                                                {
                                                        this.state.imageSelect === null ?
                                                                <Image
                                                                        source={{ uri: `${urlServer}${this.state.food.image}` }}
                                                                        style={{
                                                                                width: screenWidth - 40,
                                                                                height: screenWidth / 2
                                                                        }}
                                                                />
                                                                :
                                                                <Image
                                                                        source={{ uri: this.state.imageSelect.node.image.uri }}
                                                                        style={{
                                                                                width: screenWidth - 40,
                                                                                height: screenWidth / 2
                                                                        }}
                                                                />
                                                }
                                        </ScrollView>
                                </View>
                                <Modal
                                        animationType="slide"
                                        transparent={false}
                                        visible={this.state.visibleModalSelectImage}
                                        onRequestClose={() => {
                                                this.setState({
                                                        visibleModalSelectImage: !this.state.visibleModalSelectImage
                                                });
                                        }}
                                >
                                        <View style={styles.containerModal}>
                                                <View style={styles.headerModal}>
                                                        <TouchableOpacity onPress={() => {
                                                                this.setState({
                                                                        visibleModalSelectImage: !this.state.visibleModalSelectImage
                                                                });
                                                        }} >
                                                                <Icon name='down' size={25} color='black' />
                                                        </TouchableOpacity>
                                                        <Text style={styles.titleHeader}>Ảnh</Text>
                                                        <View
                                                                style={{
                                                                        width: 25
                                                                }}
                                                        />
                                                </View>
                                                <FlatList
                                                        data={this.state.photos}
                                                        extraData={this.state}
                                                        keyExtractor={(item, index) => index.toString()}
                                                        numColumns={3}
                                                        horizontal={false}
                                                        onEndReached={() => {
                                                                this.onLoadMoreImage();
                                                        }}
                                                        refreshing={this.state.isLoading}
                                                        onRefresh={() => {
                                                                this._handleButtonPress();
                                                        }}
                                                        renderItem={(item) => {
                                                                return (
                                                                        <TouchableOpacity onPress={() => {
                                                                                this.onSelectImage(item.index);
                                                                        }} >
                                                                                <Image source={{ uri: item.item.node.image.uri }}
                                                                                        style={{
                                                                                                height: width / 3,
                                                                                                width: width / 3,
                                                                                                borderWidth: 1,
                                                                                                borderColor: 'white'
                                                                                        }} />
                                                                        </TouchableOpacity>
                                                                );
                                                        }}
                                                />
                                        </View>
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
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row'
        },
        titleHeaderEdit: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 20,
                textTransform: 'capitalize'
        },
        content: {
                flex: 1,
                padding: 20
        },
        textHint: {
                fontFamily: 'UVN-Baisau-Regular',
                marginTop: 10
        },
        textInput: {
                borderBottomWidth: 1,
                fontFamily: 'OpenSans-Regular',
        },
        textButtonUpdate: {
                color: colorMain,
                fontFamily: 'OpenSans-Bold',
        },
        containerModal: {
                flex: 1
        },
        headerModal: {
                height: 60,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0,0,0,0.3)',
                marginHorizontal: 20
        },
        titleHeader: {
                fontFamily: 'UVN-Baisau-Regular',
                color: 'black',
                fontSize: 18,
        },
});