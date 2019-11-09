import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { urlServer, colorMain } from '../../config';

export default class ItemInviteList extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        item: props.item,
                        isLoading: true,
                        account: null,
                        restaurant: null
                };
        }

        async fetchInfoAccountInvite () {
                try {
                        const result = await fetch(`${urlServer}/auth/id/${this.state.item.idAccountInvite}`, {
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
                                return null;
                        } else {
                                return result.data;
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
                        return null;
                }
        }

        async fetchInfoRestaurant () {
                try {
                        const response = await fetch(`${urlServer}/restaurant/id/${this.state.item.idRestaurant}`, {
                                method: 'GET',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                }
                        }).then(value => value.json());
                        if (response.error) {
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        response.message,
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                return null;
                        } else {
                                return response.data;
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
                        return null;
                }
        }

        async  componentDidMount () {
                const account = await this.fetchInfoAccountInvite();
                const restaurant = await this.fetchInfoRestaurant();
                if (account !== null && restaurant !== null)
                        this.setState({
                                isLoading: false,
                                account: account,
                                restaurant: restaurant
                        });
                else
                        this.setState({
                                isLoading: false,
                        });
        }

        async onClickButtonAgree () {
                const response = await fetch(`${urlServer}/invite/confirm-invite/idInvite/${this.state.item._id}/status/agree`, {
                        method: 'PUT',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                }).then(value => value.json());
                if (response.error) {
                        Alert.alert('Thông Báo Lỗi', response.message);
                } else {
                        this.setState({
                                item: response.data
                        });
                }
        }

        async onClickButtonCancel () {
                const response = await fetch(`${urlServer}/invite/confirm-invite/idInvite/${this.state.item._id}/status/cancel`, {
                        method: 'PUT',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        },
                }).then(value => value.json());
                if (response.error) {
                        Alert.alert('Thông Báo Lỗi', response.message);
                } else {
                        this.setState({
                                item: response.data
                        });
                }
        }

        onChangeScreenDetailPlace () {
                this.props.onChangeScreenDetailPlace(this.state.restaurant._id, this.state.restaurant.idAdmin);
        }

        render () {
                if (this.state.isLoading)
                        return (
                                <View style={styles.containerLoading}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={30}
                                        />
                                </View>
                        );
                else {
                        const dateReceptionTime = new Date(this.state.item.receptionTime);
                        const convertTimeReceptionTime = `${dateReceptionTime.getHours()}h ${dateReceptionTime.getMinutes()}''`;
                        const convertDateReceptionTime = `${dateReceptionTime.getDate()} / ${dateReceptionTime.getMonth() + 1} / ${dateReceptionTime.getFullYear()}`;
                        const dateCreateDate = new Date(this.state.item.createDate);
                        const convertTimeCreateDate = `${dateCreateDate.getHours()}h ${dateCreateDate.getMinutes()}''`;
                        const convertDateCreateDate = `${dateCreateDate.getDate()} / ${dateCreateDate.getMonth() + 1} / ${dateCreateDate.getFullYear()}`;
                        const timeNow = new Date();
                        return (
                                <TouchableOpacity style={styles.container}
                                        onPress={() => this.onChangeScreenDetailPlace()}
                                >
                                        {
                                                this.state.account.avatar === null ?
                                                        <Image
                                                                source={require('../../assets/images/avatar_user.png')}
                                                                style={styles.image}
                                                        /> :
                                                        <Image
                                                                source={{ uri: `${urlServer}${this.state.account.avatar}` }}
                                                                style={styles.image}
                                                        />
                                        }
                                        <View style={styles.containerValue}>
                                                <Text style={styles.name}>{this.state.account.name}</Text>
                                                <Text style={styles.textInvite}>đã mời bạn dự tiệc tại địa điểm <Text style={styles.nameRestaurant}>{this.state.restaurant.name}</Text> vào lúc <Text style={styles.time}>{convertTimeReceptionTime}</Text> ngày <Text style={styles.time}>{convertDateReceptionTime}</Text>.</Text>
                                                <Text style={styles.timeCreate}>{convertTimeCreateDate}  <Text style={styles.timeCreate}>{convertDateCreateDate}</Text></Text>
                                                {
                                                        this.state.item.status === 'waiting' ?
                                                                timeNow > dateReceptionTime ? null :
                                                                        <View style={styles.containerButton}>
                                                                                <TouchableOpacity
                                                                                        style={styles.buttonAgree}
                                                                                        onPress={() => {
                                                                                                this.onClickButtonAgree();
                                                                                        }}
                                                                                >
                                                                                        <Text style={styles.textButtonAgree}>đồng ý</Text>
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity
                                                                                        style={styles.buttonCancel}
                                                                                        onPress={() => {
                                                                                                this.onClickButtonCancel();
                                                                                        }}
                                                                                >
                                                                                        <Text style={styles.textButtonCancel}>từ chối</Text>
                                                                                </TouchableOpacity>
                                                                        </View> :
                                                                this.state.item.status === 'agree' ?
                                                                        <Text style={styles.textConfirm}>Bạn đã đồng ý tham dự !</Text> :
                                                                        this.state.item.status === 'cancel' ?
                                                                                <Text style={styles.textConfirm}>Bạn đã từ chối tham gia !</Text> : null
                                                }

                                        </View>
                                </TouchableOpacity>
                        );
                }
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                flexDirection: 'row',
                marginHorizontal: 20,
                marginVertical: 10
        },
        containerLoading: {
                flex: 1,
                alignItems: 'center'
        },
        image: {
                width: 80,
                height: 80,
                borderRadius: 40
        },
        containerValue: {
                flex: 1,
                marginLeft: 10
        },
        name: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 16,
                color: colorMain
        },
        textInvite: {
                fontFamily: 'UVN-Baisau-Regular',
        },
        nameRestaurant: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain
        },
        time: {
                fontFamily: 'UVN-Baisau-Bold',
                color: 'red'
        },
        containerButton: {
                flexDirection: 'row',
                marginTop: 5
        },
        buttonCancel: {
                backgroundColor: '#d3d3d3',
                width: 80,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
        },
        buttonAgree: {
                backgroundColor: '#2a67e2',
                width: 80,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginRight: 10
        },
        textButtonAgree: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                color: 'white'
        },
        textButtonCancel: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize'
        },
        timeCreate: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 8
        },
        textConfirm: {
                color: 'red'
        }
});