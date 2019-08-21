import React, { Component } from 'react';
import { Picker, View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, PermissionsAndroid, Image, Modal, FlatList, Dimensions, ActivityIndicator, StatusBar } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/AntDesign';
import { colorMain } from '../../../config';

export default class RegisterRestaurant extends Component {

        constructor (props) {
                super(props);
                this.state = {
                        modalVisible: false,
                        photos: [],
                        selectImage: null,
                        name: 'Ngọc Linh',
                        phone: '0123456789',
                        textTinh: 'Hồ Chí Minh',
                        textQuan: 'Thủ Đức',
                        address: '147/15 Lý Tế Xuyên',
                        introduce: 'Có nhiều gái đẹp',
                        type: 'restaurant',
                        isLoading: false,
                };
                this.requestCameraPermission();
        }

        static getDerivedStateFromProps (props, state) {
                return state.isLoading = props.loading;
        }


        async  requestCameraPermission () {
                try {
                        const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                        );
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                console.log('You can use the data');
                        } else {
                                console.log('Data permission denied');
                        }
                } catch (err) {
                        console.warn(err);
                }
        }

        async  _handleButtonPress () {
                var result = await CameraRoll.getPhotos({
                        first: 30,
                        assetType: 'Photos',
                });
                var listPhotos = result.edges;
                for (var item of listPhotos) {
                        item.node.image.selected = false;
                }
                this.setState({
                        photos: listPhotos
                });
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
                this.setState({
                        selectImage: imageSelected
                });
        }

        onClickButtonRegister () {
                this.setState({
                        isLoading: true
                });
                const listImage = this.state.selectImage;
                var image = [];
                for (var item of listImage) {
                        var format = {
                                uri: item.node.image.uri,
                                name: item.node.image.filename,
                                type: item.node.type
                        };
                        image.push(format);
                }
                const data = {
                        name: this.state.name,
                        introduce: this.state.introduce,
                        address: `${this.state.address}, ${this.state.textQuan}, ${this.state.textTinh}`,
                        image: image,
                        phone: this.state.phone,
                        type: this.state.type
                };
                this.props.onRegisterRestaurant(data);
        }

        render () {
                const { height, width } = Dimensions.get('window');
                if (this.state.isLoading) {
                        return (
                                <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                }}>
                                        <ActivityIndicator animating={true} size={80} color="#22D499" />
                                </View>
                        );
                } else {
                        return (
                                <View style={styles.container}>
                                        <StatusBar
                                                backgroundColor='white'
                                                barStyle='dark-content'
                                        />
                                        <View style={styles.containerHeader}>
                                                <TouchableOpacity onPress={() => {
                                                        this.props.navigation.goBack();
                                                }}>
                                                        <Icon name='arrowleft' size={25} color='black' />
                                                </TouchableOpacity>
                                                <Text style={styles.textHeader}>Đăng kí cửa hàng</Text>
                                        </View>
                                        <ScrollView
                                                showsVerticalScrollIndicator={false}
                                        >
                                                <View style={styles.containerForm}>
                                                        <Text style={styles.textHint}>Tên cửa hàng</Text>
                                                        <TextInput style={styles.textInput}
                                                                onChangeText={(text) => {
                                                                        this.setState({
                                                                                name: text
                                                                        });
                                                                }}
                                                                value={this.state.name}
                                                        />
                                                        <Text style={styles.textHint}>Giới thiệu</Text>
                                                        <TextInput style={styles.textInput}
                                                                editable={true}
                                                                multiline={true}
                                                                numberOfLines={4}
                                                                maxLength={40}
                                                                onChangeText={(text) => {
                                                                        this.setState({
                                                                                introduce: text
                                                                        });
                                                                }}
                                                                value={this.state.introduce}
                                                        />
                                                        <Text style={styles.textHint}>Loại nhà hàng</Text>
                                                        <Picker
                                                                selectedValue={this.state.type}
                                                                style={{
                                                                        height: 50,
                                                                        fontFamily: 'OpenSans-Regular',
                                                                        width: 300
                                                                }}
                                                                onValueChange={(itemValue, itemIndex) =>
                                                                        this.setState({ type: itemValue })
                                                                }>
                                                                <Picker.Item label="Nhà hàng" value="restaurant" />
                                                                <Picker.Item label="Coffee" value="coffee" />
                                                                <Picker.Item label="Bar" value="bar" />
                                                        </Picker>
                                                        <Text style={styles.textHint}>Số điện thoại</Text>
                                                        <TextInput style={styles.textInput}
                                                                keyboardType='number-pad'
                                                                onChangeText={(text) => {
                                                                        this.setState({
                                                                                phone: text
                                                                        });
                                                                }}
                                                                value={this.state.phone}
                                                        />
                                                        <Text style={styles.textHint}>Địa chỉ</Text>
                                                        <View style={styles.containerTextInput}>
                                                                <TextInput style={styles.textInputSeletion}
                                                                        placeholder='Thành phố, Tỉnh '
                                                                        onChangeText={(text) => {
                                                                                this.setState({
                                                                                        textTinh: text
                                                                                });
                                                                        }}
                                                                        value={this.state.textTinh}
                                                                />
                                                                <Icon name='down' size={25} color='black' />
                                                        </View>
                                                        <View style={styles.containerTextInput}>
                                                                <TextInput style={styles.textInputSeletion}
                                                                        placeholder='Quận, Huyện'
                                                                        onChangeText={(text) => {
                                                                                this.setState({
                                                                                        textQuan: text
                                                                                });
                                                                        }}
                                                                        value={this.state.textQuan}
                                                                />
                                                                <Icon name='down' size={25} color='black' />
                                                        </View>
                                                        <TextInput style={styles.textInput} placeholder='Số nhà, Tên đường'
                                                                onChangeText={(text) => {
                                                                        this.setState({
                                                                                address: text
                                                                        });
                                                                }}
                                                                value={this.state.address}
                                                        />
                                                        <View style={{
                                                                width: 300,
                                                                height: 50,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                marginTop: 10,
                                                        }}>
                                                                <Text style={{
                                                                        color: 'black',
                                                                        fontFamily: 'UVN-Baisau-Regular',
                                                                        marginTop: 10,
                                                                        flex: 1
                                                                }}>Ảnh giới thiệu</Text>
                                                                <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                                modalVisible: !this.state.modalVisible
                                                                        });
                                                                        this._handleButtonPress();
                                                                }} >
                                                                        <Icon name='picture' size={25} color='black' />
                                                                </TouchableOpacity>
                                                        </View>
                                                </View>
                                                {
                                                        this.state.selectImage === null ? null : <FlatList
                                                                horizontal={true}
                                                                data={this.state.selectImage}
                                                                keyExtractor={(item, index) => index.toString()}
                                                                extraData={this.state}
                                                                renderItem={(item) => {
                                                                        return (
                                                                                <Image
                                                                                        source={{ uri: item.item.node.image.uri }}
                                                                                        style={{
                                                                                                height: 150,
                                                                                                width: 150,
                                                                                                margin: 2
                                                                                        }}
                                                                                />
                                                                        );
                                                                }}
                                                        />
                                                }
                                                <View>

                                                </View>
                                                <View style={styles.containerButtonRegister}>
                                                        <TouchableOpacity style={styles.buttonRegister}
                                                                onPress={() => {
                                                                        this.setState({
                                                                                isLoading: true
                                                                        });
                                                                        this.onClickButtonRegister();
                                                                }}
                                                        >
                                                                <Text style={styles.textRegister}>Đăng kí</Text>
                                                        </TouchableOpacity>
                                                </View>
                                        </ScrollView>
                                        <Modal
                                                animationType="slide"
                                                transparent={false}
                                                visible={this.state.modalVisible} >
                                                <View style={styles.containerModal}>
                                                        <View style={styles.headerModal}>
                                                                <TouchableOpacity onPress={() => {
                                                                        this.setState({
                                                                                modalVisible: !this.state.modalVisible
                                                                        });
                                                                }} >
                                                                        <Icon name='down' size={30} color='#22D499' />
                                                                </TouchableOpacity>
                                                                <Text style={styles.titleHeader}>Image</Text>
                                                                <TouchableOpacity
                                                                        onPress={() => {
                                                                                this.setState({
                                                                                        modalVisible: !this.state.modalVisible
                                                                                });
                                                                                this.onClickCompleteSelectImage();
                                                                        }} >
                                                                        <Icon name='check' size={30} color='#22D499' />
                                                                </TouchableOpacity>
                                                        </View>
                                                        <FlatList
                                                                data={this.state.photos}
                                                                extraData={this.state}
                                                                keyExtractor={(item, index) => index.toString()}
                                                                numColumns={3}
                                                                horizontal={false}
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
                                        </Modal>
                                </View>
                        );
                }
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center',
                backgroundColor: 'white'
        },
        containerTextInput: {
                width: 300,
                flexDirection: 'row',
                borderBottomWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10
        },
        textInputSeletion: {
                flex: 1,
                fontFamily: 'OpenSans-Regular',
        },
        textHint: {
                color: 'black',
                fontFamily: 'UVN-Baisau-Regular',
                marginTop: 10,
                width: 300,
        },
        textInput: {
                width: 300,
                borderBottomWidth: 1,
                fontFamily: 'OpenSans-Regular',

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
                marginHorizontal: 5
        },
        titleHeader: {
                fontFamily: 'UVN-Baisau-Regular',
                color: 'black',
                fontSize: 30,
        },
        buttonRegister: {
                width: 150,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: colorMain
        },
        textRegister: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Regular',
        },
        containerButtonRegister: {
                alignItems: 'center',
                marginVertical: 10
        },
        containerForm: {
                alignItems: 'center'
        },
        containerLoading: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
        },
        containerHeader: {
                width: '100%',
                height: 50,
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                paddingHorizontal: 10
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                marginLeft: 10
        }
});