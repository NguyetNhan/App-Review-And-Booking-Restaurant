import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { urlServer, colorMain, background } from '../../config';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class Discount extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        endDate: new Date(),
                        showDate: false,
                        name: 'Cùng săn mã giảm giá 50% nào mọi người, nhanh tay nào, số lượng có hạn',
                        amount: '100',
                        percent: '50'
                };
        }

        _setDate (event, date) {
                if (event.type === 'set') {
                        const datenow = Date.now();
                        if (date > datenow) {
                                this.setState({
                                        showDate: !this.state.showDate,
                                        endDate: date
                                });
                        }
                        else {
                                this.setState({
                                        showDate: !this.state.showDate,
                                });
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        'Không được chọn ngày trước ngày hiện tại !',
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                        }
                } else if (event.type === 'dismissed') {
                        this.setState({
                                showDate: !this.state.showDate,
                                endDate: this.state.endDate
                        });
                }
        }

        onClickButtonCreate () {
                let discount = {
                        name: this.state.name,
                        endDate: this.state.endDate,
                        amount: parseInt(this.state.amount),
                        percent: parseInt(this.state.percent),
                };
                this.props.onCloseDiscount(discount);
        }

        render () {
                const date = this.state.endDate;
                const convertDate = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.onCloseDiscount(null);
                                        }}>
                                                <Icon name='arrowleft' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>Tạo mã khuyến mãi</Text>
                                </View>
                                <View style={styles.content}>
                                        <Text style={styles.title}>Tiêu đề khuyến mãi</Text>
                                        <TextInput
                                                style={styles.textInput}
                                                value={this.state.name}
                                                onChangeText={(text) => this.setState({
                                                        name: text
                                                })}
                                        />
                                        <Text style={styles.title}>Số lượng mã khuyến mãi</Text>
                                        <TextInput
                                                style={styles.textInput}
                                                keyboardType='numeric'
                                                value={this.state.amount}
                                                onChangeText={(text) => this.setState({
                                                        amount: text
                                                })}
                                        />
                                        <Text style={styles.title}>Giá trị khuyến mãi</Text>
                                        <View style={styles.containerDiscount}>
                                                <TextInput
                                                        style={styles.textInputDiscount}
                                                        keyboardType='numeric'
                                                        value={this.state.percent}
                                                        onChangeText={(text) => this.setState({
                                                                percent: text
                                                        })}
                                                />
                                                <Text style={styles.textPhanTram}>%</Text>
                                        </View>
                                        <Text style={styles.title}>Ngày kết thúc khuyến mãi</Text>
                                        <TouchableOpacity
                                                style={styles.buttonShowDate}
                                                onPress={() => this.setState({ showDate: true })}
                                        >
                                                <Text style={styles.textButtonShowDate}>{convertDate}</Text>
                                        </TouchableOpacity>
                                        <View style={styles.containerCreate}>
                                                <TouchableOpacity style={styles.buttonCreate}
                                                        onPress={() => this.onClickButtonCreate()}
                                                >
                                                        <Text style={styles.textButtonCreate}>Tạo</Text>
                                                </TouchableOpacity>
                                        </View>
                                </View>
                                {
                                        this.state.showDate ?
                                                <DateTimePicker
                                                        value={this.state.endDate}
                                                        mode='date'
                                                        display="spinner"
                                                        onChange={(event, text) => {
                                                                this._setDate(event, text);
                                                        }}
                                                /> : null
                                }
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
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                marginLeft: 10,
                fontSize: 16
        },
        content: {
                flex: 1,
                paddingHorizontal: 20,
        },
        title: {
                fontFamily: 'UVN-Baisau-Regular',
                marginTop: 5
        },
        containerDiscount: {
                flexDirection: 'row',
                alignItems: 'center'
        },
        textInputDiscount: {
                flex: 1,
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 10
        },
        textPhanTram: {
                fontSize: 40,
                marginLeft: 10
        },
        textInput: {
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 10
        },
        buttonShowDate: {
                backgroundColor: background,
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
        },
        textButtonShowDate: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20
        },
        containerCreate: {
                alignItems: 'center',
                marginVertical: 20
        },
        buttonCreate: {
                height: 50,
                width: 100,
                backgroundColor: colorMain,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15
        },
        textButtonCreate: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 16
        }
});