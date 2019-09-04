import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AccountModel } from '../../models/account';
import DateTimePicker from '@react-native-community/datetimepicker';
import { urlServer, colorMain, background } from '../../config';

export default class Order extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        idRestaurant: props.navigation.getParam('idRestaurant', null),
                        account: null,
                        date: new Date(),
                        modeDate: 'date',
                        modeTime: 'time',
                        showTime: false,
                        showDate: false,
                        name: '',
                        phone: '0123456789',
                        amount: '1',
                        note: '',

                };
        }


        async _getAccountFromLocal () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                this.setState({
                        account: account,
                        name: account.name,
                        phone: account.phone
                });
        }

        componentDidMount () {
                this._getAccountFromLocal();
        }

        _onClickShowDatePicker () {
                this.setState({
                        showDate: !this.state.showDate,
                });
        }

        _onClickShowTimePicker () {
                this.setState({
                        showTime: !this.state.showTime,
                });
        }

        _setDate (event, date) {
                if (event.type === 'set') {
                        this.setState({
                                showDate: !this.state.showDate,
                                date: date
                        });
                } else if (event.type === 'dismissed') {
                        this.setState({
                                showDate: !this.state.showDate,
                                date: this.state.date
                        });
                }
        }

        _setTime (event, time) {
                if (event.type === 'set') {
                        this.setState({
                                showTime: !this.state.showTime,
                                date: time
                        });
                } else if (event.type === 'dismissed') {
                        this.setState({
                                showTime: !this.state.showTime,
                                date: this.state.date
                        });
                }
        }

        render () {
                const date = this.state.date;
                const convertTime = `${date.getHours()}h ${date.getMinutes()}''`;
                const convertDate = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
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
                                                <Icon name='arrow-left' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>Đặt tiệc</Text>
                                        <View />
                                </View>
                                <View style={styles.content}>
                                        <Text style={styles.title}>Họ và tên</Text>
                                        <TextInput
                                                style={styles.textInput}
                                                value={this.state.name}
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                name: text
                                                        });
                                                }}
                                        />
                                        <Text style={styles.title}>số điện thoại</Text>
                                        <TextInput
                                                style={styles.textInput}
                                                value={this.state.phone}
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                phone: text
                                                        });
                                                }}
                                                keyboardType='numeric'
                                        />
                                        <Text style={styles.title}>số lượng người</Text>
                                        <TextInput
                                                style={styles.textInput}
                                                value={this.state.amount}
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                amount: text
                                                        });
                                                }}
                                                keyboardType='numeric'
                                        />
                                        <Text style={styles.title}>thời gian</Text>
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this._onClickShowTimePicker();
                                                }}
                                        >
                                                <View style={styles.containerTime}>
                                                        <Text style={styles.textTime} >{convertTime}</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <Text style={styles.title}>ngày</Text>
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this._onClickShowDatePicker();
                                                }}
                                        >
                                                <View style={styles.containerTime}>
                                                        <Text style={styles.textTime} >{convertDate}</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <Text style={styles.title}>ghi chú</Text>
                                        <TextInput
                                                style={styles.textInput}
                                                value={this.state.note}
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                note: text
                                                        });
                                                }}
                                        />
                                        <Text style={styles.title}>thực đơn</Text>
                                        <View style={styles.containerButton}>
                                                <TouchableOpacity style={styles.buttonSelectMenu}>
                                                        <Text
                                                                style={styles.textButtonSelectMenu}
                                                        >chọn</Text>
                                                </TouchableOpacity>
                                        </View>
                                        {
                                                this.state.showTime ?
                                                        <DateTimePicker
                                                                value={this.state.date}
                                                                mode={this.state.modeTime}
                                                                is24Hour={true}
                                                                display="clock"
                                                                onChange={(event, text) => {
                                                                        this._setTime(event, text);
                                                                }}
                                                        /> : null
                                        }
                                        {
                                                this.state.showDate ?
                                                        <DateTimePicker
                                                                value={this.state.date}
                                                                mode={this.state.modeDate}
                                                                display="spinner"
                                                                onChange={(event, text) => {
                                                                        this._setDate(event, text);
                                                                }}
                                                        /> : null
                                        }
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        title: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                marginTop: 10
        },
        textInput: {
                borderBottomWidth: 1,
                fontFamily: 'OpenSans-Regular',
        },
        containerTime: {
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 10
        },
        textTime: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 20,
        },
        buttonSelectMenu: {
                width: 100,
                height: 50,
                backgroundColor: colorMain,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
        },
        textButtonSelectMenu: {
                fontFamily: 'UVN-Baisau-Regular',
                color: 'white',
                textTransform: 'uppercase'
        },
        containerButton: {
                alignItems: 'center'
        },
        content: {
                flex: 1,
                padding: 20,
        },
        containerHeader: {
                width: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                alignItems: 'center',
                paddingHorizontal: 20
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                textTransform: 'capitalize'
        },
});