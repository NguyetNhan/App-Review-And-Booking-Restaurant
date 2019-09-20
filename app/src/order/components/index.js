import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, Image, TextInput, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AccountModel } from '../../models/account';
import DateTimePicker from '@react-native-community/datetimepicker';
import { urlServer, colorMain, background } from '../../config';
import ItemMenu from './item_menu';
import ListFoodSelect from './list_food_select';
import { convertVND } from '../../functions/convert';
import InfoAccount from './info_account';

export default class Order extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        idRestaurant: props.navigation.getParam('idRestaurantForOrder', null),
                        date: new Date(),
                        modeDate: 'date',
                        modeTime: 'time',
                        showTime: false,
                        showDate: false,
                        amount: '1',
                        note: '',
                        visibleListMenu: false,
                        listMenu: [],
                        listFoodSelect: [],
                        totalMoney: 0,
                        visibleInfoAccount: false,
                        isLoading: false,
                        resultOrder: null,
                        currentPage: 0,
                        labels: null,
                };
                this._onClickCloseListMenu = this._onClickCloseListMenu.bind(this);
                this._onCheckFood = this._onCheckFood.bind(this);
                this._onClickCloseModalInfoAccount = this._onClickCloseModalInfoAccount.bind(this);
                this._onActionOrder = this._onActionOrder.bind(this);
        }


        componentDidMount () {
                this.props.onFetchListMenu(this.state.idRestaurant);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.listMenu !== prevState.listMenu && nextProps.listMenu !== undefined) {
                        var list = nextProps.listMenu;
                        for (item of list) {
                                item.isSelected = false;
                        }
                        prevState.listMenu = list;
                }
                if (nextProps.isLoading !== prevState.isLoading) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.resultOrder !== prevState.resultOrder && nextProps.resultOrder !== undefined) {
                        prevState.resultOrder = nextProps.resultOrder;
                        alert(nextProps.resultOrder.messages);
                }
                return null;
        }


        _onClickShowDatePicker () {
                this.setState({
                        showDate: !this.state.showDate,
                });
        }

        _onClickShowTimePicker () {
                this.setState({
                        showTime: !this.state.showTime,
                });
        }

        _setDate (event, date) {
                if (event.type === 'set') {
                        this.setState({
                                showDate: !this.state.showDate,
                                date: date
                        });
                } else if (event.type === 'dismissed') {
                        this.setState({
                                showDate: !this.state.showDate,
                                date: this.state.date
                        });
                }
        }

        _setTime (event, time) {
                if (event.type === 'set') {
                        this.setState({
                                showTime: !this.state.showTime,
                                date: time
                        });
                } else if (event.type === 'dismissed') {
                        this.setState({
                                showTime: !this.state.showTime,
                                date: this.state.date
                        });
                }
        }

        _onClickOpenListMenu () {
                this.setState({
                        visibleListMenu: !this.state.visibleListMenu
                });
        }

        _onClickCloseListMenu () {
                this.setState({
                        visibleListMenu: !this.state.visibleListMenu
                });
        }

        _onCheckFood (index) {
                this.state.listMenu[index].isSelected = !this.state.listMenu[index].isSelected;
        }

        _onClickCompleteSelect () {
                var listMenu = this.state.listMenu;
                var listSelect = [];
                var money = 0;
                for (item of listMenu) {
                        if (item.isSelected) {
                                listSelect.push(item);
                                money = money + item.price;
                        }
                }
                this.setState({
                        listFoodSelect: listSelect,
                        totalMoney: money
                });
        }

        _onClickButtonOrder () {
                this.setState({
                        visibleInfoAccount: !this.state.visibleInfoAccount
                });
        }

        _onClickCloseModalInfoAccount () {
                this.setState({
                        visibleInfoAccount: !this.state.visibleInfoAccount
                });
        }

        _onActionOrder (infoAccount) {
                var listIdFood = [];
                for (item of this.state.listFoodSelect) {
                        listIdFood.push(item._id);
                }
                var data = {
                        idClient: infoAccount.id,
                        idRestaurant: this.state.idRestaurant,
                        customerName: infoAccount.name,
                        customerEmail: infoAccount.email,
                        customerPhone: Number.parseInt(infoAccount.phone),
                        amountPerson: Number.parseInt(this.state.amount),
                        food: listIdFood,
                        receptionTime: this.state.date,
                        totalMoney: Number.parseFloat(this.state.totalMoney),
                        note: this.state.note,
                };
                this.props.onAddOrder(data);
                this._onClickCloseModalInfoAccount();
                this.setState({
                        isLoading: true
                });
        }


        render () {
                const date = this.state.date;
                const convertTime = `${date.getHours()}h ${date.getMinutes()}''`;
                const convertDate = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
                return (
                        <View style={styles.container}>
                                <StatusBar
                                        backgroundColor='white'
                                        barStyle='dark-content'
                                />
                                <View style={styles.containerHeader}>
                                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.goBack();
                                        }}>
                                                <Icon name='arrow-left' size={25} color='black' />
                                        </TouchableOpacity>
                                        <Text style={styles.textHeader}>đặt chỗ</Text>
                                        <View />
                                </View>
                                <View style={styles.content}>
                                        <View style={styles.form}>
                                                <Text style={styles.title}>giờ</Text>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this._onClickShowTimePicker();
                                                        }}
                                                >
                                                        <View style={styles.containerTime}>
                                                                <Text style={styles.textTime} >{convertTime}</Text>
                                                        </View>
                                                </TouchableOpacity>
                                                <Text style={styles.title}>ngày</Text>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this._onClickShowDatePicker();
                                                        }}
                                                >
                                                        <View style={styles.containerTime}>
                                                                <Text style={styles.textTime} >{convertDate}</Text>
                                                        </View>
                                                </TouchableOpacity>
                                                <Text style={styles.title}>số lượng người</Text>
                                                <TextInput
                                                        style={styles.textInput}
                                                        value={this.state.amount}
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        amount: text
                                                                });
                                                        }}
                                                        keyboardType='numeric'
                                                />
                                                <Text style={styles.title}>ghi chú</Text>
                                                <TextInput
                                                        style={styles.textInput}
                                                        value={this.state.note}
                                                        onChangeText={(text) => {
                                                                this.setState({
                                                                        note: text
                                                                });
                                                        }}
                                                />
                                                <Text style={styles.title}>thực đơn</Text>
                                        </View>
                                        <View>
                                                {
                                                        this.state.listFoodSelect.length === 0 ?
                                                                <View style={styles.containerButton}>
                                                                        <TouchableOpacity style={styles.buttonSelectMenu}
                                                                                onPress={() => {
                                                                                        this._onClickOpenListMenu();
                                                                                }}
                                                                        >
                                                                                <Text
                                                                                        style={styles.textButtonSelectMenu}
                                                                                >chọn</Text>
                                                                        </TouchableOpacity>
                                                                </View> :
                                                                <View style={styles.containerListSelectMenu}>
                                                                        <ScrollView
                                                                                horizontal={true}
                                                                                showsHorizontalScrollIndicator={false}
                                                                        >
                                                                                <FlatList
                                                                                        data={this.state.listFoodSelect}
                                                                                        extraData={this.state}
                                                                                        keyExtractor={(item, index) => item._id}
                                                                                        horizontal={true}
                                                                                        showsHorizontalScrollIndicator={false}
                                                                                        renderItem={(item) => {
                                                                                                return (
                                                                                                        <ListFoodSelect
                                                                                                                item={item.item}
                                                                                                        />
                                                                                                );
                                                                                        }}
                                                                                />
                                                                                <TouchableOpacity
                                                                                        style={styles.buttonAddFood}
                                                                                        onPress={() => {
                                                                                                this._onClickOpenListMenu();
                                                                                        }}>
                                                                                        <Icon name='plus' size={50} color={colorMain} />
                                                                                </TouchableOpacity>
                                                                        </ScrollView>
                                                                        <View style={styles.containerTotalMoney}>
                                                                                <Text style={styles.textTitleTotal}>tổng chi phí</Text>
                                                                                <Text style={styles.textTotal}>{convertVND(this.state.totalMoney)} VND</Text>
                                                                        </View>
                                                                        <TouchableOpacity style={styles.buttonOrder}
                                                                                onPress={() => {
                                                                                        this._onClickButtonOrder();
                                                                                }}
                                                                        >
                                                                                <Text style={styles.textButtonOrder}>đặt</Text>
                                                                        </TouchableOpacity>
                                                                </View>
                                                }
                                        </View>

                                        {
                                                this.state.showTime ?
                                                        <DateTimePicker
                                                                value={this.state.date}
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
                                                                value={this.state.date}
                                                                mode={this.state.modeDate}
                                                                display="spinner"
                                                                onChange={(event, text) => {
                                                                        this._setDate(event, text);
                                                                }}
                                                        /> : null
                                        }
                                </View>
                                <Modal
                                        visible={this.state.visibleListMenu}
                                        animationType='slide'
                                        transparent={false}
                                        onRequestClose={() => {
                                                this._onClickCloseListMenu();
                                        }}
                                >
                                        <View style={styles.containerModalListMenu}>
                                                <View style={styles.containerHeader}>
                                                        <TouchableOpacity onPress={() => {
                                                                this._onClickCloseListMenu();
                                                        }}>
                                                                <Icon name='arrow-left' size={25} color='black' />
                                                        </TouchableOpacity>
                                                        <Text style={styles.textHeader}>MENU</Text>
                                                        <TouchableOpacity
                                                                style={styles.buttonComplete}
                                                                onPress={() => {
                                                                        this._onClickCompleteSelect();
                                                                        this._onClickCloseListMenu();
                                                                }}>
                                                                <Text style={styles.textButtonComplete}>ok</Text>
                                                        </TouchableOpacity>
                                                </View>
                                                <FlatList
                                                        data={this.state.listMenu}
                                                        extraData={this.state}
                                                        keyExtractor={(item, index) => index.toString()}
                                                        renderItem={(item) => {
                                                                return (
                                                                        <ItemMenu
                                                                                name={item.item.name}
                                                                                image={item.item.image}
                                                                                introduce={item.item.introduce}
                                                                                price={item.item.price}
                                                                                isSelected={this.state.listMenu[item.index].isSelected}
                                                                                _onCheckFood={this._onCheckFood}
                                                                                index={item.index}
                                                                        />
                                                                );
                                                        }}
                                                />
                                        </View>
                                </Modal>
                                <Modal
                                        visible={this.state.visibleInfoAccount}
                                        animationType='slide'
                                        transparent
                                        onRequestClose={() => {
                                                this._onClickCloseModalInfoAccount();
                                        }}
                                >
                                        <InfoAccount
                                                _onClickCloseModalInfoAccount={this._onClickCloseModalInfoAccount}
                                                _onActionOrder={this._onActionOrder}
                                        />
                                </Modal>
                                <Modal
                                        visible={this.state.isLoading}
                                        animationType='slide'
                                        transparent
                                >
                                        <View style={{
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: 'rgba(0,0,0,0.5)'
                                        }}>
                                                <ActivityIndicator animating={true} size={100} color={colorMain} />
                                        </View>
                                </Modal>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        title: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                marginTop: 10
        },
        textInput: {
                borderBottomWidth: 1,
                fontFamily: 'OpenSans-Regular',
                textAlign: 'center'
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
        buttonSelectMenu: {
                width: 100,
                height: 50,
                backgroundColor: colorMain,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
        },
        textButtonSelectMenu: {
                fontFamily: 'UVN-Baisau-Regular',
                color: 'white',
                textTransform: 'uppercase'
        },
        containerButton: {
                alignItems: 'center'
        },
        content: {
                flex: 1,
        },
        form: {
                padding: 20,
        },
        containerHeader: {
                width: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20
        },
        textHeader: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 20,
                textTransform: 'capitalize'
        },
        containerModalListMenu: {
                flex: 1,
                backgroundColor: background
        },
        containerFlatList: {
                flex: 1
        },
        textButtonComplete: {
                fontFamily: 'UVN-Baisau-Regular',
                fontSize: 15,
                color: 'white',
                textTransform: 'uppercase'
        },
        buttonComplete: {
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 35,
                backgroundColor: colorMain,
                borderRadius: 15
        },
        buttonAddFood: {
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 5,
        },
        containerListSelectMenu: {
                alignItems: 'center'
        },
        textTotal: {
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 25,
                color: 'white'
        },
        textTitleTotal: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'capitalize',
                marginTop: 10,
                fontSize: 18,
                color: 'white'
        },
        containerTotalMoney: {
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                backgroundColor: '#FF6600',
                height: 100,
                borderRadius: 15,
                paddingHorizontal: 20
        },
        textButtonOrder: {
                fontFamily: 'UVN-Baisau-Regular',
                textTransform: 'uppercase',
                color: 'white'
        },
        buttonOrder: {
                backgroundColor: colorMain,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 15,
                marginTop: 10
        }
});