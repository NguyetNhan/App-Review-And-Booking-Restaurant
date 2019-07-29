import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar, Modal, ActivityIndicator, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Validate from 'validate.js';

export default class Login extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        email: 'phannhan@gmail.com',
                        password: '123456',
                        validateEmail: null,
                        isLoading: false,
                        user: null
                };
        }

        static getDerivedStateFromProps (props, state) {
                if (props.loading !== state.isLoading && props.infoUser !== state.user) {
                        // return {
                        //         isLoading: props.loading,
                        //         user:  props.infoUser
                        // };
                        props.navigation.navigate('App');
                }
                return null;
        }

        onClickButtonLogin () {
                this.setState({
                        isLoading: true
                });
                const data = {
                        email: this.state.email,
                        password: this.state.password
                };
                this.props.onLogin(data);
        }

        onClickButtonSignup () {
                this.props.navigation.navigate('SignUp');
        }

        validate () {
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
                                validateEmail: null
                        });
                } else {
                        this.setState({
                                validateEmail: result.email[0]
                        });
                }
        }

        render () {
                return (
                        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                                <View style={styles.container}>
                                        <StatusBar
                                                barStyle='dark-content'
                                                backgroundColor='white'
                                        />
                                        <View style={styles.containerTitle}>
                                                <Text style={styles.title}>Đăng Nhập</Text>
                                        </View>
                                        <View style={styles.containerForm}>
                                                <View style={styles.containerErrorValidate}>
                                                        <Text style={styles.textHint}>Email </Text>
                                                        <Text style={styles.textError}>{this.state.validateEmail}</Text>
                                                </View>
                                                <TextInput
                                                        style={styles.textInput}
                                                        keyboardType='email-address'
                                                        placeholder='phannhan@gmail.com'
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        email: text
                                                                });
                                                                this.validate();
                                                        }}
                                                        value={this.state.email}
                                                />
                                                <Text style={{
                                                        color: 'black',
                                                        width: 300,
                                                        fontFamily: 'UVN-Baisau-Regular',
                                                        marginTop: 20,
                                                }}>Mật khẩu</Text>
                                                <TextInput
                                                        style={styles.textInput}
                                                        secureTextEntry={true}
                                                        placeholder='123456'
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        password: text
                                                                });
                                                        }}
                                                        value={this.state.password}
                                                />
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.onClickButtonLogin();
                                                        }}
                                                        style={styles.buttonLogin}>
                                                        <Icon name="arrow-right" size={25} color="white" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.buttonSignUp}
                                                        onPress={() => {
                                                                this.onClickButtonSignup();
                                                        }}
                                                >
                                                        <Text style={styles.textSignUp}>Đăng kí</Text>
                                                </TouchableOpacity>
                                        </View>
                                        <Modal
                                                animationType="fade"
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
        },
        containerTitle: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
        },
        title: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 30,
                width: 300,
                color: '#22D499'
        },
        containerForm: {
                flex: 3,
                alignItems: 'center'
        },
        textHint: {
                color: 'black',
                fontFamily: 'UVN-Baisau-Regular',
        },
        textInput: {
                width: 300,
                fontFamily: 'OpenSans-Regular',
                borderBottomWidth: 1
        },
        buttonLogin: {
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#22D499',
                marginTop: 80
        },
        buttonSignUp: {
                marginTop: 40
        },
        textSignUp: {
                fontFamily: 'UVN-Baisau-Bold'
        },
        textError: {
                color: 'red',
                fontFamily: 'OpenSans-Regular'
        },
        containerErrorValidate: {
                width: 300,
                flexDirection: 'row',
                marginTop: 20,
        },
        containerLoading: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
});