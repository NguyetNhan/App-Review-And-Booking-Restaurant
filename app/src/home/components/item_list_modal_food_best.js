import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { urlServer, colorMain } from '../../config';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
import IconNavigator from 'react-native-vector-icons/Feather';

export default class ItemListModalPlaceBest extends Component {
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
                                        this.props.onCloseModalListFoodBest();
                                }}
                                style={styles.container}>
                                <View >
                                        <Image
                                                source={{ uri: `${urlServer}${this.state.item.image}` }}
                                                style={styles.image}
                                        />
                                        <View style={styles.iconNavigator}>
                                                <IconNavigator name='navigation' size={20} color='white' />
                                        </View>
                                </View>

                                <View style={styles.containerValue}>
                                        <Text style={styles.name}>
                                                {this.state.item.name}
                                        </Text>
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
                                                numberOfLines={1}
                                                ellipsizeMode='tail'
                                                style={styles.address}>{this.state.item.introduce}</Text>
                                </View>
                        </TouchableOpacity>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: 'white',
                marginVertical: 10,
                marginHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'center'
        },
        iconNavigator: {
                position: 'absolute',
                right: -20,
                top: 40,
                backgroundColor: colorMain,
                padding: 10,
                borderRadius: 20
        },
        image: {
                width: 120,
                height: 120
        },
        containerValue: {
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 20,
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize'
        },
        star: {
                flexDirection: 'row',
                marginVertical: 5
        },
        address: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12
        }
});