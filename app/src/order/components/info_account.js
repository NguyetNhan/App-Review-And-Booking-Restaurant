import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colorMain } from '../../config';
import { AccountModel } from '../../models/account';

export default class InfoAccount extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        name: null,
                        email: null,
                        phone: null,
                };

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


        componentDidMount () {
                this._fetchInfoAccount();
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.changePage !== undefined) {
                        if (nextProps.changePage == 'settling') {
                                nextProps._setInfoAccount({
                                        name: prevState.name,
                                        email: prevState.email,
                                        phone: prevState.phone,
                                        idClient: prevState.account.id,
                                });
                        }
                }
                return null;
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
                                <View style={styles.content}>
                                        <Text style={styles.textTitle}>Họ và tên</Text>
                                        <TextInput
                                                style={styles.textInput}
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                name: text
                                                        });
                                                }}
                                                value={this.state.name}
                                        />
                                        <Text style={styles.textTitle}>email</Text>
                                        <TextInput
                                                style={styles.textInput}
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                email: text
                                                        });
                                                }}
                                                value={this.state.email}
                                                keyboardType='email-address'
                                        />
                                        <Text style={styles.textTitle}>số điện thoại</Text>
                                        <TextInput
                                                style={styles.textInput}
                                                onChangeText={(text) => {
                                                        this.setState({
                                                                phone: text
                                                        });
                                                }}
                                                value={this.state.phone}
                                                keyboardType='numeric'
                                        />
                                </View>
                                <View style={styles.containerButtonNavigator}>
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.props._onClickButtonPrevious();
                                                }}
                                                style={styles.button}>
                                                <Text style={styles.textButton}>quay lại</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                                onPress={() => {
                                                        this.props._onComplete();
                                                }}
                                                style={styles.buttonDat}>
                                                <Text style={styles.textButton}>đặt</Text>
                                        </TouchableOpacity>
                                </View>
                        </View>

                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                marginTop: 10
        },
        content: {
                flex: 1,
                paddingHorizontal: 20
        },
        textTitle: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                marginTop: 10
        },
        textInput: {
                fontFamily: 'OpenSans-Regular',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'gray'
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
        containerButtonNavigator: {
                flexDirection: 'row',
                marginHorizontal: 20,
                marginBottom: 30,
                justifyContent: 'space-between'
        },
        button: {
                width: 70,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colorMain,
                borderRadius: 10,
        },
        textButton: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'uppercase'
        },
        buttonDat: {
                width: 70,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'orange',
                borderRadius: 10,
        }
});