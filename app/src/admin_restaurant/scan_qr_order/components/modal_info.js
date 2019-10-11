import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { urlServer, colorMain } from '../../../config';
import { convertVND } from '../../../functions/convert';
import ItemListMenu from '../../../order/components/item_list_modal_complete';
import Icon from 'react-native-vector-icons/AntDesign';

export default class ModalInfo extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        account: null,
                        item: props.order,
                        idClient: props.order.idClient,
                        idRestaurant: props.order.idRestaurant,
                        customerName: props.order.customerName,
                        customerEmail: props.order.customerEmail,
                        customerPhone: props.order.customerPhone,
                        amountPerson: props.order.amountPerson,
                        food: props.order.food,
                        receptionTime: props.order.receptionTime,
                        totalMoney: props.order.totalMoney,
                        totalMoneyFood: props.order.totalMoneyFood,
                        discount: props.order.discount,
                        note: props.order.note,
                };
        }


        componentWillUnmount () {

        }
        render () {
                const date = new Date(this.state.receptionTime);
                const convertTime = `${date.getHours()}h ${date.getMinutes()}''`;
                const convertDate = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
                return (
                        <ScrollView>
                                <View style={styles.container}>
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
                                        <View style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: 20
                                        }}>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.props._onCloseModalInfo();
                                                        }}
                                                >
                                                        <Icon name='close' size={60} color='black' />
                                                </TouchableOpacity>
                                        </View>
                                </View>
                        </ScrollView>
                );

        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        content: {
                paddingHorizontal: 20,
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
});