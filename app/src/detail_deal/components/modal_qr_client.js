import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class ModalQrClient extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        idOrder: props.idOrder
                };
        }

        render () {
                return (
                        <View style={styles.container}>
                                <Text style={styles.textTitle}>mã xác nhận đơn hàng</Text>
                                <QRCode
                                        value={this.state.idOrder}
                                        size={200}
                                />
                                <TouchableOpacity
                                        onPress={() => {
                                                this.props._onCloseModalQrClient();
                                        }}
                                        style={styles.buttonClose}>
                                        <AntDesign name='close' size={50} color='black' />
                                </TouchableOpacity>
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
        textTitle: {
                marginBottom: 50,
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                fontSize: 25
        },
        buttonClose: {
                marginTop: 50
        }
});