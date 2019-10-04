import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';
import { colorMain } from '../../../config';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
export default class AddMenu extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        nameFood: '',
                        moTa: '',
                        price: '',
                        uriImageSelect: props.uriImageSelect
                };
        }


        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.uriImageSelect !== prevState.uriImageSelect) {
                        prevState.uriImageSelect = nextProps.uriImageSelect;
                }
                return null;
        }

        _onClickComplete () {
                const data = {
                        name: this.state.nameFood,
                        moTa: this.state.moTa,
                        price: this.state.price,
                        image: this.state.uriImageSelect
                };
                if (data.name.length === 0) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Tên không được để trống !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                } else if (data.moTa.length === 0) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Mô tả không được để trống !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                } else if (data.price.length === 0) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Giá không được để trống !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                } else if (data.image.length === 0) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Bạn chưa chọn ảnh minh họa !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                } else {
                        this.props.onClickCompleteAddMenu(data);
                        this.props.onClickCloseAddMenu();
                }
        }

        render () {
                const screenWidth = Dimensions.get('window').width;
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.onClickCloseAddMenu();
                                        }}>
                                                <Icon name='down' size={30} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.titleHeader}>thêm món</Text>
                                        <TouchableOpacity onPress={() => {
                                                this._onClickComplete();
                                        }}>
                                                <Icon name='check' size={30} color='black' />
                                        </TouchableOpacity>
                                </View>
                                <View style={styles.content}>
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
                                                value={this.state.price}
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
                                                <TouchableOpacity onPress={() => {
                                                        this.props.onClickOpenSelectImage();
                                                }}>
                                                        <EvilIcons name='camera' size={50} color={colorMain} />
                                                </TouchableOpacity>
                                        </View>
                                        {
                                                this.state.uriImageSelect === null ? null :
                                                        <Image
                                                                source={{ uri: this.state.uriImageSelect.uri }}
                                                                style={{
                                                                        width: screenWidth - 40,
                                                                        height: screenWidth / 2
                                                                }}
                                                        />
                                        }
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
                padding: 20
        },
        textHint: {
                fontFamily: 'UVN-Baisau-Regular',
                marginTop: 10
        },
        textInput: {
                borderBottomWidth: 1,
                fontFamily: 'OpenSans-Regular',
        }
});