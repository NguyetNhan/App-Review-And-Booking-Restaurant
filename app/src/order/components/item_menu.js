import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { urlServer, colorMain } from '../../config';
export default class ItemMenu extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        name: props.name,
                        image: props.image,
                        price: props.price,
                        introduce: props.introduce
                };
        }

        convertVND (data) {
                const string = data.toString();
                const length = string.length;
                var convert = '';
                var count = 1;
                for (i = length - 1; i >= 0; i--) {
                        if (count == 3 && i != 0) {
                                let char = string.charAt(i);
                                convert = '.'.concat(char, convert);
                                count = 1;
                        } else {
                                let char = string.charAt(i);
                                convert = char.concat('', convert);
                                count = count + 1;
                        }
                }
                return convert;
        }
        render () {
                return (
                        <View style={styles.container}>
                                <Image
                                        source={{ uri: `${urlServer}${this.state.image}` }}
                                        style={styles.image}
                                />
                                <View style={styles.content}>
                                        <Text style={styles.name}
                                                numberOfLines={1}
                                                ellipsizeMode='tail'
                                        >{this.state.name}</Text>
                                        <Text style={styles.price}
                                                numberOfLines={1}
                                                ellipsizeMode='tail'>{this.convertVND(this.state.price)} VND</Text>
                                        <Text style={styles.introduce}
                                                numberOfLines={2}
                                                ellipsizeMode='tail'
                                        >{this.state.introduce}</Text>
                                </View>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                flexDirection: 'row',
                marginVertical: 10,
                backgroundColor: 'white'
        },
        image: {
                width: 120,
                height: 120
        },
        content: {
                flex: 1,
                padding: 20
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20
        },
        price: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain
        },
        introduce: {
                fontFamily: 'UVN-Baisau-Regular'
        }
});