import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { urlServer, colorMain, background, backgroundStatusBar } from '../../config';
import InfoAccount from '../containers/info_account';
import StepIndicator from 'react-native-step-indicator';
import ViewPager from '@react-native-community/viewpager';
import FormChonLich from '../containers/form_chon_lich';
import ListFood from '../containers/list_menu';
import ModalComplete from './modal_complete';

export default class Order extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        idRestaurant: props.navigation.getParam('idRestaurantForOrder', null),
                        listFoodSelect: [],
                        isLoading: false,
                        resultOrder: null,
                        currentPage: 0,
                        labels: ['Chọn Lịch', 'Chọn Món', 'Thông Tin'],
                        customerName: null,
                        customerEmail: null,
                        customerPhone: null,
                        totalMoneyFood: null,
                        receptionTime: null,
                        note: null,
                        amountPerson: null,
                        idClient: null,
                        discount: null,
                        visibleModalComplete: false,
                        complete: null,
                        guests: [],
                        restaurant: null
                };
                this._onActionOrder = this._onActionOrder.bind(this);
                this._onClickButtonNext = this._onClickButtonNext.bind(this);
                this._onClickButtonPrevious = this._onClickButtonPrevious.bind(this);
                this._setChonLich = this._setChonLich.bind(this);
                this._setInfoAccount = this._setInfoAccount.bind(this);
                this._setListFoodSelected = this._setListFoodSelected.bind(this);
                this._onComplete = this._onComplete.bind(this);
                this._onCloseModalComplete = this._onCloseModalComplete.bind(this);
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
                        } else {
                                this.setState({
                                        restaurant: response.data,
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
                }
        }

        componentDidMount () {
                this.fetchInfoRestaurant();
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.isLoading !== prevState.isLoading && nextProps.isLoading !== undefined) {
                        prevState.isLoading = nextProps.isLoading;
                }
                if (nextProps.messagesSucceeded !== undefined) {
                        Alert.alert(
                                'Thông Báo',
                                nextProps.messagesSucceeded,
                                [
                                        { text: 'OK', onPress: () => nextProps.navigation.goBack() },
                                ],
                                { cancelable: false },
                        );
                }
                if (nextProps.messagesFailed !== undefined) {
                        Alert.alert(
                                'Thông Báo Lỗi',
                                nextProps.messagesFailed,
                                [
                                        { text: 'OK', onPress: () => nextProps.onResetPropsMessage() },
                                ],
                                { cancelable: false },
                        );
                }
                return null;
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
                        totalMoneyFood: money
                });
        }

        _setListFoodSelected (data) {
                this.setState({
                        listFoodSelect: data.list,
                        totalMoneyFood: data.totalMoneyFood
                });
        }

        _setInfoAccount (info) {
                this.setState({
                        customerName: info.name,
                        customerEmail: info.email,
                        customerPhone: info.phone,
                        idClient: info.idClient,
                        discount: info.discount
                });
        }
        _setChonLich (data) {
                this.setState({
                        receptionTime: data.receptionTime,
                        note: data.note,
                        amountPerson: data.amountPerson,
                        guests: data.guests,
                });
        }

        _onComplete (info) {
                const date = new Date(this.state.receptionTime);
                const dateNow = new Date();
                if (this.state.listFoodSelect.length === 0) {
                        Alert.alert('Thông Báo', 'Bạn chưa chọn món ăn !');
                } else if (date.getHours() >= this.state.restaurant.timeClose || date.getHours() < this.state.restaurant.timeOpen) {
                        Alert.alert('Thông Báo', 'Nhà hàng không hoạt động trong thời gian này, mời bạn chọn lại thời gian !');
                } else if (date < dateNow) {
                        Alert.alert('Thông Báo', 'Thời gian đã trôi qua, mời bạn chọn lại!');
                } else {
                        const data = {
                                idClient: info.idClient,
                                idRestaurant: this.state.idRestaurant,
                                customerName: info.name,
                                customerEmail: info.email,
                                customerPhone: info.phone,
                                amountPerson: Number.parseInt(this.state.amountPerson),
                                food: this.state.listFoodSelect,
                                receptionTime: this.state.receptionTime,
                                totalMoneyFood: Number.parseFloat(this.state.totalMoneyFood),
                                note: this.state.note,
                                discount: info.discount,
                                guests: this.state.guests,
                        };
                        this.setState({
                                visibleModalComplete: !this.state.visibleModalComplete,
                                complete: data
                        });
                }
        }

        _onCloseModalComplete () {
                this.setState({
                        visibleModalComplete: !this.state.visibleModalComplete
                });
        }

        _onActionOrder (data) {
                this.setState({
                        isLoading: true
                });
                this.props.onAddOrder(data);
        }

        _onClickButtonNext () {
                const page = Number.parseInt(this.state.currentPage);
                this.setState({
                        currentPage: page + 1
                });
                this.viewPager.setPage(page + 1);
        }

        _onClickButtonPrevious () {
                const page = Number.parseInt(this.state.currentPage);
                this.setState({
                        currentPage: page - 1
                });
                this.viewPager.setPage(page - 1);
        }

        _onListenChangePage (event) {
                this.props.onChangePage(event);
        }

        componentWillUnmount () {
                this.props.onResetPropsMain();
        }

        render () {
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
                                <StepIndicator
                                        customStyles={customStyles}
                                        stepCount={3}
                                        currentPosition={this.state.currentPage}
                                        labels={this.state.labels}
                                />
                                <ViewPager
                                        ref={viewPager => {
                                                this.viewPager = viewPager;
                                        }}
                                        style={styles.viewPager}
                                        initialPage={this.state.currentPage}
                                        onPageSelected={(event) => {
                                                this.setState({ currentPage: event.nativeEvent.position });
                                        }}
                                        onPageScrollStateChanged={(event) => {
                                                this._onListenChangePage(event.nativeEvent.pageScrollState);
                                        }}
                                >
                                        <View key="1">
                                                <FormChonLich
                                                        _onClickButtonNext={this._onClickButtonNext}
                                                        _setChonLich={this._setChonLich}
                                                        idRestaurant={this.state.idRestaurant}
                                                />
                                        </View>
                                        <View key="2">
                                                <ListFood
                                                        _onClickButtonNext={this._onClickButtonNext}
                                                        _onClickButtonPrevious={this._onClickButtonPrevious}
                                                        idRestaurant={this.state.idRestaurant}
                                                        _setListFoodSelected={this._setListFoodSelected}
                                                />
                                        </View>
                                        <View key="3">
                                                <InfoAccount
                                                        _onClickButtonPrevious={this._onClickButtonPrevious}
                                                        _setInfoAccount={this._setInfoAccount}
                                                        _onComplete={this._onComplete}
                                                        idRestaurant={this.state.idRestaurant}
                                                />
                                        </View>
                                </ViewPager>
                                <Modal
                                        visible={this.state.visibleModalComplete}
                                        animationType='slide'
                                        onRequestClose={() => {
                                                this._onCloseModalComplete();
                                        }}
                                >
                                        <ModalComplete
                                                complete={this.state.complete}
                                                _onCloseModalComplete={this._onCloseModalComplete}
                                                _onActionOrder={this._onActionOrder}
                                        />
                                </Modal>
                                <Modal
                                        visible={this.state.isLoading}
                                        animationType='slide'
                                >
                                        <View style={{
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: 'rgba(0,0,0,0.2)'
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
        viewPager: {
                flex: 1
        },
});

const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: colorMain,
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: colorMain,
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: colorMain,
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: colorMain,
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: colorMain,
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: colorMain
};