import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { urlServer, colorMain } from '../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { convertVND } from '../../functions/convert';
export default class ItemMenu extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        name: props.item.name,
                        image: props.item.image,
                        price: props.item.price,
                        introduce: props.item.introduce,
                        index: props.index,
                        amount: props.item.amount,
                        iconUnChecked: 'radio-button-unchecked',
                        iconChecked: 'radio-button-checked',
                        isSelected: props.item.isSelected,
                        item: props.item
                };
        }

        _onClickUpAmount () {
                const amount = Number.parseInt(this.state.amount);
                this.setState({
                        amount: (amount + 1).toString()
                });
                this.props._onChangeAmount(this.state.index, (amount + 1).toString());
        }

        _onClickDownAmount () {
                const amount = Number.parseInt(this.state.amount);
                if (amount === 1) {
                        this.setState({
                                amount: '1'
                        });
                        this.props._onChangeAmount(this.state.index, '1');
                } else {
                        this.setState({
                                amount: (amount - 1).toString()
                        });
                        this.props._onChangeAmount(this.state.index, (amount - 1).toString());
                }
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
                                                ellipsizeMode='tail'>{convertVND(this.state.price)} VND</Text>
                                        <Text style={styles.introduce}
                                                numberOfLines={2}
                                                ellipsizeMode='tail'
                                        >{this.state.introduce}</Text>
                                        {
                                                this.state.isSelected ?
                                                        <View style={styles.containerAmount}>
                                                                <Text style={styles.textTitleAmount}>số lượng: </Text>
                                                                <View style={styles.containerButtonAmount}>
                                                                        <TouchableOpacity
                                                                                onPress={() => {
                                                                                        this._onClickDownAmount();
                                                                                }}>
                                                                                <AntDesign name='minuscircleo' size={20} color={colorMain} />
                                                                        </TouchableOpacity>
                                                                        <TextInput
                                                                                keyboardType='number-pad'
                                                                                value={this.state.amount}
                                                                                onChangeText={(text) => {
                                                                                        this.setState({
                                                                                                amount: text
                                                                                        });
                                                                                        this.props._onChangeAmount(this.state.index, text);
                                                                                }}
                                                                                style={styles.textInputAmount}
                                                                        />
                                                                        <TouchableOpacity
                                                                                onPress={() => {
                                                                                        this._onClickUpAmount();
                                                                                }}>
                                                                                <AntDesign name='pluscircleo' size={20} color={colorMain} />
                                                                        </TouchableOpacity>
                                                                </View>
                                                        </View>
                                                        : null
                                        }
                                </View>
                                <TouchableOpacity
                                        style={styles.buttonCheck}
                                        onPress={() => {
                                                this.setState({
                                                        isSelected: !this.state.isSelected
                                                });
                                                this.props._onChangeSelected(this.state.index);
                                        }}
                                >
                                        {this.state.isSelected ? <Icon name={this.state.iconChecked} size={30} color={colorMain} /> :
                                                <Icon name={this.state.iconUnChecked} size={30} color='black' />}
                                </TouchableOpacity>
                        </View >
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
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colorMain
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
        },
        containerAmount: {
        },
        containerButtonAmount: {
                flexDirection: 'row',
                alignItems: 'center',
        },
        textInputAmount: {
                borderRadius: 10,
                textAlign: 'center',
        },
        textTitleAmount: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 13,
                textTransform: 'capitalize'
        }
});