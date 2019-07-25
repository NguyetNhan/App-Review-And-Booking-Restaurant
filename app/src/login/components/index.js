import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class Login extends Component {
        constructor (props) {
                super(props);

        }

        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.containerTitle}>
                                        <Text style={styles.title}>Đăng Nhập</Text>
                                </View>
                                <View style={styles.containerForm}>
                                        <Text>Email</Text>
                                        <TextInput />
                                        <Text>Mật khẩu</Text>
                                        <TextInput />
                                        <TouchableOpacity>
                                                <Icon name="arrow-right" size={30} color="#900" />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                                <Text>Đăng kí</Text>
                                        </TouchableOpacity>
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        containerTitle: {
                flex: 1,
                justifyContent: 'center'
        },
        title: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 30
        },
        containerForm: {
                flex: 4,
                alignItems: 'center'
        }
});