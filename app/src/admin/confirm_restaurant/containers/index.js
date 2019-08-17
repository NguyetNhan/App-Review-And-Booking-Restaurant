import { connect } from 'react-redux';
import Component from '../components';
import { onFetchListConfirmRestaurant, onConfirmAgree, onConfirmCancel } from '../actions';
import { ToastAndroid } from 'react-native';

const mapStateToProps = (state) => {
        console.log('state: ', state);
        const listRestaurant = state.AdminConfirmRestaurantReducers.FetchRestaurant;
        const confirmRestaurantAgree = state.AdminConfirmRestaurantReducers.ConfirmAgree;
        const confirmRestaurantCancel = state.AdminConfirmRestaurantReducers.ConfirmCancel;
        if (listRestaurant !== undefined) {
                if (listRestaurant.data.error) {
                        ToastAndroid.show(listRestaurant.data.message, ToastAndroid.LONG);
                        return {
                                isLoading: false
                        };
                } else {
                        if (listRestaurant.data.data !== null) {
                                ToastAndroid.show(listRestaurant.data.message, ToastAndroid.LONG);
                                return {
                                        listData: listRestaurant.data.data,
                                        isLoading: false,
                                        data: true
                                };
                        } else {
                                ToastAndroid.show(listRestaurant.data.message, ToastAndroid.LONG);
                                return {
                                        isLoading: false,
                                        listData: [],
                                        data: false
                                };
                        }
                }
        } else if (confirmRestaurantAgree !== undefined) {
                if (confirmRestaurantAgree.data.error) {
                        ToastAndroid.show(confirmRestaurantAgree.data.message, ToastAndroid.LONG);
                        return {
                                visibleFormConfirm: false,
                        };
                } else {
                        ToastAndroid.show(confirmRestaurantAgree.data.message, ToastAndroid.LONG);
                        return {
                                visibleFormConfirm: false,
                        };
                }
        } else if (confirmRestaurantCancel !== undefined) {
                if (confirmRestaurantCancel.data.error) {
                        ToastAndroid.show(confirmRestaurantCancel.data.message, ToastAndroid.LONG);
                        return {
                                visibleFormConfirm: false,
                        };
                } else {
                        ToastAndroid.show(confirmRestaurantCancel.data.message, ToastAndroid.LONG);
                        return {
                                visibleFormConfirm: false,
                        };
                }
        }
        else {
                return {
                        isLoading: false,
                };
        }
};

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchListConfirmRestaurant: () => {
                        dispatch(onFetchListConfirmRestaurant());
                },
                onConfirmAgree: (data) => {
                        dispatch(onConfirmAgree(data));
                },
                onConfirmCancel: (data) => {
                        dispatch(onConfirmCancel(data));
                }
        };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);



