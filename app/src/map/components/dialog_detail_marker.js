import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colorMain, urlServer } from '../../config';
export default class DialogDetailMarker extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        image: props.image,
                        type: props.type,
                        title: props.title,
                        address: props.address,
                };
        }

        render () {
                return (
                        <View style={styles.container}
                        >
                                <View style={styles.content}>
                                        <Image
                                                source={{ uri: `${urlServer}${this.state.image}` }}
                                                style={styles.image}
                                        />
                                        <Text>{this.state.title}</Text>
                                        <Text>{this.state.type}</Text>
                                        <Text>{this.state.address}</Text>
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
        },
        content: {
                backgroundColor: 'white',
                width: 250,
                alignItems: 'center',
                justifyContent: 'center'
        },
        image: {
                width: 250,
                height: 150
        }
});