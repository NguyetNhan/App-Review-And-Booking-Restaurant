import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { urlServer, colorMain } from '../../config';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get('window');
import { convertVND } from '../../functions/convert';

export default class ItemFood extends Component {
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
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        response.message,
                                        [
                                                {
                                                        text: 'OK',
                                                },
                                        ],
                                        { cancelable: false },
                                );
                        } else {
                                this.setState({
                                        restaurant: response.data
                                })
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message,
                                [
                                        {
                                                text: 'OK',
                                        },
                                ],
                                { cancelable: false },
                        );
                }
        }

        componentDidMount () {
                this._getFetchInfoRestaurant();
        }

        render () {
                const score = this.state.item.star;
                var listStar = [];
                for (let i = 1; i < 6; i++) {
                        var j = i + 1;
                        if (i < score && score < j) {
                                listStar.push({
                                        index: i,
                                        value: 1
                                });
                                listStar.push({
                                        index: i + 1,
                                        value: 0
                                });
                                i++;
                        }
                        else if (i <= score)
                                listStar.push({
                                        index: i,
                                        value: 1
                                });
                        else if (i > score)
                                listStar.push({
                                        index: i,
                                        value: -1
                                });
                }
                return (
                        <TouchableOpacity
                                onPress={() => {
                                        this.props.onChangeScreenDetailPlace(this.state.restaurant._id, this.state.restaurant.idAdmin);
                                }}
                                style={styles.container}>
                                <View style={styles.containerImage}>
                                        <Image
                                                source={{ uri: `${urlServer}${this.state.item.image}` }}
                                                style={styles.image}
                                        />
                                </View>
                                <View style={styles.containerValue}>
                                        <Text
                                                numberOfLines={1}
                                                ellipsizeMode='tail'
                                                style={styles.name}>{this.state.item.name}</Text>
                                        <View
                                                style={styles.star}
                                        >
                                                {
                                                        this.state.score === null ? null :
                                                                listStar.map(item => {
                                                                        if (item.value === 1)
                                                                                return (<Star key={item.index.toString()} name='star' size={15} color={colorMain} />);
                                                                        else if (item.value === 0)
                                                                                return (<Star key={item.index.toString()} name='star-half' size={15} color={colorMain} />);
                                                                        else if (item.value === -1)
                                                                                return (<Star key={item.index.toString()} name='star-outline' size={15} color={colorMain} />);
                                                                })
                                                }
                                        </View>
                                        <Text
                                                numberOfLines={2}
                                                ellipsizeMode='tail'
                                                style={styles.address}>Giá: <Text style={styles.price}>{convertVND(this.state.item.price)} VND</Text></Text>
                                </View>
                        </TouchableOpacity>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                marginVertical: 5,
                width: width / 2 - 20,
                backgroundColor: 'white',
                marginHorizontal: 5
        },
        containerImage: {
        },
        containerValue: {
                paddingHorizontal: 10,
                paddingBottom: 10
        },
        image: {
                width: width / 2 - 20,
                height: width / 3,
        },
        star: {
                width: width / 2 - 6,
                flexDirection: 'row',
                alignItems: 'center',
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold'
        },
        address: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12
        },
        price: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 12,
                color: 'red'
        }
})