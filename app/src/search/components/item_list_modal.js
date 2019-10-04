import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { urlServer } from '../../config';

export default class ItemListModal extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        type: props.type
                };
        }

        render () {
                const item = this.state.item;
                if (this.state.type === 'restaurant')
                        return (
                                <TouchableOpacity
                                        onPress={() => {
                                                this.props.onClickItem(item._id, item.idAdmin);
                                        }}
                                >
                                        <View style={styles.containerItem}
                                        >
                                                <Image
                                                        source={{ uri: `${urlServer}${item.imageRestaurant[0]}` }}
                                                        style={styles.image}
                                                />
                                                <View style={styles.containerName}>
                                                        <Text style={styles.name}>{item.name}</Text>
                                                        <Text style={styles.address}>{item.address}</Text>
                                                </View>
                                        </View>
                                </TouchableOpacity>
                        );
                else
                        return (
                                <TouchableOpacity
                                        onPress={() => {
                                        }}
                                >
                                        <View style={styles.containerItem}
                                        >
                                                {
                                                        item.avatar === null ?
                                                                <Image
                                                                        source={require('../../assets/images/avatar_user.png')}
                                                                        style={styles.image}
                                                                /> :
                                                                <Image
                                                                        source={{ uri: `${urlServer}${item.avatar}` }}
                                                                        style={styles.image}
                                                                />
                                                }
                                                <View style={styles.containerName}>
                                                        <Text style={styles.name}>{item.name}</Text>
                                                        <Text style={styles.address}>{item.email}</Text>
                                                </View>
                                        </View>
                                </TouchableOpacity>
                        );
        }
}

const styles = StyleSheet.create({
        containerItem: {
                flexDirection: 'row',
                marginVertical: 5,
                marginHorizontal: 20,

        },
        image: {
                width: 30,
                height: 30,
                borderRadius: 15
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
        },
        address: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 10
        },
        containerName: {
                marginLeft: 10,
                justifyContent: 'center'
        },
});