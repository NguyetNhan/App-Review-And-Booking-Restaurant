import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { urlServer, colorMain } from '../../config';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ItemRestaurant extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        restaurant: null,
                        isLoading: true
                };
        }

        componentDidMount () {
                this.fetchInfoRestaurant();
        }

        async fetchInfoRestaurant () {
                try {
                        const response = await fetch(`${urlServer}/restaurant/id/${this.state.item.idRestaurantFollow}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                        if (response.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        response.message,
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                this.setState({
                                        isLoading: false
                                });
                        } else {
                                this.setState({
                                        restaurant: response.data,
                                        isLoading: false
                                });
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.setState({
                                isLoading: false
                        });
                }
        }

        onChangeScreenDetailPlace () {
                this.props.onChangeScreenDetailPlace(this.state.restaurant._id, this.state.idAdmin);
        }
        render () {

                if (this.state.isLoading) {
                        return (
                                <View style={styles.containerLoading}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={30}
                                        />
                                </View>
                        );
                } else {
                        if (this.state.restaurant !== null) {
                                const score = this.state.restaurant.star;
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
                        }
                        return (
                                <TouchableOpacity
                                        onPress={() => this.onChangeScreenDetailPlace()}
                                        style={styles.containerRestaurant}>
                                        <Image
                                                source={{ uri: `${urlServer}${this.state.restaurant.imageRestaurant[0]}` }}
                                                style={styles.imageRestaurant}
                                        />
                                        <View style={styles.contentRestaurant}>
                                                <Text style={styles.name}>{this.state.restaurant.name}</Text>
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
                                                <Text style={styles.address}>{this.state.restaurant.address}</Text>
                                        </View>
                                </TouchableOpacity>
                        );
                }

        }
}

const styles = StyleSheet.create({
        containerLoading: {
                flex: 1,
                alignItems: 'center',
        },
        containerRestaurant: {
                flex: 1,
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 20,
                padding: 10,
                alignItems: 'center',
                backgroundColor: 'white'
        },
        imageRestaurant: {
                width: 50,
                height: 50,
                borderRadius: 25,
                borderWidth: 3,
                borderColor: colorMain
        },
        contentRestaurant: {
                flex: 1,
                marginLeft: 10
        },
        star: {
                flexDirection: 'row'
        },
        address: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12,
                color: 'gray'
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16
        },
});