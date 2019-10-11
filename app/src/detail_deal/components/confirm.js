import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, FlatList, ActivityIndicator } from 'react-native';
import { urlServer, colorMain, background } from '../../config';
import { convertVND } from '../../functions/convert';
import ItemListMenu from '../../order/components/item_list_modal_complete';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalQrClient from './modal_qr_client';

export default class Confirm extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: props.account,
                        item: props.item,
                        idClient: props.item.idClient,
                        idRestaurant: props.item.idRestaurant,
                        customerName: props.item.customerName,
                        customerEmail: props.item.customerEmail,
                        customerPhone: props.item.customerPhone,
                        amountPerson: props.item.amountPerson,
                        food: props.item.food,
                        receptionTime: props.item.receptionTime,
                        totalMoney: props.item.totalMoney,
                        totalMoneyFood: props.item.totalMoneyFood,
                        discount: props.item.discount,
                        note: props.item.note,
                        isLoading: false,
                        visibleModalQrClient: false,
                };
                this._onCloseModalQrClient = this._onCloseModalQrClient.bind(this);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.messageSucceeded !== undefined && !prevState.isLoading) {
                        nextProps._onCallback();
                        Alert.alert(
                                'Thông Báo',
                                nextProps.messageSucceeded,
                                [
                                        {
                                                text: 'OK',
                                        },
                                ],
                                { cancelable: false },
                        );
                }
                if (nextProps.messageFailed !== undefined && !prevState.isLoading) {
                        Alert.alert(
                                'Thông Báo',
                                nextProps.messageFailed,
                                [
                                        { text: 'OK', onPress: () => nextProps.onResetPropsMessage() },
                                ],
                                { cancelable: false },
                        );
                }
                if (nextProps.isLoading !== undefined && nextProps.isLoading !== prevState.isLoading) {
                        prevState.isLoading = nextProps.isLoading;
                }
                return null;
        }


        _onConfirmAgree () {
                this.setState({
                        isLoading: true
                });
                const data = {
                        idOrder: this.state.item._id,
                        status: 'activity',
                        idAccount: this.state.account.id
                };
                this.props.onConfirmOrder(data);
        }

        _onConfirmCancel () {
                this.setState({
                        isLoading: true
                });
                const data = {
                        idOrder: this.state.item._id,
                        status: 'cancel',
                        idAccount: this.state.account.id
                };
                this.props.onConfirmOrder(data);
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

        onClickReview () {
                this.props._onChangeScreenRestaurant(this.state.item);
        }

        componentWillUnmount () {
                this.props.onResetPropsConfirm();
        }
        render () {
                const date = new Date(this.state.receptionTime);
                const convertTime = `${date.getHours()}h ${date.getMinutes()}''`;
                const convertDate = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
                if (this.state.isLoading) {
                        return (
                                <View style={styles.loading}>
                                        <ActivityIndicator animating={true} size={80} color={colorMain} />
                                </View>
                        );

                } else {
                        return (
                                <View style={styles.container}>
                                        {
                                                this.state.account === null ? null :
                                                        this.state.item.status === 'waiting' ?
                                                                this.state.account.authorities === 'admin-restaurant' ?
                                                                        <View style={styles.containerButton}>
                                                                                <TouchableOpacity
                                                                                        onPress={() => {
                                                                                                this._onConfirmAgree();
                                                                                        }}
                                                                                        style={styles.buttonAgree}>
                                                                                        <Text style={styles.textButtonAgree}>chấp nhận</Text>
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity
                                                                                        onPress={() => {
                                                                                                this._onConfirmCancel();
                                                                                        }}
                                                                                        style={styles.buttonCancel}>
                                                                                        <Text style={styles.textButtonCancel}>hủy giao dịch</Text>
                                                                                </TouchableOpacity>
                                                                        </View>
                                                                        :
                                                                        this.state.account.authorities === 'client' ?
                                                                                <View style={styles.containerButton}>
                                                                                        <TouchableOpacity
                                                                                                onPress={() => {
                                                                                                        this._onConfirmCancel();
                                                                                                }}
                                                                                                style={styles.buttonCancelClient}>
                                                                                                <Text style={styles.textButtonCancel}>hủy giao dịch</Text>
                                                                                        </TouchableOpacity>
                                                                                </View>
                                                                                :
                                                                                null
                                                                :
                                                                this.state.item.status === 'cancel' ? null :
                                                                        this.state.item.status === 'review' ?
                                                                                this.state.account.authorities === 'admin-restaurant' ? null :
                                                                                        this.state.account.authorities === 'client' ?
                                                                                                <View style={styles.containerButton}>
                                                                                                        <TouchableOpacity
                                                                                                                onPress={() => {
                                                                                                                        this.onClickReview();
                                                                                                                }}
                                                                                                                style={styles.buttonReview}>
                                                                                                                <View style={styles.containerTextButton}>
                                                                                                                        <MaterialCommunityIcons name='star' size={25} color={colorMain} />
                                                                                                                        <Text style={styles.textButtonRestaurant}>đánh giá</Text>
                                                                                                                </View>
                                                                                                        </TouchableOpacity>
                                                                                                </View>
                                                                                                :
                                                                                                null
                                                                                :
                                                                                this.state.item.status === 'complete' ? null
                                                                                        :
                                                                                        this.state.item.status === 'activity' ?
                                                                                                this.state.account.authorities === 'admin-restaurant' ?
                                                                                                        <View style={styles.containerButton}>
                                                                                                                <TouchableOpacity
                                                                                                                        onPress={() => {
                                                                                                                        }}
                                                                                                                        style={styles.buttonAgree}>
                                                                                                                        <Text style={styles.textButtonAgree}>gửi tin nhắn</Text>
                                                                                                                </TouchableOpacity>
                                                                                                                <TouchableOpacity
                                                                                                                        onPress={() => {
                                                                                                                                this._onConfirmCancel();
                                                                                                                        }}
                                                                                                                        style={styles.buttonCancel}>
                                                                                                                        <Text style={styles.textButtonCancel}>hủy giao dịch</Text>
                                                                                                                </TouchableOpacity>
                                                                                                        </View>
                                                                                                        :
                                                                                                        this.state.account.authorities === 'client' ?
                                                                                                                <View style={styles.containerButton}>
                                                                                                                        <TouchableOpacity style={styles.buttonQR}
                                                                                                                                onPress={() => {
                                                                                                                                        this._onOpenModalQrClient();
                                                                                                                                }}
                                                                                                                        >
                                                                                                                                <View style={styles.containerTextButton}>
                                                                                                                                        <MaterialCommunityIcons name='qrcode-scan' size={25} color={colorMain} />
                                                                                                                                        <Text style={styles.textButtonQR}>Mã QR Xác Thực</Text>
                                                                                                                                </View>
                                                                                                                        </TouchableOpacity>
                                                                                                                </View>
                                                                                                                :
                                                                                                                null
                                                                                                :
                                                                                                null
                                        }
                                        <View style={styles.content}>
                                                <Text style={styles.textTitle}>thông tin cá nhân</Text>
                                                <View style={styles.containerValue}>
                                                        <View style={styles.formatValue}>
                                                                <Text style={styles.textTitleValue}>Họ và tên: </Text>
                                                                <Text style={styles.textValue}>
                                                                        {this.state.customerName}
                                                                </Text>
                                                        </View>
                                                        <View style={styles.formatValue}>
                                                                <Text style={styles.textTitleValue}>số điện thoại: </Text>
                                                                <Text style={styles.textValue}>
                                                                        {this.state.customerPhone}
                                                                </Text>
                                                        </View>
                                                        <View style={styles.formatValue}>
                                                                <Text style={styles.textTitleValue}>địa chỉ email: </Text>
                                                                <Text style={styles.textValue}>
                                                                        {this.state.customerEmail}
                                                                </Text>
                                                        </View>
                                                </View>
                                        </View>
                                        <View style={styles.content}>
                                                <Text style={styles.textTitle}>thông tin đặt chỗ</Text>
                                                <View style={styles.containerValue}>
                                                        <View style={styles.formatValue}>
                                                                <Text style={styles.textTitleValue}>ngày nhận tiệc: </Text>
                                                                <Text style={styles.textValue}>
                                                                        {convertDate}
                                                                </Text>
                                                        </View>
                                                        <View style={styles.formatValue}>
                                                                <Text style={styles.textTitleValue}>giờ nhận tiệc: </Text>
                                                                <Text style={styles.textValue}>
                                                                        {convertTime}
                                                                </Text>
                                                        </View>
                                                        <View style={styles.formatValue}>
                                                                <Text style={styles.textTitleValue}>số lượng người: </Text>
                                                                <Text style={styles.textValue}>
                                                                        {this.state.amountPerson}
                                                                </Text>
                                                        </View>
                                                        <View style={styles.formatValue}>
                                                                <Text style={styles.textTitleValue}>ghi chú: </Text>
                                                                <Text style={styles.textValue}>
                                                                        {this.state.note}
                                                                </Text>
                                                        </View>
                                                </View>
                                        </View>
                                        <View style={styles.content}>
                                                <Text style={styles.textTitle}>thông tin thực đơn</Text>
                                                <View
                                                        style={styles.flatList}
                                                >
                                                        <FlatList
                                                                data={this.state.food}
                                                                extraData={this.state}
                                                                keyExtractor={(item, index) => index.toString()}
                                                                horizontal={true}
                                                                showsHorizontalScrollIndicator={false}
                                                                renderItem={(item) => {
                                                                        return (
                                                                                <ItemListMenu
                                                                                        item={item.item}
                                                                                />
                                                                        );
                                                                }}
                                                        />
                                                </View>
                                        </View>
                                        <View style={styles.content}>
                                                <Text style={styles.textTitle}>thông tin thanh toán</Text>
                                                <View style={styles.containerValue}>
                                                        {
                                                                this.state.discount === null ? null :
                                                                        this.state.discount.type === 'score' ?
                                                                                <Text style={styles.textTitleValueMoney}>Sử dụng điểm tích lũy: <Text style={styles.textValuePriceMoney}>{convertVND(this.state.discount.score)} VND</Text></Text>
                                                                                :
                                                                                null
                                                        }
                                                        <Text style={styles.textTitleValueMoney}>Tổng tiền thực đơn: <Text style={styles.textValuePriceMoney}>
                                                                {convertVND(this.state.totalMoneyFood)} VND
                                                                </Text></Text>
                                                        <Text style={styles.textTitleValueMoney}>Tổng tiền thanh toán: <Text style={styles.textValuePriceMoney}>
                                                                {convertVND(this.state.totalMoney)} VND
                                                                </Text></Text>
                                                </View>
                                        </View>
                                        <Modal
                                                visible={this.state.visibleModalQrClient}
                                                animationType='slide'
                                                onRequestClose={() => {
                                                        this._onCloseModalQrClient();
                                                }}
                                        >
                                                <ModalQrClient
                                                        idOrder={this.state.item._id}
                                                        _onCloseModalQrClient={this._onCloseModalQrClient}
                                                />
                                        </Modal>

                                </View>
                        );
                }
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: background
        },
        content: {
                backgroundColor: 'white',
                marginVertical: 5,
                paddingVertical: 5
        },
        textTitle: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                textAlign: 'center',
        },
        containerValue: {
                padding: 10
        },
        textTitleValue: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                fontSize: 12,
        },
        textValue: {
                fontFamily: 'UVN-Baisau-Bold',
                flex: 1,
                fontSize: 12,
        },
        textValuePrice: {
                fontFamily: 'UVN-Baisau-Bold',
                flex: 1,
                fontSize: 12,
                color: 'red'
        },
        textTitleValueMoney: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                fontSize: 12,
        },
        textValuePriceMoney: {
                fontFamily: 'UVN-Baisau-Bold',
                flex: 1,
                fontSize: 12,
                color: 'red',
                textTransform: 'uppercase'
        },
        formatValue: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5
        },
        flatList: {
                alignItems: 'center',
                marginTop: 5
        },
        containerButton: {
                width: '100%',
                alignItems: 'center',
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'center'
        },
        buttonAgree: {
                width: 120,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
                backgroundColor: 'white',
                borderColor: colorMain,
                borderWidth: 1,
                borderBottomLeftRadius: 30,
                borderTopLeftRadius: 30
        },
        buttonCancel: {
                width: 120,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
                backgroundColor: 'white',
                borderColor: 'red',
                borderWidth: 1,
                borderBottomRightRadius: 30,
                borderTopRightRadius: 30
        },
        textButton: {
                color: 'white',
                textTransform: 'capitalize',
                fontFamily: 'UVN-Baisau-Bold',
                textAlign: 'center',
                fontSize: 12,
        },
        loading: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
        },
        buttonChat: {
                width: 180,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
                borderRadius: 15,
                marginVertical: 5,
                borderWidth: 1,
                borderColor: colorMain,
                backgroundColor: 'white'
        },
        buttonConfirmCancelDeal: {
                width: 180,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
                marginTop: 10,
                borderRadius: 15,
                marginVertical: 5,
                borderWidth: 1,
                borderColor: 'red',
                backgroundColor: 'white'
        },
        buttonRestaurant: {
                width: 180,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
                borderRadius: 15,
                marginVertical: 5,
                borderWidth: 1,
                borderColor: colorMain,
                backgroundColor: 'white'
        },
        buttonQR: {
                width: 180,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
                borderRadius: 15,
                marginVertical: 5,
                borderWidth: 1,
                borderColor: colorMain,
                backgroundColor: 'white'
        },
        textButtonRestaurant: {
                color: colorMain,
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                flex: 1,
                textAlign: 'center',
                fontSize: 12,
        },
        textButtonQR: {
                color: colorMain,
                fontFamily: 'UVN-Baisau-Bold',
                flex: 1,
                textAlign: 'center',
                fontSize: 12,
                textTransform: 'capitalize',
        },
        containerTextButton: {
                flexDirection: 'row',
                alignItems: 'center'
        },
        buttonRestaurantReview: {
                width: 140,
                height: 40,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colorMain,
                paddingHorizontal: 15
        },
        buttonReview: {
                width: 140,
                height: 40,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
                marginVertical: 5,
                borderWidth: 1,
                borderColor: colorMain,
                backgroundColor: 'white'
        },
        textButtonAgree: {
                color: colorMain,
                fontFamily: 'UVN-Baisau-Bold',
                textAlign: 'center',
                fontSize: 12,
                textTransform: 'capitalize',
        },
        textButtonCancel: {
                color: 'red',
                fontFamily: 'UVN-Baisau-Bold',
                textAlign: 'center',
                fontSize: 12,
                textTransform: 'capitalize',
        },
        buttonCancelClient: {
                width: 120,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
                backgroundColor: 'white',
                borderColor: 'red',
                borderWidth: 1,
                borderRadius: 30
        }
});