import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colorMain, background, urlServer } from '../../config';
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
                        idRestaurant: props.idRestaurant
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
                                let discountList = [];
                                const resultAccount = await fetch(`${urlServer}/auth/id/${account.data.id}`, {
                                        method: 'GET',
                                        headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                        }
                                }).then(value => value.json());
                                if (resultAccount.error) {
                                        Alert.alert(
                                                'Thông Báo Lỗi',
                                                resultAccount.message,
                                                [
                                                        { text: 'OK' },
                                                ],
                                                { cancelable: false },
                                        );
                                } else {
                                        if (resultAccount.data.discount.length > 0) {
                                                for (item of resultAccount.data.discount) {
                                                        try {
                                                                const result = await fetch(`${urlServer}/discount/idDiscount/${item}`, {
                                                                        method: 'GET',
                                                                        headers: {
                                                                                Accept: 'application/json',
                                                                                'Content-Type': 'application/json',
                                                                        }
                                                                }).then(value => value.json());
                                                                if (result.error) {
                                                                        Alert.alert(
                                                                                'Thông Báo Lỗi',
                                                                                result.message,
                                                                                [
                                                                                        { text: 'OK' },
                                                                                ],
                                                                                { cancelable: false },
                                                                        );
                                                                } else {
                                                                        if (this.state.idRestaurant === result.data.idRestaurant) {
                                                                                const dateNow = new Date();
                                                                                const endDateDiscount = new Date(result.data.endDate);
                                                                                if (endDateDiscount > dateNow) {
                                                                                        discountList.push({
                                                                                                label: `Mã giảm giá ${result.data.percent}%`,
                                                                                                value: result.data.percent,
                                                                                                type: 'percent',
                                                                                                idDiscount: result.data._id
                                                                                        });
                                                                                }
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
                                        }
                                }

                                if (account.data.score <= 0) {
                                        this.setState({
                                                account: account.data,
                                                name: account.data.name,
                                                email: account.data.email,
                                                phone: (account.data.phone).toString(),
                                                discount: discountList,
                                        });
                                } else {
                                        discountList.push({
                                                label: `Sử dụng ${account.data.score} điểm tích lũy`,
                                                value: account.data.score,
                                                type: 'score',
                                                idDiscount: null
                                        });
                                        this.setState({
                                                account: account.data,
                                                name: account.data.name,
                                                email: account.data.email,
                                                phone: (account.data.phone).toString(),
                                                discount: discountList,
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
                                                        value: prevState.discount[prevState.valueDiscount].value,
                                                        type: prevState.discount[prevState.valueDiscount].type,
                                                        idDiscount: prevState.discount[prevState.valueDiscount].idDiscount,
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

        onClickButtonOrder () {
                if (this.state.name.length === 0) {
                        Alert.alert('Thông Báo', 'Tên không được bỏ trống !');
                } else if (this.state.phone.length === 0) {
                        Alert.alert('Thông Báo', 'Số điện thoại không được bỏ trống !');
                } else {
                        if (this.state.valueDiscount !== null) {
                                this.props._setInfoAccount({
                                        name: this.state.name,
                                        email: this.state.email,
                                        phone: this.state.phone,
                                        idClient: this.state.account.id,
                                        discount: {
                                                name: this.state.discount[this.state.valueDiscount].label,
                                                value: this.state.discount[this.state.valueDiscount].value,
                                                type: this.state.discount[this.state.valueDiscount].type,
                                                idDiscount: this.state.discount[this.state.valueDiscount].idDiscount,
                                        },
                                });
                                this.props._onComplete({
                                        name: this.state.name,
                                        email: this.state.email,
                                        phone: this.state.phone,
                                        idClient: this.state.account.id,
                                        discount: {
                                                name: this.state.discount[this.state.valueDiscount].label,
                                                value: this.state.discount[this.state.valueDiscount].value,
                                                type: this.state.discount[this.state.valueDiscount].type,
                                                idDiscount: this.state.discount[this.state.valueDiscount].idDiscount,
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
                }
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
                                        <View style={styles.containerEmail}>
                                                <Text style={styles.textEmail}>{this.state.email}</Text>
                                        </View>
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
                                                        this.onClickButtonOrder();
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
        containerEmail: {
                paddingHorizontal: 10,
                height: 50,
                justifyContent: 'center',
                backgroundColor: background,
                borderRadius: 15,
        },
        textEmail: {
                fontFamily: 'OpenSans-Regular',
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