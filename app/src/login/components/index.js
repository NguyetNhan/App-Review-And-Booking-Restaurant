import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class Login extends Component {
        constructor (props) {
                super(props);

        }

        render () {
                return (
                        <View>
                                <Text>Login</Text>
                                <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('SignUp');
                                }}>
                                        <Text>register</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('Home');
                                }}>
                                        <Text>home</Text>
                                </TouchableOpacity>
                        </View>
                );
        }

}