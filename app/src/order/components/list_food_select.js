import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { urlServer, colorMain } from '../../config';
import { convertVND } from '../../functions/convert';

export default class ListFoodSelect extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item
                };
        }

        render () {
                return (
                        <View style={styles.container}>
                                <Image
                                        source={{ uri: `${urlServer}${this.state.item.image}` }}
                                        style={styles.image}
                                />
                                <Text style={styles.text}>
                                        {convertVND(this.state.item.price)} VND
                                </Text>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center',
                marginHorizontal: 5
        },
        image: {
                width: 80,
                height: 80,
                borderRadius: 5
        },
        text: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain,
                fontSize: 12
        }
});