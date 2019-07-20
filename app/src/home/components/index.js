import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class Home extends Component {

        constructor (props) {
                super(props);

        }

        render () {
                return (
                        <View>
                                <Text>Home</Text>
                                <TouchableOpacity onPress={() => {
                                        this.props.navigation.openDrawer();
                                }}>
                                        <Text>con cac</Text>
                                </TouchableOpacity>
                        </View>
                );
        }
}