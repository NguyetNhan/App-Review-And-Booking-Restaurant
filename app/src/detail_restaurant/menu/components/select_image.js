import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, PermissionsAndroid, FlatList } from 'react-native';
import { colorMain } from '../../../config';
import Icon from 'react-native-vector-icons/AntDesign';
import CameraRoll from '@react-native-community/cameraroll';


export default class SelectImage extends Component {

        constructor (props) {
                super(props);
                this.state = {
                        photos: [],
                        isLoading: false,
                        amount: 30
                };
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
                                alert('Chức năng này không được bạn cho phép sử dụng !');
                                this.props.onClickCloseSelectImage();
                        }
                } catch (err) {
                        console.warn(err);
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

        onClickSelectImage (uri) {
                this.props.onClickSelectImage(uri);
                this.props.onClickCloseSelectImage();
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

        render () {
                const screenWidth = Dimensions.get('window').width;
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.onClickCloseSelectImage();
                                        }}>
                                                <Icon name='down' size={30} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.titleHeader}>hình ảnh</Text>
                                        <View />
                                </View>
                                <View style={styles.content}>
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
                                                                <TouchableOpacity
                                                                        onPress={() => {
                                                                                var format = {
                                                                                        uri: item.item.node.image.uri,
                                                                                        name: item.item.node.image.filename,
                                                                                        type: item.item.node.type
                                                                                };
                                                                                this.onClickSelectImage(format);
                                                                        }}
                                                                >
                                                                        <Image
                                                                                source={{ uri: item.item.node.image.uri }}
                                                                                style={{
                                                                                        width: screenWidth / 3,
                                                                                        height: screenWidth / 3
                                                                                }}
                                                                        />
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
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row'
        },
        titleHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                textTransform: 'capitalize'
        },
        content: {
                flex: 1,
        },
        image: {
                width: 100,
                height: 100
        }
});