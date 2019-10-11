import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colorMain, urlServer } from '../../config';
import Icon from 'react-native-vector-icons/EvilIcons';
export default class DialogDetailMarker extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        image: props.image,
                        type: props.type,
                        title: props.title,
                        address: props.address,
                        item: props.item
                };
        }

        render () {
                return (
                        <View style={styles.container}
                        >
                                <View style={styles.content}>
                                        <Image
                                                source={{ uri: `${urlServer}${this.state.image}` }}
                                                style={styles.image}
                                        />
                                        <Text style={styles.title}>{this.state.title}</Text>
                                        <Text style={styles.type}>{this.state.type}</Text>
                                        <Text style={styles.address}>{this.state.address}</Text>
                                        <Text style={styles.distance}>cách bạn {this.state.item.distance} m</Text>
                                        <View style={styles.containerButton}>
                                                <TouchableOpacity
                                                        style={styles.button}
                                                        onPress={() => {
                                                                this.props._onClickDetail(this.state.item._id);
                                                                this.props._onClickCloseDialogDetailMarker();
                                                        }}
                                                >
                                                        <Text style={styles.textButton}>chi tiết</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                        style={styles.button}
                                                        onPress={() => {
                                                                this.props._onClickDirections({
                                                                        latitude: this.state.item.position.latitude,
                                                                        longitude: this.state.item.position.longitude
                                                                });
                                                                this.props._onClickCloseDialogDetailMarker();
                                                        }}
                                                >
                                                        <Text style={styles.textButton}>chỉ đường</Text>
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
                color: colorMain,
                marginTop: 10
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
                marginBottom: 20
        },
        button: {
                width: 75,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: colorMain,
                marginHorizontal: 5
        },
        textButton: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize'
        },
        buttonClose: {
                marginBottom: 10
        }
});