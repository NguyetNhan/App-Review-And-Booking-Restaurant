import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { urlServer, colorMain } from '../../config';
import { convertVND } from '../../functions/convert';

export default class Item extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        account: null
                };
        }

        async componentDidMount () {
                try {
                        const result = await fetch(`${urlServer}/auth/id/${this.state.item.idClient}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                        if (result.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        result.message,
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                this.setState({
                                        isLoading: false
                                });
                        } else {
                                this.setState({
                                        account: result.data,
                                        isLoading: false
                                });
                        }
                } catch (error) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                error.message,
                                [
                                        { text: 'OK' },
                                ],
                                { cancelable: false },
                        );
                        this.setState({
                                isLoading: false
                        });
                }
        }

        render () {
                const date = new Date(this.state.item.receptionTime);
                const convertTime = `${date.getHours()}h ${date.getMinutes()}''`;
                const convertDate = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
                return (
                        <TouchableOpacity
                                onPress={() => {
                                        this.props._onClickOrder(this.state.item._id);
                                }}
                        >
                                <View style={styles.container}>
                                        <View style={styles.containerImage}>
                                                {
                                                        this.state.account === null ?
                                                                <ActivityIndicator
                                                                        animating={true}
                                                                        size={30}
                                                                /> :
                                                                this.state.account.avatar === null ?
                                                                        <Image
                                                                                style={styles.image}
                                                                                source={require('../../assets/images/avatar_user.png')}
                                                                        /> :
                                                                        <Image
                                                                                style={styles.image}
                                                                                source={this.state.account.avatar}
                                                                        />
                                                }

                                                <Text
                                                        numberOfLines={1}
                                                        ellipsizeMode='tail'
                                                        style={styles.valueStatus}>{
                                                                this.state.item.status === 'cancel' ?
                                                                        'hủy' :
                                                                        this.state.item.status === 'waiting' ?
                                                                                'chờ' :
                                                                                this.state.item.status === 'activity' ?
                                                                                        'thực hiện' :
                                                                                        this.state.item.status === 'complete' ?
                                                                                                'hoàn thành' : 'hoàn thành'
                                                        }</Text>
                                        </View>

                                        <View style={styles.content}>
                                                <Text style={styles.name}>{this.state.item.customerName}</Text>
                                                <View style={styles.containerValue}>
                                                        <Text style={styles.title}>số người: </Text>
                                                        <Text
                                                                numberOfLines={1}
                                                                ellipsizeMode='tail'
                                                                style={styles.value}>{this.state.item.amountPerson}</Text>
                                                </View>
                                                <View style={styles.containerValue}>
                                                        <Text style={styles.title}>giờ: </Text>
                                                        <Text style={styles.value}
                                                        >{convertTime}</Text>
                                                </View>
                                                <View style={styles.containerValue}>
                                                        <Text style={styles.title}>ngày: </Text>
                                                        <Text style={styles.value}
                                                        >{convertDate}</Text>
                                                </View>
                                                <View style={styles.containerValue}>
                                                        <Text style={styles.title}>số tiền: </Text>
                                                        <Text
                                                                numberOfLines={1}
                                                                ellipsizeMode='tail'
                                                                style={styles.value}>{convertVND(this.state.item.totalMoney)} VND</Text>
                                                </View>
                                        </View>
                                </View>
                        </TouchableOpacity>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'row',
                margin: 10,
                alignItems: 'center'
        },
        containerImage: {
                margin: 10,
                alignItems: 'center'
        },
        image: {
                width: 80,
                height: 80,
        },
        content: {
                flex: 1,
                marginRight: 10,
                marginVertical: 10
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 18,
                textTransform: 'capitalize'
        },
        title: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 12,
                textTransform: 'capitalize',
                width: 55,
        },
        value: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 12,
                color: colorMain,
        },
        containerValue: {
                flexDirection: 'row',
        },
        valueStatus: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                color: colorMain,
                fontSize: 15,
        },
});