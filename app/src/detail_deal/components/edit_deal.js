import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, ScrollView, TextInput, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { urlServer, colorMain, background } from '../../config';
import ItemListModalComplete from '../../order/components/item_list_modal_complete';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FriendList from '../../order/components/friend_list';
import SelectFood from './select_food';
export default class EditDeal extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        deal: props.deal,
                        idClient: props.deal.idClient,
                        idRestaurant: props.deal.idRestaurant,
                        customerName: props.deal.customerName,
                        customerEmail: props.deal.customerEmail,
                        customerPhone: props.deal.customerPhone.toString(),
                        amountPerson: props.deal.amountPerson.toString(),
                        food: props.deal.food,
                        receptionTime: new Date(props.deal.receptionTime),
                        totalMoney: props.deal.totalMoney,
                        totalMoneyFood: props.deal.totalMoneyFood,
                        discount: props.deal.discount,
                        note: props.deal.note,
                        guests: props.deal.guests,
                        modeDate: 'date',
                        modeTime: 'time',
                        showTime: false,
                        showDate: false,
                        time: new Date(props.deal.receptionTime),
                        day: new Date(props.deal.receptionTime),
                        visibleModalFriendList: false,
                        visibleModalSelectFood: false,
                        restaurant: null,
                        isLoading: true
                };
                this.onCloseModalFriendList = this.onCloseModalFriendList.bind(this);
                this.onCloseModalSelectFood = this.onCloseModalSelectFood.bind(this);
                this.onCompleteInvite = this.onCompleteInvite.bind(this);
                this.onSetFoodList = this.onSetFoodList.bind(this);
        }

        componentDidMount () {
                this.fetchInfoRestaurant();
        }

        fetchInfoRestaurant = async () => {
                try {
                        const response = await fetch(`${urlServer}/restaurant/id/${this.state.idRestaurant}`, {
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
                                this.setState({
                                        isLoading: false
                                });
                        } else {

                                this.setState({
                                        restaurant: response.data,
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

        onClickShowDatePicker = () => {
                this.setState({
                        showDate: !this.state.showDate,
                });
        }

        onClickShowTimePicker = () => {
                this.setState({
                        showTime: !this.state.showTime,
                });
        }
        onCloseModalFriendList = () => {
                this.setState({
                        visibleModalFriendList: !this.state.visibleModalFriendList
                });
        }
        onOpenModalFriendList = () => {
                this.setState({
                        visibleModalFriendList: !this.state.visibleModalFriendList
                });
        }
        onCloseModalSelectFood = (foodList) => {
                this.setState({
                        visibleModalSelectFood: !this.state.visibleModalSelectFood,
                        food: foodList
                });
        }
        onOpenModalSelectFood = () => {
                this.setState({
                        visibleModalSelectFood: !this.state.visibleModalSelectFood,
                        food: []
                });
        }
        onCompleteInvite (list) {
                this.setState({
                        guests: list,
                        amountPerson: (list.length + 1).toString(),
                });
        }

        onSetFoodList = (foodList, totalMoney) => {
                this.setState({
                        food: foodList,
                        totalMoneyFood: totalMoney,
                })
        }

        _setDate (event, date) {
                if (event.type === 'set') {
                        const day = new Date(date);
                        const dateNow = new Date();
                        if (date > dateNow) {
                                this.setState({
                                        showDate: !this.state.showDate,
                                        day: day
                                });
                        }
                        else {
                                this.setState({
                                        showDate: !this.state.showDate,
                                });
                                Alert.alert(
                                        'Thông Báo Lỗi',
                                        'Không được chọn ngày trước ngày hiện tại !',
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                        }
                } else if (event.type === 'dismissed') {
                        this.setState({
                                showDate: !this.state.showDate,
                        });
                }
        }

        _setTime (event, time) {
                const date = new Date(time);
                if (event.type === 'set') {
                        if (date.getHours() >= this.state.restaurant.timeClose || date.getHours() < this.state.restaurant.timeOpen) {
                                Alert.alert('Thông Báo', 'Nhà hàng không hoạt động trong thời gian này, mời bạn chọn lại !');
                        } else {
                                this.setState({
                                        showTime: !this.state.showTime,
                                        time: date
                                });
                        }
                } else if (event.type === 'dismissed') {
                        this.setState({
                                showTime: !this.state.showTime,
                        });
                }
        }

        onClickButtonSave = async () => {
                this.setState({
                        isLoading: true
                });
                const receptionTime = new Date(this.state.day.getFullYear(), this.state.day.getMonth() + 1, this.state.day.getDate(), this.state.time.getHours(), this.state.time.getMinutes(), 0, 0)
                if (this.state.discount !== null) {
                        if (this.state.discount.type === 'score') {
                                totalMoney = this.state.totalMoneyFood - this.state.discount.value;
                                if (totalMoney < 0) {
                                        totalMoney = 0;
                                        scoreDiscount = this.state.totalMoneyFood;
                                }
                        } else {
                                totalMoney = (this.state.totalMoneyFood * this.state.discount.value) / 100;
                        }
                } else {
                        totalMoney = this.state.totalMoneyFood;
                }
                try {
                        let body = {
                                guests: this.state.guests,
                                food: this.state.food,
                                customerName: this.state.customerName,
                                customerEmail: this.state.customerEmail,
                                customerPhone: this.state.customerPhone,
                                amountPerson: this.state.amountPerson,
                                receptionTime: receptionTime,
                                note: this.state.note,
                                totalMoneyFood: this.state.totalMoneyFood,
                                totalMoney: totalMoney,
                        };
                        const response = await fetch(`${urlServer}/order/update-order/idOrder/${this.state.deal._id}`, {
                                method: 'PUT',
                                headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(body)
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
                                this.setState({
                                        isLoading: false
                                });
                        } else {
                                this.setState({
                                        isLoading: false
                                });
                                Alert.alert(
                                        'Thông Báo',
                                        response.message,
                                        [
                                                { text: 'OK' },
                                        ],
                                        { cancelable: false },
                                );
                                this.props.onCloseEditDeal();
                        }
                } catch (error) {
                        this.setState({
                                isLoading: false
                        });
                        Alert.alert('Thông Báo Lỗi', 'Cập nhật thất bại ! ' + error.message)
                }
        }

        render () {
                const convertTime = `${this.state.time.getHours()}h ${this.state.time.getMinutes()}''`;
                const convertDate = `${this.state.day.getDate()} / ${this.state.day.getMonth() + 1} / ${this.state.day.getFullYear()}`;
                if (this.state.isLoading)
                        return (
                                <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                }}>
                                        <ActivityIndicator
                                                animating={true}
                                                size={30}
                                                color={colorMain}
                                        />
                                </View>
                        );
                else
                        return (
                                <View style={styles.container}>
                                        <View style={styles.header}>
                                                <TouchableOpacity onPress={this.props.onCloseEditDeal}>
                                                        <Icon name='arrowleft' size={25} color='black' />
                                                </TouchableOpacity>
                                                <Text style={styles.textHeader}>Chỉnh Sửa Đặt Chỗ</Text>
                                                <TouchableOpacity onPress={this.onClickButtonSave}>
                                                        <Text style={styles.textButtonSave}>Lưu</Text>
                                                </TouchableOpacity>
                                        </View>
                                        <View style={styles.content}>
                                                <ScrollView
                                                        showsVerticalScrollIndicator={false}>
                                                        {
                                                                this.state.discount !== null ?
                                                                        <View>
                                                                                {
                                                                                        this.state.discount.type === 'score' ?
                                                                                                <Text style={styles.nameDiscount}>*Bạn đã sử dụng <Text style={styles.nameValueDiscount}>{this.state.discount.value}</Text> điểm thưởng cho đơn hàng này</Text> :
                                                                                                <Text style={styles.nameDiscount}>*Bạn đã sử dụng mã khuyến mãi <Text style={styles.nameValueDiscount}>{this.state.discount.value}</Text>% cho đơn hàng này</Text>
                                                                                }
                                                                                <Text style={styles.textWarn}>*Lưu ý: Mọi chương trình khuyến mãi đã áp dụng thì sẽ không được thay đổi khi chỉnh sửa đơn hàng</Text>
                                                                        </View> : null
                                                        }

                                                        <Text style={styles.title}>Tên</Text>
                                                        <TextInput
                                                                value={this.state.customerName}
                                                                style={styles.textInput}
                                                                onChangeText={(text) => this.setState({ customerName: text })}
                                                        />
                                                        <Text style={styles.title}>Số điện thoại</Text>
                                                        <TextInput
                                                                value={this.state.customerPhone}
                                                                keyboardType='number-pad'
                                                                style={styles.textInput}
                                                                onChangeText={(text) => this.setState({ customerPhone: text })}
                                                        />
                                                        <Text style={styles.title}>Email</Text>
                                                        <View style={styles.containerEmail}>
                                                                <Text>{this.state.customerEmail}</Text>
                                                        </View>
                                                        <Text style={styles.title}>giờ</Text>
                                                        <TouchableOpacity
                                                                onPress={this.onClickShowTimePicker}
                                                        >
                                                                <View style={styles.containerTime}>
                                                                        <Text style={styles.textTime} >{convertTime}</Text>
                                                                </View>
                                                        </TouchableOpacity>
                                                        <Text style={styles.title}>ngày</Text>
                                                        <TouchableOpacity
                                                                onPress={this.onClickShowDatePicker}
                                                        >
                                                                <View style={styles.containerTime}>
                                                                        <Text style={styles.textTime} >{convertDate}</Text>
                                                                </View>
                                                        </TouchableOpacity>
                                                        <View style={styles.containerButtonAddFood}>
                                                                <Text style={styles.titleTextFood}>Khách mời</Text>
                                                                <TouchableOpacity
                                                                        onPress={this.onOpenModalFriendList}
                                                                >
                                                                        <MaterialIcons
                                                                                name='person-add'
                                                                                size={25}
                                                                                color={colorMain}
                                                                        />
                                                                </TouchableOpacity>
                                                        </View>
                                                        <View>
                                                                <FlatList
                                                                        data={this.state.guests}
                                                                        extraData={this.state}
                                                                        keyExtractor={(item, index) => index.toString()}
                                                                        renderItem={(item) => {
                                                                                return (
                                                                                        <Text style={styles.textNameFriend}>{item.item.name}</Text>
                                                                                );
                                                                        }}
                                                                />
                                                        </View>
                                                        <Text style={styles.title}>Số lượng</Text>
                                                        <TextInput
                                                                value={this.state.amountPerson}
                                                                style={styles.textInput}
                                                                keyboardType='number-pad'
                                                                onChangeText={(text) => this.setState({ amountPerson: text })}
                                                        />
                                                        <Text style={styles.title}>Ghi chú</Text>
                                                        <TextInput
                                                                value={this.state.note}
                                                                style={styles.textInput}
                                                                multiline
                                                                onChangeText={(text) => this.setState({ note: text })}
                                                        />
                                                        <View style={styles.containerButtonAddFood}>
                                                                <Text style={styles.titleTextFood}>Món ăn</Text>
                                                                <TouchableOpacity
                                                                        onPress={this.onOpenModalSelectFood}
                                                                >
                                                                        <MaterialIcons
                                                                                name='playlist-add'
                                                                                size={25}
                                                                                color={colorMain}
                                                                        />
                                                                </TouchableOpacity>
                                                        </View>

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
                                                </ScrollView>
                                                {
                                                        this.state.showTime ?
                                                                <DateTimePicker
                                                                        value={this.state.day}
                                                                        mode={this.state.modeTime}
                                                                        is24Hour={true}
                                                                        display="clock"
                                                                        onChange={(event, text) => {
                                                                                this._setTime(event, text);
                                                                        }}
                                                                /> : null
                                                }
                                                {
                                                        this.state.showDate ?
                                                                <DateTimePicker
                                                                        value={this.state.time}
                                                                        mode={this.state.modeDate}
                                                                        display="spinner"
                                                                        onChange={(event, text) => {
                                                                                this._setDate(event, text);
                                                                        }}
                                                                /> : null
                                                }
                                        </View>
                                        <Modal
                                                visible={this.state.visibleModalFriendList}
                                                animated={true}
                                                animationType='slide'
                                                onRequestClose={this.onCloseModalFriendList}
                                        >
                                                <FriendList
                                                        onCloseModalFriendList={this.onCloseModalFriendList}
                                                        onCompleteInvite={this.onCompleteInvite}
                                                        oldFriendListInvited={this.state.guests}
                                                />
                                        </Modal>
                                        <Modal
                                                visible={this.state.visibleModalSelectFood}
                                                animationType='slide'
                                                onRequestClose={() =>
                                                        this.setState({
                                                                visibleModalSelectFood: !this.state.visibleModalSelectFood,
                                                                food: this.state.deal.food
                                                        })
                                                }
                                        >
                                                <SelectFood
                                                        onCloseModalSelectFood={this.onCloseModalSelectFood}
                                                        idRestaurant={this.state.deal.idRestaurant}
                                                        onSetFoodList={this.onSetFoodList}
                                                        oldFoodList={this.state.deal.food}
                                                />
                                        </Modal>
                                </View >
                        );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        header: {
                height: 50,
                width: '100%',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 16,
                textTransform: 'capitalize'
        },
        textButtonSave: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain, fontSize: 16
        },
        content: {
                flex: 1,
                paddingHorizontal: 20
        },
        nameDiscount: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                fontSize: 16,
                textAlign: 'center',
                color: 'red'
        },
        nameValueDiscount: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
        },
        textWarn: {
                fontFamily: 'UVN-Baisau-Regular',
                textAlign: 'center',
                fontSize: 12,
        },
        title: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                marginTop: 10
        },
        containerEmail: {
                backgroundColor: background,
                justifyContent: 'center',
                height: 50,
                borderRadius: 10,
                paddingHorizontal: 10
        },
        textEmail: {
                fontFamily: 'OpenSans-Regular'
        },
        textInput: {
                borderWidth: 1,
                fontFamily: 'OpenSans-Regular',
                borderRadius: 10,
                borderColor: 'gray',
                paddingHorizontal: 10
        },
        containerTime: {
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 10
        },
        textTime: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 20,
        },
        containerButtonAddFood: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
        },
        titleTextFood: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
        },
        flatList: {
                alignItems: 'center',
                marginVertical: 10
        },
        textNameFriend: {
                fontFamily: 'UVN-Baisau-Bold',
                color: colorMain,
                fontSize: 16
        }
});