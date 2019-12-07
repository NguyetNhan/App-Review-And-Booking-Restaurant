import React, { Component } from 'react';
import { Alert, View, Picker, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, PermissionsAndroid, Image, Modal, FlatList, Dimensions, ActivityIndicator, StatusBar } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/AntDesign';
import { colorMain, urlServer, KEY_API_GOOGLE_MAP } from '../../../config';
import SelectPlaceOnMap from './map';
import Geocoder from 'react-native-geocoder';
import { AccountModel } from '../../../models/account';

const { height, width } = Dimensions.get('window');
export default class RegisterRestaurant extends Component {

        constructor (props) {
                super(props);
                this.state = {
                        visibleModalSelectImage: false,
                        photos: [],
                        selectImage: null,
                        name: 'Ngọc Linh',
                        phone: '0123456789',
                        address: '147/15 Lý Tế Xuyên, Quận Thủ Đức, Thành Phố Hồ Chí Minh',
                        introduce: 'Nhiều món ngon nhất thế giới',
                        type: 'restaurant',
                        isLoading: false,
                        timeOpen: 8,
                        timeClose: 22,
                        changeScreen: false,
                        amount: 30,
                        visibleModalSelectPlaceOnMap: false,
                        region: {
                                latitude: 21.0242225,
                                longitude: 105.8207913,
                                latitudeDelta: 0.00922 * 1.5,
                                longitudeDelta: 0.00421 * 1.5
                        },
                        marker: null,
                        account: null
                };
                Geocoder.fallbackToGoogle(KEY_API_GOOGLE_MAP);
                this.requestLocationPermission();
                this._onClickCloseModalMap = this._onClickCloseModalMap.bind(this);
                this._onClickComplete = this._onClickComplete.bind(this);
        }

        async fetchInfoAccountFromLocal () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                try {
                        if (account.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        'Bạn chưa đăng nhập !',
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                this.props.navigation.navigate('Auth');
                        } else {
                                this.setState({
                                        account: account.data,
                                });
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Bạn chưa đăng nhập !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.props.navigation.navigate('Auth');
                }

        }


        componentDidMount () {
                this.fetchInfoAccountFromLocal();
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo',
                                nextProps.message,
                                [
                                        { text: 'OK', onPress: () => nextProps.onResetProps() },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }


        async  requestLocationPermission () {
                try {
                        const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                        );
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                Geolocation.getCurrentPosition((position) => {
                                        var region = {
                                                latitude: position.coords.latitude,
                                                longitude: position.coords.longitude,
                                                latitudeDelta: 0.00922 * 1.5,
                                                longitudeDelta: 0.00421 * 1.5
                                        };
                                        this.setState({
                                                region: region,
                                                marker: {
                                                        latitude: position.coords.latitude,
                                                        longitude: position.coords.longitude,
                                                }
                                        });
                                }, (error) => {
                                        Alert.alert(
                                                'Thông Báo',
                                                error.message,
                                                [
                                                        { text: 'OK' },
                                                ],
                                                { cancelable: false },
                                        );
                                }, {
                                        enableHighAccuracy: true,
                                        timeout: 20000,
                                        maximumAge: 1000
                                });
                        } else {
                                Alert.alert(
                                        'Thông Báo',
                                        'Chức năng này không được bạn cho phép sử dụng !',
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                        }
                } catch (err) {
                        console.warn(err);
                }
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
                this.setState({
                        selectImage: imageSelected
                });
        }

        onClickButtonRegister () {
                const listImage = this.state.selectImage;
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
                const data = {
                        name: this.state.name,
                        introduce: this.state.introduce,
                        address: this.state.address,
                        image: image,
                        phone: this.state.phone,
                        type: this.state.type,
                        timeOpen: this.state.timeOpen,
                        timeClose: this.state.timeClose,
                        position: {
                                latitude: this.state.marker.latitude,
                                longitude: this.state.marker.longitude,
                        },
                        idAdmin: this.state.account.id
                };
                if (data.name.length === 0) {
                        Alert.alert(
                                'Thông Báo',
                                'Tên không được để trống',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                } else if (data.introduce.length === 0) {
                        Alert.alert(
                                'Thông Báo',
                                'Mô tả không được để trống',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                } else if (this.state.address.length === 0) {
                        Alert.alert(
                                'Thông Báo',
                                'Địa chỉ không được để trống',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                } else if (data.image.length === 0) {
                        Alert.alert(
                                'Thông Báo',
                                'Bạn chưa chọn hình giới thiệu',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                } else if (data.phone.length < 10 || data.phone.length > 10 || data.phone.charAt(0) !== 0) {
                        Alert.alert('Thông báo', 'Bạn đã nhập số điện thoại !');
                } else {
                        this.setState({
                                isLoading: true
                        });
                        this.props.onRegisterRestaurant(data);
                }
        }

        _onClickOpenModalMap () {
                this.setState({
                        visibleModalSelectPlaceOnMap: !this.state.visibleModalSelectPlaceOnMap
                });
        }

        _onClickCloseModalMap () {
                this.setState({
                        visibleModalSelectPlaceOnMap: !this.state.visibleModalSelectPlaceOnMap
                });
        }

        _onClickComplete (position) {
                this.setState({
                        region: {
                                latitude: position.latitude,
                                longitude: position.longitude,
                                latitudeDelta: 0.00922 * 1.5,
                                longitudeDelta: 0.00421 * 1.5
                        },
                        marker: position
                });
        }

        async  _onEndCompleteEditAddress () {
                try {
                        const res = await Geocoder.geocodeAddress(this.state.address + ', Việt Nam');
                        this.setState({
                                marker: {
                                        latitude: res[0].position.lat,
                                        longitude: res[0].position.lng,
                                },
                        });
                } catch (error) {
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

        componentWillUnmount () {
                this.props.onResetProps();
        }

        render () {
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
                                        <Text style={styles.textHeader}>Đăng kí địa điểm kinh doanh</Text>
                                </View>
                                <ScrollView>
                                        <View style={styles.containerForm}>
                                                <Text style={styles.textHint}>Tên địa điểm</Text>
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
                                                <Text style={styles.textHint}>Loại địa điểm</Text>
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
                                                {/*      <TextInput style={styles.textInput}
                                                        placeholder='Tỉnh, Thành Phố'
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        textTinh: text
                                                                });
                                                        }}
                                                        value={this.state.textTinh}
                                                />
                                                <TextInput style={styles.textInput}
                                                        placeholder='Quận, Huyện'
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        textQuan: text
                                                                });
                                                        }}
                                                        value={this.state.textQuan}
                                                /> */}
                                                <TextInput style={styles.textInput} placeholder='Địa chỉ'
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        address: text
                                                                });
                                                        }}
                                                        multiline
                                                        value={this.state.address}
                                                        onEndEditing={() => {
                                                                this._onEndCompleteEditAddress();
                                                        }}
                                                />
                                                <Text style={styles.textHint}>Bản đồ</Text>
                                                <TouchableOpacity onPress={() => {
                                                        this._onClickOpenModalMap();
                                                }} >
                                                        <MapView
                                                                style={styles.map}
                                                                region={this.state.region}
                                                                provider={PROVIDER_GOOGLE}
                                                                zoomEnabled={false}
                                                        >
                                                                {
                                                                        this.state.marker === null ? null : <Marker coordinate={this.state.marker} />
                                                                }
                                                        </MapView>
                                                </TouchableOpacity>
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
                                                                <Picker.Item label="1h" value={1} />
                                                                <Picker.Item label="2h" value={2} />
                                                                <Picker.Item label="3h" value={3} />
                                                                <Picker.Item label="4h" value={4} />
                                                                <Picker.Item label="5h" value={5} />
                                                                <Picker.Item label="6h" value={6} />
                                                                <Picker.Item label="7h" value={7} />
                                                                <Picker.Item label="8h" value={8} />
                                                                <Picker.Item label="9h" value={9} />
                                                                <Picker.Item label="10h" value={10} />
                                                                <Picker.Item label="11h" value={11} />
                                                                <Picker.Item label="12h" value={12} />
                                                                <Picker.Item label="13h" value={13} />
                                                                <Picker.Item label="14h" value={14} />
                                                                <Picker.Item label="15h" value={15} />
                                                                <Picker.Item label="16h" value={16} />
                                                                <Picker.Item label="17h" value={17} />
                                                                <Picker.Item label="18h" value={18} />
                                                                <Picker.Item label="19h" value={19} />
                                                                <Picker.Item label="20h" value={20} />
                                                                <Picker.Item label="21h" value={21} />
                                                                <Picker.Item label="22h" value={22} />
                                                                <Picker.Item label="23h" value={23} />
                                                                <Picker.Item label="24h" value={24} />
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
                                                                <Picker.Item label="1h" value={1} />
                                                                <Picker.Item label="2h" value={2} />
                                                                <Picker.Item label="3h" value={3} />
                                                                <Picker.Item label="4h" value={4} />
                                                                <Picker.Item label="5h" value={5} />
                                                                <Picker.Item label="6h" value={6} />
                                                                <Picker.Item label="7h" value={7} />
                                                                <Picker.Item label="8h" value={8} />
                                                                <Picker.Item label="9h" value={9} />
                                                                <Picker.Item label="10h" value={10} />
                                                                <Picker.Item label="11h" value={11} />
                                                                <Picker.Item label="12h" value={12} />
                                                                <Picker.Item label="13h" value={13} />
                                                                <Picker.Item label="14h" value={14} />
                                                                <Picker.Item label="15h" value={15} />
                                                                <Picker.Item label="16h" value={16} />
                                                                <Picker.Item label="17h" value={17} />
                                                                <Picker.Item label="18h" value={18} />
                                                                <Picker.Item label="19h" value={19} />
                                                                <Picker.Item label="20h" value={20} />
                                                                <Picker.Item label="21h" value={21} />
                                                                <Picker.Item label="22h" value={22} />
                                                                <Picker.Item label="23h" value={23} />
                                                                <Picker.Item label="24h" value={24} />
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
                                                                        visibleModalSelectImage: !this.state.visibleModalSelectImage
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

                                <Modal
                                        transparent={false}
                                        animationType='slide'
                                        visible={this.state.visibleModalSelectPlaceOnMap}
                                        onRequestClose={() => {
                                                this._onClickCloseModalMap();
                                        }}
                                >
                                        <SelectPlaceOnMap
                                                _onClickComplete={this._onClickComplete}
                                                _onClickCloseModalMap={this._onClickCloseModalMap}
                                                _marker={this.state.marker}
                                                _region={this.state.region}
                                        />
                                </Modal>
                                <Modal
                                        animationType='slide'
                                        visible={this.state.isLoading}
                                >
                                        <View style={{
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: 'rgba(0,0,0,0.9)'
                                        }}>
                                                <ActivityIndicator animating={true} size={100} color={colorMain} />
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
        containerModalMap: {
                flex: 1
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
                marginHorizontal: 20
        },
        titleHeader: {
                fontFamily: 'UVN-Baisau-Regular',
                color: 'black',
                fontSize: 18,
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
                marginHorizontal: 20
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
                fontSize: 18,
                marginLeft: 10
        },
        map: {
                width: '100%',
                height: 150,
                marginTop: 10
        }
});