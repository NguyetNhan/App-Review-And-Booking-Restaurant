import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { urlServer, colorMain } from '../../../config';

export default class MenuPopupAdminRestaurant extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        restaurant: props.restaurant,
                        isLoading: false
                };
        }

        async onClickButtonDelete () {
                this.setState({
                        isLoading: true
                });
                try {
                        const response = await fetch(`${urlServer}/restaurant/remove-restaurant/idRestaurant/${this.state.restaurant._id}`, {
                                method: 'PUT',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(data => data.json());
                        if (response.error) {
                                this.setState({
                                        isLoading: false
                                });
                                Alert.alert('Thông Báo Lỗi', response.message);
                        } else {
                                this.setState({
                                        isLoading: false
                                });
                                Alert.alert('Thông Báo', response.message);
                                this.props.onRefresh();
                                this.props.onClickCloseMenuPopup();
                        }
                } catch (error) {
                        this.setState({
                                isLoading: false
                        });
                        Alert.alert('Thông Báo Lỗi', 'Thất bại ! ' + error.message);
                }
        }

        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.content}>
                                        {
                                                this.state.isLoading ?
                                                        <ActivityIndicator
                                                                animating={true}
                                                                size={30}
                                                                color={colorMain}
                                                        /> :
                                                        <View style={styles.containerButton}>
                                                                <TouchableOpacity
                                                                        onPress={() => {
                                                                                this.props.onClickCloseMenuPopup();
                                                                                this.props.onOpenEditRestaurant();
                                                                        }}
                                                                >
                                                                        <Text style={styles.textButtonEdit}>chỉnh sửa</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                        onPress={() => {
                                                                                this.onClickButtonDelete();
                                                                        }}
                                                                >
                                                                        <Text style={styles.textButtonDelete}>đóng cửa</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                        onPress={() => this.props.onClickCloseMenuPopup()}
                                                                >
                                                                        <Text style={styles.textButtonCancel}>hủy</Text>
                                                                </TouchableOpacity>
                                                        </View>

                                        }
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
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                height: 150,
                width: 150,
                borderRadius: 10
        },
        containerButton: {
                flex: 1,
                alignItems: 'center',
                marginTop: 20,
                justifyContent: 'space-around',
        },
        textButtonEdit: {
                color: 'black',
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16,
                textTransform: 'capitalize',
        },
        textButtonDelete: {
                color: 'red',
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16,
                textTransform: 'capitalize',
        },
        textButtonCancel: {
                color: 'red',
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
        }
});