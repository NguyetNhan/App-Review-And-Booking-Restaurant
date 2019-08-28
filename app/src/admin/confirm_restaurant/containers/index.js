import { connect } from 'react-redux';
import Component from '../components';
import { onFetchListConfirmRestaurant, onConfirmAgree, onConfirmCancel } from '../actions';
import { ToastAndroid } from 'react-native';

const mapStateToProps = (state) => {
        const listRestaurant = state.AdminConfirmRestaurantReducers.FetchRestaurant;
        const confirmRestaurantAgree = state.AdminConfirmRestaurantReducers.ConfirmAgree;
        const confirmRestaurantCancel = state.AdminConfirmRestaurantReducers.ConfirmCancel;
        if (listRestaurant !== undefined) {
                if (listRestaurant.data.error) {
                        return {
                                isLoading: false,
                                messages: listRestaurant.data.message
                        };
                } else {
                        if (listRestaurant.data.data !== null) {
                                return {
                                        listData: listRestaurant.data.data,
                                        isLoading: false,
                                        data: true,
                                        messages: listRestaurant.data.message
                                };
                        } else {
                                return {
                                        isLoading: false,
                                        listData: [],
                                        data: false,
                                        messages: listRestaurant.data.message
                                };
                        }
                }
        } else if (confirmRestaurantAgree !== undefined) {
                if (confirmRestaurantAgree.data.error) {
                        return {
                                visibleFormConfirm: false,
                                messages: confirmRestaurantAgree.data.message
                        };
                } else {
                        return {
                                visibleFormConfirm: false,
                                messages: confirmRestaurantAgree.data.message
                        };
                }
        } else if (confirmRestaurantCancel !== undefined) {
                if (confirmRestaurantCancel.data.error) {
                        return {
                                visibleFormConfirm: false,
                                messages: confirmRestaurantCancel.data.message
                        };
                } else {

                        return {
                                visibleFormConfirm: false,
                                messages: confirmRestaurantCancel.data.message
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



