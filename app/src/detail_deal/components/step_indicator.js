import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Modal, ToastAndroid } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import ViewPager from '@react-native-community/viewpager';
import { colorMain } from '../../config';
import { AccountModel } from '../../models/account';

export default class Index extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        currentPage: 0,
                        labels: null,
                        account: null,
                        isLoading: true,
                        idOrder: props.idOrder,
                        detailOrder: null,
                        messages: null
                };
        }

        async _getInfoAccountFromLocal () {
                const account = await AccountModel.FetchInfoAccountFromDatabaseLocal();
                if (account.authorities === 'admin-restaurant') {
                        this.setState({
                                account: account,
                                labels: ['Xác Nhận', 'Đang Thực Hiện', 'Hoàn Thành'],
                        });
                } else if (account.authorities === 'client') {
                        this.setState({
                                account: account,
                                labels: ['Chờ Xác Nhận', 'Đang Thực Hiện', 'Đánh Giá'],
                        });
                }

        }

        componentDidMount () {
                this._getInfoAccountFromLocal();
                this.props.onFetchDetailOrder(this.state.idOrder);
        }

        static getDerivedStateFromProps (nextProps, prevState) {
                if (nextProps.detailOrder !== undefined && nextProps.detailOrder !== prevState.detailOrder) {
                        prevState.detailOrder = nextProps.detailOrder
                        if (prevState.detailOrder.status === 'waiting') {
                                prevState.currentPage = 0;
                        }
                        else if (prevState.detailOrder.status === 'activity') {
                                prevState.currentPage = 1;
                        }
                        else if (prevState.detailOrder.status === 'complete') {
                                prevState.currentPage = 2;
                        }
                }
                if (nextProps.messages !== undefined && nextProps.messages !== prevState.messages) {
                        prevState.messages = nextProps.messages
                        ToastAndroid(nextProps.messages, ToastAndroid.SHORT);
                }
                if (nextProps.isLoading !== undefined && nextProps.isLoading !== prevState.isLoading) {
                        prevState.isLoading = nextProps.isLoading
                }
                return null;
        }


        onStepPress = position => {
                this.setState({ currentPage: position })
                this.viewPager.setPage(position)
        }
        render () {
                if (this.state.isLoading) {
                        return (
                                <Modal
                                        animationType='slide'
                                        visible={this.state.isLoading}
                                >
                                        <View style={styles.loading}>
                                                <ActivityIndicator animating={true} size={80} color={colorMain} />
                                        </View>
                                </Modal>
                        );
                } else {
                        return (
                                <View style={styles.container}>
                                        <StepIndicator
                                                customStyles={customStyles}
                                                stepCount={3}
                                                onPress={this.onStepPress}
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
                                        >
                                                <View key="1">
                                                        <Text>First page</Text>
                                                </View>
                                                <View key="2">
                                                        <Text>Second page</Text>
                                                </View>
                                                <View key="3">
                                                        <Text>3 page</Text>
                                                </View>
                                        </ViewPager>
                                </View>
                        );
                }
        }
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        viewPager: {
                flex: 1
        },
        loading: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
        }
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