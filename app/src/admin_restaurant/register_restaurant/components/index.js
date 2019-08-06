import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, PermissionsAndroid, Image, Modal, FlatList, Dimensions } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/AntDesign';

export default class RegisterRestaurant extends Component {

        constructor (props) {
                super(props);
                this.state = {
                        modalVisible: false,
                        data: [0, 1, 2, 6, 8, 16, 46, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
                };
                this.requestCameraPermission();
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

        async   _handleButtonPress () {
                var result = await CameraRoll.getPhotos({
                        first: 20,
                        assetType: 'Photos',
                });
                console.log('result: ', result);
        }



        render () {
                const { height, width } = Dimensions.get('window');
                return (
                        <View style={styles.container}>
                                <ScrollView  >
                                        <Text style={styles.textHint}>Tên cửa hàng</Text>
                                        <TextInput style={styles.textInput} />
                                        <Text style={styles.textHint}>Giới thiệu</Text>
                                        <TextInput style={styles.textInput}
                                                editable={true}
                                                multiline={true}
                                                numberOfLines={4}
                                                maxLength={40} />
                                        <Text style={styles.textHint}>Số điện thoại</Text>
                                        <TextInput style={styles.textInput}
                                                keyboardType='number-pad'
                                        />
                                        <Text style={styles.textHint}>Địa chỉ</Text>
                                        <View style={styles.containerTextInput}>
                                                <TextInput style={styles.textInputSeletion}
                                                        placeholder='Thành phố, Tỉnh ' />
                                                <Icon name='down' size={25} color='black' />
                                        </View>
                                        <View style={styles.containerTextInput}>
                                                <TextInput style={styles.textInputSeletion}
                                                        placeholder='Quận, Huyện'
                                                />
                                                <Icon name='down' size={25} color='black' />
                                        </View>
                                        <TextInput style={styles.textInput} placeholder='Số nhà, Tên đường' />
                                        <View style={{
                                                width: 300,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: 10
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
                                                                }} >
                                                                <Icon name='check' size={30} color='#22D499' />
                                                        </TouchableOpacity>
                                                </View>
                                                <FlatList
                                                        data={this.state.data}
                                                        extraData={this.state}
                                                        numColumns={3}
                                                        horizontal={false}
                                                        renderItem={(item) => {

                                                                return (
                                                                        <TouchableOpacity >
                                                                                {/* <Image source={{ uri: 'https://viknews.com/vi/wp-content/uploads/2019/04/Hot-girl-Tr%C3%A2m-Anh.jpg' }}
                                                                                        style={{
                                                                                                height: width / 3,
                                                                                                width: width / 3,
                                                                                                borderWidth: 1,
                                                                                                borderColor: 'white'
                                                                                        }} /> */}
                                                                                <View>
                                                                                        <Image source={{ uri: 'https://viknews.com/vi/wp-content/uploads/2019/04/Hot-girl-Tr%C3%A2m-Anh.jpg' }}
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
                                                                                </View>
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
                flex: 1,
                alignItems: 'center'
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
                marginTop: 10
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
                borderBottomColor: 'rgba(0,0,0,0.3)'
        },
        titleHeader: {
                fontFamily: 'UVN-Baisau-Regular',
                color: 'black',
                fontSize: 30,
        }
});