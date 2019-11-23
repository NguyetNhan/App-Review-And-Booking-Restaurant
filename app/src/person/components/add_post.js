import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, } from 'react-native';
import { colorMain } from '../../config';

export default class AddPost extends Component {
        constructor (props) {
                super(props);

        }

        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.contentPost}>
                                        <View
                                                style={styles.image}
                                        />

                                        <TouchableOpacity
                                                style={styles.buttonInput}
                                                onPress={() => {
                                                        this.props.onClickAddPost();
                                                }}
                                        >
                                                <Text
                                                        style={styles.textInput}
                                                >Chia sẽ cảm nhận của bạn về các địa điểm đã đến !</Text>
                                        </TouchableOpacity>
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                padding: 20
        },
        contentPost: {
                backgroundColor: 'white',
                flex: 1,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                justifyContent: 'center'
        },
        image: {
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: colorMain
        },
        textInput: {
                color: 'gray'
        },
        buttonInput: {
                flex: 1,
                marginLeft: 5,
        }
});