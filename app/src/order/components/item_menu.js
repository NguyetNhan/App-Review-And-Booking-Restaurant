import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { urlServer, colorMain } from '../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { convertVND } from '../../functions/convert';
export default class ItemMenu extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        name: props.name,
                        image: props.image,
                        price: props.price,
                        introduce: props.introduce,
                        iconUnChecked: 'radio-button-unchecked',
                        iconChecked: 'radio-button-checked',
                        isSelected: props.isSelected,
                        index: props.index
                };
        }

        /*  convertVND (data) {
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
         } */
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
                                                ellipsizeMode='tail'>{convertVND(this.state.price)} VND</Text>
                                        <Text style={styles.introduce}
                                                numberOfLines={2}
                                                ellipsizeMode='tail'
                                        >{this.state.introduce}</Text>
                                </View>
                                <TouchableOpacity
                                        style={styles.buttonCheck}
                                        onPress={() => {
                                                this.setState({
                                                        isSelected: !this.state.isSelected
                                                });
                                                this.props._onCheckFood(this.state.index);
                                        }}
                                >
                                        {
                                                this.state.isSelected ? <Icon name={this.state.iconChecked} size={30} color={colorMain} /> :
                                                        <Icon name={this.state.iconUnChecked} size={30} color='black' />
                                        }
                                </TouchableOpacity>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                flexDirection: 'row',
                marginVertical: 10,
                backgroundColor: 'white',
                marginHorizontal: 20,
                alignItems: 'center'
        },
        image: {
                width: 60,
                height: 60,
                margin: 20
        },
        content: {
                flex: 1,
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 18
        },
        price: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain,
                fontSize: 13
        },
        introduce: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 13
        },
        buttonCheck: {
                marginRight: 20
        }
});