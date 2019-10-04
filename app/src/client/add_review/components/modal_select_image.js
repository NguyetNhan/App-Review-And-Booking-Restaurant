import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, PermissionsAndroid, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import CameraRoll from '@react-native-community/cameraroll';
const { height, width } = Dimensions.get('window');
export default class ModalSelectImage extends Component {

        constructor (props) {
                super(props);
                this.state = {
                        photos: [],
                        has_next_page: false,
                        isLoading: false,
                        amount: 30,
                };
        }

        componentDidMount () {
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
                                        'Chức năng thêm ảnh không được bạn cho phép sử dụng !',
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                        }
                } catch (err) {
                        Alert.alert(
                                'Thông Báo',
                                err.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
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
                var listPhotos = this.state.photos;
                if (listPhotos[index].node.image.selected) {
                        listPhotos[index].node.image.selected = false;
                } else {
                        listPhotos[index].node.image.selected = true;
                }
                this.setState({
                        photos: listPhotos
                });
        }

        onClickCompleteSelectImage () {
                var listPhotos = this.state.photos;
                var imageSelected = [];
                for (var item of listPhotos) {
                        if (item.node.image.selected) {
                                imageSelected.push(item);
                        }
                }
                this.props._onSelectImageComplete(imageSelected);
        }

        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props._onCloseModalSelectImage();
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>ảnh</Text>
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.onClickCompleteSelectImage();
                                                        this.props._onCloseModalSelectImage();
                                                }} >
                                                <Icon name='check' size={25} color='black' />
                                        </TouchableOpacity>
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
                                                                {
                                                                        item.item.node.image.selected ? <View>
                                                                                <Image source={{ uri: item.item.node.image.uri }}
                                                                                        style={{
                                                                                                height: width / 3,
                                                                                                width: width / 3,
                                                                                                borderWidth: 5,
                                                                                                borderColor: 'white'
                                                                                        }} />
                                                                                <Icon name='checkcircle' size={30} color='#22D499' style={{
                                                                                        position: 'absolute',
                                                                                        right: 0
                                                                                }} />
                                                                        </View> : <Image source={{ uri: item.item.node.image.uri }}
                                                                                style={{
                                                                                        height: width / 3,
                                                                                        width: width / 3,
                                                                                        borderWidth: 1,
                                                                                        borderColor: 'white'
                                                                                }} />
                                                                }
                                                        </TouchableOpacity>
                                                );
                                        }}
                                />
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
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center'
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 18,
                textTransform: 'capitalize'
        },
});