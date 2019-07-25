import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class AuthLoading extends Component {

        constructor (props) {
                super(props);
        }

        render () {
                return (
                        <View style={styles.container}>
                                <View>
                                        <Text>
                                                AuthLoading
                                        </Text>
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },

});