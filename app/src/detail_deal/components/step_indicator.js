import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Modal, ToastAndroid, ScrollView, RefreshControl } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { colorMain, background } from '../../config';
import { AccountModel } from '../../models/account';
import Confirm from '../containers/confirm';

export default class Index extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        currentPage: null,
                        labels: null,
                        account: null,
                        isLoading: true,
                        idOrder: props.idOrder,
                        detailOrder: null,
                        messages: null,
                        checkCancel: false,
                        isRefresh: false
                };
                this._onCallback = this._onCallback.bind(this);
                this._onChangeScreenRestaurant = this._onChangeScreenRestaurant.bind(this);
        }

        async _getInfoAccountFromLocal () {
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
                        } else {
                                if (account.data.authorities === 'admin-restaurant') {
                                        this.setState({
                                                account: account.data,
                                                labels: ['Xác Nhận', 'Đang Thực Hiện', 'Hoàn Thành'],
                                        });
                                } else if (account.data.authorities === 'client') {
                                        this.setState({
                                                account: account.data,
                                                labels: ['Chờ Xác Nhận', 'Đang Thực Hiện', 'Hoàn Thành', 'Đánh Giá'],
                                        });
                                }
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
                }


        }

        componentDidMount () {
                this._getInfoAccountFromLocal();
                this.props.onFetchDetailOrder(this.state.idOrder);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.detailOrder !== prevState.detailOrder && nextProps.detailOrder !== undefined && prevState.isRefresh) {
                        prevState.isRefresh = false;
                        prevState.detailOrder = null;
                } else if (nextProps.detailOrder !== prevState.detailOrder && nextProps.detailOrder !== undefined && !prevState.isRefresh) {
                        prevState.detailOrder = nextProps.detailOrder;
                        if (prevState.detailOrder.status === 'waiting') {
                                prevState.currentPage = 0;
                        } else if (prevState.detailOrder.status === 'cancel') {
                                prevState.currentPage = 0;
                                prevState.checkCancel = true;
                        } else if (prevState.detailOrder.status === 'activity') {
                                prevState.currentPage = 1;
                        }
                        else if (prevState.detailOrder.status === 'complete') {
                                prevState.currentPage = 2;
                        } else if (prevState.detailOrder.status === 'review') {
                                prevState.currentPage = 3;
                        }
                }
                if (nextProps.messages !== undefined && nextProps.messages !== prevState.messages && !prevState.isRefresh) {
                        prevState.messages = nextProps.messages;
                        ToastAndroid(nextProps.messages, ToastAndroid.SHORT);
                }
                if (nextProps.isLoading !== undefined && nextProps.isLoading !== prevState.isLoading) {
                        prevState.isLoading = nextProps.isLoading;
                }
                return null;
        }

        onRefresh () {
                this.props.onResetPropsStepIndicator();
                this.setState({
                        isLoading: true,
                        isRefresh: true
                });
                this.props.onFetchDetailOrder(this.state.idOrder);
        }

        _onCallback () {
                this.onRefresh();
                this.props._onCallback();
        }

        _onChangeScreenRestaurant (order) {
                this.props._onClickChangeScreenRestaurant(order);
        }

        componentWillUnmount () {
                this.props.onResetPropsStepIndicator();
        }
        render () {
                return (
                        <View style={styles.content}>
                                <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        refreshControl={
                                                <RefreshControl
                                                        refreshing={this.state.isLoading}
                                                        onRefresh={() => { this.onRefresh(); }}
                                                />
                                        }
                                >
                                        <View style={{
                                                flex: 1
                                        }}>
                                                {
                                                        this.state.currentPage === null ? null :
                                                                <View style={styles.container}>
                                                                        {
                                                                                this.state.checkCancel ?
                                                                                        <View style={styles.container}>
                                                                                                <Text style={styles.textNotification}>đơn hàng đã hủy</Text>
                                                                                                <View style={styles.container}>
                                                                                                        {
                                                                                                                this.state.account === null ? null :
                                                                                                                        this.state.detailOrder === null ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                                                                                                <ActivityIndicator animating={true} size={80} color={colorMain} />
                                                                                                                        </View> : <Confirm
                                                                                                                                        _onCallback={this._onCallback}
                                                                                                                                        item={this.state.detailOrder}
                                                                                                                                        account={this.state.account}
                                                                                                                                        _onChangeScreenRestaurant={this._onChangeScreenRestaurant}
                                                                                                                                />
                                                                                                        }

                                                                                                </View>
                                                                                        </View>
                                                                                        :
                                                                                        <View style={styles.container}>
                                                                                                {
                                                                                                        this.state.detailOrder === null ? null :
                                                                                                                this.state.account === null ? null :
                                                                                                                        this.state.account.authorities === 'admin-restaurant' ?
                                                                                                                                this.state.detailOrder.status === 'complete' ?
                                                                                                                                        <StepIndicator
                                                                                                                                                customStyles={customStylesStepIndicatorComplete}
                                                                                                                                                stepCount={3}
                                                                                                                                                currentPosition={this.state.currentPage}
                                                                                                                                                labels={this.state.labels}
                                                                                                                                        />
                                                                                                                                        :
                                                                                                                                        this.state.detailOrder.status === 'review' ?
                                                                                                                                                <StepIndicator
                                                                                                                                                        customStyles={customStylesStepIndicatorComplete}
                                                                                                                                                        stepCount={3}
                                                                                                                                                        currentPosition={this.state.currentPage}
                                                                                                                                                        labels={this.state.labels}
                                                                                                                                                /> :
                                                                                                                                                <StepIndicator
                                                                                                                                                        customStyles={customStylesStepIndicator}
                                                                                                                                                        stepCount={3}
                                                                                                                                                        currentPosition={this.state.currentPage}
                                                                                                                                                        labels={this.state.labels}
                                                                                                                                                />
                                                                                                                                :
                                                                                                                                this.state.account.authorities === 'client' ?
                                                                                                                                        this.state.detailOrder.status === 'review' ?
                                                                                                                                                <StepIndicator
                                                                                                                                                        customStyles={customStylesStepIndicator}
                                                                                                                                                        stepCount={4}
                                                                                                                                                        currentPosition={this.state.currentPage}
                                                                                                                                                        labels={this.state.labels}
                                                                                                                                                />
                                                                                                                                                :
                                                                                                                                                <StepIndicator
                                                                                                                                                        customStyles={customStylesStepIndicator}
                                                                                                                                                        stepCount={4}
                                                                                                                                                        currentPosition={this.state.currentPage}
                                                                                                                                                        labels={this.state.labels}
                                                                                                                                                />
                                                                                                                                        : null
                                                                                                }
                                                                                                {
                                                                                                        this.state.account === null ? null :
                                                                                                                this.state.detailOrder === null ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                                                                                        <ActivityIndicator animating={true} size={80} color={colorMain} />
                                                                                                                </View> : <Confirm
                                                                                                                                _onCallback={this._onCallback}
                                                                                                                                item={this.state.detailOrder}
                                                                                                                                account={this.state.account}
                                                                                                                                _onChangeScreenRestaurant={this._onChangeScreenRestaurant}
                                                                                                                        />
                                                                                                }
                                                                                        </View>
                                                                        }
                                                                </View>
                                                }
                                        </View>
                                </ScrollView>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: 'white'
        },
        viewPager: {
                flex: 1
        },
        content: {
                backgroundColor: background,
                flex: 1,
        },
        loading: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
        },
        textNotification: {
                width: '100%',
                textAlign: 'center',
                fontFamily: 'UVN-Baisau-Bold',
                fontSize: 30,
                color: 'red',
                textTransform: 'capitalize',
                marginBottom: 5
        }
});

const customStylesStepIndicator = {
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

const customStylesStepIndicatorComplete = {
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
        stepIndicatorCurrentColor: colorMain,
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#ffffff',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: colorMain
};
