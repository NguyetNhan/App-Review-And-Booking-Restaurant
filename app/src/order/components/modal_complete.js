import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { urlServer, colorMain } from '../../config';
import ItemListModalComplete from './item_list_modal_complete';
import { convertVND } from '../../functions/convert';

export default class Complete extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        complete: props.complete,
                        idClient: props.complete.idClient,
                        idRestaurant: props.complete.idRestaurant,
                        customerName: props.complete.customerName,
                        customerEmail: props.complete.customerEmail,
                        customerPhone: props.complete.customerPhone,
                        amountPerson: props.complete.amountPerson,
                        food: props.complete.food,
                        receptionTime: props.complete.receptionTime,
                        totalMoneyFood: props.complete.totalMoneyFood,
                        note: props.complete.note,
                        discount: props.complete.discount,
                        guests: props.complete.guests
                };
        }



        onClickButtonAgree (totalMoney, scoreDiscount) {
                if (this.state.food.length === 0) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Bạn chưa chọn món ăn ! Vui lòng chọn món ăn',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.props._onCloseModalComplete();
                } else if (this.state.customerName.length === 0) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Bạn chưa nhập tên của mình !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.props._onCloseModalComplete();
                } else if (this.state.customerEmail.length === 0) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Bạn chưa nhập email của mình !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.props._onCloseModalComplete();
                } else if (this.state.customerPhone.length === 0) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                'Bạn chưa nhập số điện thoại của mình !',
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.props._onCloseModalComplete();
                }
                else {
                        if (scoreDiscount !== undefined) {
                                let complete = this.state.complete;
                                complete.totalMoney = totalMoney;
                                complete.discount.value = scoreDiscount;
                                this.props._onActionOrder(complete);
                                this.props._onCloseModalComplete();
                        } else {
                                let complete = this.state.complete;
                                complete.totalMoney = totalMoney;
                                this.props._onActionOrder(complete);
                                this.props._onCloseModalComplete();
                        }
                }
        }

        render () {
                const date = this.state.receptionTime;
                const convertTime = `${date.getHours()}h ${date.getMinutes()}''`;
                const convertDate = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
                const totalMoneyFood = this.state.totalMoneyFood;
                var totalMoney = 0;
                if (this.state.discount === null) {
                        totalMoney = totalMoneyFood;
                } else {
                        var scoreDiscount = this.state.discount.value;
                        if (this.state.discount.type === 'score') {
                                totalMoney = totalMoneyFood - scoreDiscount;
                                if (totalMoney < 0) {
                                        totalMoney = 0;
                                        scoreDiscount = totalMoneyFood;
                                }
                        } else {
                                totalMoney = (totalMoneyFood * this.state.discount.value) / 100;
                        }
                }
                return (
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <Text style={styles.textTitleHeader}>xác nhận thông tin</Text>
                                </View>
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
                                                        {
                                                                this.state.guests.length === 0 ? null :
                                                                        <View style={styles.formatValue}>
                                                                                <Text style={styles.textTitleValue}>khách mời : </Text>
                                                                                <View style={{ flex: 1 }}>
                                                                                        {
                                                                                                this.state.guests.map(item =>
                                                                                                        <Text key={item.idAccount} style={styles.textValue}>
                                                                                                                {item.name}
                                                                                                        </Text>
                                                                                                )
                                                                                        }
                                                                                </View>
                                                                        </View>
                                                        }
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
                                                                                <ItemListModalComplete
                                                                                        item={item.item}
                                                                                />
                                                                        );
                                                                }}
                                                        />
                                                </View>
                                                <Text style={styles.textTitle}>thông tin thanh toán</Text>
                                                <View style={styles.containerValue}>
                                                        {
                                                                this.state.discount === null ? null :
                                                                        this.state.discount.type === 'score' ?
                                                                                <Text style={styles.textTitleValue}>sử dụng điểm tích lũy: <Text style={styles.textValue}>{scoreDiscount}</Text></Text>
                                                                                :
                                                                                <Text style={styles.textTitleValue}>giảm giá : <Text style={styles.textValue}>{this.state.discount.value}%</Text></Text>
                                                        }
                                                        <Text style={styles.textTitleValue}>tổng tiền menu: <Text style={styles.textValueMoney}>{convertVND(this.state.totalMoneyFood)} VND</Text></Text>
                                                        <Text style={styles.textTitleValue}>Tổng tiền thanh toán: <Text style={styles.textValueMoney}>{convertVND(totalMoney)} VND</Text></Text>
                                                </View>
                                                <View style={styles.containerButton}>
                                                        <TouchableOpacity
                                                                onPress={() => {
                                                                        this.onClickButtonAgree(totalMoney, scoreDiscount);
                                                                }}
                                                                style={styles.buttonAgree}>
                                                                <Text style={styles.textButton}>chấp nhận</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                                onPress={() => {
                                                                        this.props._onCloseModalComplete();
                                                                }}
                                                                style={styles.buttonCancel}>
                                                                <Text style={styles.textButton}>hủy</Text>
                                                        </TouchableOpacity>
                                                </View>
                                        </View>
                                </ScrollView>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        header: {
                height: 50,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center'
        },
        textTitleHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                textTransform: 'capitalize',
                fontSize: 20
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
        textValueMoney: {
                fontFamily: 'UVN-Baisau-Bold',
                flex: 1,
                textTransform: 'uppercase'
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
        }
});