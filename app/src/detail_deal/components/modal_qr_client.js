import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode';
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
                                <Text>con cac</Text>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        }
});