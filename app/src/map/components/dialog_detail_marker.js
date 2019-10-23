import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colorMain, urlServer, background } from '../../config';
import Icon from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class DialogDetailMarker extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        typeCustoms: props.typeCustoms
                };
        }

        render () {
                return (
                        <View style={styles.container}>
                                {
                                        this.state.typeCustoms === 'place' ?
                                                <View style={styles.content}>
                                                        <Image
                                                                source={{ uri: `${urlServer}${this.state.item.imageRestaurant[0]}` }}
                                                                style={styles.image}
                                                        />
                                                        <Text style={styles.title}>{this.state.item.name}</Text>
                                                        <Text style={styles.type}>{this.state.item.type}</Text>
                                                        <Text style={styles.address}>{this.state.item.address}</Text>
                                                        <Text style={styles.distance}>cách bạn {this.state.item.distance} m</Text>
                                                        <View style={styles.containerButton}>
                                                                <TouchableOpacity
                                                                        style={styles.buttonLeft}
                                                                        onPress={() => {
                                                                                this.props._onClickDetail(this.state.item._id);
                                                                                this.props._onClickCloseDialogDetailMarker();
                                                                        }}
                                                                >
                                                                        <MaterialCommunityIcons name='information-variant' size={30} color={colorMain} />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                        style={styles.buttonRight}
                                                                        onPress={() => {
                                                                                this.props._onClickDirections({
                                                                                        latitude: this.state.item.geolocation.latitude,
                                                                                        longitude: this.state.item.geolocation.longitude
                                                                                });
                                                                                this.props._onClickCloseDialogDetailMarker();
                                                                        }}
                                                                >
                                                                        <MaterialCommunityIcons name='map-marker-path' size={30} color={colorMain} />
                                                                </TouchableOpacity>
                                                        </View>
                                                        <TouchableOpacity
                                                                onPress={() => {
                                                                        this.props._onClickCloseDialogDetailMarker();
                                                                }}
                                                                style={styles.buttonClose}>
                                                                <Icon name='close' size={50} color='black' />
                                                        </TouchableOpacity>
                                                </View> :
                                                <View style={styles.content}>
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
                                                        <Text style={styles.title}>{this.state.item.name}</Text>
                                                        <View style={styles.containerButton}>
                                                                <TouchableOpacity
                                                                        style={styles.buttonLeft}
                                                                        onPress={() => {
                                                                                this.props._onClickCloseDialogDetailMarker();
                                                                                this.props.onClickInfoAccount(this.state.item._id);
                                                                        }}
                                                                >
                                                                        <MaterialCommunityIcons name='information-variant' size={30} color={colorMain} />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                        style={styles.buttonRight}
                                                                        onPress={() => {
                                                                                this.props._onClickCloseDialogDetailMarker();
                                                                                this.props.onClickButtonChat(this.state.item._id);
                                                                        }}
                                                                >
                                                                        <MaterialCommunityIcons name='chat' size={30} color={colorMain} />
                                                                </TouchableOpacity>
                                                        </View>
                                                        <TouchableOpacity
                                                                onPress={() => {
                                                                        this.props._onClickCloseDialogDetailMarker();
                                                                }}
                                                                style={styles.buttonClose}>
                                                                <Icon name='close' size={50} color='black' />
                                                        </TouchableOpacity>
                                                </View>
                                }

                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
        },
        content: {
                backgroundColor: 'white',
                width: 250,
                alignItems: 'center',
                justifyContent: 'center'
        },
        image: {
                width: 250,
                height: 150
        },
        title: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                marginTop: 10,

        },
        type: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'uppercase',
                fontSize: 10
        },
        address: {
                fontFamily: 'UVN-Baisau-Regular',
                textAlign: 'center',
                marginTop: 10,
                marginHorizontal: 20
        },
        distance: {
                fontFamily: 'UVN-Baisau-Bold',
                marginBottom: 10,
                textTransform: 'capitalize'
        },
        containerButton: {
                flexDirection: 'row',
                marginBottom: 20,
                marginTop: 10
        },
        buttonLeft: {
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: background
        },
        buttonRight: {
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: background,
                marginLeft: 20
        },
        textButton: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                textAlign: 'center'
        },
        buttonClose: {
                marginBottom: 10
        }
});