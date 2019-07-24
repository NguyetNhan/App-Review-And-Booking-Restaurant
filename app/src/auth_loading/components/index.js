import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default class AuthLoading extends Component {

        constructor (props) {
                super(props);

        }

        render () {
                return (
                        <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => {
                                        this.props.navigation.navigate('Login');
                                }}>
                                        <Text>home</Text>
                                </TouchableOpacity>
                        </View>
                );
        }
}