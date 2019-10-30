import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, PermissionsAndroid, FlatList, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { urlServer, colorMain, background } from '../../config';
import CameraRoll from '@react-native-community/cameraroll';
const { width, height } = Dimensions.get('window');
export default class PhotoList extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        photos: [],
                        has_next_page: true,
                        amount: 30,
                        isLoading: false
                };
                this.requestCameraPermission();
        }

        async  requestCameraPermission () {
                try {
                        const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                        );
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                this.fetchPhotos();
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

        async  fetchPhotos () {
                this.setState({
                        isLoading: true
                });
                var result = await CameraRoll.getPhotos({
                        first: this.state.amount,
                        assetType: 'Photos',
                });
                var listPhotos = result.edges;
                for (var item of listPhotos) {
                        item.node.image.isSelected = false;
                }
                this.setState({
                        photos: listPhotos,
                        has_next_page: result.page_info.has_next_page,
                        isLoading: false
                });
        }

        async  onLoadMoreImage () {
                if (this.state.has_next_page) {
                        this.setState({
                                isLoading: true
                        });
                        var result = await CameraRoll.getPhotos({
                                first: this.state.amount + 30,
                                assetType: 'Photos',
                        });
                        var listPhotos = result.edges;
                        for (var item of listPhotos) {
                                item.node.image.isSelected = false;
                        }
                        this.setState({
                                photos: listPhotos,
                                has_next_page: result.page_info.has_next_page,
                                amount: this.state.amount + 30,
                                isLoading: false
                        });
                }
        }

        onSelectedImage (index) {
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

        onClickButtonOK () {
                var listPhotos = this.state.photos;
                var imageSelected = [];
                for (var item of listPhotos) {
                        if (item.node.image.selected) {
                                imageSelected.push(item);
                        }
                }
                this.props.onSetPhoto(imageSelected);
        }

        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.onClosePhoto();
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>Ảnh</Text>
                                        <TouchableOpacity style={styles.buttonOk} onPress={() => {
                                                this.onClickButtonOK();
                                                this.props.onClosePhoto();
                                        }}>
                                                <Text style={styles.textOK}>OK</Text>
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.flatList}>
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
                                                        this.fetchPhotos();
                                                }}
                                                renderItem={(item) => {
                                                        return (
                                                                <TouchableOpacity onPress={() => {
                                                                        this.onSelectedImage(item.index);
                                                                }} >
                                                                        {
                                                                                item.item.node.image.selected ? <View>
                                                                                        <Image source={{ uri: item.item.node.image.uri }}
                                                                                                style={{
                                                                                                        height: width / 3,
                                                                                                        width: width / 3,
                                                                                                        borderWidth: 2,
                                                                                                        borderColor: colorMain
                                                                                                }} />
                                                                                        <View style={{
                                                                                                position: 'absolute',
                                                                                                height: width / 3,
                                                                                                width: width / 3,
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center'
                                                                                        }} >
                                                                                                <Icon name='checkcircle' size={30} color='#22D499' />
                                                                                        </View>

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
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: background,
                justifyContent: 'space-between'
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16
        },
        flatList: {
                flex: 1
        },
        buttonOk: {
                backgroundColor: colorMain,
                width: 50,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
        },
        textOK: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Regular',
        }
});