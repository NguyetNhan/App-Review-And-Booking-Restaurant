import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, TextInput, Modal, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Validate from 'validate.js';

export default class SignUp extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        name: 'Phan Tử Nguyệt Nhân',
                        email: 'phannhan@gmail.com',
                        phone: '0924242584',
                        password: '123456',
                        confirmPass: '123456',
                        validateEmail: null,
                        validateName: null,
                        validatePhone: null,
                        validatePass: null,
                        validateConfirmPass: null,
                        validateError: false,
                        isLoading: false,
                };
        }

        static getDerivedStateFromProps (props, state) {
                if (props.isLoading !== state.isLoading && props.isLoading !== undefined) {
                        state.isLoading = props.isLoading;
                }
                if (props.message !== undefined && !state.isLoading) {
                        Alert.alert(
                                'Thông Báo',
                                props.message,
                                [
                                        { text: 'OK', onPress: () => props.onResetPropsMessage() },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
        }

        validate (type) {
                if (type === 'email') {
                        const constraints = {
                                email: {
                                        presence: true,
                                        email: {
                                                message: '^*không phải là email'
                                        }
                                },
                        };
                        let result = Validate({ email: this.state.email }, constraints);
                        if (result === undefined) {
                                this.setState({
                                        validateEmail: null,
                                        validateError: false
                                });
                        } else {
                                this.setState({
                                        validateEmail: result.email[0],
                                        validateError: true
                                });
                        }
                } else if (type === 'name') {
                        const constraints = {
                                name: {
                                        length: {
                                                minimum: 2,
                                                tooShort: '^*tên phải có %{count} từ trở lên',
                                                tokenizer: function (value) {
                                                        return value.split(/\s+/g);
                                                }
                                        }
                                }
                        };
                        let result = Validate({ name: (this.state.name).trim() }, constraints);
                        if (result === undefined) {
                                this.setState({
                                        validateName: null,
                                        validateError: false
                                });
                        } else {
                                this.setState({
                                        validateName: result.name[0],
                                        validateError: true
                                });
                        }
                } else if (type === 'phone') {
                        const constraints = {
                                phone: {
                                        length: {
                                                is: 10,
                                                wrongLength: '^*phải đủ %{count} số',
                                        }
                                }
                        };
                        let result = Validate({ phone: (this.state.phone).trim() }, constraints);
                        if (result === undefined) {
                                this.setState({
                                        validatePhone: null,
                                        validateError: false
                                });
                        } else {
                                this.setState({
                                        validatePhone: result.phone[0],
                                        validateError: true
                                });
                        }
                } else if (type === 'pass') {
                        const constraints = {
                                pass: {
                                        format: {
                                                pattern: '[a-z0-9]+',
                                                flags: 'i',
                                                message: '^*không được chứa các kí tự đặc biệt'
                                        },
                                        length: {
                                                minimum: 6,
                                                tooShort: '^*tối thiểu phải có %{count} kí tự',
                                        }
                                }
                        };
                        let result = Validate({ pass: (this.state.password) }, constraints);
                        if (result === undefined) {
                                this.setState({
                                        validatePass: null,
                                        validateError: false
                                });
                        } else {
                                this.setState({
                                        validatePass: result.pass[0],
                                        validateError: true
                                });
                        }
                } else {
                        const constraints = {
                                pass: {
                                        format: {
                                                pattern: '[a-z0-9]+',
                                                flags: 'i',
                                                message: '^*không được chứa các kí tự đặc biệt'
                                        },
                                        length: {
                                                minimum: 6,
                                                tooShort: '^*tối thiểu phải có %{count} kí tự',
                                        }
                                }
                        };
                        let result = Validate({ pass: (this.state.confirmPass) }, constraints);
                        if (result === undefined) {
                                this.setState({
                                        validateConfirmPass: null,
                                        validateError: false
                                });
                        } else {
                                this.setState({
                                        validateConfirmPass: result.pass[0],
                                        validateError: true
                                });
                        }
                }

        }

        onClickButtonSignup () {
                this.setState({
                        isLoading: !this.state.isLoading
                });
                if (this.state.validateError) {
                        Alert.alert('Thông báo', 'Bạn đã nhập sai !');
                } else {
                        const data = {
                                email: this.state.email,
                                name: this.state.name,
                                password: this.state.password,
                                phone: this.state.phone
                        };
                        this.props.onSignup(data);
                }
        }

        componentWillUnmount () {
                this.props.onResetProps();
        }

        render () {
                return (
                        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                                <View style={styles.container}>
                                        <StatusBar
                                                barStyle='dark-content'
                                                backgroundColor='white'
                                        />
                                        <View style={styles.containerButtonBack}>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.props.navigation.goBack();
                                                        }}
                                                        style={styles.buttonBack}>
                                                        <Ionicons name='ios-arrow-back' size={40} color='black' />
                                                </TouchableOpacity>
                                        </View>
                                        <View style={styles.containerTitle}>
                                                <Text style={styles.textTitle}>Đăng Kí</Text>
                                        </View>
                                        <View style={styles.containerForm}>
                                                <View style={styles.containerErrorValidate}>
                                                        <Text style={styles.textHint}>Họ và tên </Text>
                                                        <Text style={styles.textError}>{this.state.validateName}</Text>
                                                </View>
                                                <TextInput
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        name: text
                                                                });
                                                                let type = 'name';
                                                                this.validate(type);
                                                        }}
                                                        placeholder='Mộc Nhiên'
                                                        value={this.state.name}
                                                        style={styles.textInput} />
                                                <View style={styles.containerErrorValidate}>
                                                        <Text style={styles.textHint}>Email </Text>
                                                        <Text style={styles.textError}>{this.state.validateEmail}</Text>
                                                </View>
                                                <TextInput
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        email: text
                                                                });
                                                                let type = 'email';
                                                                this.validate(type);
                                                        }}
                                                        placeholder='mocnhien@gmail.com'
                                                        value={this.state.email}
                                                        keyboardType='email-address'
                                                        style={styles.textInput} />
                                                <View style={styles.containerErrorValidate}>
                                                        <Text style={styles.textHint}>Số điện thoại </Text>
                                                        <Text style={styles.textError}>{this.state.validatePhone}</Text>
                                                </View>
                                                <TextInput
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        phone: text
                                                                });
                                                                let type = 'phone';
                                                                this.validate(type);
                                                        }}
                                                        placeholder='0123456789'
                                                        value={this.state.phone}
                                                        keyboardType='phone-pad'
                                                        style={styles.textInput} />
                                                <View style={styles.containerErrorValidate}>
                                                        <Text style={styles.textHint}>Mật khẩu </Text>
                                                        <Text style={styles.textError}>{this.state.validatePass}</Text>
                                                </View>
                                                <TextInput
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        password: text
                                                                });
                                                                let type = 'pass';
                                                                this.validate(type);
                                                        }}
                                                        placeholder='123456'
                                                        value={this.state.password}
                                                        secureTextEntry={true}
                                                        style={styles.textInput} />
                                                <View style={styles.containerErrorValidate}>
                                                        <Text style={styles.textHint}>Xác nhận mật khẩu </Text>
                                                        <Text style={styles.textError}>{this.state.validateConfirmPass}</Text>
                                                </View>
                                                <TextInput
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        confirmPass: text
                                                                });
                                                                let type = 'confirm';
                                                                this.validate(type);
                                                        }}
                                                        placeholder='123456'
                                                        value={this.state.confirmPass}
                                                        secureTextEntry={true}
                                                        style={styles.textInput} />
                                        </View>
                                        <View style={styles.containerButtonSignup}>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.onClickButtonSignup();
                                                        }}
                                                        style={styles.buttonSignup}>
                                                        <SimpleLineIcons name="arrow-right" size={25} color="white" />
                                                </TouchableOpacity>
                                        </View>
                                        <Modal
                                                animationType="slide"
                                                transparent={true}
                                                visible={this.state.isLoading}
                                        >
                                                <View style={styles.containerLoading}>
                                                        <ActivityIndicator animating={true} size={80} color="#22D499" />
                                                </View>
                                        </Modal>
                                </View>
                        </SafeAreaView>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center'
        },
        containerTitle: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
        },
        containerForm: {
                flex: 5,
                alignItems: 'center'
        },
        containerButtonSignup: {
                flex: 1,
                alignItems: 'center',
        },
        containerButtonBack: {
                width: 300
        },
        containerErrorValidate: {
                width: 300,
                flexDirection: 'row',
                marginTop: 20,
        },
        textTitle: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 30,
                width: 300,
                color: '#22D499'
        },
        textHint: {
                color: 'black',
                fontFamily: 'UVN-Baisau-Regular',
        },
        textInput: {
                width: 300,
                fontFamily: 'OpenSans-Regular',
                borderBottomWidth: 1,
        },
        buttonSignup: {
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#22D499',
        },
        buttonBack: {

        },
        textError: {
                color: 'red',
                fontFamily: 'OpenSans-Regular'
        },
        containerLoading: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.9)'
        }
});