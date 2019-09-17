import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AccountModel } from '../../models/account';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colorMain } from '../../config';

export default class InfoAccount extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        editName: false,
                        editEmail: false,
                        editPhone: false,
                        name: '',
                        email: '',
                        phone: ''
                };

        }

        componentDidMount () {
                this._fetchInfoAccount();
        }

        async _fetchInfoAccount () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                this.setState({
                        account: account,
                        name: account.name,
                        email: account.email,
                        phone: (account.phone).toString()
                });
        }

        _onClickAgree () {
                var info = {
                        id: this.state.account.id,
                        name: this.state.name,
                        email: this.state.email,
                        phone: this.state.phone
                };
                this.props._onActionOrder(info);
        }

        render () {
                return (
                        <View style={styles.container}>
                                {
                                        this.state.account !== null ?
                                                <View style={styles.content}>
                                                        <Text style={styles.textHeader}>xác nhận thông tin cá nhân</Text>
                                                        <Text style={styles.textTitle}>Họ và tên</Text>
                                                        {
                                                                this.state.editName ?
                                                                        <TextInput
                                                                                style={styles.textInput}
                                                                                onChangeText={(text) => {
                                                                                        this.setState({
                                                                                                name: text
                                                                                        });
                                                                                }}
                                                                                value={this.state.name}
                                                                        /> :
                                                                        <View style={styles.containerValue}>
                                                                                <Text style={styles.textValue}>{this.state.account.name}</Text>
                                                                                <TouchableOpacity
                                                                                        onPress={() => {
                                                                                                this.setState({
                                                                                                        editName: !this.state.editName
                                                                                                });
                                                                                        }}
                                                                                >
                                                                                        <Icon name='edit' size={20} color={colorMain} />
                                                                                </TouchableOpacity>
                                                                        </View>
                                                        }

                                                        <Text style={styles.textTitle}>email</Text>
                                                        {
                                                                this.state.editEmail ?
                                                                        <TextInput
                                                                                style={styles.textInput}
                                                                                onChangeText={(text) => {
                                                                                        this.setState({
                                                                                                email: text
                                                                                        });
                                                                                }}
                                                                                value={this.state.email}
                                                                                keyboardType='email-address'
                                                                        /> :
                                                                        <View style={styles.containerValue}>
                                                                                <Text style={styles.textValue}>{this.state.account.email}</Text>
                                                                                <TouchableOpacity
                                                                                        onPress={() => {
                                                                                                this.setState({
                                                                                                        editEmail: !this.state.editEmail
                                                                                                });
                                                                                        }}
                                                                                >
                                                                                        <Icon name='edit' size={20} color={colorMain} />
                                                                                </TouchableOpacity>
                                                                        </View>
                                                        }

                                                        <Text style={styles.textTitle}>số điện thoại</Text>
                                                        {
                                                                this.state.editPhone ?
                                                                        <TextInput
                                                                                style={styles.textInput}
                                                                                onChangeText={(text) => {
                                                                                        this.setState({
                                                                                                phone: text
                                                                                        });
                                                                                }}
                                                                                value={this.state.phone}
                                                                                keyboardType='numeric'
                                                                        /> :
                                                                        <View style={styles.containerValue}>
                                                                                <Text style={styles.textValue}>{this.state.account.phone}</Text>
                                                                                <TouchableOpacity
                                                                                        onPress={() => {
                                                                                                this.setState({
                                                                                                        editPhone: !this.state.editPhone
                                                                                                });
                                                                                        }}
                                                                                >
                                                                                        <Icon name='edit' size={20} color={colorMain} />
                                                                                </TouchableOpacity>
                                                                        </View>
                                                        }
                                                        <TouchableOpacity
                                                                style={styles.buttonOk}
                                                                onPress={() => {
                                                                        this._onClickAgree();
                                                                }}
                                                        >
                                                                <Text style={styles.textButton}>chấp nhận</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                                style={styles.buttonCancel}
                                                                onPress={() => {
                                                                        this.props._onClickCloseModalInfoAccount();
                                                                }}
                                                        >
                                                                <Text style={styles.textButton}>hủy bỏ</Text>
                                                        </TouchableOpacity>
                                                </View>
                                                : null
                                }
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)',

        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                marginBottom: 10,
                fontSize: 18,
                textTransform: 'capitalize',
                textAlign: 'center',
                color: colorMain
        },
        content: {
                width: 280,
                backgroundColor: 'white',
                alignItems: 'center',
                borderRadius: 5,
                padding: 20
        },
        textTitle: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize'
        },
        textValue: {
                fontFamily: 'OpenSans-Bold',
                textAlign: 'center',
                flex: 1
        },
        containerValue: {
                flexDirection: 'row',
                height: 40,
                alignItems: 'center',
                justifyContent: 'space-between'
        },
        textInput: {
                borderBottomWidth: 1,
                width: 200,
                fontFamily: 'OpenSans-Regular'
        },
        buttonOk: {
                width: 80,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colorMain,
                borderRadius: 10,
                marginVertical: 10
        },
        buttonCancel: {
                width: 80,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red',
                borderRadius: 10
        },
        textButton: {
                color: 'white',
                textTransform: 'capitalize',
                fontFamily: 'UVN-Baisau-Regular',
        }
});