import React, { Component } from 'react';
import { Picker, View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, PermissionsAndroid, Image, Modal, FlatList, Dimensions, ActivityIndicator, StatusBar } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/AntDesign';
import { colorMain } from '../../../config';

//FIXME: không hiện loading khi nhấn nút đăng kí

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
                        timeOpen: '8',
                        timeClose: '22',
                        modalLoading: false,
                        changeScreen: false
                };
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.modalLoading !== prevState.modalLoading && nextProps.modalLoading !== undefined) {
                        prevState.modalLoading = nextProps.modalLoading;
                }
                if (nextProps.changeScreen !== prevState.changeScreen && nextProps.changeScreen !== undefined) {
                        // nextProps.navigation.navigate('AppAdminRestaurant');
                }
                return null;
        }



        async  requestCameraPermission () {
                try {
                        const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                        );
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                this._handleButtonPress();
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
                        modalLoading: !this.state.modalLoading
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
                        type: this.state.type,
                        time: `${this.state.timeOpen}-${this.state.timeClose}`
                };
                this.props.onRegisterRestaurant(data);
        }

        render () {
                const { height, width } = Dimensions.get('window');
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
                                                <TextInput style={{
                                                        borderBottomWidth: 1,
                                                        fontFamily: 'OpenSans-Regular',
                                                        height: 100
                                                }}
                                                        editable={true}
                                                        placeholder='Tối đa 10 dòng'
                                                        multiline={true}
                                                        numberOfLines={10}
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
                                                        }}
                                                        onValueChange={(itemValue, itemIndex) =>
                                                                this.setState({ type: itemValue })
                                                        }>
                                                        <Picker.Item label="Nhà hàng" value="restaurant" />
                                                        <Picker.Item label="Coffee" value="coffee" />
                                                        <Picker.Item label="Bar" value="bar" />
                                                </Picker>
                                                <View style={{
                                                        height: 1,
                                                        backgroundColor: 'gray'
                                                }} />
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
                                                <Picker
                                                        selectedValue={this.state.textTinh}
                                                        style={{
                                                                height: 50,
                                                                fontFamily: 'OpenSans-Regular',
                                                        }}
                                                        onValueChange={(itemValue, itemIndex) =>
                                                                this.setState({ textTinh: itemValue })
                                                        }>
                                                        <Picker.Item label="Hồ Chí Minh" value="Hồ Chí Minh" />
                                                        <Picker.Item label="Hà Nội" value="Hà Nội" />
                                                        <Picker.Item label="Đà Nẵng" value="Đà Nẵng" />
                                                </Picker>
                                                <View style={{
                                                        height: 1,
                                                        backgroundColor: 'gray'
                                                }} />
                                                <TextInput style={styles.textInput}
                                                        placeholder='Quận, Huyện'
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        textQuan: text
                                                                });
                                                        }}
                                                        value={this.state.textQuan}
                                                />
                                                <TextInput style={styles.textInput} placeholder='Số nhà, Tên đường'
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        address: text
                                                                });
                                                        }}
                                                        value={this.state.address}
                                                />
                                                <Text style={styles.textHint}>Thời gian mở cửa</Text>
                                                <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                }}>
                                                        <Text style={{
                                                                fontFamily: 'OpenSans-Regular',
                                                        }}>Từ</Text>
                                                        <Picker
                                                                selectedValue={this.state.timeOpen}
                                                                style={{
                                                                        height: 50,
                                                                        width: 100,
                                                                }}
                                                                onValueChange={(itemValue, itemIndex) =>
                                                                        this.setState({ timeOpen: itemValue })
                                                                }>
                                                                <Picker.Item label="1h" value="1" />
                                                                <Picker.Item label="2h" value="2" />
                                                                <Picker.Item label="3h" value="3" />
                                                                <Picker.Item label="4h" value="4" />
                                                                <Picker.Item label="5h" value="5" />
                                                                <Picker.Item label="6h" value="6" />
                                                                <Picker.Item label="7h" value="7" />
                                                                <Picker.Item label="8h" value="8" />
                                                                <Picker.Item label="9h" value="9" />
                                                                <Picker.Item label="10" value="10" />
                                                                <Picker.Item label="11h" value="11" />
                                                                <Picker.Item label="12h" value="12" />
                                                                <Picker.Item label="13h" value="13" />
                                                                <Picker.Item label="14h" value="14" />
                                                                <Picker.Item label="15h" value="15" />
                                                                <Picker.Item label="16h" value="16" />
                                                                <Picker.Item label="17h" value="17" />
                                                                <Picker.Item label="18" value="18" />
                                                                <Picker.Item label="19h" value="19" />
                                                                <Picker.Item label="20h" value="20" />
                                                                <Picker.Item label="21h" value="21" />
                                                                <Picker.Item label="22h" value="22" />
                                                                <Picker.Item label="23h" value="23" />
                                                                <Picker.Item label="24h" value="24" />
                                                        </Picker>
                                                        <Text style={{
                                                                fontFamily: 'OpenSans-Regular',
                                                        }}>Đến</Text>
                                                        <Picker
                                                                selectedValue={this.state.timeClose}
                                                                style={{
                                                                        height: 30,
                                                                        width: 100,
                                                                }}
                                                                onValueChange={(itemValue, itemIndex) =>
                                                                        this.setState({ timeClose: itemValue })
                                                                }>
                                                                <Picker.Item label="1h" value="1" />
                                                                <Picker.Item label="2h" value="2" />
                                                                <Picker.Item label="3h" value="3" />
                                                                <Picker.Item label="4h" value="4" />
                                                                <Picker.Item label="5h" value="5" />
                                                                <Picker.Item label="6h" value="6" />
                                                                <Picker.Item label="7h" value="7" />
                                                                <Picker.Item label="8h" value="8" />
                                                                <Picker.Item label="9h" value="9" />
                                                                <Picker.Item label="10" value="10" />
                                                                <Picker.Item label="11h" value="11" />
                                                                <Picker.Item label="12h" value="12" />
                                                                <Picker.Item label="13h" value="13" />
                                                                <Picker.Item label="14h" value="14" />
                                                                <Picker.Item label="15h" value="15" />
                                                                <Picker.Item label="16h" value="16" />
                                                                <Picker.Item label="17h" value="17" />
                                                                <Picker.Item label="18" value="18" />
                                                                <Picker.Item label="19h" value="19" />
                                                                <Picker.Item label="20h" value="20" />
                                                                <Picker.Item label="21h" value="21" />
                                                                <Picker.Item label="22h" value="22" />
                                                                <Picker.Item label="23h" value="23" />
                                                                <Picker.Item label="24h" value="24" />
                                                        </Picker>
                                                </View>
                                                <View style={{
                                                        height: 50,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                }}>
                                                        <Text style={{
                                                                color: 'black',
                                                                fontFamily: 'UVN-Baisau-Regular',
                                                        }}>Ảnh giới thiệu</Text>
                                                        <TouchableOpacity onPress={() => {
                                                                this.setState({
                                                                        modalVisible: !this.state.modalVisible
                                                                });
                                                                this.requestCameraPermission();
                                                        }} >
                                                                <Icon name='pluscircle' size={30} color={colorMain} />
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
                                                                <Icon name='down' size={30} color='black' />
                                                        </TouchableOpacity>
                                                        <Text style={styles.titleHeader}>Image</Text>
                                                        <TouchableOpacity
                                                                onPress={() => {
                                                                        this.setState({
                                                                                modalVisible: !this.state.modalVisible
                                                                        });
                                                                        this.onClickCompleteSelectImage();
                                                                }} >
                                                                <Icon name='check' size={30} color='black' />
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
                                <Modal
                                        transparent={true}
                                        animationType='slide'
                                        visible={this.state.modalLoading}
                                >
                                        <View
                                                style={{
                                                        flex: 1,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: 'rgba(f,f,f,0.3)'
                                                }}>
                                                <ActivityIndicator animating={true} size={80} color={colorMain} />
                                        </View>
                                </Modal>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
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
        },
        textInput: {
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
                flex: 1,
                paddingHorizontal: 20
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
                paddingHorizontal: 20
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                marginLeft: 10
        }
});