import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { urlServer, colorMain } from '../../config';
import Star from 'react-native-vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get('window');

export default class ItemPlace extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        isLoading: false,
                        score: 0
                };
        }

        componentDidMount () {
                this.props.onFetchStarPlaceForItemSuggestion(this.state.item._id);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.score !== prevState.score && nextProps.score !== undefined && !prevState.isLoading) {
                        prevState.score = nextProps.score;
                }
                if (nextProps.message !== undefined) {
                        Alert.alert(
                                'Thông Báo',
                                nextProps.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
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
                                        this.props.onChangeScreenDetailPlace(this.state.item._id, this.state.item.idAdmin);
                                }}
                                style={styles.container}>
                                <View style={styles.containerImage}>
                                        <Image
                                                source={{ uri: `${urlServer}${this.state.item.imageRestaurant[0]}` }}
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
                                                                                return (<Star key={item.index.toString()} name='star' size={20} color={colorMain} />);
                                                                        else if (item.value === 0)
                                                                                return (<Star key={item.index.toString()} name='star-half' size={20} color={colorMain} />);
                                                                        else if (item.value === -1)
                                                                                return (<Star key={item.index.toString()} name='star-outline' size={20} color={colorMain} />);
                                                                })
                                                }
                                        </View>
                                        <Text
                                                numberOfLines={2}
                                                ellipsizeMode='tail'
                                                style={styles.address}>{this.state.item.address}</Text>
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
                marginHorizontal: 5,
        },
        containerImage: {
        },
        containerValue: {
                paddingHorizontal: 10,
                paddingBottom: 10
        },
        image: {
                width: width / 2 - 6,
                height: width / 3,
        },
        star: {
                width: width / 2 - 6,
                flexDirection: 'row',
                alignItems: 'center',
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize'
        },
        address: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12
        }
});