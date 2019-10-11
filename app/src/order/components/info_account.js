import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colorMain, background } from '../../config';
import { AccountModel } from '../../models/account';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


export default class InfoAccount extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        name: null,
                        email: null,
                        phone: null,
                        discount: [
                                {
                                        label: '123',
                                        value: 0,
                                        type: 'score'
                                }
                        ],
                        valueDiscount: null,
                };

        }

        async _fetchInfoAccount () {
                try {
                        const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                        if (account.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        'Bạn chưa đăng nhập !',
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                        } else {
                                if (account.data.score <= 0) {
                                        this.setState({
                                                account: account.data,
                                                name: account.data.name,
                                                email: account.data.email,
                                                phone: (account.data.phone).toString(),
                                                discount: [],
                                        });
                                } else {
                                        var listDiscount = this.state.discount;
                                        listDiscount[0].label = `Sử dụng ${account.data.score} điểm tích lũy`;
                                        listDiscount[0].value = account.data.score;
                                        this.setState({
                                                account: account.data,
                                                name: account.data.name,
                                                email: account.data.email,
                                                phone: (account.data.phone).toString(),
                                                discount: listDiscount,
                                        });
                                }
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                }

        }


        componentDidMount () {
                this._fetchInfoAccount();
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.changePage !== undefined) {
                        if (nextProps.changePage == 'settling') {
                                if (prevState.valueDiscount !== null) {
                                        nextProps._setInfoAccount({
                                                name: prevState.name,
                                                email: prevState.email,
                                                phone: prevState.phone,
                                                idClient: prevState.account.id,
                                                discount: {
                                                        name: prevState.discount[prevState.valueDiscount].label,
                                                        score: prevState.discount[prevState.valueDiscount].value,
                                                        type: prevState.discount[prevState.valueDiscount].type
                                                },
                                        });
                                }
                                else {
                                        nextProps._setInfoAccount({
                                                name: prevState.name,
                                                email: prevState.email,
                                                phone: prevState.phone,
                                                idClient: prevState.account.id,
                                                discount: null,
                                        });
                                }
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
        componentWillUnmount () {
                this.props.onResetPropsFormInfoAccount();
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
                                        <Text style={styles.textTitle}>
                                                chương trình khuyến mãi của bạn
                                        </Text>
                                        <View style={styles.containerDiscount}>
                                                <RadioForm
                                                        formHorizontal={false}
                                                        animation={true}
                                                >
                                                        {this.state.discount.map((item, index) => {
                                                                if (item.value === 0)
                                                                        return null;
                                                                else
                                                                        return (
                                                                                <RadioButton
                                                                                        labelHorizontal={true}
                                                                                        key={index}
                                                                                >
                                                                                        <RadioButtonInput
                                                                                                obj={item}
                                                                                                index={index}
                                                                                                isSelected={this.state.valueDiscount === index}
                                                                                                onPress={() => {
                                                                                                        if (this.state.valueDiscount === index)
                                                                                                                this.setState({
                                                                                                                        valueDiscount: null
                                                                                                                });
                                                                                                        else
                                                                                                                this.setState({
                                                                                                                        valueDiscount: index
                                                                                                                });
                                                                                                }}
                                                                                                borderWidth={2}
                                                                                                buttonInnerColor={colorMain}
                                                                                                buttonOuterColor={this.state.valueDiscount === index ? colorMain : '#000'}
                                                                                                buttonSize={15}
                                                                                                buttonOuterSize={25}
                                                                                                buttonStyle={{}}
                                                                                                buttonWrapStyle={{ marginLeft: 10 }}
                                                                                        />
                                                                                        <RadioButtonLabel
                                                                                                obj={item}
                                                                                                index={index}
                                                                                                labelHorizontal={true}
                                                                                                onPress={() => {
                                                                                                        if (this.state.valueDiscount === index)
                                                                                                                this.setState({
                                                                                                                        valueDiscount: null
                                                                                                                });
                                                                                                        else
                                                                                                                this.setState({
                                                                                                                        valueDiscount: index
                                                                                                                });
                                                                                                }}
                                                                                                labelStyle={styles.textLabelButtonRadio}
                                                                                                labelWrapStyle={{
                                                                                                }}
                                                                                        />
                                                                                </RadioButton>
                                                                        );

                                                        })}

                                                </RadioForm>
                                        </View>
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
                                                        if (this.state.valueDiscount !== null) {
                                                                this.props._setInfoAccount({
                                                                        name: this.state.name,
                                                                        email: this.state.email,
                                                                        phone: this.state.phone,
                                                                        idClient: this.state.account.id,
                                                                        discount: {
                                                                                name: this.state.discount[this.state.valueDiscount].label,
                                                                                score: this.state.discount[this.state.valueDiscount].value,
                                                                                type: this.state.discount[this.state.valueDiscount].type
                                                                        },
                                                                });
                                                                this.props._onComplete({
                                                                        name: this.state.name,
                                                                        email: this.state.email,
                                                                        phone: this.state.phone,
                                                                        idClient: this.state.account.id,
                                                                        discount: {
                                                                                name: this.state.discount[this.state.valueDiscount].label,
                                                                                score: this.state.discount[this.state.valueDiscount].value,
                                                                                type: this.state.discount[this.state.valueDiscount].type
                                                                        },
                                                                });
                                                        }
                                                        else {
                                                                this.props._setInfoAccount({
                                                                        name: this.state.name,
                                                                        email: this.state.email,
                                                                        phone: this.state.phone,
                                                                        idClient: this.state.account.id,
                                                                        discount: null,
                                                                });
                                                                this.props._onComplete({
                                                                        name: this.state.name,
                                                                        email: this.state.email,
                                                                        phone: this.state.phone,
                                                                        idClient: this.state.account.id,
                                                                        discount: null,
                                                                });
                                                        }
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
                borderRadius: 15,
                borderColor: 'gray',
                paddingHorizontal: 10
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
        containerDiscount: {
                marginTop: 5
        },
        textLabelButtonRadio: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize'
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