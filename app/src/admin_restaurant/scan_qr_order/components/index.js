import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Modal, ActivityIndicator } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/AntDesign';
import { colorMain } from '../../../config';
import { AccountModel } from '../../../models/account';
import ModalInfo from './modal_info';
export default class ScanQrOrder extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        order: null,
                        isLoading: true,
                        visibleModalInfo: false
                }
                this._onCloseModalInfo = this._onCloseModalInfo.bind(this);
        }
        async fetchInfoAccountFromLocal () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                try {
                        if (account.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        'Bạn chưa đăng nhập !',
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                this.props.navigation.navigate('Auth');
                        } else {
                                this.setState({
                                        account: account.data,
                                        isLoading: false
                                })
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Bạn chưa đăng nhập !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.props.navigation.navigate('Auth');
                }

        }
        componentDidMount () {
                this.fetchInfoAccountFromLocal();
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.order !== undefined && nextProps.order !== prevState.order) {
                        prevState.order = nextProps.order;
                        prevState.visibleModalInfo = true;
                }
                if (nextProps.isLoading !== undefined && nextProps.isLoading !== prevState.isLoading) {
                        prevState.isLoading = nextProps.isLoading
                }
                if (nextProps.messages !== undefined) {
                        alert(nextProps.messages);
                }
                return null;
        }


        onSuccess = (e) => {
                this.setState({
                        isLoading: true
                });
                this.props.onConfirmOrderForAdminRestaurant({
                        idOrder: e.data,
                        idAdmin: this.state.account.id
                })
        }

        _onCloseModalInfo () {
                this.setState({
                        visibleModalInfo: !this.state.visibleModalInfo
                })
        }

        componentWillUnmount () {
                this.props.onResetPropsScanQr();
        }
        render () {
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor='white'
                                        barStyle='dark-content'
                                />
                                <QRCodeScanner
                                        ref={(node) => { this.scanner = node }}
                                        onRead={this.onSuccess}
                                        topContent={<Text style={styles.textHeader}>quét mã xác nhận đơn hàng</Text>}
                                        bottomContent={
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.scanner.reactivate();
                                                        }}
                                                        style={styles.buttonReset}>
                                                        <Text style={styles.textButtonReset}>quét lại</Text>
                                                </TouchableOpacity>
                                        }
                                />
                                <TouchableOpacity
                                        style={styles.buttonBack}
                                        onPress={() => this.props.navigation.goBack()}>
                                        <Icon name='arrowleft' size={25} color='black' />
                                </TouchableOpacity>
                                <Modal
                                        visible={this.state.isLoading}
                                        transparent
                                        animationType='slide'
                                >
                                        <View style={styles.containerLoading}>
                                                <ActivityIndicator animating={true} size={80} color={colorMain} />
                                        </View>
                                </Modal>
                                <Modal
                                        visible={this.state.visibleModalInfo}
                                        animationType='slide'
                                        onRequestClose={() => {
                                                this._onCloseModalInfo();
                                        }}
                                >
                                        {
                                                this.state.order === null ?
                                                        <View style={styles.containerLoading}>
                                                                <ActivityIndicator animating={true} size={80} color={colorMain} />
                                                        </View> :
                                                        <ModalInfo
                                                                order={this.state.order}
                                                                _onCloseModalInfo={this._onCloseModalInfo}
                                                        />
                                        }
                                </Modal>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        containerHeader: {
                width: '100%',
                height: 50,
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                paddingHorizontal: 20
        },
        containerLoading: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.9)'
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                textTransform: 'capitalize',
                marginBottom: 30
        },
        buttonReset: {
                width: 100,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colorMain,
                borderRadius: 15,
                marginTop: 20
        },
        textButtonReset: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                fontSize: 20
        },
        buttonBack: {
                position: 'absolute',
                top: 15,
                left: 20
        }
});