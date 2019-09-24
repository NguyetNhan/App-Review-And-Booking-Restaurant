import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { urlServer, colorMain } from '../../config';
import { convertVND } from '../../functions/convert';
import ItemListMenu from '../../order/components/item_list_modal_complete';
import { AccountModel } from '../../models/account';

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
                        note: props.item.note,
                        isLoading: false,
                };
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.messageConfirmSucceeded !== undefined) {
                        alert(nextProps.messageConfirmSucceeded);
                }
                if (nextProps.isLoading !== undefined && nextProps.isLoading !== prevState.isLoading) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.message !== undefined) {
                        alert(nextProps.message);
                }
                return null;
        }


        _onConfirmAgree () {
                this.setState({
                        isLoading: true
                });
                const data = {
                        idOrder: this.state.item._id,
                        status: 'activity'
                };
                this.props.onConfirmOrder(data);
        }

        _onConfirmCancel () {
                this.setState({
                        isLoading: true
                });
                const data = {
                        idOrder: this.state.item._id,
                        status: 'cancel'
                };
                this.props.onConfirmOrder(data);
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
                                        <ScrollView style={{
                                                flex: 1
                                        }} >
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
                                                        <Text style={styles.textTitle}>thông tin thực đơn</Text>
                                                        <View
                                                                style={styles.flatList}
                                                        >
                                                                <FlatList
                                                                        data={this.state.food}
                                                                        extraData={this.state}
                                                                        keyExtractor={(item, index) => index.toString()}
                                                                        horizontal={true}
                                                                        renderItem={(item) => {
                                                                                return (
                                                                                        <ItemListMenu
                                                                                                item={item.item}
                                                                                        />
                                                                                );
                                                                        }}
                                                                />
                                                        </View>
                                                        <Text style={styles.textTitle}>thông tin thanh toán</Text>
                                                        <View style={styles.containerValue}>
                                                                <View style={styles.formatValue}>
                                                                        <Text style={styles.textTitleValue}>Tổng tiền thanh toán: </Text>
                                                                        <Text style={styles.textValue}>
                                                                                {convertVND(this.state.totalMoney)} VND
                                                                </Text>
                                                                </View>
                                                        </View>
                                                        {
                                                                this.state.item.status === 'cancel' ? null :
                                                                        this.state.item.status === 'activity' ? null :
                                                                                this.state.item.status === 'complete' ? null :
                                                                                        this.state.account === null ? null :
                                                                                                this.state.account.authorities === 'admin-restaurant' ? <View style={styles.containerButton}>
                                                                                                        <TouchableOpacity
                                                                                                                onPress={() => {
                                                                                                                        this._onConfirmAgree();
                                                                                                                }}
                                                                                                                style={styles.buttonAgree}>
                                                                                                                <Text style={styles.textButton}>chấp nhận</Text>
                                                                                                        </TouchableOpacity>
                                                                                                        <TouchableOpacity
                                                                                                                onPress={() => {
                                                                                                                        this._onConfirmCancel();
                                                                                                                }}
                                                                                                                style={styles.buttonCancel}>
                                                                                                                <Text style={styles.textButton}>hủy</Text>
                                                                                                        </TouchableOpacity>
                                                                                                </View> :
                                                                                                        this.state.account.authorities === 'client' ? <View style={styles.containerButton}>
                                                                                                                <TouchableOpacity
                                                                                                                        onPress={() => {
                                                                                                                                this._onConfirmCancel();
                                                                                                                        }}
                                                                                                                        style={styles.buttonCancel}>
                                                                                                                        <Text style={styles.textButton}>hủy</Text>
                                                                                                                </TouchableOpacity>
                                                                                                        </View> : null
                                                        }
                                                </View>
                                        </ScrollView>
                                </View>
                        );
                }
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        content: {
                flex: 1,
                paddingHorizontal: 20
        },
        textTitle: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                marginTop: 15,
                textAlign: 'center',
                marginBottom: 5
        },
        containerValue: {
                borderWidth: 1,
                borderColor: colorMain,
                borderRadius: 10,
                padding: 10
        },
        textTitleValue: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize'
        },
        textValue: {
                fontFamily: 'UVN-Baisau-Bold',
                flex: 1,
        },
        formatValue: {
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5
        },
        flatList: {
                alignItems: 'center'
        },
        containerButton: {
                width: '100%',
                alignItems: 'center',
                marginVertical: 20
        },
        buttonAgree: {
                width: 100,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colorMain,
                borderRadius: 15,
                marginBottom: 10
        },
        buttonCancel: {
                width: 100,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red',
                borderRadius: 15
        },
        textButton: {
                color: 'white',
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize'
        },
        loading: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
        },
});