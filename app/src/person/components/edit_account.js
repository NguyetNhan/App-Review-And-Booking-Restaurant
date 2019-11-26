import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, PermissionsAndroid, Alert, Modal, Dimensions, FlatList } from 'react-native';
import { urlServer, colorMain, background } from '../../config';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AccountModel } from '../../models/account';
import CameraRoll from '@react-native-community/cameraroll';
import FormData from 'FormData';

const { height, width } = Dimensions.get('window');
export default class EditAccount extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: props.account,
                        name: props.account.name,
                        phone: props.account.phone.toString(),
                        password: props.account.password,
                        avatar: props.account.avatar,
                        photos: [],
                        amount: 30,
                        has_next_page: false,
                        visibleModalSelectImage: false,
                        isLoading: false,
                        imageSelect: null
                };
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

        async  onClickButtonOk () {
                try {
                        const formData = new FormData();
                        formData.append('name', this.state.name);
                        formData.append('phone', this.state.phone);
                        formData.append('password', this.state.password);
                        if (this.state.imageSelect !== null) {
                                formData.append('avatar', {
                                        uri: this.state.imageSelect.node.image.uri,
                                        name: this.state.imageSelect.node.image.filename,
                                        type: this.state.imageSelect.node.type
                                });
                        }
                        const response = await fetch(`${urlServer}/auth/update-account/idAccount/${this.state.account._id}`, {
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
                                let body = {
                                        authorities: this.state.account.authorities,
                                        email: this.state.email,
                                        name: this.state.name,
                                        phone: this.state.phone,
                                        password: this.state.password,
                                        score: this.state.account.score,
                                        conversation: this.state.account.conversation,
                                        avatar: response.data.avatar,
                                        discount: this.state.account.discount
                                };
                                await AccountModel.updateAccountFromDatabaseLocal(this.state.account._id, body);
                                this.props.onRefresh();
                                Alert.alert('Thông Báo', response.message);
                                this.props.onCloseEditAccount();
                        }
                } catch (error) {
                        Alert.alert('Thông Báo Lỗi', 'Cập nhật thất bại ! ' + error.message);
                }
        }

        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => this.props.onCloseEditAccount()}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                                this.onClickButtonOk();
                                        }}>
                                                <Text style={styles.textButtonOk}>OK</Text>
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.content}>
                                        <View style={styles.containerAvatar}>
                                                {
                                                        this.state.imageSelect !== null ?
                                                                <Image
                                                                        source={{ uri: this.state.imageSelect.node.image.uri }}
                                                                        style={styles.avatar}
                                                                />
                                                                :
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
                                                <TouchableOpacity style={styles.buttonEditAvatar}
                                                        onPress={() => {
                                                                this.setState({
                                                                        visibleModalSelectImage: !this.state.visibleModalSelectImage
                                                                });
                                                                this.requestCameraPermission();
                                                        }}
                                                >
                                                        <FontAwesome
                                                                name='camera'
                                                                size={20}
                                                                color={colorMain}
                                                        />
                                                </TouchableOpacity>
                                        </View>
                                        <Text style={styles.textTitle}>Tên</Text>
                                        <TextInput
                                                style={styles.textInPut}
                                                value={this.state.name}
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                name: text
                                                        });
                                                }}
                                        />
                                        <Text style={styles.textTitle}>Email</Text>
                                        <View style={styles.containerEmail}>
                                                <Text style={styles.textEmail}>{this.state.account.email}</Text>
                                        </View>
                                        <Text style={styles.textTitle}>Số điện thoại</Text>
                                        <TextInput
                                                style={styles.textInPut}
                                                value={this.state.phone}
                                                keyboardType='number-pad'
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                phone: text
                                                        });
                                                }}
                                        />
                                        <Text style={styles.textTitle}>Mật khẩu</Text>
                                        <TextInput
                                                style={styles.textInPut}
                                                value={this.state.password}
                                                secureTextEntry
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                password: text
                                                        });
                                                }}
                                        />
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
                                                        <TouchableOpacity
                                                                onPress={() => {
                                                                        this.setState({
                                                                                visibleModalSelectImage: !this.state.visibleModalSelectImage
                                                                        });
                                                                        this.onClickCompleteSelectImage();
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
                fontFamily: 'UVN-Baisau-Bold',
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
                paddingHorizontal: 20
        },
        avatar: {
                width: 100,
                height: 100,
                borderRadius: 50
        },
        containerAvatar: {
                height: 150,
                alignItems: 'center',
                justifyContent: 'center'
        },
        buttonEditAvatar: {
                position: 'absolute',
                bottom: 20,
                right: 110,
                width: 35,
                height: 35,
                borderRadius: 18,
                backgroundColor: 'rgba(0,0,0,0.3)',
                alignItems: 'center',
                justifyContent: 'center'
        },
        textTitle: {
                fontFamily: 'UVN-Baisau-Regular',
        },
        containerEmail: {
                backgroundColor: background,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                paddingHorizontal: 10
        },
        textEmail: {
                fontFamily: 'UVN-Baisau-Bold',
        },
        textInPut: {
                borderBottomWidth: 1,
                paddingHorizontal: 10
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