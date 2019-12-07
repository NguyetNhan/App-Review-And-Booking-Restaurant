import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { urlServer, colorMain } from '../../config';

export default class ItemListModalComplete extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        amount: props.item.amount,
                        food: null,
                        isLoading: true
                };
        }

        async fetchInfoFood () {
                try {
                        const res = await fetch(`${urlServer}/menu/id/${this.state.item.idFood}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                        this.setState({
                                food: res.data,
                                isLoading: false
                        });
                } catch (error) {
                        Alert.alert('Thông Báo Lỗi', 'Không thể lấy thông tin món ăn ! ' + error.message);
                }
        }

        componentDidMount () {
                this.fetchInfoFood();
        }

        render () {
                if (this.state.isLoading) {
                        return (
                                <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                }}>
                                        <ActivityIndicator size={80} color={colorMain} animating={true} />
                                </View>
                        );
                } else {
                        return (
                                <View style={styles.container}>
                                        <Image
                                                source={{ uri: `${urlServer}${this.state.food.image}` }}
                                                style={styles.image}
                                        />
                                        <Text style={styles.name}
                                                numberOfLines={1}
                                                ellipsizeMode='tail'
                                        >{this.state.food.name}</Text>
                                        <Text style={styles.amount}>số lượng: {this.state.amount}</Text>
                                </View>
                        );
                }
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
                borderColor: colorMain,
                borderWidth: 1,
                borderRadius: 5
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                fontSize: 14,
        },
        amount: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                fontSize: 12,
        }
});