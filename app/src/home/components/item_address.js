import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colorMain } from '../../config';

export default class ItemAddress extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.address
                };
        }

        render () {
                return (
                        <TouchableOpacity style={styles.container}>
                                <Image
                                        source={this.state.item.image}
                                        style={styles.image}
                                />
                                <View style={styles.containerText}>
                                        <Text style={styles.text}>{this.state.item.name}</Text>
                                </View>

                        </TouchableOpacity>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        image: {
                width: 250,
                height: 200,
                borderRadius: 10
        },
        text: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                color: 'white',
        },
        containerText: {
                position: 'absolute',
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                width: '100%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10
        }
});