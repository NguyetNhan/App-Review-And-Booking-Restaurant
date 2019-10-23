import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { urlServer } from '../../config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class ItemFlatList extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item
                };
        }

        render () {
                return (
                        <TouchableOpacity
                                onPress={() => {
                                        this.props.onClickItem(this.state.item._id);
                                }}
                                style={styles.container}>
                                {
                                        this.state.item.avatar === null ?
                                                <Image
                                                        source={require('../../assets/images/avatar_user.png')}
                                                        style={styles.image}
                                                /> :
                                                <Image
                                                        source={{ uri: `${urlServer}${this.state.item.avatar}` }}
                                                        style={styles.image}
                                                />
                                }
                                <View style={styles.value}>
                                        <Text numberOfLines={1}
                                                ellipsizeMode='tail'
                                                style={styles.name}>{this.state.item.name}</Text>
                                        <View style={styles.contentDistance}>
                                                <MaterialIcons name='person-pin-circle' size={18} color='gray' />
                                                <Text numberOfLines={1}
                                                        ellipsizeMode='tail'
                                                        style={styles.distance}>{this.state.item.distance} m</Text>
                                        </View>
                                </View>
                        </TouchableOpacity>
                );
        }
}
const styles = StyleSheet.create({
        container: {
                flex: 1,
                flexDirection: 'row',
                marginHorizontal: 20,
                marginVertical: 5
        },
        image: {
                height: 40,
                width: 40,
                borderRadius: 20
        },
        value: {
                marginLeft: 10,
                justifyContent: 'center'
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16
        },
        distance: {
                fontFamily: 'UVN-Baisau-Regular',
                color: 'gray'
        },
        contentDistance: {
                flexDirection: 'row',
                alignItems: 'center'
        }
});