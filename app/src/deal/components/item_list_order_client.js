import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { urlServer, colorMain } from '../../config';
import { convertVND } from '../../functions/convert';

export default class Item extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        restaurant: null
                };
        }

        _getFetchInfoRestaurant = async () => {
                try {
                        const response = await fetch(`${urlServer}/restaurant/id/${this.state.item.idRestaurant}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                },
                        }).then(value => value.json());
                        if (response.error) {
                                alert(response.message);
                        } else {
                                this.setState({
                                        restaurant: response.data
                                })
                        }
                } catch (error) {
                        console.log('error: ', error);
                }
        }

        componentDidMount () {
                this._getFetchInfoRestaurant();
        }

        render () {
                const date = new Date(this.state.item.receptionTime);
                const convertTime = `${date.getHours()}h ${date.getMinutes()}''`;
                const convertDate = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;

                return (
                        <TouchableOpacity
                                onPress={() => {
                                        this.props._onClickOrder(this.state.item._id);
                                }}
                        >
                                <View style={styles.container}>
                                        <View style={styles.containerImage}>
                                                {
                                                        this.state.restaurant !== null ? <Image
                                                                style={styles.image}
                                                                source={{ uri: `${urlServer}${this.state.restaurant.imageRestaurant[0]}` }}
                                                        /> : null
                                                }
                                                <Text
                                                        numberOfLines={1}
                                                        ellipsizeMode='tail'
                                                        style={styles.valueStatus}>{
                                                                this.state.item.status === 'cancel' ?
                                                                        'hủy' :
                                                                        this.state.item.status === 'waiting' ?
                                                                                'chờ' :
                                                                                this.state.item.status === 'activity' ?
                                                                                        'thực hiện' :
                                                                                        this.state.item.status === 'complete' ?
                                                                                                'hoàn thành' : 'hoàn thành'
                                                        }</Text>
                                        </View>

                                        <View style={styles.content}>
                                                {
                                                        this.state.restaurant !== null ? <Text style={styles.name}>{this.state.restaurant.name}</Text> : null
                                                }
                                                <View style={styles.containerValue}>
                                                        <Text style={styles.title}>số người: </Text>
                                                        <Text
                                                                numberOfLines={1}
                                                                ellipsizeMode='tail'
                                                                style={styles.value}>{this.state.item.amountPerson}</Text>
                                                </View>
                                                <View style={styles.containerValue}>
                                                        <Text style={styles.title}>giờ: </Text>
                                                        <Text style={styles.value}
                                                        >{convertTime}</Text>
                                                </View>
                                                <View style={styles.containerValue}>
                                                        <Text style={styles.title}>ngày: </Text>
                                                        <Text style={styles.value}
                                                        >{convertDate}</Text>
                                                </View>
                                                <View style={styles.containerValue}>
                                                        <Text style={styles.title}>số tiền: </Text>
                                                        <Text
                                                                numberOfLines={1}
                                                                ellipsizeMode='tail'
                                                                style={styles.value}>{convertVND(this.state.item.totalMoney)} VND</Text>
                                                </View>
                                        </View>
                                </View>
                        </TouchableOpacity>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'row',
                margin: 10,
                alignItems: 'center'
        },
        containerImage: {
                margin: 10,
                alignItems: 'center'
        },
        image: {
                width: 80,
                height: 80,
        },
        content: {
                flex: 1,
                marginRight: 10,
                marginVertical: 10
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 18,
                textTransform: 'capitalize'
        },
        title: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12,
                textTransform: 'capitalize',
                width: 55,
        },
        value: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 12,
                color: colorMain,
        },
        containerValue: {
                flexDirection: 'row',
        },
        valueStatus: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                color: colorMain,
                fontSize: 12,
        },
});