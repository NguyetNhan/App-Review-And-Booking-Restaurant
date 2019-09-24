import React, { Component } from 'react';
import { View, Text, Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { colorMain } from '../../config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalQrClient from './modal_qr_client';
export default class ActivityClient extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        order: props.order,
                        visibleModalQrClient: false
                };
        }


        _onOpenModalQrClient () {
                this.setState({
                        visibleModalQrClient: !this.state.visibleModalQrClient
                });
        }

        _onCloseModalQrClient () {
                this.setState({
                        visibleModalQrClient: !this.state.visibleModalQrClient
                });
        }

        render () {
                return (
                        <View style={styles.container}>
                                <TouchableOpacity style={styles.buttonMap}>
                                        <View style={styles.containerTextButton}>
                                                <MaterialCommunityIcons name='directions-fork' size={25} color='white' />
                                                <Text style={styles.textButtonMap}>chỉ đường</Text>
                                        </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonQR}
                                        onPress={() => {
                                                this._onOpenModalQrClient();
                                        }}
                                >
                                        <View style={styles.containerTextButton}>
                                                <MaterialCommunityIcons name='qrcode-scan' size={25} color='white' />
                                                <Text style={styles.textButtonQR}>Mã QR Xác Thực</Text>
                                        </View>
                                </TouchableOpacity>
                                <Modal
                                        visible={this.state.visibleModalQrClient}
                                        animationType='slide'
                                        onRequestClose={() => {
                                                this._onCloseModalQrClient();
                                        }}
                                >
                                        <ModalQrClient
                                                idOrder={this.state.order._id}
                                        />
                                </Modal>
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
        buttonMap: {
                width: 180,
                height: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colorMain,
                margin: 10,
                paddingHorizontal: 15
        },
        buttonQR: {
                width: 180,
                height: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red',
                margin: 10,
                paddingHorizontal: 15
        },
        textButtonMap: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                flex: 1,
                textAlign: 'center'
        },
        textButtonQR: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Bold',
                flex: 1,
                textAlign: 'center'
        },
        containerTextButton: {
                flexDirection: 'row',
                alignItems: 'center'
        }
});