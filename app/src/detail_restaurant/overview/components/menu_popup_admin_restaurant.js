import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class MenuPopupAdminRestaurant extends Component {
        constructor (props) {
                super(props);
                this.state = {

                };
        }

        render () {
                return (
                        <View style={styles.container}>
                                <View style={styles.content}>
                                        <View style={styles.containerTitle}>
                                                <Text style={styles.title}>tùy chọn</Text>
                                        </View>
                                        <View style={styles.containerButton}>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.props.onClickCloseMenuPopup();
                                                                this.props.onOpenEditRestaurant();
                                                        }}
                                                >
                                                        <Text style={styles.textButtonEdit}>chỉnh sửa</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                        <Text style={styles.textButtonDelete}>xóa</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                        onPress={() => this.props.onClickCloseMenuPopup()}
                                                >
                                                        <Text style={styles.textButtonCancel}>hủy</Text>
                                                </TouchableOpacity>
                                        </View>
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
                height: 200,
                width: 150,
                justifyContent: 'space-around',
                borderRadius: 10
        },
        containerTitle: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
        },
        title: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                fontSize: 15
        },
        containerButton: {
                flex: 4,
                alignItems: 'center',
                marginTop: 20
        },
        textButtonEdit: {
                color: 'black',
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                textTransform: 'capitalize',
                marginBottom: 15
        },
        textButtonDelete: {
                color: 'red',
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                textTransform: 'capitalize',
                marginBottom: 15
        },
        textButtonCancel: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
        }
});