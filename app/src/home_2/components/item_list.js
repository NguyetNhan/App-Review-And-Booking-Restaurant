import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colorMain, urlServer } from '../../config';

export default class ItemList extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.itemList
                };
        }

        render () {
                return (
                        <TouchableOpacity style={styles.container}
                                onPress={() => {
                                        this.props._onClickItemFlatList(this.state.item._id, this.state.item.idAdmin);
                                }}
                        >
                                <Image
                                        source={{ uri: `${urlServer}${this.state.item.imageRestaurant[0]}` }}
                                        style={styles.image}
                                />
                                <View style={styles.containerText}>
                                        <Text style={styles.text}>{this.state.item.name}</Text>
                                        <View style={styles.containerReview}>
                                                <Text style={styles.textReview}>9,2</Text>
                                        </View>
                                </View>
                        </TouchableOpacity>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        image: {
                width: 250,
                height: 200,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10
        },
        text: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                color: 'black',
                textTransform: 'capitalize'
        },
        containerText: {
                width: '100%',
                height: 60,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                backgroundColor: 'white',
                flexDirection: 'row',
                paddingHorizontal: 20
        },
        textReview: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                color: 'white'
        },
        containerReview: {
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: colorMain,
                alignItems: 'center',
                justifyContent: 'center',
        }
});